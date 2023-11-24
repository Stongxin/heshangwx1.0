<template>
	<view class="hisOrder">
		<view class="nav_tabs">
			<u-tabs :list="list" :is-scroll="list.length > 5 ? true : false" :current="current" active-color="#BCAA72" @change="change"></u-tabs>
		</view>
		<view class="dataList">
			<view class="item" v-for="(item,index) in dataList" :key="index" @click="$common.skip(`/pages/hisOrder/orderDetail?order_id=${item.order_id}`,'to')">
				<view class="item_left">
					<view class="lettle">
						订单编号: {{item.order_id}}
					</view>
					<view class="lettle mid">
						{{item.remarks}}({{item.name}})
					</view>
					<view class="time">
						{{item.pay_time_text}}
					</view>
				</view>
				<view class="item_right">
					¥{{item.total_amount}}
				</view>
			</view>
		</view>
		<view class="empty" v-if="dataList.length == 0">
			暂无数据~
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				current: 0,
				activeValue: '',
				dataList: [],
				page: 1,
				total: 0,
				size: 10,
				hasChild: true,
			};
		},
		onLoad() {
			this.getTabs();
		},
		onReachBottom(){
			if(this.hasChild){
				this.page ++;
				this.getData(true)
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.activeValue = this.list[index].value
				this.getData()
			},
			// 获取订单类型
			getTabs(){
				this.$request({
					url: 'order/typeList',
					version: '/v3/',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						token: uni.getStorageSync('token')
					}
				}).then(res=>{
					let arr = [];
					for (let key in res) {
						arr.push({
							name: res[key],
							value: key
						})
					}
					this.list = arr;
					if(this.list.length > 0){
						this.activeValue = this.list[0].value
						this.getData()
					}
				})
			},
			// 获取订单数据
			getData(bool){
				this.$request({
					url: 'order/getAllOrder',
					version: '/v3/',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						token: uni.getStorageSync('token')
					},
					data: {
						page: this.page,
						size: this.size,
						type: this.activeValue,
						temple_id: uni.getStorageSync('temple_id'),
					}
				}).then(res=>{
					if(bool){
						this.dataList = [...this.dataList,...res];
					}else{
						this.dataList = res
					}
					if(res.length < this.size){
						this.hasChild = false
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
.hisOrder{
	.nav_tabs{
		::v-deep .u-tabs{
			background: #1D1D1D !important;
		}
		::v-deep .u-tab-item{
			color: #AAA390 !important;
		}
		::v-deep .u-tab-item-active{
			color: #BCAA72 !important;
		}
	}
	.dataList{
		padding: 0 30rpx;
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			padding: 20rpx 30rpx;
			background: #262626;
			border-radius: 20rpx;
			.item_left{
				.lettle{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #E9E2D0;
					&.mid{
						margin: 15rpx 0;
						font-size: 26rpx;
					}
				}
				.time{
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #88847A;
				}
			}
			.item_right{
				width: 80rpx;
				min-width: 80rpx;
				text-align: center;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #BCAA72;
			}
		}
	}

	.empty{
		margin: 50% auto;
		font-size: 26rpx;
		color: #fff;
		text-align: center;
	}
}
</style>
