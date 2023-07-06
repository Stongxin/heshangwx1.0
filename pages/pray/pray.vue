<template>
	<view class="pray">
		<view class="cover">
			<image src="/static/suixi.png" mode="widthFix"></image>
		</view>
		<view class="content">
			<merit v-if="urlOptions.column_type == 'merit'"></merit>
			<toBlessing v-else-if="urlOptions.column_type == 'to' || urlOptions.column_type == 'blessing'"></toBlessing>
			<at v-else-if="urlOptions.column_type == 'at'"></at>
			<taisui v-else-if="urlOptions.column_type == 'taisui'"></taisui>
			<view class="list">
				<view class="title">
					功德榜
				</view>
				<view class="items">
					<maoScroll :data="dataList" :showNum="9" :lineHeight="56" :animationScroll="800" :animation="2000">
					</maoScroll>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import maoScroll from '@/components/mao-scroll/mao-scroll.vue';
	import calendar from '@/components/calendar-boke/calendar.vue';
	import taisui from './components/taisui/taisui.vue';
	import at from './components/at/at.vue';
	import toBlessing from './components/to_blessing/to_blessing.vue';
	import merit from './components/merit/merit.vue';
	export default {
		components:{
			maoScroll,
			calendar,
			taisui,
			at,
			toBlessing,
			merit
		},
		data() {
			return {
				bullyForm: {
					area: '大殿普佛',// 地点
					names: [{name: ''}], // 祈福姓名
					dateArr: [{start: '',end: ''}],
					lunarDate: [{start: '',end: ''}],
				},
				dataList: [], // 功德榜
				dateIndex: '',
				dateKey: '',
				dataType: '',
				urlOptions: {},
				page: 1,
			};
		},
		onLoad(options) {
			this.urlOptions = JSON.parse(options.column)
			console.log(JSON.parse(options.column),123);
			this.getMeritList()
		},
		computed: {
			fn(){
				let val = ''
				switch(this.urlOptions.column_type){
					case 'to':	
					case 'blessing':
						val = 'water'
						break;
					case 'taisui':
						val = 'ts'
						break;
					case 'at':
						val = 'at'
						break;
					case 'merit':
						val = 'gd'
						break;
				}
				return val
			}
		},
		methods: {
			getMeritList(){
				this.$request({
					url: 'buddhist/meritList',
					method: 'GET',
					data: {
						temple_id: this.urlOptions.id,
						page: this.page,
						size: 20,
						fn: this.fn,
						type: this.fn == 'water' ? this.urlOptions.column_type : ''
					}
				}).then(res=>{
					this.dataList = res
				})
			},
			createData(){
				for(let i = 1; i <= 20; i++){
					this.dataList.push({
						author: 'MaoUI',
						subject: 'OnePlus手机 * ' + i + '部'
					})
				}
			},
			// 添加祈福姓名
			addName(){
				this.bullyForm.names.push({
					name: ''
				})
			},
			// 删除祈福姓名
			delName(index){
				this.bullyForm.names.splice(index, 1)
			},
			confirmCalendar(value){
				console.log(value);
				this.bullyForm.lunarDate[this.dateIndex][this.dateKey] = value.lunarDate
				this.bullyForm.dateArr[this.dateIndex][this.dateKey] = value.dateGL
			},
			openCalendar(type,key,index){
				this.$refs.calendar1.switchBtn(type)
				this.$refs.calendar1.isShowDateMask = true
				this.dataType = type
				this.dateIndex = index
				this.dateKey = key
			},
			// 添加农历 日期
			addDate(value){
				this.bullyForm.lunarDate.push({
					start: '',
					end: ''
				})
				this.bullyForm.dateArr.push({
					start: '',
					end: ''
				})
				
			},
			// 删除农历日期
			delDate(index){
				this.bullyForm.lunarDate.splice(index, 1)
				this.bullyForm.dateArr.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pray{
		min-height: 100vh;
		background: #2E2D2B;
		.cover{
			image{
				width: 100%;
			}
		}
		.content{
			padding: 0 50rpx;
			
			.bully{
				margin-top: 40rpx;
				.form_item{
					.title{
						&.flex_inline{
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
						// display: inline-block;
						>text{
							font-size: 30rpx;
							font-family: Source Han Serif CN;
							font-weight: 400;
							color: #D6CFBC;
							line-height: 34px;
						}
						.btns{
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
					.value{
						display: flex;
						justify-content: flex-end;
						align-items: center;
						flex: 1;
						.value_text{
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #BEAD7A;
							flex: 1;
							text-align: right;
							display: inline-block;
							height: 80rpx;
						}
						.right{
							width: 44rpx;
							height: 44rpx;
						}
					}
					.names{
						
						.item{
							display: flex;
							justify-content: space-between;
							align-items: center;
							height: 70rpx;
							margin-top: 10rpx;
							border-bottom: solid 1px #363636;
							input{
								height: 70rpx;
								flex: 1;
								text-align: center;
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #BCAA72;
							}
							.uni-input-placeholder{
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #AAA390;
							}
							.text_center{
								text-align: center !important;
							}
							.btn{
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
							.to{
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #D6CFBC;
							}
						}
					}
				}
				.flex_inline{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 80rpx;
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
				}
			}
			
			.list{
				height: 650rpx;
				background: #795A46;
				border-radius: 30rpx;
				padding: 0 25rpx 25rpx;
				margin-top: 30rpx;
				.title{
					height: 114rpx;
					text-align: center;
					line-height: 114rpx;
					font-size: 36rpx;
					font-family: Source Han Serif CN;
					font-weight: bold;
					color: #ECE6E4;
					letter-spacing: 10rpx;
				}
				.items{
					height: 510rpx;
					background: #ECE6E4;
					border: 6rpx solid #DACAB9;
					border-radius: 30rpx;
					.line{
						height: 56rpx;
						line-height: 56rpx;
						display: flex;
						justify-content: space-around;
						align-items: center;
						text{
							display: block;
							width: 25%;
							text-align: center;
							font-size: 26rpx;
							font-family: Source Han Serif CN;
							font-weight: 500;
							color: #2B2522;
						}
					}
				}
			}
		
		}
		
	}
</style>
