<script>
	import {
		init
	} from "@/shopro";
	export default {
		onLaunch(options) {
			return;
			// 商场初始化，心田寺id: 47, 暂不需要
			init(options);
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
	@import 'static/style/index.scss';
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	// ::v-deep .u-select__body__picker-view__item{
	// 	color: #B5A46E !important;
	// }
	// ::v-deep .uni-picker-view-mask{
	// 	background: none !important;
	// }
	// ::v-deep .u-select__body{
	// 	background: #262626 !important;
	// }
	// ::v-deep .u-drawer-bottom{
	// 	background: #262626 !important;
	// }
</style>
