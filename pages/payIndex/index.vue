<template>
	<view class="content">
		<!-- <view class="top_info">
			<image src="/static/success.png" mode=""></image>
			<text>{{payment.data.merName}}</text>
			<text class="price">{{payment.data.totalAmount}}</text>
		</view>
		<view class="desc">
			<view class="">
				<text class="lettle">订单号</text>
				<text class="text">{{payment.data.merOrderId}}</text>
			</view>
			<view class="">
				<text class="lettle">标题标题</text>
				<text class="text">内容内容内容内容</text>
			</view>
			<view class="">
				<text class="lettle">标题标题</text>
				<text class="text">内容内容内容内容</text>
			</view>
			<view class="">
				<text class="lettle">标题标题</text>
				<text class="text">内容内容内容内容</text>
			</view>
		</view>
		<view class="pay_btn" @click="wxPay">
			<text>立即支付</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: true,
				isH5: false,
				payment: {
					"code": 200,
					"msg": "成功",
					"data": {
						"connectSys": "UNIONPAY",
						"delegatedFlag": "N",
						"merName": "和上(苏州)网络科技有限公司",
						"mid": "8983205737299B5",
						"settleRefId": "33611785563N",
						"tid": "0G61ZV8A",
						"totalAmount": 1,
						"targetMid": "565799009",
						"responseTimestamp": "2023-04-25 16:21:38",
						"errCode": "SUCCESS",
						"miniPayRequest": {
							"timeStamp": "1682410898",
							"package": "prepay_id=wx25162138380792b3b32e2ddebab5700000",
							"paySign": "TWp8Z6YE3mSgUfLOMiKJOLlHCDUYsvsn2I+F/RN9u9Nh+FfKRfu3aXDweksFHAFHHDw8uu/nRwozPY8w2Lyaw53/n/uOwYg6pFjwLjyQx3siCkxjUuho4BtuXq1cfk1ZW/i1iZkOBY7F7CFSEdYSE1219fksjVE9w1QFjr632+JblY7xEHgjIY/8upwZxiwRUdflqyl5h0HlA894gnfhuh600aBvFbOXKKR3jlo/E/Zbs6V2wuw2D5oQYu/mOExfLMjnFJUEFvyKbvsYbV7T2uQ1kRRmRKdrhYi2VFJgGVJrFB62unbVFGqG7CPeha7yzPQLElwDvDdXXeCyo70dIg==",
							"appId": "wx3348010e520bdffa",
							"signType": "RSA",
							"nonceStr": "ea8180c68ffe401e86775fa30db64960"
						},
						"targetStatus": "SUCCESS|SUCCESS",
						"seqId": "33611785563N",
						"merOrderId": "34M04457458455554",
						"status": "WAIT_BUYER_PAY",
						"targetSys": "WXPay"
					},
					"timestamp": 1682410898
				},
			}
		},
		onLoad(options) {
			this.getOrder(options.order_id)
			if(options.source && options.source == 'h5'){
				this.source = false
				this.isH5 = true
			}
		},
		methods: {
			getOrder(order_id){
				uni.login({
					provider: 'weixin', //使用微信登录
					success:  (loginRes)=>{
						this.$request({
							url: 'onLogin',
							version: '/vx/',
							method: 'GET',
							data: {
								code: loginRes.code,
								temple_id: uni.getStorageSync('temple_id')
							}
						}).then(openIdData=>{
							uni.setStorageSync('openid', openIdData.openid)
							this.$request({
								url: 'unionpay/appH5WechatXcx',
								version: '/v3/',
								data: {
									merOrderId: order_id,
									subOpenId: uni.getStorageSync('openid')
								}
							}).then(res=>{
								this.wxPay(res)
							})
						})
					}
				});
			},
			wxPay(option){
				uni.requestPayment({
					provider: 'wxpay', // 服务提提供商
					timeStamp: option.miniPayRequest.timeStamp, // 时间戳
					nonceStr: option.miniPayRequest.nonceStr, // 随机字符串
					package: option.miniPayRequest.package,
					signType: option.miniPayRequest.signType, // 签名算法
					paySign: option.miniPayRequest.paySign, // 签名
					success: function (res) {
						console.log('支付成功',res);
						uni.redirectTo({
							url: `/pages/hisOrder/orderDetail?result=true&isApp=${this.source}&isH5=${this.isH5}&showImg=true&order_id=${option.merOrderId}`
						})
						// 业务逻辑。。。
					},
					fail: function (err) {
						uni.redirectTo({
							url: `/pages/hisOrder/orderDetail?result=false&isApp=${this.source}&isH5=${this.isH5}&showImg=true&order_id=${option.merOrderId}`
						})
						// uni.showToast({
						// 	title: '支付失败',
						// 	icon: 'error',
						// 	mask: true
						// })
						console.log('支付失败',err);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 50rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.top_info{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 100rpx;
			image{
				width: 94rpx;
				height: 94rpx;
				background: #DCD6C7;
				border-radius: 15rpx;
			}
			text{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #D6CFBC;
				margin-top: 29rpx;
			}
			.price{
				font-size: 64rpx;
				margin-top: 50rpx;
			}
		}
		.desc{
			padding: 25rpx 10rpx;
			border-top: solid 1px #363636;
			view{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 15rpx 0;
				text{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
				}
				.lettle{
					display: block;
					color: #AAA390;
					width: 150rpx;
				}
				.text{
					color: #D6CFBC;
				}
			}
		}
		.pay_btn{
			height: 90rpx;
			line-height: 90rpx;
			background: #CCB97F;
			border-radius: 45rpx;
			text-align: center;
			text{
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #3C3C3C;
			}
		}
	}

</style>
