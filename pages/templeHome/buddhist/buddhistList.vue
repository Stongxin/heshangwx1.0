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
			};
		},
		onLoad(options) {
			if(options.status){
				this.status = options.status
			}
		},
		onReachBottom() {
			if(this.dataSize >= 10){
				this.page ++
				this.getDataList(true)
			}
		},
		onShow() {
			this.page = 1
			this.getDataList()
		},
		methods: {
			getDataList(){
				if(uni.getStorageSync('token')){
					this.getData()
				}else{
					this.$login().then(()=>{
						this.getData()
					})
				}
			},
			getData(bool){
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
				}).then(res=>{
					if(bool){
						this.dataList = [...this.dataList,...res]
					}else{
						this.dataList = res
					}
					this.dataSize = res.length
				})
			},
			skip(id){
				if(this.status == 'buddhist'){
					uni.navigateTo({
						url: `/pages/templeHome/buddhist/buddhist?id=${id}&status=${this.status}`
					})
				}else{
					uni.navigateTo({
						url: `/pages/templeHome/volunteer/volunteer?id=${id}&status=${this.status}`
					})
				}
			},
			add(){
				if(this.status == 'buddhist'){
					uni.navigateTo({
						url: `/pages/templeHome/buddhist/buddhist?status=${this.status}`
					})
				}else{
					uni.navigateTo({
						url: `/pages/templeHome/volunteer/volunteer?status=${this.status}`
					})
				}
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
.buddhistList{
	padding: 0 30rpx calc(100rpx + env(safe-area-inset-bottom)) 30rpx;
	.empty{
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
		.line2{
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
			.edit{
				background: #f3a73f;
				color: #fff;
				font-size: 24rpx;
				padding: 10rpx 20rpx;
				border-radius: 8rpx;
			}
		}
		
		.status{
			position: absolute;
			font-size: 24rpx;
			top: 20rpx;
			right: 20rpx;
			color: #fff;
			&.ing{
				color: #2979ff;
			}
			&.success{
				color: #18bc37;
			}
			&.error{
				color: #e43d33;
			}
		}
	}

	.add{
		position: fixed;
		height: 100rpx;
		bottom: env(safe-area-inset-bottom);
		width: 100%;
		left: 0;
		padding: 10rpx;
		background: #262626;
		view{
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
	.area{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: env(safe-area-inset-bottom);
		background: #262626;
	}
}
</style>
