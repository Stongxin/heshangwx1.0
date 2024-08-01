<template>
	<view class="buddhistList">
		<div class="item" v-for="(item,index) in dataList" :key="index">
			<div class="name">所属寺院 {{item.temple.name}}</div>
			<view class="line2">
				<div class="time">{{$common.formatDate(new Date(item.updatetime*1000),'YYYY-MM-DD HH:ii:ss')}}</div>
				<view class="edit" v-if="item.status != '00'" @click="skip(item.id)">
					编辑
				</view>
			</view>
			<view :class="['status',item.status == '00' ? 'ing' : (item.status == '01' ? 'success' : 'error')]">
				{{item.status_text}}
			</view>
		</div>
		<view class="empty" v-if="dataList.length == 0">
			暂无数据~
		</view>
		<view class="add">
			<view class="" v-if="status == 'buddhist'" @click="add">
				皈依认证
			</view>
			<view class="" v-if="status == 'lay'" @click="add">
				皈依申请
			</view>
			<view class="" v-if="status == 'volunteer'" @click="add">
				义工报名
			</view>
		</view>
		<view class="area"></view>
		<u-popup v-model="popupShow" mode="center" border-radius="20">
			<view class="popupShow">
				<view class="title">
					服务协议和隐私政策
				</view>
				<view class="subtitle">
					请你务必审慎阅读、充分理解“服务协议和隐私政策”的条款，包括但不限于:为了向你提供内容等服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在“设置”中查看、变更、制除个人信息并管理你的授权。你可以阅读
					<view class="xieyicot" @click="readXy('1')">
						《用户协议》
					</view>和<view class="xieyicot" @click="readXy('2')">
						《用户隐私政策》
					</view>了解详细信息。如你同意，请点击“同意”开始接受我们的服务。
				</view>
				<view class="footerBtn">
					<view class="btnCancel" @click="btnCancel">
						取消
					</view>
					<view class="btnSure" @click="btnSure">
						同意
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				dataSize: 0,
				status: '',
				dataList: [],
				popupShow: false, // 显示隐私政策弹窗
				userAgreement: false, // 是否点击用户协议
				userPrivacy: false, // 是否点击用户隐私政策
			};
		},
		onLoad(options) {
			if (options.status) {
				this.status = options.status
			}
		},
		onReachBottom() {
			if (this.dataSize >= 10) {
				this.page++
				this.getDataList(true)
			}
		},
		onShow() {
			this.page = 1
			this.getDataList()
		},
		methods: {
			getDataList() {
				if (uni.getStorageSync('token')) {
					this.getData()
				} else {
					this.$login().then(() => {
						this.getData()
					})
				}
			},
			getData(bool) {
				this.$request({
					url: this.status == 'buddhist' ? 'signUp/lay' : 'signUp/volunteer',
					version: '/v3/',
					method: 'GET',
					header: {
						token: uni.getStorageSync('token')
					},
					data: {
						page: this.page,
						size: 10,
						standing: this.status
					}
				}).then(res => {
					if (bool) {
						this.dataList = [...this.dataList, ...res]
					} else {
						this.dataList = res
					}
					this.dataSize = res.length
				})
			},
			skip(id) {
				if (this.status == 'buddhist') {
					uni.navigateTo({
						url: `/pages/templeHome/buddhist/buddhist?id=${id}&status=${this.status}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/templeHome/volunteer/volunteer?id=${id}&status=${this.status}`
					})
				}
			},
			add() {
				this.popupShow = true;
			},

			readXy(type) {
				if (type == '1') {
					// 用户协议
					this.userAgreement = true;
					uni.navigateTo({
						url: '/pages/templeHome/userpolicy/userAgreement'
					});

				} else if (type == '2') {
					// 用户隐私协议
					this.userPrivacy = true;
					uni.navigateTo({
						url: `pages/templeHome/userpolicy/userProvacy`
					});
				}
			},
			//	 取消弹窗
			btnCancel() {
				this.popupShow = false;
			},
			// 确认
			btnSure() {
				if (this.userAgreement && this.userPrivacy) {
					if (this.status == 'buddhist') {
						uni.navigateTo({
							url: `/pages/templeHome/buddhist/buddhist?status=${this.status}`
						})
					} else {
						uni.navigateTo({
							url: `/pages/templeHome/volunteer/volunteer?status=${this.status}`
						})
					}

				} else {
					uni.showToast({
						title: '请先阅读',
						icon: 'error',
						duration: 2000
					})
				}

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
	.buddhistList {
		padding: 0 30rpx calc(100rpx + env(safe-area-inset-bottom)) 30rpx;

		.empty {
			margin: 50% auto;
			font-size: 26rpx;
			color: #fff;
			text-align: center;
		}

		.item {
			padding: 30rpx;
			margin-top: 30rpx;
			background: #262626;
			border-radius: 20rpx;
			position: relative;

			.name {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #E9E2D0;
			}

			.line2 {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;

				.time {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #88847A;
				}

				.edit {
					background: #f3a73f;
					color: #fff;
					font-size: 24rpx;
					padding: 10rpx 20rpx;
					border-radius: 8rpx;
				}
			}

			.status {
				position: absolute;
				font-size: 24rpx;
				top: 20rpx;
				right: 20rpx;
				color: #fff;

				&.ing {
					color: #2979ff;
				}

				&.success {
					color: #18bc37;
				}

				&.error {
					color: #e43d33;
				}
			}
		}

		.add {
			position: fixed;
			height: 100rpx;
			bottom: env(safe-area-inset-bottom);
			width: 100%;
			left: 0;
			padding: 10rpx;
			background: #262626;

			view {
				width: 100%;
				height: 80rpx;
				background: #BEAD7A;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #fff;
				letter-spacing: 10rpx;
			}
		}

		.area {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: env(safe-area-inset-bottom);
			background: #262626;
		}

		.popupShow {
			width: 600rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #3C3C3C;
			border-radius: 20rpx;
			position: relative;
			padding: 20rpx;
			box-sizing: border-box;

			.title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #BCAA72;
				padding: 20rpx 0rpx;
			}

			.subtitle {
				font-size: 26rpx;
				font-family: PingFang SC;
				color: floralwhite;
				letter-spacing: 4rpx;
				text-align: center;

				.xieyicot {
					color: #BCAA72;
					font-size: 30rpx;
					font-weight: bold;
				}
			}

			.footerBtn {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 100%;
				text-align: center;
				box-sizing: border-box;
				font-size: 34rpx;
				margin-top: 30rpx;

				.btnCancel {
					color: gray;
					font-family: PingFang SC;
				}

				.btnSure {
					color: #BCAA72;
					font-family: PingFang SC;
				}
			}
		}

	}
</style>