<template>
	<view class="to_blessing">
		<view class="cover">
			<image v-if="coverImage" :src="$common.disposeSrc(coverImage)" mode="widthFix"></image>
		</view>
		<view class="to_blessing_content">
			<view class="desc">
				<text class="title">{{urlOptions.title}}</text>
			</view>
			<view class="bully merit">
				<view class="form_item flex_inline" v-if="!isEquipment">
					<view class="title">
						<text>地点</text>
					</view>
					<view class="value" @click="openLocationPicker">
						<input class="value_text" v-model="formState.location_address" :disabled="true" />
						<image class="right" src="/static/right.png" mode=""></image>
					</view>
				</view>
				<view class="form_item">
					<view class="title">
						<text>佛事类型</text>
					</view>
					<view class="items">
						<view :class="{'active': formState.content_id == item.type_id}" v-for="(item,index) in foTypeList" :key="item.type_id"
							@click="selectType(item)">
							<text>{{item.type_name}}</text>
						</view>
					</view>
				</view>
				<view class="form_item" v-if="yang_number > 0">
					<view class="title flex_inline">
						<text>阳上姓名({{yang_number}})人</text>
						<view class="btns" @click="addName()">
							添加
						</view>
					</view>
					<view class="names">
						<view class="item" v-for="(item, index) in formState.yang_name" :key="index">
							<input type="text" maxlength="6" v-model="item['name']" placeholder="请填写阳上姓名">
							<view class="btn" @click="delName(index)">
								删除
							</view>
						</view>
					</view>
				</view>
				<view class="form_item" v-if="[47,61,62].indexOf(Number(formState.content_id)) > -1 && people_num > 0">
					<view class="title flex_inline">
						<text>佛光接引({{people_num}})人</text>
						<view class="btns" @click="addAppellation()">
							添加
						</view>
					</view>
					<view class="names">
						<view class="item appellation_item" v-for="(item, index) in formState.service_object" :key="index">
							<template v-if="formState.content_id == 61">
								<view class="appellation">
									<text class="to">姓氏</text>
									<input type="text" placeholder="请输入" v-model="item['name']">
									<text class="to">氏门宗</text>
								</view>
							</template>
							<template v-else-if="[47,62].indexOf(Number(formState.content_id)) > -1 && serviceObjectList.length > 0">
								<view class="appellation">
									<text class="to" v-if="">称谓</text>
									<input type="text" v-if="!item.isCustom" placeholder="请选择" :disabled="true" v-model="item['nickname']" @click="openNamePciker(index)">
									<input type="text" v-if="item.isCustom" v-model="item['nickname']" placeholder="请输入">
									<text class="to">名字</text>
									<input type="text" maxlength="6" placeholder="请输入" v-model="item['name']">
								</view>
							</template>
							<template v-else>
								<view class="appellation ip">
									<text class="to">名字</text>
									<input type="text" maxlength="6" placeholder="请输入" v-model="item['name']">
								</view>
							</template>
							<view class="btn" @click="delAppellation(index)">
								删除
							</view>
						</view>
					</view>
				</view>
				<view class="form_item" v-if="formState.one_year == 0">
					<view class="title flex_inline">
						<text>佛事农历日期</text>
						<view class="btns" @click="addDate()">
							添加
						</view>
					</view>
					<view class="names">
						<view class="item date" v-for="(item, index) in formState.lunar_date" :key="index">
							<input type="text" placeholder="开始日期" :disabled="true" v-model="item['start']"
								@click="openCalendar('lunar','start',index)">
							<text class="to">至</text>
							<input type="text" placeholder="结束日期" :disabled="true" v-model="item['end']"
								@click="openCalendar('lunar','end',index)">
							<view class="btn" @click="delDate(index)">
								删除
							</view>
						</view>
					</view>
				</view>
				<view class="form_item" v-if="formState.one_year == 0">
					<view class="title flex_inline">
						<text>佛事公历日期</text>
						<view class="btns" @click="addDate()">
							添加
						</view>
					</view>
					<view class="names">
						<view class="item date" v-for="(item, index) in formState.male_date" :key="index">
							<input type="text" placeholder="开始日期" :disabled="true" v-model="item['start']"
								@click="openCalendar('solar','start',index)">
							<text class="to">至</text>
							<input type="text" placeholder="结束日期" :disabled="true" v-model="item['end']"
								@click="openCalendar('solar','end',index)">
							<view class="btn" @click="delDate(index)">
								删除
							</view>
						</view>
					</view>
				</view>
				<view class="form_item flex inline" v-if="formState.one_year == 1">
					<view class="title">
						<text>年份</text>
					</view>
					<input class="input_value" type="text" v-model="formState.year" disabled placeholder="请选择年份" @click="openYearPicker()" />
				</view>
				<view class="form_item flex_inline" v-if="!isEquipment && other_buddha">
					<view class="title">
						<text>牌位位置</text>
					</view>
					<view class="value" @click="openPlacePicker">
						<input class="value_text" v-model="formState.place_number" placeholder="请选择牌位展示位置" :disabled="true" />
						<image class="right" src="/static/right.png" mode=""></image>
					</view>
				</view>
				<view class="form_item flex inline">
					<view class="title">
						<text>登记人</text>
					</view>
					<input class="input_value" type="text" v-model="formState.name" placeholder="请填写登记人" />
				</view>
				<view class="form_item flex inline" style="">
					<view class="title">
						<text>联系方式</text>
					</view>
					<!-- <input class="input_value" type="number" maxlength="11" v-model="formState.mobile" placeholder="请填写联系方式" /> -->
					<input v-if="formState.mobile" class="input_value" type="number" maxlength="11" v-model="formState.mobile" placeholder="请输入联系方式" />
					<button v-else class="input_value btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >
						点击获取手机号
					</button>
				</view>
				<view class="form_item" v-if="false">
					<view class="title">
						<text>水墨屏设备编号</text>
					</view>
					<input class="input_value" type="text" v-model="formState.equipment_code" placeholder="请填写水墨屏设备编号" />
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
				
				<!-- <view class="form_item flex inline">
					<view class="title">
						<text>每堂</text>
					</view>
					<input class="input_value" type="number" v-model="formState.price" placeholder="请填写价格" />
					<text class="suffix">元</text>
				</view>
				<view class="form_item flex inline">
					<view class="title">
						<text>堂数</text>
					</view>
					<input class="input_value" type="number" v-model="formState.price" placeholder="请填写堂数" />
					<text class="suffix">堂</text>
				</view>
				<view class="form_item flex inline">
					<view class="title">
						<text>价格</text>
					</view>
					<input class="input_value" type="number" v-model="formState.price" placeholder="请填写价格" />
					<text class="suffix">元</text>
				</view>
				<view class="form_item flex inline">
					<view class="title">
						<text>地址</text>
					</view>
					<input class="input_value" type="number" v-model="formState.price" placeholder="请填写地址" />
				</view>
				<view class="form_item flex inline">
					<view class="title">
						<text>登记人</text>
					</view>
					<input class="input_value" type="text" v-model="formState.price" placeholder="请填写登记人" />
				</view>
				<view class="form_item flex inline">
					<view class="title">
						<text>联系方式</text>
					</view>
					<input class="input_value" type="number" v-model="formState.price" placeholder="请填写联系方式" />
				</view> -->
				<view class="form_item" v-if="formState.type == 'blessing'">
					<view class="title">
						<text>祈福语</text>
					</view>
					<view class="items grid3">
						<view :class="{'active': formState.sentiment.indexOf(item) > -1}" v-for="(item,index) in blessing_language_str" :key="index"
							@click="selectSentiment(item)">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
				<view class="form_item flex inline" v-if="formState.one_year != 1">
					<view class="title">
						<text>佛事</text>
					</view>
					<input class="input_value" type="text" v-model="days" disabled />
					<text class="suffix">堂</text>
				</view>
				<view class="form_item flex inline">
					<view class="title">
						<text>价格</text>
					</view>
					<input class="input_value" type="text" v-model="totalPrice" disabled />
					<text class="suffix">元</text>
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
		
		
		
		<uni-calendar
		    ref="calendar"
		    :insert="false"
			:lunar="true"
			:range="true"
			:startDate="startDate"
		    @confirm="confirmCalendar"
		/>
		<uni-data-picker
			ref="locationPicker" v-model="formState.location_id"
			:localdata="tabletPlace" :map="{text:'name',value:'id',one_year: 'one_year'}"
			popup-title="请选择地点" @change="confirmLocation"
		></uni-data-picker>
		<uni-data-picker
			ref="namePicker" v-model="formState.service_object[serviceObjectIndex].nickname"
			:localdata="serviceObjectList" popup-title="请选择称谓"
			@change="confirmAppellation"
		></uni-data-picker>
		<uni-data-picker
			ref="yearPicker" v-model="formState.year"
			:localdata="yearList" popup-title="请选择年"
			@change="confirmYear"
		></uni-data-picker>
		<!-- <uni-data-picker
			ref="placePicker" v-model="formState.place_id"
			:localdata="locationList" :map="{text:'location_number',value:'id'}"
			popup-title="请选择牌位展示位置" @change="confirmPlace"
		></uni-data-picker> -->
		<u-popup v-model="placePicker" mode="bottom" border-radius="20">
			<view class="placePicker">
				<view class="title">
					<view class="">
						请选择牌位展示位置
					</view>
					<image src="/static/close.png" mode="" @click="placePicker = false"></image>
				</view>
				<u-tabs
					v-if="placePicker"
					:list="placeTabsList" 
					:is-scroll="false" 
					:current="placeTabsCurrent"
					bg-color="#262626"
					name="put_name"
					inactive-color="#5C584E"
					active-color="#B8AC76"
					@change="placeTabsChange"
				></u-tabs>
				<view class="placeContent">
					<view class="placeRow" v-for="(item,index) in placeList" :key="index">
						<view class="row_title">
							{{item.floorname}}
						</view>
						<view class="tablet_list">
							<view 
								:class="['tablet_item', {'active': formState.place_id == elem.id}]"
								v-for="elem in item.list" :key="elem.id"
								@click="confirmPlace(elem)"
							>
								<image src="/static/tablet.png" alt="">
								<view class="tablet_name">
									{{elem.location_number}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
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
		components:{
		},
		data() {
			return {
				coverImage: '',
				formState: {
					temple_id: uni.getStorageSync('temple_id'), // 寺庙编号id
					type: '', // 佛事类型[blessing:祈福佛事(禄位),to:往生佛事(莲位)]
					card_id: '', // 佛事编号id(card_position表id)
					content_id: '', // 佛事分类ID
					name: '', // 登记人
					mobile: '', // 联系方式
					service_object: [
						{
							name: '',
							nickname: '',
							isCustom: false,
						}
					], // 祈福/超度(对象)
					yang_name: [
						{
							name: ''
						}
					], // 阳上姓名(多个用英文逗号隔开)
					put_time: '', // 时间/天
					sentiment: [], // 祝福语
					location: '', // 牌位（拼接方式【位置名称-位置编号】）
					source: 'wxxcx', // 订单来源:app,wxxcx=微信小程序
					equipment_code: '0', // 水墨屏设备编号
					openid: uni.getStorageSync('openid'), // 微信openid
					pay_type: 'wechat', // 支付方式 alipay=支付宝，wechat=微信，balance=余额
					location_id: '', // 地点id
					location_address: '', // 地点名称
					place_id: '0', // 
					address: '', // 
					one_year: '0', // 是否是一年排位
					year: '', // 年
					lunar_date: [
						{
							start: '',
							end: ''
						}
					], // 农历日期
					male_date: [
						{
							start: '',
							end: ''
						}
					], // 公历日期
					place_id: '', // 佛牌位置id
					place_number: '', // 牌位位置编号
				},
				dataList: [], // 功德榜
				dateIndex: '',
				dateKey: '',
				dataType: '',
				tabletPlace: [], // 地点列表
				foTypeList: [], // 佛事类型
				urlOptions: {}, // 路由参数
				yang_number: '', // 最多允许添加的阳上姓名
				people_num: '', // 最多允许添加的佛光接引
				serviceObjectIndex: 0, // 当前称谓下标
				serviceObjectList: [], // 称谓列表
				yearList: [], // year数据
				blessing_language_str: [], // 祈福语列表
				verifyNickname: false, // 是否校验佛光接引称谓
				rules: [
					// {key: 'yang_name',message: '请完善阳上姓名信息'},
					{key: 'name',message: '请填写登记人'},
					{key: 'mobile',message: '请输入联系方式'},
					// {key: 'equipment_code',message: '请输入水墨屏编号'},
					{key: 'address',message: '请输入地址'},
					// {key: 'place_id',message: '请选择牌位展示位置'},
				],
				popupShow: false, // 显示金额弹窗
				orderDetail: {}, // 提交后的订单信息
				mobile: uni.getStorageSync('mobile') || '',
				regionList: regions,
				region: '', // 省市区
				locationList: [], // 牌位展示位置
				isEquipment: true,
				placePicker: false, // 显示牌位位置
				placeTabsList: [
					{
						name: '东'
					}, {
						name: '南'
					}, {
						name: '西'
					}, {
						name: '北'
					}
				],
				placeTabsCurrent: 0,
				placeList: {},
				active_tablet: '',
				other_buddha: false, // 是否存在牌位
				startDate: '', // 限制日历的开始日期
				foshiItem: {},// 选择的佛事item
			};
		},
		created() {
			this.startDate = this.$common.formatDate(new Date(),'YYYY-MM-DD')
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
			this.formState.type = this.urlOptions.column_type
			this.formState.card_id = this.urlOptions.buddhist_id
			this.getYears()
			// if(this.formState.type == 'blessing'){
			// 	this.getBlessingInfo()
			// }
			this.getBlessingInfo()
			if(uni.getStorageSync('location_id') && uni.getStorageSync('place_id')){
				this.isEquipment = true
				this.formState.location_id = uni.getStorageSync('location_id')
				this.formState.place_id = uni.getStorageSync('place_id')
				this.formState.location = '1-' + uni.getStorageSync('location_id')
				this.getFoType()
			}else{
				this.isEquipment = false
				this.getMeritTypeList()
			}
		},
		computed: {
			days(){
				let day = 0
				for (let i in this.formState.male_date) {
					let elem = this.formState.male_date[i]
					if(elem.start != '' && elem.end != ''){
						day +=this.diffDays(elem.start,elem.end)
					}
				}
				return day
			},
			// 计算价格
			totalPrice(){
				let total = 0;
				if(this.formState.location_id == 1){
					total = this.foshiItem.one_year_price
				}else{
					total = this.days*this.foshiItem.price
				}
				return total
			}
		},
		watch: {
			'formState.location_id': {
				handler(newVal){
					if(this.isEquipment){
						return
					}
					// if(newVal == 1){
					// 	this.formState.one_year = 1
					// }else{
					// 	this.formState.one_year = 0
					// }
					this.getFoType()
					this.formState.place_id = ''
					this.formState.place_number = ''
					// this.getLocation()
				},
				deep: true,
				immediate: true,
			}
		},
		methods: {
			diffDays(date1, date2) {
				// 将两个日期都转换为时间戳（以毫秒为单位）
				const d1 = new Date(date1).getTime();
				const d2 = new Date(date2).getTime();
				
				// 计算两个日期之间相差的时间戳
				const diff = Math.abs(d1 - d2);
				  
				// 将时间戳转换为天数并返回
				return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
			},
			getPhoneNumber(e){
					// console.log(e,123123);
					// return
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
			// 提交
			submit(){
				let params = JSON.parse(JSON.stringify(this.formState))
				if(params.male_date.length > 0){
					params.male_date = params.male_date.map(elem=>{
						if(elem.start == '' || elem.end == ''){
							return
						}
						return elem.start + '*' + elem.end
					}).join(',')
				}
				if(params.lunar_date.length > 0){
					params.lunar_date = params.lunar_date.map(elem=>{
						if(elem.start == '' || elem.end == ''){
							return
						}
						return elem.start + '*' + elem.end
					}).join(',')
				}
				// 如果可添加人数大于0
				params.service_object = params.service_object.map(elem=>{
					if(params.content_id == 61){
						elem.nickname = '氏门宗'
					}
					if(this.verifyNickname){
						if((elem.name == '' || elem.nickname == '')){
							return
						}
					}else{
						if(elem.name == ''){
							return
						}
					}
					return `${elem.name}-${elem.nickname}`
				}).join(',')
				params.sentiment = params.sentiment.join(',')
				params.yang_name = params.yang_name.map(elem=>{
					if(elem.name == ''){
						return
					}
					return elem.name
				}).join(',')
				if(params.one_year == 1 && params.year == ''){
					uni.showToast({
						title: '请选择年份',
						icon: 'none',
						mask: true
					})
					return
				}
				if(params.one_year == 0 && params.male_date == ''){
					uni.showToast({
						title: '请选择佛事日期',
						icon: 'none',
						mask: true
					})
					return
				}
				if(params.yang_name == '' && this.yang_number > 0){
					uni.showToast({
						title: '请完善阳上姓名信息',
						icon: 'none',
						mask: true
					})
					return
				}
				for (const i in this.rules) {
					let key = this.rules[i].key
					if (params[key] == '') {
						uni.showToast({
							title: this.rules[i].message,
							icon: 'none',
							mask: true
						})
						return
					}
				}
				if(params.type == 'to' && params.service_object == '' && this.people_num > 0){
					uni.showToast({
						title: '请完善佛光接引信息',
						icon: 'none',
						mask: true
					})
					return
				}
				if(this.other_buddha && params.place_id == ''){
					uni.showToast({
						title: '请选择牌位位置',
						icon: 'none',
						mask: true
					})
					return
				}
				if(params.type == 'blessing' && params.sentiment == ''){
					uni.showToast({
						title: '请选择祈福语',
						icon: 'none',
						mask: true
					})
					return
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
									url: 'buddhist/blessingOrder',
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
			// 获取地点列表
			getMeritTypeList(){
				this.$request({
					url: `temple/tabletPlace/${this.formState.temple_id}`,
					method: 'GET'
				}).then(res=>{
					this.tabletPlace = res
					this.formState.location_id = res[0].id
					this.formState.location_address = res[0].name
					this.formState.location = res[0].name + '-' + res[0].id
					this.formState.one_year = res[0].one_year
				})
			},
			// 获取佛事类型
			getFoType(){
				this.$request({
					url: 'temple/foType',
					method: 'GET',
					isTransformResponse: true,
					data: {
						temid: this.formState.temple_id, // 寺庙id
						location_id: this.formState.location_id, // 地点id
						type: this.urlOptions.column_type,
					}
				}).then(res=>{
					this.foTypeList = res.data
					this.selectType(res.data[0])
					this.other_buddha = res.other.buddha
					if(res.other.buddha){
						this.getMemorialTabletType()
					}
				})
			},
			// 	佛牌摆放位置列表(东、南、西、北)
			getMemorialTabletType(){
				this.$request({
					url: 'temple/memorialTabletType',
					method: 'GET',
					data: {
						location_id: this.formState.location_id, // 地点id
						background_color: this.formState.type == 'blessing' ? 'red' : 'yellow'
					}
				},true).then(res=>{
					this.placeTabsList = res
					// if(res.length > 0){
					// 	this.getMemorialTabletList();
					// }
				})
			},
			// 佛牌列表,地点-location_id、
			getMemorialTabletList(){
				this.$request({
					url: 'temple/memorialTabletList',
					method: 'POST',
					data: {
						location_id: this.formState.location_id, // 地点id
						background_color: this.formState.type == 'blessing' ? 'red' : 'yellow',
						put_name: this.placeTabsList[this.placeTabsCurrent].put_name,
						years: this.formState.one_year == 1 ? 'y' : 'n',
						years_date: this.formState.one_year == 1 ? this.formState.year : '',
						times: this.formState.one_year == 1 ? '[]' : JSON.stringify(this.formState.male_date)
					}
				},true).then(res=>{
					this.placeList = res
				})
			},
			// 获取year数据
			getYears(){
				let year = new Date().getFullYear();
				for(var i= year;i <= year + 20;i++){
					this.yearList.push({
						text: i,
						value: i
					})
				}
			},
			// 获取祈福语
			getBlessingInfo(){
				this.$request({
					url: `buddhist/blessingInfo/${this.formState.temple_id}/${this.urlOptions.column_type}`,
					method: 'GET',
				}).then(res=>{
					this.blessing_language_str = res.info.blessing_language_str
					this.coverImage = res.info.image
				})
			},
			// 打开地点弹窗
			openLocationPicker(){
				this.$refs.locationPicker.show()
			},
			// 打开牌位展示位置弹窗
			openPlacePicker(){
				let params = JSON.parse(JSON.stringify(this.formState))
				if(params.male_date.length > 0){
					params.male_date = params.male_date.map(elem=>{
						if(elem.start == '' || elem.end == ''){
							return
						}
						return elem.start + '*' + elem.end
					}).join(',')
				}
				if(params.one_year == 1 && params.year == ''){
					uni.showToast({
						title: '请先选择年份',
						icon: 'none'
					})
					return;
				}
				if(params.one_year == 0 && params.male_date == ''){
					uni.showToast({
						title: '请先选择佛事日期',
						icon: 'none'
					})
					return;
				}
				this.placePicker = true;
				this.getMemorialTabletList();
				// this.$refs.placePicker.show()
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
			// 选择佛事类型
			selectType(item){
				this.foshiItem = item
				this.yang_number = item.yang_number
				this.formState.content_id = item.type_id
				if(this.formState.yang_name.length > this.yang_number){
					this.formState.yang_name = this.formState.yang_name.slice(0, this.yang_number)
				}
				this.formState.service_object = [{
					name: '',
					nickname: '',
					isCustom: false,
				}]
				if([47,61,62].indexOf(Number(item.type_id)) > -1){
					this.people_num = item.people_num
					// if(this.formState.service_object.length > this.people_num){
					// 	this.formState.service_object = this.formState.service_object.slice(0, this.people_num)
					// }
					if(item.diyname == ''){
						this.serviceObjectList = []
						this.verifyNickname = false
						return
					}
					let arr = item.diyname.split(',').map(elem=>{
						return {
							text: elem,
							value: elem
						}
					})
					arr.push({
						text: '自定义',
						value: '自定义'
					})
					this.verifyNickname = true
					this.serviceObjectList = arr
				}
			},
			// 添加阳上姓名
			addName(){
				if(this.formState.yang_name.length == this.yang_number){
					uni.showToast({
						title: `最多允许添加(${this.yang_number})人`,
						icon: "none",
						mask: true
					})
					return
				}
				this.formState.yang_name.push({
					name: ''
				})
			},
			// 删除阳上姓名
			delName(index){
				if(this.formState.yang_name.length == 1){
					uni.showToast({
						title: '最少需完善(1)人',
						icon: "none",
						mask: true
					})
					return
				}
				this.formState.yang_name.splice(index, 1)
			},
			// 添加佛光接引
			addAppellation(){
				if(this.formState.service_object.length == this.people_num){
					uni.showToast({
						title: `最多允许添加(${this.people_num})人`,
						icon: "none",
						mask: true
					})
					return
				}
				this.formState.service_object.push({
					name: '',
					nickname: '',
					isCustom: false,
				})
			},
			// 删除佛光接引
			delAppellation(index){
				if(this.formState.service_object.length == 1){
					uni.showToast({
						title: '最少需完善(1)人',
						icon: "none",
						mask: true
					})
					return
				}
				this.formState.service_object.splice(index, 1)
			},
			// 选择地点
			confirmLocation(res){
				console.log(res,3333);
				let value = res.detail.value[0]
				this.formState.location_address = value.text
				this.formState.location = value.text + '-' + value.value
				this.formState.one_year = value.one_year
			},
			// 选中牌位展示位置
			confirmPlace(res){
				// console.log(res);
				// let value = res.detail.value[0]
				// console.log(value);
				this.formState.place_id = res.id
				this.formState.place_number = res.location_number
				this.placePicker = false;
			},
			// 获取牌位展示位置
			getLocation(){
				this.$request({
					url: 'temple/location',
					method: 'GET',
					data: {
						location_id: this.formState.location_id, // 地点id
						type: 'location',
						colortype: this.formState.type == 'blessing' ? 0 : 1
					}
				}).then(res=>{
					this.locationList = res.location_number
				})
			},
			// 选择祈福语
			selectSentiment(item){
				let index = this.formState.sentiment.indexOf(item)
				if(index == -1){
					this.formState.sentiment.push(item)
				}else{
					this.formState.sentiment.splice(index, 1)
				}
			},
			// 打开称谓弹窗
			openNamePciker(index){
				this.serviceObjectIndex = index
				this.$refs.namePicker.show()
			},
			// 打开yearpicker
			openYearPicker(){
				this.$refs.yearPicker.show()
			},
			// 选择年
			confirmYear(res){
				console.log(res);
			},
			// 选择称谓
			confirmAppellation(res){
				let value = res.detail.value[0].value
				if(value == '自定义'){
					this.formState.service_object[this.serviceObjectIndex].isCustom = true
					this.formState.service_object[this.serviceObjectIndex].nickname = ''
				}else{
					this.formState.service_object[this.serviceObjectIndex].isCustom = false
					this.formState.service_object[this.serviceObjectIndex].nickname = value
				}
			},
			// 选择日期
			confirmCalendar(value){
				this.formState.put_time = value.range.data.length
				this.$set(this.formState.male_date[this.dateIndex],'start',value.range.before);
				this.$set(this.formState.male_date[this.dateIndex],'end',value.range.after);
				// this.formState.male_date[this.dateIndex] = {
				// 	start: value.range.before,
				// 	end: value.range.after
				// }
				this.$request({
					url: `common/lunarDate/${value.range.before}`,
					method: "GET"
				}).then(res=>{
					this.formState.lunar_date[this.dateIndex].start = res[0]
				})
				this.$request({
					url: `common/lunarDate/${value.range.after}`,
					method: "GET"
				}).then(res=>{
					this.formState.lunar_date[this.dateIndex].end = res[0]
				})
			},
			openCalendar(type,key,index){
				this.$refs.calendar.open();
				this.dataType = type
				this.dateIndex = index
				this.dateKey = key
			},
			// 添加农历 日期
			addDate(value){
				this.formState.lunar_date.push({
					start: '',
					end: ''
				})
				this.formState.male_date.push({
					start: '',
					end: ''
				})
			},
			// 删除农历日期
			delDate(index){
				if(this.formState.lunar_date.length == 1){
					uni.showToast({
						title: '最少需添加一条',
						icon: 'none',
						mask: true
					})
					return
				}
				this.formState.lunar_date.splice(index, 1)
				this.formState.male_date.splice(index, 1)
			},
			placeTabsChange(index){
				this.placeTabsCurrent = index;
				this.getMemorialTabletList();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.to_blessing{
		.to_blessing_content{
			padding: 0 50rpx;
		}
		.cover{
			image{
				width: 100%;
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
					display: grid;
					grid-template-columns: repeat(2, minmax(0, 1fr));
					gap: 10px;
					view{
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
					&.grid3{
						display: grid;
						grid-template-columns: repeat(3, minmax(0, 1fr));
						gap: 10px;
					}
				}
				.input_value{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #BEAD7A;
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
					background-color: inherit;
					&.btn{
						color: #808080;
					}
				}
				.suffix{
					color: #BEAD7A;
					font-size: 26rpx;
					font-weight: bold;
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
					background-color: inherit;
					line-height: 100rpx;
					&.btn{
						color: #808080;
					}
				}
				.suffix{
					margin-left: 10rpx;
					font-size: 26rpx;
					font-weight: bold;
				}
			}
		}
		.bully {
			margin-top: 40rpx;

			.form_item {
				.title {
					&.flex_inline {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					// display: inline-block;
					>text {
						font-size: 30rpx;
						font-family: Source Han Serif CN;
						font-weight: 400;
						color: #D6CFBC;
						line-height: 34px;
					}

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

				.value {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					flex: 1;

					.value_text {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #BEAD7A;
						flex: 1;
						text-align: right;
						display: inline-block;
						height: 80rpx;
					}

					.right {
						width: 44rpx;
						height: 44rpx;
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
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #BCAA72;
						}
						&.date{
							input{
								text-align: center;
							}
						}
						.uni-input-placeholder {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #AAA390;
						}
						.btn {
							width: 116rpx;
							min-width: 116rpx;
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
							line-height: 1;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #D6CFBC;
						}
						&.appellation_item{
							.appellation{
								display: flex;
								justify-content: space-between;
								align-items: center;
								height: 70rpx;
								input{
									text-align: center;
								}
								&.ip{
									input{
										text-align: left;
										padding-left: 20rpx;
									}
								}
							}
							
						}
					}
				}
			}

			.flex_inline {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;

				.title {
					flex: 0 0 120rpx; //长度根据最长的文字宽度设置
					text-align: justify;
					font-size: 0;
					margin-right: 20rpx;

					&::after {
						content: "";
						display: inline-block;
						width: 100%;
					}
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
	
		.placePicker{
			width: 100%;
			.title{
				text-align: center;
				line-height: 100rpx;
				position: relative;
				view{
					font-size: 30rpx;
					font-family: Source Han Serif CN;
					font-weight: 500;
					color: #B8AC76;
				}
				image{
					position: absolute;
					width: 44rpx;
					height: 44rpx;
					top: 25rpx;
					right: 25rpx;
				}
			}
			.placeContent{
				padding: 13rpx 25rpx;
				height: 800rpx;
				overflow-y: scroll;
				.placeRow{
					background: #2B2A28;
					border-radius: 10rpx;
					margin-top: 12rpx;
					padding: 18rpx;
					.row_title{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #7B703E;
					}
					.tablet_list{
						display: grid;
						grid-template-columns: repeat(5, 1fr); /* 重复五次，每个列的宽度平分 */
						grid-gap: 20rpx; /* 列之间的间距 */
						.tablet_item{
							text-align: center;
							margin-top: 20rpx;
							border: 1px solid #2B2A28;
								border-radius: 10rpx;
							&.active{
								border: 1px solid #BCAA72;
								border-radius: 10rpx;
							}
							image{
								width: 114rpx;
								height: 114rpx;
							}
							.tablet_name{
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #B8AC76;
							}
						}
					}
				}
			}
			
		}
	}
</style>
