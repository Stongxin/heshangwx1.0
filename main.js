import App from './App'
import { common, request,alUploadImage, login } from 'utils/common.js'
// import MQTT from 'mqtt'
Vue.prototype.$common = common
Vue.prototype.$request = request
Vue.prototype.$alUploadImage = alUploadImage
Vue.prototype.$login = login

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif
import uView from "uview-ui";
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
