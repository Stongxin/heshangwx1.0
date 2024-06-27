<template>
	<view class="content">
		<view class="">
			<image v-if="result" src="/static/success.png" mode=""></image>
			<image v-else src="/static/error.png" mode=""></image>
			<text v-if="result">支付成功</text>
			<text v-else>支付失败</text>
			<button class="backHome" open-type="launchApp" app-parameter="wechat" @error="launchAppError">返回和上</button>
			<!-- <view class="backHome" v-if="showBack" @click="backHome()">
				返回主页
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: true,
				showBack: false,
			}
		},
		onLaunch() {
			
		},
		onLoad(options) {
			this.result = options.result
			if(options.showBack){
				this.showBack = options.showBack
			}
			uni.hideHomeButton()
		},
		methods: {
			launchAppError (e) {
			    console.log(e.detail.errMsg)
			},
			backHome(){
				
				// uni.reLaunch({
				// 	url: '/pages/templeHome/templeHome?scene=' + uni.getStorageSync('temple_id')
				// })
			}
		}
	}
</script>
<style>
	page{
		background: #1E1E1E;
	}
</style>
<style lang="scss" scoped>
	.content {
		padding: 0 50rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		view{
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				width: 140rpx;
				height: 140rpx;
			}
			text{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #D6CFBC;
				margin-top: 29rpx;
			}
			.backHome{
				margin-top: 30rpx;
				width: 330rpx;
				height: 72rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #BEAD7A;
				border-radius: 36rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #fff;
				letter-spacing: 10rpx;
			}
		}
	}

</style>
