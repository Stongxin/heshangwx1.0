<template>
	<view class="orderDetail">
		<view class="top">
			<image class="logo" :src="$common.disposeSrc(orderDetail.logo)" mode=""></image>
			<view class="type">{{orderDetail.remarks || ''}}</view>
			<view class="money">¥{{orderDetail.total_amount || ''}}</view>
			<button v-if="isApp" class="backHome" open-type="launchApp" app-parameter="wechat" @error="launchAppError">返回和上</button>
			<view class="backHome" v-if="isH5" @click="backHome()">
				返回主页
			</view>
		</view>
		<view class="contentList">
			<view class="item">
				<view class="label">
					订单号
				</view>
				<view class="value">
					<view class="string">
						{{orderDetail.order_id || ''}}
					</view>
				</view>
			</view>
			<view class="item">
				<view class="label">
					支付时间
				</view>
				<view class="value">
					<view class="string">
						{{orderDetail.pay_time_text || ''}}
					</view>
				</view>
			</view>
			<view :class="['item',{'flex_col': item.type == 'locationimg'}]" v-for="(item,index) in orderDetail.content" :key="index">
				<view class="label">
					{{item.title}}
				</view>
				<view class="value">
					<view class="string" v-if="item.type == 'string'">
						{{item.value}}
					</view>
					<view class="img" v-if="item.type == 'img'">
						<image :src="$common.disposeSrc(item.value)" mode="widthFix"></image>
					</view>
					<view class="img" v-if="item.type == 'locationimg'" @click="pvew($common.disposeSrc(item.value,'domain'))">
						<image :src="$common.disposeSrc(item.value,'domain')" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	
		<u-popup v-model="showImg" mode="center" border-radius="20" width="80%">
			<view class="showImg">
				<image :src="showImgUrl" mode="widthFix"></image>
				<view class="btns">
					<button class="cancel" @click="cancel()">取消</button>
					<button class="save" @click="save()">保存</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id: '',
				orderDetail: {},
				isApp: false,
				showImg: false,
				showImgUrl: '',
				isH5: false,
			};
		},
		onLoad(option) {
			uni.hideHomeButton()
			if(option.order_id){
				this.order_id = option.order_id
				this.getDetail()
			}
			if(option.isApp){
				this.isApp = option.isApp
			}
			if(option.isH5){
				this.isH5 = option.isH5
			}
			if(option.showImg){
				this.getImg()
			}
			// this.getImg()
		},
		methods: {
			getImg(){
				this.$request({
					url: `order/randomImg/${this.order_id}`,
					method: 'GET',
					version: '/v3/',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						token: uni.getStorageSync('token')
					},
				}).then(res=>{
					if(res.path_url){
						this.showImgUrl = this.$common.disposeSrc(res.path_url)
						this.$nextTick(()=>{
							this.showImg = true
						})
					}
					
				})
			},
			getDetail(){
				this.$request({
					url: `order/getAllOrderInfo/${this.order_id}`,
					method: 'GET',
					version: '/v3/',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						token: uni.getStorageSync('token')
					},
				},true).then(res=>{
					this.orderDetail = res
				})
			},
			launchAppError (e) {
			    console.log(e.detail.errMsg)
			},
			backHome(){
				uni.reLaunch({
					url: '/pages/templeHome/templeHome?scene=' + uni.getStorageSync('scene')
				})
			},
			pvew(url){
				this.showImgUrl = url;
				this.showImg = true;
			},
			cancel(){
				this.showImg = false;
				return
				uni.showModal({
					title: '提示',
					content: '不需要保存该图片吗?',
					success: (res)=>{
						if (res.confirm) {
							this.showImg = false
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			save(){
				// uni.showModal({
				// 	title: '提示',
				// 	content: this.showImgUrl,
				// 	success: (res)=>{
				// 		if (res.confirm) {
				// 			this.showImg = false
				// 			console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
				uni.downloadFile({
					url: this.showImgUrl,
					success: res => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '保存成功',
										duration: 2000
									})
				
								},
								fail: function() {
									uni.showToast({
										title: '保存失败',
										duration: 2000
									})
				
								}
							})
						} else {
							uni.showToast({
								title: '保存失败',
								duration: 2000
							})
						}
					}
				})
			}
		}
	}
</script>
<style>
	page{
		background: #1e1e1e;
	}
</style>
<style lang="scss" scoped>
.orderDetail{
	padding: 30rpx;
	.hisOrder{
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
		view{
			font-size: 26rpx;
			color: #BCAA72;
			font-weight: bold;
		}
	}
	.top{
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.logo{
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
		}
		.type{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D6CFBC;
			margin-top: 20rpx;
		}
		.money{
			font-size: 64rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D6CFBC;
			margin-top: 20rpx;
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

	.contentList{
		margin-top: 80rpx;
		padding-top: 30rpx;
		border-top: #48453d solid 1px;
		.item{
			display: flex;
			justify-content: flex-start;
			margin-top: 20rpx;
			.label{
				min-width: 180rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #AAA390;
			}
			.value{
				flex: 1;
				.string{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #D6CFBC;
				}
				.img{
					width: 100%;
					image{
						width: 100%;
					}
				}
			}
			&.flex_col{
				flex-direction: column;
				.value{
					.img{
						margin-top: 20rpx;
					}
				}
			}
		}
	}

	.showImg{
		background: #373737;
		image{
			width: 100%;
		}
		.btns{
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
			button{
				width: 200rpx;
				height: 80rpx;
				margin: 0 !important;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 80rpx;
				&.cancel{
					border-radius: 40rpx 0 0 40rpx;
					background: #464646;
					color: #9D998E;
				}
				&.save{
					border-radius: 0 40rpx 40rpx 0;
					background: #BCAA72;
					color: #262626;
				}
			}
		}
	}
}
</style>
