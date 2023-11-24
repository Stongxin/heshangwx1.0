<template>
	<view class="atIndex">
		<view class="cover">
			<image v-if="coverImage" :src="$common.disposeSrc(coverImage)" mode="widthFix"></image>
		</view>
		<view class="content">
			<view class="desc">
				<view class="title">{{detail.title}}</view>
				<view class="lettle">{{detail.content}}</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in detail.multiplejson_arr" :key="item.category_id" @click="openForm(item)">
					<view class="title">
						<text class="lettle">{{index + 1}}. {{item.category_name}}</text>
						<text class="lunar">({{item.ndate}})</text>
					</view>
					<view class="pub">
						<image src="/static/at_project.png" mode=""></image>
						<text>{{item.category_nickname}}</text>
					</view>
					<view class="bot">
						<view class="pub">
							<image src="/static/at_date.png" mode=""></image>
							<text>法会时间：{{item.times}}</text>
						</view>
						<view class="pub">
							<image src="/static/at_price.png" mode=""></image>
							<text>{{item.price}}元/位</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coverImage: '',
				urlOptions: {},
				detail: {},
				temple_id: uni.getStorageSync('temple_id')
			};
		},
		onLoad(options) {
			this.urlOptions = {
				id: options.column_id,
				column_type: options.column_type,
				buddhist_id: options.buddhist_id
			}
			this.getList()
		},
		methods: {
			getList(){
				this.$request({
					url: `buddhist/atList/${this.temple_id}`,
					method: 'GET'
				}).then(res=>{
					this.detail = res
					this.coverImage = res.image
				})
				
			},
			openForm(item){
				uni.navigateTo({
					url: `/pages/pray/pray?column_id=${this.urlOptions.id}&column_type=${this.urlOptions.column_type}&buddhist_id=${this.urlOptions.buddhist_id}&ordinary_id=${this.detail.id}&category_id=${item.category_id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.atIndex{
	min-height: 100vh;
	background: #2E2D2B;
	.cover{
		image{
			width: 100%;
		}
	}
	.content{
		padding: 0 50rpx;
		.desc{
			view{
				text-align: center;
			}
			.title{
				font-size: 40rpx;
				font-family: Source Han Serif CN;
				font-weight: 500;
				color: #BEAD7A;
				margin: 49rpx 0 32rpx;
				padding: 0 80rpx;
			}
			.lettle{
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #D6CFBC;
				line-height: 54rpx;
			}
		}
		.list{
			.item{
				padding: 32rpx;
				background: #373737;
				border: 4rpx solid;
				border-image: linear-gradient(-30deg, #3A3A3A, #524F44) 10 10;
				border-radius: 10rpx;
				margin-top: 22rpx;
				.title{
					overflow:hidden;
					  text-overflow: ellipsis;
					  -webkit-line-clamp: 1;
					  display: -webkit-box;
					  -webkit-box-orient: vertical;
					text{
						font-size: 32rpx;
						font-family: Source Han Serif CN;
						font-weight: bold;
						color: #D6CFBC;
					}
					.lunar{
						color: #BEAD7A;
					}
				}
				.pub{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					image{
						width: 24rpx;
						height: 24rpx;
						margin-right: 10rpx;
					}
					text{
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9D998E;
					}
				}
				>.pub{
					margin: 35rpx 0;
				}
				.bot{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
}
</style>
