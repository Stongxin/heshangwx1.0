<template>
	<view class="volunteer">
		<view class="word">
			<view class="header_title" v-if="formState.standing == 'lay'">皈依报名表</view>
			<view class="header_title" v-else>义工报名表</view>
			<view class="body">
				<view class="row">
					<view class="col col_50">
						<view class="form_field">填表人姓名</view>
						<view class="form_model">
							<input type="text" v-model="formState.name">
						</view>
					</view>
					<view class="col col_50">
						<view class="form_field">性别</view>
						<view class="form_model" @click="openPicker('sexList')">
							<input type="text" v-model="formTitle.sex_text" disabled>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">出生日期</view>
						<view class="form_model" @click="openCalendar">
							<input type="text" v-model="formState.birthday" disabled>
						</view>
					</view>
					<view class="col col_50">
						<view class="form_field">文化程度</view>
						<view class="form_model" @click="openPicker('cultureLevel')">
							<input type="text" v-model="formTitle.culture_level" disabled>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">健康状态</view>
						<view class="form_model">
							<input type="text" v-model="formState.health">
						</view>
					</view>
					<view class="col col_50">
						<view class="form_field">婚否</view>
						<view class="form_model" @click="openPicker('matrimony')">
							<input type="text" v-model="formTitle.matrimony" disabled>
						</view>
					</view>
					<view class="col col_50">
						<view class="form_field">民族</view>
						<view class="form_model">
							<input type="text" v-model="formState.nation">
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">职业</view>
						<view class="form_model">
							<input class="align_left" type="text" v-model="formState.occupation">
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">身份证号</view>
						<view class="form_model">
							<input class="align_left" maxlength="18" type="text" v-model="formState.id_card">
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">工作单位</view>
						<view class="form_model">
							<input class="align_left" type="text" v-model="formState.work_unit">
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">联系电话</view>
						<view class="form_model">
							<input class="align_left" maxlength="11" type="text" v-model="formState.telephone">
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">微信号</view>
						<view class="form_model">
							<input class="align_left" type="text" v-model="formState.wechat_id">
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">电子邮箱</view>
						<view class="form_model">
							<input class="align_left" type="text" v-model="formState.e_mail">
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">皈依与否</view>
						<view class="form_model" @click="openPicker('gyStatus')">
							<input type="text" v-model="formTitle.gy_status" disabled>
						</view>
					</view>
					<view class="col col_50">
						<view class="form_field">法号</view>
						<view class="form_model">
							<input type="text" v-model="formState.law_name">
						</view>
					</view>
				</view>
				<view class="row2">
					<view class="form_field">特长爱好:</view>
					<view class="form_model">
						<textarea name="" id="" cols="30" rows="10" v-model="formState.hobby"></textarea>
					</view>
				</view>
				<view class="row3">
					<view class="col_title" v-if="formState.standing == 'lay'">您是何时、何地与佛法结缘得?又因何故想报名参与皈依报名?</view>
					<view class="col_title" v-else>您是何时、何地与佛法结缘得?又因何故想报名参与义工报名?</view>
					<view class="col_textarea">
						<textarea name="" id="" cols="30" rows="10" v-model="formState.content"></textarea>
					</view>
				</view>
				<view class="row">
					<view class="col col_50">
						<view class="form_field">填表人姓名</view>
						<view class="form_model">
							<input type="text" v-model="formState.preparer_signature">
						</view>
					</view>
					<view class="col col_50">
						<view class="form_field">推荐人</view>
						<view class="form_model">
							<input type="text" v-model="formState.referrer">
						</view>
					</view>
				</view>
				<view class="row4">
					<view class="form_field">建议与意见</view>
					<view class="form_model">
						<textarea name="" id="" cols="30" rows="10" v-model="formState.idea"></textarea>
					</view>
				</view>
				<view class="row4">
					<view class="form_field">填表须知</view>
					<view class="form_model desc">
						本寺院对填表信息严格保密，联系方式仅为寺院通知之用
					</view>
				</view>

			</view>
		</view>
		<view class="submit">
			<button @click="submit()">
				提交
			</button>
		</view>
		<view class="area"></view>
		<!-- 	<view class="form_item">
			<view class="form_field">所属寺院</view>
			<view class="form_model">
				<input type="text" class="form_input" placeholder="请输入">
			</view>
		</view> -->
		<uni-calendar ref="calendar" :insert="false" :lunar="true" :range="false" @confirm="confirmCalendar" />
		<uni-data-picker ref="namePicker" :localdata="selectData[selectKey]" popup-title="请选择"
			@change="confirmPicker"></uni-data-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				formState: {
					temple_id: uni.getStorageSync('temple_id'), //* 寺院
					name: '', //* 姓名
					sex: '', //* 性别:0=女,1=男
					birthday: '', //* 出生日期2023-09-02
					culture_level: '', //* 文化程度(接口获取)
					health: '', //* 健康状况
					matrimony: '', //* 婚姻状况 - (接口获取)
					occupation: '', //* 职业
					nation: '', //* 民族
					id_card: '', //* 身份证号
					work_unit: '', //* 工作单位
					telephone: '', //* 联系电话
					wechat_id: '', // 微信号
					e_mail: '', // 电子邮箱
					gy_status: '', //* 皈依与否：00：否,01:皈依
					hobby: '', //* 特长爱好
					content: '', //* 您是何时、何地与佛法结缘的？又因何故想报名参与义工报名
					preparer_signature: '', //* 填表人签名
					referrer: '', // 推荐人
					idea: '', // 意见与建议
					law_name: '', // 法号
					standing: '', // 身份区分 volunteer = 义工申请，lay=皈依申请
				},

				formTitle: {
					culture_level: '', // 
					gy_status: '',
					matrimony: '',
					sex_text: '',
				},
				pickerShow: false,
				selectData: {},
				selectKey: 'cultureLevel', // 文化程度 cultureLevel,婚姻状态 matrimony,皈依与否 gyStatus
			}
		},
		onLoad(options) {
			if (options.status) {
				this.formState.standing = options.status
			}
			if (options.id) {
				this.id = options.id
				this.getDetail()
			}

			this.getSelect()
		},
		methods: {
			getDetail() {
				if (uni.getStorageSync('token')) {
					fun()
				} else {
					this.$login().then(() => {
						fun()
					})
				}

				function fun() {
					this.$request({
						url: `signUp/volunteer/${this.id}`,
						version: '/v3/',
						method: 'GET',
						header: {
							token: uni.getStorageSync('token')
						},
					}, true).then(res => {
						Object.keys(this.formState).forEach(key => {
							this.formState[key] = res[key];
						});
						this.formState.temple_id = res.temple.id
						this.formTitle.gy_status = res.gy_status_text
						this.formTitle.matrimony = res.matrimony_text
						this.formTitle.sex_text = res.sex_text
						this.formTitle.culture_level = res.culture_level_text
					})
				}
			},

			submit() {
				if (uni.getStorageSync('token')) {
					this.next()
				} else {
					this.$login().then(() => {
						this.next()
					})
				}
			},
			next() {
				this.$request({
					url: this.id ? `signUp/volunteer/${this.id}` : 'signUp/volunteer',
					version: '/v3/',
					data: this.formState,
					method: this.id ? 'PUT' : 'POST',
					header: {
						token: uni.getStorageSync('token')
					},
				}, true).then(res => {
					uni.showToast({
						title: '提交成功',
						mask: true
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				})
			},
			getSelect() {
				this.$request({
					url: 'signUp/volunteer_select',
					method: 'GET',
					version: '/v3/'
				}).then(res => {
					res.cultureLevel = Object.keys(res.cultureLevel).map(key => ({
						text: res.cultureLevel[key],
						value: key
					}))
					res.gyStatus = Object.keys(res.gyStatus).map(key => ({
						text: res.gyStatus[key],
						value: key
					}))
					res.matrimony = Object.keys(res.matrimony).map(key => ({
						text: res.matrimony[key],
						value: key
					}))
					this.selectData = res
					this.selectData.sexList = [{
							text: '女',
							value: 0
						},
						{
							text: '男',
							value: 1
						}
					]
				})
			},
			openCalendar() {
				this.$refs.calendar.open();
			},
			confirmCalendar(value) {
				this.formState.birthday = value.fulldate
				console.log(value);
			},
			openPicker(e) {
				this.selectKey = e
				this.$refs.namePicker.show()
			},
			confirmPicker(e) {
				if (this.selectKey == 'cultureLevel') {
					this.formState.culture_level = e.detail.value[0].value
					this.formTitle.culture_level = e.detail.value[0].text
				} else if (this.selectKey == 'gyStatus') {
					this.formState.gy_status = e.detail.value[0].value
					this.formTitle.gy_status = e.detail.value[0].text
				} else if (this.selectKey == 'matrimony') {
					this.formState.matrimony = e.detail.value[0].value
					this.formTitle.matrimony = e.detail.value[0].text
				} else if (this.selectKey == 'sexList') {
					this.formState.sex = e.detail.value[0].value
					this.formTitle.sex_text = e.detail.value[0].text
				}
			}
		}
	}
</script>
<style>
	page {
		background: #1E1E1E;
	}
</style>
<style lang="scss" scoped>
	.volunteer {
		padding: 10rpx;

		.word {
			background: #F3F3F3;
			padding: 20rpx;

			.header_title {
				font-size: 44rpx;
				font-family: Source Han Serif CN;
				font-weight: 300;
				color: #9F875A;
				text-align: center;
				margin-top: 20rpx;
			}

			.body {
				width: 100%;
				background: #fff;
				margin-top: 40rpx;
				border: solid 2px #333;
				box-sizing: border-box;

				.row {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					width: 100%;

					.col {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						width: 100%;

						.form_field {
							font-size: 18rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #3D4460;
							height: 60rpx;
							line-height: 56rpx;
							width: 140rpx;
							text-align: center;
							border: solid 1px #333;
							box-sizing: border-box;
						}

						.form_model {
							flex: 1;
							height: 60rpx;

							input {
								width: 100%;
								height: 100%;
								line-height: 100%;
								padding: 0;
								// border-width: 1px;
								text-align: center;
								font-size: 9px;
								box-sizing: border-box;
								border: solid 1px #333;

								&.align_left {
									text-align: left;
									padding: 0 20rpx;
								}

								&:focus {
									outline: none;
								}

							}
						}
					}
				}

				.row2 {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					border: solid 1px #333;

					.form_field {
						font-size: 9px;
						font-family: PingFang SC;
						font-weight: bold;
						color: #3D4460;
						height: 60rpx;
						line-height: 56rpx;
						width: 140rpx;
						text-align: center;
						box-sizing: border-box;
					}

					.form_model {
						flex: 1;

						textarea {
							width: 100%;
							height: 120rpx;
							padding: 0;
							border-width: 0px;
							border-bottom: none;
							font-size: 20rpx;
							box-sizing: border-box;
							resize: none;
							padding: 16rpx 0;

							&:focus {
								outline: none;
							}
						}
					}
				}

				.row3 {

					.col_title {
						padding: 10rpx 20rpx;
						font-size: 18rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #3D4460;
						border: solid 1px #333;
						box-sizing: border-box;
					}

					.col_textarea {
						border: solid 1px #333;
						box-sizing: border-box;

						textarea {
							width: 100%;
							height: 120rpx;
							border-width: 0px;
							border-bottom: none;
							font-size: 20rpx;
							box-sizing: border-box;
							resize: none;
							padding: 16rpx;

							&:focus {
								outline: none;
							}
						}
					}
				}

				.row4 {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border: solid 1px #333;

					.form_field {
						font-size: 9px;
						font-family: PingFang SC;
						font-weight: bold;
						color: #3D4460;
						height: 120rpx;
						width: 140rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						// border: solid 1px #333;
						box-sizing: border-box;
						border-right: solid 2px #333;
					}

					.form_model {
						flex: 1;
						height: 120rpx;

						&.desc {
							padding: 0 40rpx;
							font-size: 24rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						textarea {
							width: 100%;
							height: 100%;
							border-width: 0px;
							border-bottom: none;
							font-size: 20rpx;
							box-sizing: border-box;
							resize: none;
							padding: 16rpx;

							&:focus {
								outline: none;
							}
						}
					}
				}
			}
		}

		.form_item {
			min-height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			margin-top: 40rpx;

			.form_field {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #DCD6C7;
				min-width: 200rpx;
			}

			.form_model {
				flex: 1;

				.form_input {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					border: none;
					background: #252424;
					color: #B7A570;

					&:focus {
						outline: none;
					}

					&::placeholder {
						color: #AAA390;
					}
				}
			}
		}

		.submit {
			width: 100%;
			padding: 20rpx;

			button {
				height: 80rpx;
				background: #BEAD7A;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #3C3C3C;
				letter-spacing: 10rpx;
			}
		}

		.area {
			width: 100%;
			height: env(safe-area-inset-bottom);
			background: #1E1E1E;
		}
	}
</style>