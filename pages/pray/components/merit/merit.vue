<template>
	<view class="merit_box">
		<view class="cover">
			<image v-if="coverImage" :src="$common.disposeSrc(coverImage)" mode="widthFix"></image>
		</view>
		<view class="merit_box_content">
		<view class="desc">
			<text class="title">{{detail.title}}</text>
			<text class="lettle">{{detail.content}}</text>
		</view>
		<view class="merit">
			<view class="form_item">
				<view class="title">
					<text>功德类型</text>
				</view>
				<view class="items">
					<view  v-for="(item,index) in detail.multiplejson" :key="index" :class="{'active': formState.content_type == item.type_name}"
						@click="selectType(item)">
						<text>{{item.type_name}}</text>
					</view>
				</view>
			</view>
			<view class="form_item flex inline" style="margin-top: 20rpx;">
				<view class="title">
					<text>价格</text>
				</view>
				<input class="input_value" type="digit" v-model="formState.amount" :disabled="isCustom" placeholder="请输入随喜金额" />
				<text class="suffix">元</text>
			</view>
			<view class="form_item flex inline">
				<view class="title">
					<text>功德主</text>
				</view>
				<input class="input_value" type="text" v-model="formState.name" placeholder="请输入功德主姓名" />
			</view>
			<view class="form_item flex inline">
				<view class="title">
					<text>联系方式</text>
				</view>
				<input v-if="formState.mobile" class="input_value" type="number" maxlength="11" v-model="formState.mobile" placeholder="请输入联系方式" />
				<button v-else class="input_value btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >
					点击获取手机号
				</button>
				<!-- <input class="input_value" type="number" maxlength="11" v-model="formState.mobile" placeholder="请输入联系方式" /> -->
			</view>
			<view class="hint">
				提示：提交后不可修改
			</view>
			 <!-- v-if="mobile" -->
			<button class="submit" @click="submit()" >
				提交
			</button>
			<!-- <button v-else class="submit" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >
				提交
			</button> -->
		</view>
		</view>
		<u-popup v-model="popupShow" mode="center" border-radius="20">
			<view class="popupShow">
				<image class="logo" src="/static/logo.png" mode=""></image>
				<view class="title">
					支付金额
				</view>
				<view class="amount">
					<text>￥</text>
					<text class="money">{{orderDetail.totalAmount / 100}}</text>
				</view>
				<view class="pay_btn" @click="payment()">
					支付
				</view>
				<image class="close" src="/static/close.png" mode="" @click="popupShow = false"></image>
			</view>
		</u-popup>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				coverImage: '',
				formState: {
					mid: '', // 功德随喜编号
					content_type: '', // 功德随喜内容类型
					name: '', // 功德主
					mobile: '', // 联系方式
					amount: '', // 随喜金额
					source: 'wxxcx', // 订单来源:App=App,wxxcx =微信小程序,admin=后台录入，balance=余额
					openid: uni.getStorageSync('openid'), /// 微信openid
					pay_type: 'wechat', // 支付方式 alipay=支付宝，wechat=微信
				},
				urlOptions: {},
				detail: {},
				isCustom: true,
				rules: [
					{key: 'amount',message: '随喜金额不能为空'},
					{key: 'name',message: '功德主姓名不能为空'},
					{key: 'mobile',message: '联系方式不能为空'},
				],
				mobile: uni.getStorageSync('mobile') || '',
				popupShow: false, // 显示金额弹窗
				orderDetail: {}, // 提交后的订单信息
			};
		},
		created(){
			this.popupShow = false
			let curPage = getCurrentPages();
			let options = curPage[curPage.length - 1].options;
			// this.urlOptions = JSON.parse(options.column)
			if(options.scene){
				let arr = options.scene.split('_')
				uni.setStorageSync('temple_id',arr[0]);
				this.urlOptions = {
					id: arr[1],
					column_type: arr[2],
					buddhist_id: arr[3]
				}
			}else{
				this.urlOptions = {
					id: options.column_id,
					column_type: options.column_type,
					buddhist_id: options.buddhist_id
				}
			}
			this.formState.mid = this.urlOptions.buddhist_id
			this.getDetail()
		},
		methods: {
			getPhoneNumber(e){
				if(e.detail.code){
					this.$request({
						url: 'user/WxXxLogin',
						data: {
							openid: uni.getStorageSync('openid'),
							code: e.detail.code,
							temple_id: uni.getStorageSync('temple_id')
						}
					}).then(res=>{
						uni.setStorageSync('token', res.token)
						uni.setStorageSync('mobile', res.mobile)
						this.formState.mobile = res.mobile
						// this.mobile = res.mobile
						// this.submit()
					})
				}
			},
			submit(){
				for (const i in this.rules) {
					let key = this.rules[i].key
					if(key == 'amount'){
						if(Number(this.formState[key]) <= 0){
							uni.showToast({
								title: '随喜金额必须大于0',
								icon: 'none',
								mask: true
							})
							return
						}
					}
					if (this.formState[key] == '') {
						uni.showToast({
							title: this.rules[i].message,
							icon: 'none',
							mask: true
						})
						return
					}
				}
				if(uni.getStorageSync('openid')){
					this.$request({
						url: 'user/WxXxOpendiLogin',
						data: {
							openid: uni.getStorageSync('openid')
						}
					}).then(res=>{
						uni.setStorageSync('token', res.token)
						uni.setStorageSync('mobile', res.mobile)
						this.mobile = res.mobile
						this.$request({
							url: 'buddhist/meritTySubmit',
							data: this.formState,
							header: {
								token: uni.getStorageSync('token')
							}
						},true).then(res=>{
							this.popupShow = true
							this.orderDetail = res
						})
					})
				}else{
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
									url: 'user/WxXxOpendiLogin',
									data: {
										openid: openIdData.openid
									}
								}).then(res=>{
									uni.setStorageSync('token', res.token)
									uni.setStorageSync('mobile', res.mobile)
									this.mobile = res.mobile
									this.$request({
										url: 'buddhist/meritTySubmit',
										data: this.formState,
										header: {
											token: uni.getStorageSync('token')
										}
									},true).then(res=>{
										this.popupShow = true
										this.orderDetail = res
									})
								})
							})
						}
					});
				}
			},
			// 去支付
			payment(){
				uni.requestPayment({
					provider: 'wxpay', // 服务提提供商
					timeStamp: this.orderDetail.miniPayRequest.timeStamp, // 时间戳
					nonceStr: this.orderDetail.miniPayRequest.nonceStr, // 随机字符串
					package: this.orderDetail.miniPayRequest.package,
					signType: this.orderDetail.miniPayRequest.signType, // 签名算法
					paySign: this.orderDetail.miniPayRequest.paySign, // 签名
					success: (res)=>{
						uni.redirectTo({
							url: `/pages/hisOrder/orderDetail?result=true&showImg=true&order_id=${this.orderDetail.merOrderId}`
						})
						console.log('支付成功',res);
						// 业务逻辑。。。
					},
					fail: function (err) {
						uni.showToast({
							title: '支付失败',
							icon: 'error',
							mask: true
						})
						console.log('支付失败',err);
					}
				});
			},
			getDetail(){
				this.$request({
					url: `buddhist/meritTypeInfo/${this.urlOptions.buddhist_id}`,
					method: 'GET'
				},true).then(res=>{
					this.detail = res
					this.coverImage = res.image
					this.selectType(res.multiplejson[0])
				})
			},
			// 选择功德类型
			selectType(item){
				this.formState.content_type = item.type_name
				this.formState.amount = item.price
				if(!item.price){
					this.isCustom = false
				}else{
					this.isCustom = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.merit_box{
		.merit_box_content{
			padding: 0 50rpx;
		}
		.cover{
			width: 750rpx;
			image{
				width: 750rpx;
			}
		}
		.desc{
			text{
				display: block;
			}
			.title{
				font-size: 40rpx;
				font-family: Source Han Serif CN;
				font-weight: 500;
				color: #BEAD7A;
				text-align: center;
				margin: 49rpx 0 32rpx;
			}
			.lettle{
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #D6CFBC;
				line-height: 54rpx;
				text-indent: 2rem;
			}
		}
		.merit{
			margin-top: 40rpx;
			.form_item{
				.title{
					display: inline-block;
					text{
						font-size: 30rpx;
						font-family: Source Han Serif CN;
						font-weight: 400;
						color: #D6CFBC;
						line-height: 34px;
					}
					
				}
				.items{
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					view{
						width: 312rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border: 1px solid #373737;
						border-radius: 10rpx;
						margin-top: 20rpx;
						text{
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #9D998E;
						}
						&.active{
							border: 1px solid #BEAD7A;
							text{
								color: #BCAA72;
							}
						}
					}
				}
				.input_value{
					height: 100rpx;
					line-height: 100rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #BEAD7A;
					background-color: inherit;
					&.btn{
						color: #808080;
					}
				}
			}
			.hint{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #6F6C64;
				margin-top: 10rpx;
			}
			.submit{
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
			.flex{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.input_value{
					flex: 1;
					text-align: right;
				}
				.suffix{
					color: #BEAD7A;
				}
			}
			.inline{
				height: 100rpx;
				.title{
					flex: 0 0 120rpx;//长度根据最长的文字宽度设置
					text-align: justify;
					font-size: 0;
					margin-right: 20rpx;
					&::after{
					    content: "";
					    display: inline-block;
					    width: 100%;  
					}
				}
				.input_value{
					height: 100rpx;
					line-height: 100rpx;
				}
				.suffix{
					margin-left: 10rpx;
				}
			}
		}
		.popupShow{
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
			.close{
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				width: 44rpx;
				height: 44rpx;
			}
			.logo{
				width: 240rpx;
				height: 218rpx;
			}
			.title{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #BCAA72;
			}
			.amount{
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-size: 32rpx;
					font-weight: bold;
					color: #BEAD7A;
					line-height: 1;
				}
				.money{
					font-size: 46rpx;
				}
			}
			.pay_btn{
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
