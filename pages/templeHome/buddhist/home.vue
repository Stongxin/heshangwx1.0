<template>
	<view class="buddhist_home">
		<view class="" @click="skip('/pages/templeHome/buddhist/buddhistList?status=lay')">
			皈依申请
		</view>
		<view class="" @click="skip('/pages/templeHome/buddhist/buddhistList?status=buddhist')">
			皈依认证
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			skip(url){
				uni.navigateTo({
					url
				})
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
.buddhist_home{
	width: calc(100% - 10rpx);
	padding: 20rpx;
	view{
		width: 100%;
		height: 200rpx;
		font-size: 50rpx;
		color: #BEAD7A;
		background: #343737;
		text-align: center;
		line-height: 200rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}
}
</style>
