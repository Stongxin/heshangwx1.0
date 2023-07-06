<template>
	<view class="mask" v-if="isShowDateMask" @click.stop="isShowDateMask = false">
		
		<view class="calendar"  @tap.stop>
			<view class="content" @tap.stop>
				<view class="title">
					<view class="left" @click="isShowDateMask = false">取消</view>
					<view class="sure" @click="confirmFun">确定</view>
				</view>
				<picker-view :indicator-style="indicatorStyle" :value="selectValue" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
				<!-- <view class="bottom" v-if="isSwitch">
					<view class="switch">
						<view class="left" :class="{active:isActive}" @click="switchBtn('solar')">公历</view>
						<view class="right" :class="{active:!isActive}" @click="switchBtn('lunar')">农历</view>
						<view class="bg" :class="type"></view>
					</view>
				</view> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	import conversion from "./calendar.js"
	export default {
		name:"calendar",
		data() {
			return {
				isShowDateMask: false, //是否显示模板
				oldYear: 1900, //从哪一年开始 最小是1900年
				years:[], //年
				months:[], //月
				days:[], //日
				isActive:true,//true公历
				selectValue: [],//默认 2000-01-01
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				data: {}, //数据
				type:"solar", //lunar农历，solar公历
				isSwitch: true,
				showData:"",//显示数据
			};
		},
		props:{
		},
		components:{
		},
		created() {
			this.getTime();
		},
		mounted(){
			this.selectValue = [100, 0, 0]
			let val = this.selectValue
			let year = val[0]+this.oldYear
			let month = val[1] + 1
			let day = val[2] + 1
			if(this.isActive){
				this.setDateGL(year,month,day)
			}else{
				this.setDateYL(year,month,day)
			}
		},
		methods:{
			getTime(){  //初始化时间
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				
				this.years = []
				this.months = []
				this.days = []
				
				
				if(this.isActive){ //公历
					for (let i = this.oldYear; i <= date.getFullYear(); i++) { // 年
						this.years.push(i);
					}
					for (let i = 1; i <= 12; i++) {  //月
						this.months.push(i + '月');
					}
					for (let i = 1; i <= conversion.solarDays(year,month); i++) { //日
						this.days.push(i + '日');
					}
				
				}else{ //阴历
					for (let i = this.oldYear; i <= date.getFullYear(); i++) { // 年
						this.years.push(conversion.toChinaYear(i));
					}
					
					let leap_month = conversion.leapMonth(year);
					//返回农历 闰月没有就返回0
					for (let i = 1; i <= 12; i++) {
						this.months.push(conversion.toChinaMonth(i));
						if(i == leap_month){
							this.months.push("闰"+conversion.toChinaMonth(i));
						}
					}
					
					// 农历返回天数
					// **leapMonth 返回闰月 conversion.leapMonth(year)
					// **monthDays 返回非闰月的天数
					// **leapDays 返回闰月的天数
					if(conversion.leapMonth(year) != 0 && (conversion.leapMonth(year) == month || (month - 1) == conversion.leapMonth(year))){
						for (let i = 1; i <= conversion.leapDays(year,conversion.leapMonth(year)); i++) {
							this.days.push(conversion.toChinaDay(i));
						}
					}else{
						let lunarMonth = '';
						if(conversion.leapMonth(year)){
							lunarMonth = month  < conversion.leapMonth(year) ? month : (month - 1);
						}else{
							lunarMonth = month;
						}
						for (let i = 1; i <= conversion.monthDays(year,lunarMonth); i++) {
							this.days.push(conversion.toChinaDay(i));
						}
					}
				}
			},
			bindChange: function (e) {
				let val = e.detail.value;
				let year = val[0]+this.oldYear
				let month = val[1] + 1
				let day = val[2] + 1
				this.selectValue = val
				if(this.isActive){
					this.setDateGL(year,month,day)
				}else{
					this.setDateYL(year,month,day)
				}
		
			},
			setDateGL(year,month,day){ //设置公历数据
				let dt = conversion.solar2lunar(year,month,day)
				// console.log(dt);
				let data ={
					year: dt.cYear,
					month: dt.cMonth,
					day: dt.cDay,
					dateGL: dt.date,
					dateYL: `${dt.gzYear}年${dt.IMonthCn}${dt.IDayCn}`,
					Animal: dt.Animal,
					astro: dt.astro,
					ncWeek: dt.ncWeek,
					gzYear: dt.gzYear,
					gzMonth: dt.gzMonth,
					gzDay: dt.gzDay,
					IMonthCn: dt.IMonthCn,
					IDayCn: dt.IDayCn,
					festival: dt.festival,
					lunarDate: dt.lunarDate,
					type: '阳历'
				}
				this.data = data
			},
			setDateYL(year,month,day){ //设置阴历数据
				let dt = conversion.lunar2solar(year,month,day)
				// console.log(dt);
				let data ={
					year: dt.cYear,
					month: dt.cMonth,
					day: dt.cDay,
					dateGL: dt.date,
					dateYL: `${dt.gzYear}年${dt.IMonthCn}${dt.IDayCn}`,
					Animal: dt.Animal,
					astro: dt.astro,
					ncWeek: dt.ncWeek,
					gzYear: dt.gzYear,
					gzMonth: dt.gzMonth,
					gzDay: dt.gzDay,
					IMonthCn: dt.IMonthCn,
					IDayCn: dt.IDayCn,
					festival: dt.festival,
					lunarDate: dt.lunarDate,
					type: '阴历'
				}
				this.data = data
				// console.log(this.data);
			},
			confirmFun(){	// 确定
				let data = this.data
				this.$emit("confirm",data);
				this.isShowDateMask = false
			},
			
			switchBtn(type){ //切换
				this.isActive = type == 'solar' ? true : false;
				this.type = type;
				let val = this.selectValue
				let year = val[0]+this.oldYear
				let month = val[1] + 1
				let day = val[2] + 1
				if(this.isActive){
					this.setDateGL(year,month,day)
				}else{
					this.setDateYL(year,month,day)
				}
				this.getTime();
			}
		}
	}
</script>

<style lang="scss">
.mask{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 750rpx;
	box-sizing: border-box;
	background: rgba(0,0,0,0.3);
}
.u-mask-zoom{
	transform: scale(1, 1);
}
.calendar{
		display: flex;
		align-items: flex-end;
		justify-content: center;
		height: 100%;
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		// height: 100%;
		background-color: #262626;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		.title{
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 86rpx;
			border-bottom: 2rpx solid #E6E6E6;
			width: 100%;
			justify-content: space-between;
			// border: 1rpx solid red;
			background-color: #262626;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
			/* #ifdef MP-WEIXIN */ 
			margin-top:0;
			/* #endif */
			.left{
				color:#AAA390;
				font-size: 30rpx;
				padding-left: 30rpx;
			}
			.sure{
				color: #BCAA72;
				font-size: 30rpx;
				padding-right: 30rpx;
			}
		}
		picker-view {
		    width: 100%;
		    height: 650rpx;
		    margin-top:20rpx;
			/deep/.item{
						display: flex;
						align-items: center;
						justify-content: center;
						color: #BCAA72;
						font-size: 32rpx;
						font-weight: bold;
					}
			.uni-picker-view-wrapper{
				uni-picker-view-column{
					display: flex;
					align-items: center;
					justify-content: center;
					color: #BCAA72;
					font-size: 32rpx;
					font-weight: bold;
					.uni-picker-view-group{
						.uni-picker-view-content{
							text-align: center;
							line-height: 110rpx;
							.item{
								display: flex;
								align-items: center;
								justify-content: center;
								color: #BCAA72;
								font-size: 30rpx;
								font-weight: bold;
							}
						}
					}
				}
			}
			/deep/.uni-picker-view-indicator{
				// text-align: center;
				// line-height: 110rpx;
			}
		}
		.bottom{
			height: 110rpx;
			width: calc(100% - 31rpx);
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: 31rpx;
			background-color: #FFFFFF;
			.switch{
				background-color: #E6E6E6;
				width: 180rpx;
				height: 70rpx;
				display: flex;
				flex-direction: row;
				border-radius: 35rpx;
				justify-content: space-around;
				align-items: center;
				position: relative;
				.left{
					position: absolute;
					z-index: 1;
					left: 25%;
					font-size: 28rpx;
					transform: translateX(-50%);
				}
				.right{
					color: #333333;
					font-size: 28rpx;
					position: absolute;
					right: 0;
					transform: translateX(-25%);
					color: #333333;
					z-index: 1;
				}
				.bg{
					background-color: #EB344A;
					color: #333333;
					height: 70rpx;
					border-radius: 40rpx;
					width: 90rpx;
					position: absolute;
					// right: 0;
					top:0;
					z-index: 0;

				}
				.active{
					color: #FFFFFF;
				}
				.lunar{
					left: 90rpx;
					animation: switchsolar 500ms;
				}
				@keyframes switchsolar {
					    0%   {left: 0;}
					    100%  {left: 90rpx;}
				}
				.solar{
					left: 0;
					animation: switchlunar 500ms;
				}
				@keyframes switchlunar {
					    0%   {left: 90rpx;}
					    100%  {left: 0;}
				}
			}
		}
	}
}
</style>
