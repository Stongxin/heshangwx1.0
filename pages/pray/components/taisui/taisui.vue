<template>
	<view class="taisui">
		<view class="cover">
			<image v-if="coverImage" :src="$common.disposeSrc(coverImage)" mode="widthFix"></image>
		</view>
		<view class="taisui_content">
			
		
		<view class="desc">
			<text class="title">太岁</text>
			<view class="zodiac">
				<view class="" v-for="(item,index) in zodiacList" :key="item.id">
					<image :src="$common.disposeSrc(item.image)" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="forms">
			<view class="form_item taisui_type">
				<view class="title">
					<text>太岁类型</text>
				</view>
				<view class="types">
					<view v-for="item in multiplejson" :key="item.type_name" :class="{'active': formState.content_type == item.type_name}" @click="selectMultiple(item)">
						<text>{{item.type_name}}</text>
					</view>
				</view>
			</view>
			<view class="form_item flex inline">
				<view class="title">
					<text>价格</text>
				</view>
				<input class="input_value" type="number" v-model="formState.amount" disabled />
				<text class="suffix">元</text>
			</view>
			<view class="form_item zodiac_names" v-if="people_num > 0">
				<view class="title">
					<text>解祸人({{people_num}})人</text>
					<view class="btns" @click="addName()">
						添加
					</view>
				</view>
				<view class="names">
					<view class="item" v-for="(item, index) in formState.solution_name" :key="index">
						<input type="text text_center" placeholder="姓名" v-model="item['name']">
						<text class="to">-</text>
						<input type="text text_center" placeholder="生肖" :disabled="true" v-model="item['zodiac']" @click="openZodiacPicker(index)">
						<view class="btn" @click="delName(index)">
							删除
						</view>
					</view>
				</view>
			</view>
			<view class="form_item flex inline">
				<view class="title">
					<text>登记人</text>
				</view>
				<input class="input_value" type="text" v-model="formState.name" placeholder="请填写登记人" />
			</view>
			<view class="form_item flex inline">
				<view class="title">
					<text>联系方式</text>
				</view>
				<!-- <input class="input_value" maxlength="11" type="number" v-model="formState.tel" placeholder="请填写登记人电话" /> -->
				<input v-if="formState.tel" class="input_value" type="number" maxlength="11" v-model="formState.tel" placeholder="请输入联系方式" />
				<button v-else class="input_value btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >
					点击获取手机号
				</button>
			</view>
			<view class="form_item flex inline">
				<view class="title">
					<text>省市区</text>
				</view>
				<input class="input_value" type="text" v-model="region" placeholder="请选择省市区" disabled @click="openAreaPicker" />
			</view>
			<view class="form_item flex inline">
				<view class="title">
					<text>详细地址</text>
				</view>
				<input class="input_value" type="text" v-model="formState.address" placeholder="请填写详细地址" />
			</view>
			<view class="form_item blessing">
				<view class="title">
					<text>祈福语</text>
				</view>
				<view class="blessingList">
					<text 
					v-for="(item,index) in blessingList" :key="index" 
					@click="selectBlessing(item)"
					:class="{'active': formState.data.indexOf(item) > -1}"
					>{{item}}</text>
				</view>
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
		<uni-data-picker 
			ref="zodiacPicker" v-model="formState.solution_name[zodiacIndex].zodiac" 
			:localdata="zodiacList" :map="{text:'name',value:'alias_name'}" 
			popup-title="请选择生肖"
		></uni-data-picker>
		<!-- <u-select 
			v-model="zodiacShow" :list="zodiacList" label-name="name" 
			value-name="alias_name" @confirm="confirmZodiac"
			cancel-color="#AAA390" confirm-color="#BCAA72"
		></u-select> -->
		<u-popup v-model="popupShow" mode="center" border-radius="20">
			<view class="popupShow">
				<image class="logo" src="https://lysmall.heshangsz.com/imgs/hs-logo.png" mode=""></image>
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
		<uni-data-picker ref="areaPicker" :localdata="regionList" popup-title="请选择省市区" @change="confirmRegion"></uni-data-picker>
	</view>
</template>

<script>
	const regions = require("@/utils/regions.json")
	export default {
		data() {
			return {
				coverImage: '',
				formState: {
					temple_id: uni.getStorageSync('temple_id'), // 寺院id
					mid: '', // 类型id
					content_type: '', // 太岁类型
					amount: '', // 金额
					solution_name: [
						{
							name: '', // 姓名
							zodiac: '',// 生肖名
						}
					], // 解祸人格式: (生肖名-名称)多个人用英文逗号(,)隔开
					data: [], // 祈福语
					name: '', // 登记人
					tel: '', // 登记人电话
					address: '', // 登记人地址
					source: 'wxxcx', // 来源"app","wxxcx"
					pay_type: 'wechat', // 支付方式"alipay","wechat","balance"
					openid: uni.getStorageSync('openid'),
				},
				zodiacList: [],
				zodiacShow: false,
				urlOptions: {},
				multiplejson: [], // 太岁类型
				blessingList: [], // 祝福语
				zodiacIndex: 0, // 当前点击的接货人项的生肖选择框
				rules: [
					// {key: 'solution_name',message: '请完善解祸人信息',type: 'string'},
					{key: 'name',message: '请填写登记人',type: 'string'},
					{key: 'tel',message: '请填写登记人电话',type: 'string'},
					{key: 'address',message: '请填写登记人地址',type: 'string'},
					{key: 'data',message: '请选择祈福语',type: 'array'},
				],
				people_num: '',
				popupShow: false, // 显示金额弹窗
				orderDetail: {}, // 提交后的订单信息
				mobile: uni.getStorageSync('mobile') || '',
				regionList: regions,
				region: '', // 省市区
			};
		},
		created() {
			let curPage = getCurrentPages();
			let options = curPage[curPage.length - 1].options;
			// this.urlOptions = JSON.parse(options.column)
			if(options.scene){
				let arr = options.scene.split('_')
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
			this.getZodiacList()
			this.getMultiple()
			this.getBlessing()
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
						this.formState.tel = res.mobile
						// this.mobile = res.mobile
						// this.submit()
					})
				}
			},
			submit(){
				let params = JSON.parse(JSON.stringify(this.formState))
				params.data = params.data.join(',')
				params.solution_name = params.solution_name.map(elem=>{
					if(elem.name == ''){
						return
					}else if(elem.zodiac == ''){
						return
					}
					return `${elem.zodiac}-${elem.name}`
				}).join(',')
				if(this.people_num > 0 && params.solution_name == ''){
					uni.showToast({
						title: '请完善解祸人信息',
						icon: 'none',
						mask: true
					})
					return
				}
				params.mid = this.urlOptions.buddhist_id
				for (const i in this.rules) {
					let key = this.rules[i].key
					if(this.rules[i].type == 'string'){
						if (params[key] == '') {
							uni.showToast({
								title: this.rules[i].message,
								icon: 'none',
								mask: true
							})
							return
						}
					}else if(this.rules[i].type == 'array'){
						if (params[key].length == 0) {
							uni.showToast({
								title: this.rules[i].message,
								icon: 'none',
								mask: true
							})
							return
						}
					}
				}
				if(this.region == ''){
					uni.showToast({
						title: '请选择省市区',
						icon: 'none',
						mask: true
					})
					return
				}
				params.address = this.region.split('-').join('') + params.address
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
									url: 'taisui/taisuiSubmit',
									version: '/v3/',
									data: params,
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
			// 获取生肖列表
			getZodiacList(){
				this.$request({
					url: 'taisui/zodiacList',
					version: '/v3/',
					method: 'GET'
				}).then(res=>{
					this.zodiacList = res
					console.log(res);
				})
			},
			// 获取太岁类型
			getMultiple(){
				this.$request({
					url: `buddhist/meritTypeInfo/${this.urlOptions.buddhist_id}`,
					method: 'GET'
				}).then(res=>{
					this.multiplejson = res.multiplejson
					this.coverImage = res.image
					this.selectMultiple(this.multiplejson[0])
					console.log(res);
				})
			},
			// 获取祝福语
			getBlessing(){
				this.$request({
					url: `buddhist/blessingInfo/${this.formState.temple_id}/blessing`,
					method: 'GET'
				}).then(res=>{
					this.blessingList = res.info.blessing_language_str
					console.log(res);
				})
			},
			// 选择太岁类型/
			selectMultiple(item){
				
				this.people_num = item.people_num
				this.formState.content_type = item.type_name
				this.formState.amount = item.price
				if(this.formState.solution_name.length > this.people_num){
					this.formState.solution_name = this.formState.solution_name.slice(0, this.people_num)
				}
			},
			// 添加祝福语
			selectBlessing(item){
				let index = this.formState.data.indexOf(item)
				if(index == -1){
					this.formState.data.push(item)
				}else{
					this.formState.data.splice(index, 1)
				}
			},
			openZodiacPicker(index){
				this.zodiacIndex = index
				this.$refs.zodiacPicker.show()
				this.zodiacShow = true
			},
			// 选择生肖
			confirmZodiac(res){
				console.log(res);
				return
				this.formState.solution_name[this.zodiacIndex].zodiac = res[0].value
			},
			// 打开省市区选择器
			openAreaPicker(){
				this.$refs.areaPicker.show()
			},
			// 选择的省市区数据
			confirmRegion(e){
				this.region = e.detail.value.map(elem=>{
					return elem.text
				}).join('-')
			},
			addName(){
				if(this.formState.solution_name.length < this.people_num){
					this.formState.solution_name.push({
						name: '', // 姓名
						zodiac: '',// 生肖名
					})
				}else{
					uni.showToast({
						title: `最多允许添加(${this.people_num})人`,
						icon: 'none',
						mask: true
					})
				}
			},
			delName(index){
				if(this.formState.solution_name.length == 1){
					uni.showToast({
						title: `最少填写(1)人`,
						icon: 'none',
						mask: true
					})
					return
				}
				this.formState.solution_name.splice(index, 1)
			}
		}
	}
</script>
<style lang="scss" scoped>
	
.taisui{
	.taisui_content{
		padding: 0 50rpx;
	}
	.cover{
		image{
			width: 100%;
		}
	}
	.desc{
		.title{
			display: block;
			font-size: 40rpx;
			font-family: Source Han Serif CN;
			font-weight: 500;
			color: #BEAD7A;
			text-align: center;
			margin: 49rpx 0 32rpx;
		}
		.zodiac{
			display: flex;
			justify-content: space-between;
			align-items: center;
			view{
				text-align: center;
				image{
					width: 115rpx;
					height: 115rpx;
				}
				text{
					font-size: 30rpx;
					color: #BEAD7A;
					font-weight: bold;
					letter-spacing: 10rpx;
				}
			}
		}
	}

	.forms{
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
			
		}
		.flex{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.input_value{
				flex: 1;
				text-align: right;
				background-color: inherit;
				font-size: 30rpx;
				&.btn{
					color: #808080;
				}
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
				color: #BCAA72;
				background-color: inherit;
				font-size: 30rpx;
				&.btn{
					color: #808080;
				}
			}
			.suffix{
				margin-left: 10rpx;
			}
		}
		.taisui_type{
			.types{
				padding: 10rpx 50rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				view{
					margin: 0 20rpx;
					width: 60rpx;
					height: 240rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid #373737;
					border-radius: 10rpx;
					text{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #9D998E;
						writing-mode: tb-rl;
						letter-spacing: 10rpx;
					}
					&.active{
						border: 1px solid #BEAD7A;
						text{
							color: #BCAA72;
						}
					}
				}
			}
		}
		.zodiac_names{
			.title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btns {
					width: 116rpx;
					height: 58rpx;
					text-align: center;
					line-height: 58rpx;
					background: #BCAA72;
					border-radius: 29rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333232;
				}
			}
			.names {
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 70rpx;
					margin-top: 10rpx;
					border-bottom: solid 1px #363636;
			
					input {
						height: 70rpx;
						flex: 1;
						text-align: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #BCAA72;
					}
			
					.uni-input-placeholder {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #AAA390;
					}
			
					.text_center {
						text-align: center !important;
					}
			
					.btn {
						width: 116rpx;
						height: 50rpx;
						text-align: center;
						line-height: 50rpx;
						background: #353535;
						border-radius: 25rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #848077;
						margin-left: 20rpx;
					}
			
					.to {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #D6CFBC;
					}
				}
			}
		}
		.blessing{
			.blessingList{
				display: grid;
				grid-template-columns: repeat(3, minmax(0,1fr));
				gap: 20rpx;
				text{
					width: 190rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					background: #353535;
					border-radius: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9D998E;
					border: 1px solid #353535;
					&.active{
						border: 1px solid #BCAA72;
						color: #BEAD7A;
					}
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
