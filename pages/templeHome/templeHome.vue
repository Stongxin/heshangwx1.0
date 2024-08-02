<template>
	<view class="templeHome" v-if="templeData.tem_info.id">
		<!-- <view class="header">
			<image src="/static/back.png" mode=""></image>
			<text>分享</text>
		</view> -->
		<view class="imagesBanner">
			<u-swiper :list="templeData.banner" name="video_image" :height="800"></u-swiper>
		</view>
		<view class="content">
			<view class="templeInfo">
				<view class="top_info">
					<view class="info">
						<image class="avatar" :src="$common.disposeSrc(templeData.tem_info.logo)" mode=""></image>
						<text>{{templeData.tem_info.name}}</text>
						<image class="pagoda" src="/static/pagoda.png" mode="" @click="goBi"></image>
					</view>
					<!-- <view class="attent">
						<text>关注</text>
					</view> -->
				</view>
				<view class="desc">
					<view :class="['msg',show? 'active' : '']">
						<label class="btn" @click="show = !show"></label>
						<!-- <text v-html="templeData.tem_info.content"></text> -->
						<rich-text :nodes="templeData.tem_info.content" space="nbsp"></rich-text>
					</view>
				</view>
			</view>
			<view class="merit" v-if="fo == 1">
				<view class="title">
					<!-- <text>功德随喜</text> -->
				</view>
				<view class="items">
					<view class="item" v-for="(item,index) in templeData.columnList" :key="index"
						@click="openForm(item)">
						<image :src="$common.disposeSrc(item.icon)" mode=""></image>
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="dynamic" v-if="fo == 1">
				<view class="calendar">
					<image src="/static/date.png" mode="" @click="openDate"></image>
					<view class="box" v-show="popoverShow">
						<view class="years" v-for="(value,key) in templeMonth" :key="key">
							<view class="year">
								{{key}}
							</view>
							<view :class="['month',isActiveMonth(key,item) ? 'active' : '']" v-for="item in value"
								:key="item" @click="clickMonthDay(key,item)">
								{{item}}
							</view>
						</view>
					</view>
				</view>
				<view class="items">
					<view class="item" v-for="item in dataList" :key="item.id">
						<view class="years">
							<view class="year" v-if="item.year">
								{{item.year + '年'}}
							</view>
							<view class="monthDay" v-if="item.monthDay">
								{{item.monthDay}}
							</view>
						</view>
						<image class="cover" :src="$common.disposeSrc(item.image)" mode="aspectFit"
							@click="openDetail(item)"></image>
						<view class="context" @click="openDetail(item)">
							<image :src="$common.disposeSrc(templeData.tem_info.logo)" mode=""></image>
							<view class="">
								<text class="name">{{item.title}}</text>
								<text class="desc">{{item.content}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		 -->
		</view>
		<!-- @click="$common.skip('/pages/hisOrder/hisOrder','to')" -->
		<view class="hisOrder" @click="$common.skip('/pages/hisOrder/hisOrder','to')">
			<view>查看</view>
			<view>订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				show: false,
				popoverShow: false,
				longX: 0,
				longY: 0,
				poverData: [{
						title: '复制'
					},
					{
						title: '转发'
					},
					{
						title: '回复'
					},
					{
						title: '删除'
					},
				],
				templeData: {
					banner: [], // 寺庙banner图
					tem_info: {}, // 寺庙信息
					columnList: [],
					articleList: [], // 动态列表
				},
				page: 1,
				size: 10,
				getNext: true,
				temple_id: '',
				templeMonth: {}, // 年月
				activeMonth: '', // 当前选中的年月
				fo: 0, // 控制功德随喜是否显示
			};
		},
		onLoad(options) {
			if (options?.scene) {
				this.temple_id = options.scene
				uni.setStorageSync('temple_id', options.scene)
			} else {
				// 45 和上 14灵岩山寺  15铁佛寺  47心田寺
				// this.temple_id = 47
				// uni.setStorageSync('temple_id', 47)
				this.temple_id = 14
				uni.setStorageSync('temple_id', 14)
				// uni.showToast({
				// 	title: '没有该寺庙信息',
				// 	icon: 'none',
				// 	mask: true
				// })
				// return
			}
			if (uni.getStorageSync('location_id')) {
				uni.removeStorageSync('location_id')
			}
			if (uni.getStorageSync('place_id')) {
				uni.removeStorageSync('place_id')
			}
			this.login()
		},

		onReachBottom() {
			if (this.getNext) {
				this.page++
				this.getArticleList(true)
			}
		},
		watch: {
			dataList: {
				handler(newVal) {
					// console.log(newVal);
				},
				deep: true
			}
		},
		computed: {
			dataList() {
				let years = [],
					monthDay = []
				return this.templeData.articleList.map(elem => {
					elem.date = elem.create_date.split('-')
					if (years.indexOf(elem.date[0]) == -1) {
						elem.year = elem.date[0]
						years.push(elem.year)
					} else {
						elem.year = ''
					}
					let md = elem.date[1] + '-' + elem.date[2]
					if (monthDay.indexOf(md) == -1) {
						elem.monthDay = md
						monthDay.push(elem.monthDay)
					} else {
						elem.monthDay = ''
					}
					return elem
				})
			}
		},
		methods: {
			login() {
				// if(uni.getStorageSync('token') && uni.getStorageSync('mobile')){
				// 	this.getData()
				// 	this.getColumnList()
				// 	this.getArticleList()
				// 	this.getTempleMonth()
				// 	return
				// };
				uni.login({
					provider: 'weixin', //使用微信登录
					success: (loginRes) => {
						this.$request({
							url: 'onLogin',
							version: '/vx/',
							method: 'GET',
							data: {
								code: loginRes.code,
								temple_id: uni.getStorageSync('temple_id'),

							}
						}).then(openIdData => {
							uni.setStorageSync('openid', openIdData.openid)
							this.$request({
								url: 'user/WxXxOpendiLogin',
								data: {
									openid: openIdData.openid
								}
							}).then(res => {
								uni.setStorageSync('token', res.token)
								uni.setStorageSync('mobile', res.mobile)
								this.getData()
								this.getColumnList()
								this.getArticleList()
								this.getTempleMonth()
								this.getSet()
							})
						})
					}
				});
			},
			// 
			getSet() {
				this.$request({
					url: `getSet`,
					version: '/v3/',
					method: 'GET',
					data: {
						key: 'fnSwitch'
					}
				}).then(res => {
					this.fo = res.fnSwitch.fo
				})
			},
			getData() {
				this.$request({
					url: `temple/tempInfo/${this.temple_id}`,
					method: 'GET'
				}, true).then(res => {
					this.templeData.banner = res.banner.map(elem => {
						elem.video_image = this.$common.disposeSrc(elem.video_image)
						return elem
					})
					if (res.tem_info == null) {
						this.templeData.tem_info = {}
					} else {
						this.templeData.tem_info = res.tem_info
						this.templeData.tem_info.content = res.tem_info.content.replace(/\<img/gi,
							'<img style="max-width:100%;height:auto;display:block;"')
					}
				}, err => {

				})
			},
			getColumnList() {
				this.$request({
					url: `temple/columnList/${this.temple_id}`,
					method: 'GET'
				}).then(res => {
					this.templeData.columnList = res
				})
			},
			// 获取动态列表
			getArticleList(bool) {
				this.$request({
					url: `temple/articleList/${this.temple_id}`,
					data: {
						page: this.page,
						size: this.size,
						date: this.activeMonth,
					},
					method: 'GET',
				}, true).then(res => {
					if (bool) {
						this.templeData.articleList = [...this.templeData.articleList, ...res]
					} else {
						this.templeData.articleList = res
					}
					if (res.length < this.size) {
						this.getNext = false
					}
				}, err => {
					console.log(err);
				})
			},
			// 获取寺院发布文章的所有月份
			getTempleMonth() {
				this.$request({
					url: `temple/templeMonth/${this.temple_id}`,
					method: 'GET'
				}).then(res => {
					this.templeMonth = res
				})
			},
			// 点击月份
			clickMonthDay(year, month) {
				let yearMonth = year + '-' + month
				if (this.activeMonth == yearMonth) {
					this.activeMonth = ''
				} else {
					this.activeMonth = yearMonth
				}
				this.page = 1
				this.getArticleList()
			},
			isActiveMonth(year, month) {
				let bool = false
				let arr = this.activeMonth.split('-')
				if (arr[0] == year && arr[1] == month) {
					bool = true
				}
				return bool
			},
			tapPopup(e) {
				console.log(e);
			},
			openDate(e) {
				this.popoverShow = !this.popoverShow
			},
			// 兑币
			goBi() {
				// uni.navigateTo({
				// 	url: '/pages/changeMoney/index'
				// })
			},
			openForm(option) {
				if (option.column_type == 'at') {
					uni.navigateTo({
						url: `/pages/pray/components/at/index?column_id=${option.id}&column_type=${option.column_type}&buddhist_id=${option.buddhist_id}`,
					})
				} else if (option.column_type == 'sign_up_js') {
					// 居士申请
					// uni.navigateTo({
					// 	url: `/pages/templeHome/buddhist/buddhistList?status=buddhist`
					// })
					uni.navigateTo({
						url: `/pages/templeHome/buddhist/home`
					})
				} else if (option.column_type == 'sign_up_yg') {
					// 义工申请
					uni.navigateTo({
						url: `/pages/templeHome/buddhist/buddhistList?status=volunteer`
					})
				} else if (option.column_type == 'shop') {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					// uni.navigateTo({
					// 	url: `/pages/pray/pray?column=${JSON.stringify(option)}`
					// })
					uni.navigateTo({
						url: `/pages/pray/pray?column_id=${option.id}&column_type=${option.column_type}&buddhist_id=${option.buddhist_id}`
					})
				}
				// console.log(option);
				// if(option.type == 'taisui'){
				// 	// 太岁表单
				// }else if(option.type == 'at'){
				// 	// 全年法会表单
				// }else if(option.type == 'to' || option.type == 'blessing'){
				// 	// 往生佛事、往生佛事表单
				// }else if(option.type == 'merit'){
				// 	// 宝鼎香炉、放生、供斋、建寺、印经、供僧表单
				// }
			},
			// 动态详情
			openDetail(item) {
				uni.navigateTo({
					url: '/pages/dynamic/dynamic?id=' + item.id
				})
			},
		}
	}
</script>
<style>
	page {
		background: #1E1E1E;
	}
</style>
<style lang="scss" scoped>
	.templeHome {

		.hisOrder {
			position: fixed;
			right: 20rpx;
			bottom: 20%;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #373737;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			z-index: 999;

			view {
				font-size: 26rpx;
				color: #BCAA72;
				font-weight: bold;
			}
		}

		.header {
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;

			image {
				width: 58rpx;
				height: 58rpx;
			}

			text {
				display: block;
				width: 80rpx;
				height: 58rpx;
				text-align: center;
				line-height: 58rpx;
				background: rgba(#443C35, 0.5);
				border-radius: 29rpx;
				font-size: 24rpx;
				font-family: Source Han Serif CN;
				font-weight: 400;
				color: #B4A36E;
			}
		}

		.imagesBanner {
			height: 800rpx;
			overflow: hidden;

			image {
				width: 100%;
			}
		}

		.content {
			position: relative;
			top: -30rpx;

			.templeInfo {
				border-radius: 30rpx 30rpx 0px 0px;
				padding: 46rpx 40rpx;

				.top_info {

					display: flex;
					justify-content: space-between;
					align-items: center;

					.info {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						.avatar {
							width: 90rpx;
							height: 90rpx;
							border-radius: 30rpx;
						}

						text {
							font-size: 48rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
							margin: 0 10rpx 0 20rpx;
						}

						.pagoda {
							width: 62rpx;
							height: 62rpx;
						}
					}

					.attent {
						width: 106rpx;
						height: 52rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background: #BCAA72;
						border-radius: 26rpx;

						text {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #262626;
						}
					}
				}

				.desc {
					display: flex;
					width: 100%;
					overflow: hidden;
					margin-top: 40rpx;

					.msg {
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: justify;
						/* display: flex; */
						/*   display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical; */
						position: relative;
						line-height: 1.5;
						max-height: 4.5em;
						transition: .3s max-height;
						color: #E0D9C8;

						&::before {
							content: '';
							height: calc(100% - 38rpx);
							float: right;
						}

						&::after {
							content: '';
							width: 999vw;
							height: 999vw;
							position: absolute;
							box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0 #fff;
							margin-left: -100px;
						}

						.btn {
							position: relative;
							float: right;
							clear: both;
							margin-left: 20px;
							font-size: 26rpx;
							padding: 0 2px;
							// background: #3F51B5;
							//   line-height: 24px;
							//   border-radius: 4px;
							color: #E0D9C8;
							cursor: pointer;

							/* margin-top: -30px; */
							&::after {
								content: '展开'
							}

							&::before {
								content: '...';
								position: absolute;
								left: -5px;
								color: #333;
								transform: translateX(-100%)
							}
						}
					}

					.active {
						//出现此样式名时，设置不出现省略号和展开按钮
						-webkit-line-clamp: inherit !important;
						max-height: none !important;

						&::after {
							visibility: hidden;
						}

						.btn {
							&::before {
								visibility: hidden;
							}

							&::after {
								content: '收起'
							}
						}
					}
				}
			}

			.merit {
				.title {
					text-align: center;

					text {
						font-size: 40rpx;
						font-family: Source Han Serif CN;
						font-weight: 500;
						color: #BEAD7A;
					}
				}

				.items {
					display: grid;
					grid-template-columns: 140rpx 140rpx 140rpx;
					grid-row-gap: 40rpx;
					grid-column-gap: 74rpx;
					padding: 0 90rpx;
					margin-top: 50rpx;

					.item {
						text-align: center;

						image {
							width: 140rpx;
							height: 140rpx;
							border-radius: 50%;
						}

						text {
							display: block;
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #AAA390;
							margin-top: 10rpx;
						}
					}
				}
			}

			.dynamic {
				padding: 0 34rpx;
				margin-top: 50rpx;

				// .sticky{
				// 	position: sticky;
				// 	top: 0;
				// 	z-index: 999999;
				// }
				.calendar {
					position: relative;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					float: right;
					z-index: 99999;

					image {
						width: 30rpx;
						height: 30rpx;
						margin: 11rpx;
					}

					.box {
						top: 60rpx;
						right: -30rpx;
						position: absolute;
						width: 120rpx;
						max-height: calc(100vh - 60rpx);
						overflow: scroll;
						background: #373737;
						z-index: 99999;

						.years {
							z-index: 99999;

							view {
								text-align: center;
								height: 60rpx;
								line-height: 60rpx;
							}

							.year {
								font-size: 30rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #6E664D;
							}

							.month {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #AAA390;

								&.active {
									font-size: 30rpx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #BCAA72;
								}
							}
						}
					}
				}

				.items {
					.item {

						position: relative;
						margin-top: 30rpx;
						border-radius: 25rpx;

						.years {
							.year {
								font-size: 30rpx;
								font-family: Source Han Serif CN;
								font-weight: bold;
								color: #AAA390;
							}

							.monthDay {
								font-size: 36rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #E0D9C8;
								margin-bottom: 10rpx;
							}
						}

						.cover {
							width: 100%;
							height: 574rpx;
							border-radius: 25rpx;
						}

						.context {
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
							height: 154rpx;
							background: rgba(#000, 0.5);
							border-radius: 0px 0px 25rpx 25rpx;
							padding: 28rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;

							image {
								width: 92rpx;
								height: 92rpx;
								margin-right: 20rpx;
								border-radius: 10rpx;
							}

							view {
								flex: 1;
								height: 92rpx;
								display: flex;
								flex-direction: column;
								justify-content: space-between;

								.name {
									font-size: 32rpx;
									font-family: PingFang SC;
									font-weight: bold;
									color: #FFFFFF;
									line-height: 18px;
									text-shadow: 0px 0px 2px rgba(17, 16, 13, 0.4);
								}

								.desc {
									font-size: 22rpx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #CDCDCD;
									text-overflow: -o-ellipsis-lastline;
									overflow: hidden; //溢出内容隐藏
									text-overflow: ellipsis; //文本溢出部分用省略号表示
									display: -webkit-box; //特别显示模式
									-webkit-line-clamp: 2; //行数
									line-clamp: 2;
									-webkit-box-orient: vertical; //盒子中内容竖直排列
								}
							}
						}
					}
				}
			}

		}

	}
</style>