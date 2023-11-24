<template>
	<view class="buddhist">
		<view class="content_body">
			<view class="form">
				<view class="title_indent">皈依信息</view>
				<view class="form_item">
					<view class="form_field">皈依姓名</view>
					<view class="form_model">
						<input type="text" v-model="formState.name" class="form_input" placeholder="请输入">
					</view>
				</view>
				<view class="form_item">
					<view class="form_field">法号</view>
					<view class="form_model">
						<input type="text" v-model="formState.law_name" class="form_input" placeholder="请输入">
					</view>
				</view>
				<view class="form_item flex_col">
					<view class="form_field">皈依证</view>
					<view class="form_model">
						<image v-if="formState.gy_image" class="uploadImg" :src="$common.disposeSrc(formState.gy_image)" alt="" @click="uploadGy">
						<image v-else class="uploadImg" src="/static/upload.png" alt="" @click="uploadGy">
					</view>
				</view>
				<!-- <view class="form_item">
					<view class="form_field">所属寺院</view>
					<view class="form_model">
						<input type="text" class="form_input" placeholder="请输入">
					</view>
				</view> -->
				<view class="title_indent">联系方式</view>
				<view class="form_item">
					<view class="form_field">手机号码</view>
					<view class="form_model">
						<input type="number" v-model="formState.tel" :maxlength="11" class="form_input" placeholder="请输入">
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view @click="submit()">确认提交</view>
		</view>
		<view class="area"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				formState: {
					temple_id: uni.getStorageSync('temple_id'), // 寺院id
					name: '', // 皈依姓名
					law_name: '', // 法号
					gy_image: '', // 皈依证照片
					tel: '', // 联系方式
				}
			};
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id
				this.getDetail()
			}
		},
		methods: {
			getDetail(){
				if(uni.getStorageSync('token')){
					fun()
				}else{
					this.$login().then(()=>{
						fun()
					})
				}
				function fun(){
					this.$request({
						url: `signUp/lay/${this.id}`,
						version: '/v3/',
						method: 'GET',
						header: {
							token: uni.getStorageSync('token')
						},
					},true).then(res=>{
						Object.keys(this.formState).forEach(key => {
							this.formState[key] = res[key];
						});
						this.formState.temple_id = res.temple.id
					})
				}
			},
			skip(url){
				uni.navigateTo({
					url
				})
			},
			uploadGy(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res)=>{
						this.$alUploadImage(res.tempFilePaths[0]).then(res => {
							this.formState.gy_image = res.file
						})
					}
				});
			},
			submit(){
				if(uni.getStorageSync('token')){
					this.next()
				}else{
					this.$login().then(()=>{
						this.next()
					})
				}
			},
			next(){
				this.$request({
					url: this.id ? `signUp/lay/${this.id}` : 'signUp/lay',
					version: '/v3/',
					method: this.id ? 'PUT' : 'POST',
					header: {
						token: uni.getStorageSync('token')
					},
					data: this.formState
				},true).then(res=>{
					uni.showToast({
						title: '提交成功',
						mask: true
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						})
					},1000)
				})
			},
		}
	}
</script>
<style>
	page{
		background: #1E1E1E;
	}
</style>
<style lang="scss" scoped>
.buddhist {
	.content_body{
		.form {
		    padding: 30rpx;
		
		    .title_indent {
		        font-size: 30rpx;
		        font-family: PingFang SC;
		        font-weight: bold;
		        color: #E9E2D0;
		        padding: 20rpx 0;
		    }
		
		    .form_item {
		        min-height: 100rpx;
		        display: flex;
		        justify-content: space-between;
		        align-items: center;
		        border-bottom: solid 1px #363636;
		
		        &.flex_col {
		            flex-direction: column !important;
		            align-items: flex-start;
		
		            .form_model {
		                margin-top: 30rpx;
		            }
		        }
		
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
		                background: #1E1E1E;
		                color: #AAA390;
		
		                &:focus {
		                    outline: none;
		                }
		
		                &::placeholder {
		                    color: #AAA390;
		                }
		            }
		
		            .uploadImg {
		                width: 164rpx;
		                height: 164rpx;
						border-radius: 10rpx;
		            }
		        }
		    }
		}
	}
    .bottom {
        position: fixed;
        bottom: env(safe-area-inset-bottom);
        left: 0;
        width: 100%;
        background: #262626;
        border-top: solid 1px #262626;
        padding: 14rpx 30rpx;
    
        view {
            width: 100%;
            height: 88rpx;
            background: #B7A56E;
            border-radius: 44rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
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
