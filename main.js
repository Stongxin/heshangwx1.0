import App from './App'
import { common, request,alUploadImage, login } from 'utils/common.js'
// import MQTT from 'mqtt'
Vue.prototype.$common = common
Vue.prototype.$request = request
Vue.prototype.$alUploadImage = alUploadImage
Vue.prototype.$login = login
import {
	router,
	RouterMount
} from "@/shopro/router";
import store from "@/shopro/store";
import uView from "uview-ui";
import shopro from "@/shopro";

Vue.use(uView);
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
//引入路由
Vue.use(router);
// 加载shopro
Vue.use(shopro);
app.$mount()
// #endif
Vue.use(uView);
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
