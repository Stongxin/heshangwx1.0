<template>
	<view class="dynamic" v-if="articleInfo.id">
		<view class="banner" v-if="articleInfo.type == 'video'">
			<video :src="$common.disposeSrc(articleInfo.file_url)" :controls="false" :autoplay="true" style="width: 100%;height: 100%;"></video>
		</view>
		<view class="banner" v-else-if="articleInfo.type == 'image'">
			<u-swiper :list="articleInfo.file_url_arr.map(elem=>{return $common.disposeSrc(elem)})" :height="800"></u-swiper>
		</view>
		<view class="top_info">
			<view class="info">
				<image class="avatar" :src="$common.disposeSrc(articleInfo.api_temple.avatar)" mode=""></image>
				<text>{{articleInfo.api_temple.name}}</text>
				<image class="pagoda" src="/static/pagoda.png" mode=""></image>
			</view>
			<!-- <view class="attent">
				<text>关注</text>
			</view> -->
		</view>
		<view class="desc">
			{{articleInfo.content}}
		</view>
		<view class="location">
			<text class="date">{{articleInfo.release_time}}</text>
			<!-- <image src="/static/location.png" mode=""></image>
			<text class="area">苏州·灵岩山寺</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				articleInfo: {}
			};
		},
		onLoad(option) {
			this.getDetail(option.id)
		},
		methods: {
			getDetail(id){
				uni.showLoading({
					title: "加载中"
				})
				this.$request({
					url: `dynamic/articleInfo/${id}`,
					method: 'GET'
				}).then(res=>{
					this.articleInfo = res
					console.log(res);
					uni.hideLoading()
				},err=>{
					uni.hideLoading()
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dynamic{
		min-height: 100vh;
		background: #1E1E1E;
		.banner{
			width: 100%;
			height: 800rpx;
		}
		.top_info{
			padding: 40rpx 40rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.info{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.avatar{
					width: 75rpx;
					height: 75rpx;
					border-radius: 10rpx;
				}
				text{
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					margin: 0 10rpx 0 20rpx;
				}
				.pagoda{
					width: 50rpx;
					height: 50rpx;
				}
			}
			.attent{
				width: 106rpx;
				height: 52rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #BCAA72;
				border-radius: 26rpx;
				text{
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #262626;
				}
			}
		}
		.desc{
			padding: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D6CFBC;
			line-height: 44rpx;
		}
		.location{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 40rpx;
			.date{
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9D998E;
			}
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 0 5rpx 0 10rpx;
			}
			.area{
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9D998E;
			}
		}
	}
</style>
