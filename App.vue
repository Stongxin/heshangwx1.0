<script>
	export default {
		onLaunch() {
			console.log('App Launch 寺院主页、祈福佛事、动态详情')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	*{
		margin: 0;
		padding: 0;
	}
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	::v-deep .u-select__body__picker-view__item{
		color: #B5A46E !important;
	}
	::v-deep .uni-picker-view-mask{
		background: none !important;
	}
	::v-deep .u-select__body{
		background: #262626 !important;
	}
	::v-deep .u-drawer-bottom{
		background: #262626 !important;
	}
</style>
