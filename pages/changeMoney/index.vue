<template>
	<view class="change_index">
		<view class="content">
			<view class="main_title">
				灵岩山寺兑币机
			</view>
			<view class="sub_title" v-if="lastMacno">
				请选择您要兑换的数量(1元=1币)
			</view>
			<view class="bi_list">
				<view :class="item.ischecked?'isbi_content':'bi_content'" v-for="(item,index) in payList" :key="index"
					@click="payChecked(item.amount,index)">
					<text>{{ item.amount }}元</text>
				</view>
			</view>
		</view>
		<button class="submit" @click="submit()">提交</button>
		<u-popup v-model="popupShow" mode="center" border-radius="20">
			<view class="popupShow">
				<image class="logo"
					src="https://heshang-app.oss-cn-hangzhou.aliyuncs.com/uploads/20230925/8aadf3e11ed1aedaee8c0782057e2f29.png"
					mode=""></image>
				<view class="title">
					支付金额
				</view>
				<view class="amount">
					<text>￥</text>
					<text class="money">{{formState.amount}}</text>
				</view>
				<view class="pay_btn" @click="payment()">
					支付
				</view>
				<image class="close" src="/static/close.png" mode="" @click="popupShow = false"></image>
			</view>
		</u-popup>
		<!-- <u-popup v-model="popupShowBi" mode="center" border-radius="20">
			<view class="popupShow">
				<image class="logo"
					src="https://heshang-app.oss-cn-hangzhou.aliyuncs.com/uploads/20230925/8aadf3e11ed1aedaee8c0782057e2f29.png"
					mode=""></image>
				<view class="title">
					您已支付成功,是否现在开始出币?
				</view>
				<view class="pay_btn" @click="walkBi()">
					开始出币
				</view>
			</view>
		</u-popup> -->
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				popupShow: false, // 显示金额弹窗
				ischecked: false,
				formState: {
					mid: '30', // 功德随喜编号 
					content_type: '兑币', // 功德随喜内容类型
					name: '功德主', // 功德主
					mobile: '18013623124', // 联系方式 - 兑币不需要获取联系方式，写固定的
					amount: '', // 随喜金额- 兑币金额
					source: 'wxxcx', // 订单来源:App=App,wxxcx=微信小程序,admin=后台录入，balance=余额
					openid: uni.getStorageSync('openid'), /// 微信openid
					pay_type: 'wechat', // 支付方式 alipay=支付宝，wechat=微信
				},
				orderDetail: {}, // 提交后的订单信息 - 
				payList: [{
					amount: 1,
					ischecked: false,
				}, {
					amount: 3,
					ischecked: false,
				}, {
					amount: 5,
					ischecked: false,
				}, {
					amount: 10,
					ischecked: false,
				}, {
					amount: 15,
					ischecked: false,
				}, {
					amount: 20,
					ischecked: false,
				}, {
					amount: 50,
					ischecked: false,

				}, {
					amount: 100,
					ischecked: false,
				}],
				macno: '', // 设备编号
				temple_id: '', // 寺庙id
				lastMacno: '', // 设备编号后四位
				url: '',
				// popupShowBi: false, // 支付成功后开始出币
			};
		},
		onLoad() {
			if (this.$Route.query && this.$Route.query.scene) {
				this.temple_id = this.$Route.query.scene.split('_')[0];
				this.macno = this.$Route.query.scene.split('_')[1];
				this.lastMacno = this.macno.slice(-4);
			} else {
				uni.showToast({
					title: '设备故障',
					icon: 'error',
					mask: true
				});
			}
		},

		methods: {
			// 选择的支付金额
			payChecked(val, index) {
				// 重置所有元素的 ischecked 为 false
				this.payList.forEach(item => {
					item.ischecked = false;
					this.formState.amount = '';
				});
				// 找到与点击值相同的元素，并将其 ischecked 设为 true
				const foundItem = this.payList.find(item => item.amount === val);
				if (foundItem) {
					foundItem.ischecked = true;
					this.formState.amount = foundItem.amount;
				}
			},
			submit() {
				// 提交之前先判断是否存在设备编号
				if (this.macno) {
					// 找到选择的为多少金额的 判断必须选择其中一项兑币金额 
					const foundChecked = this.payList.find(item => item.ischecked === true);
					if (foundChecked) {
						this.formState.amount = foundChecked.amount;
					}
					if (uni.getStorageSync('openid')) {
						this.$request({
							url: 'user/WxXxOpendiLogin',
							data: {
								openid: uni.getStorageSync('openid')
							}
						}).then(res => {
							uni.setStorageSync('token', res.token)
							uni.setStorageSync('mobile', res.mobile)
							this.mobile = res.mobile
							this.$request({
								url: 'buddhist/meritTySubmit',
								data: this.formState,
								header: {
									token: uni.getStorageSync('token')
								}
							}, true).then(res => {
								this.popupShow = true
								this.orderDetail = res
							})
						})
					} else {
						uni.login({
							provider: 'weixin', //使用微信登录
							success: (loginRes) => {
								this.$request({
									url: 'onLogin',
									version: '/vx/',
									method: 'GET',
									data: {
										code: loginRes.code,
										temple_id: 14,
									}
								}).then(openIdData => {
									uni.setStorageSync('openid', openIdData.openid)
									this.formState.openid = openIdData.openid;
									this.$request({
										url: 'user/WxXxOpendiLogin',
										data: {
											openid: openIdData.openid
										}
									}).then(res => {
										uni.setStorageSync('token', res.token)
										uni.setStorageSync('mobile', res.mobile)
										this.mobile = res.mobile
										this.$request({
											url: 'buddhist/meritTySubmit',
											data: this.formState,
											header: {
												token: uni.getStorageSync('token')
											}
										}, true).then(res => {
											this.popupShow = true;
											console.log('开始唤醒196this.macno', this
												.macno);
											console.log('开始唤醒198this.formState', this
												.formState.amount);
											this.orderDetail = res;
										})
									})
								})
							}
						});
					}
				} else {
					uni.showToast({
						title: '设备故障',
						icon: 'error',
						mask: true
					});
					return;
				}
			},
			// 去支付
			payment() {
				this.popupShow = false;
				uni.requestPayment({
					provider: 'wxpay', // 服务提提供商
					timeStamp: this.orderDetail.miniPayRequest.timeStamp, // 时间戳
					nonceStr: this.orderDetail.miniPayRequest.nonceStr, // 随机字符串
					package: this.orderDetail.miniPayRequest.package,
					signType: this.orderDetail.miniPayRequest.signType, // 签名算法
					paySign: this.orderDetail.miniPayRequest.paySign, // 签名
					success: (res) => {
						// 支付成功后，开始唤醒投币机出币
						this.walkBi();
						uni.showToast({
							title: '支付成功',
							icon: 'success',
							mask: true
						})
					},
					fail: function(err) {
						uni.showToast({
							title: '支付失败',
							icon: 'error',
							mask: true
						})
					}
				});

			},
			// 唤醒投币机发起脉冲信号
			walkBi() {
				wx.request({
					url: `https://paybackend.enjoyiot.cn/Wxsite/Device/api?api_name=open_device&macno=${this.macno}&type=2&value=${this.formState.amount}`,
					method: 'GET',
					success: function(res) {
						uni.showToast({
							title: res.data.msg,
							icon: 'success',
							mask: true
						})
					},
					fail: function(err) {
						uni.showToast({
							title: res.data.msg,
							icon: 'error',
							mask: true
						})
					}
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	.change_index {
		width: 750rpx;
		min-height: 100vh;
		background: #2E2D2B;
		color: white;

		.content {
			padding: 24rpx 50rpx;
			box-sizing: border-box;

			.main_title {
				font-size: 40rpx;
				width: 100%;
				text-align: center;
				margin: 10rpx 0rpx;
			}

			.sub_title {
				color: slategray;
				width: 100%;
				text-align: center;
				margin: 10rpx 0rpx;
			}

			.bi_list {
				display: flex;
				flex-wrap: wrap;

				.bi_content,
				.isbi_content {
					width: 42%;
					box-sizing: border-box;
					margin: 20rpx;
					box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
					cursor: pointer;
					padding: 20rpx;
					text-align: center;
					display: inline-block;
					border-radius: 20rpx;
				}

				.isbi_content {
					background-color: #BEAD7A;
				}
			}
		}

		.submit {
			width: 300rpx;
			height: 90rpx;
			background: #BEAD7A;
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 30rpx auto;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #3C3C3C;
			letter-spacing: 10rpx;
		}

		.popupShow {
			width: 600rpx;
			height: 600rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			background: #3C3C3C;
			border-radius: 20rpx;
			padding: 20rpx 0;
			position: relative;

			.close {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				width: 44rpx;
				height: 44rpx;
			}

			.logo {
				width: 240rpx;
				height: 218rpx;
			}

			.title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #BCAA72;
			}

			.amount {
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					font-size: 32rpx;
					font-weight: bold;
					color: #BEAD7A;
					line-height: 1;
				}

				.money {
					font-size: 46rpx;
				}
			}

			.pay_btn {
				width: 550rpx;
				height: 80rpx;
				background: #BCAA72;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #fff;
				letter-spacing: 10rpx;
			}
		}

	}
</style>