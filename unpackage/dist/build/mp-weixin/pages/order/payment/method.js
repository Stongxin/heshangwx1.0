(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/payment/method"],{"00d9":function(e,t,n){},"209c":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}));var r={uRadioGroup:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-radio-group/u-radio-group")]).then(n.bind(null,"ea25"))},uRadio:function(){return n.e("node-modules/uview-ui/components/u-radio/u-radio").then(n.bind(null,"bb30"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.paymentList&&e.paymentList.length),r=n?e.paymentList.includes("wechat"):null,o=n?e.paymentList.includes("alipay"):null,i=n?e.paymentList.includes("iospay")&&"ios"===e.appPlatfrom:null,a=n?e.paymentList.includes("wallet"):null;e._isMounted||(e.e0=function(t){e.payType="wechat"},e.e1=function(t){e.payType="alipay"},e.e2=function(t){e.payType="iospay"},e.e3=function(t){e.payType="wallet"}),e.$mp.data=Object.assign({},{$root:{g0:n,g1:r,g2:o,g3:i,g4:a}})},i=[]},4146:function(e,t,n){"use strict";n.r(t);var r=n("209c"),o=n("9e40");for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("f7f6");var a=n("828b"),u=Object(a["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);t["default"]=u.exports},"9e40":function(e,t,n){"use strict";n.r(t);var r=n("cb34"),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},ba8f:function(e,t,n){"use strict";(function(e,t){var r=n("47a9");n("7ea0");r(n("3240"));var o=r(n("4146"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},cb34:function(e,t,n){"use strict";(function(e){var r=n("47a9");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,i=r(n("7ca3")),a=r(n("3c53")),u=n("8f59");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,i.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d={components:{},data:function(){return{payType:"",isCountDown:!0,orderDetail:{},timeText:"",platform:this.$platform.get(),appPlatfrom:"",orderType:""}},computed:l(l({},(0,u.mapGetters)(["initPayment","initRecharge"])),{},{paymentList:function(){var e,t,n=this,r=[];switch(this.orderType){case"goods":r=this.initPayment;break;case"recharge":r=(null===(e=this.initPayment)||void 0===e?void 0:e.length)&&this.initPayment.filter((function(e){if(n.initRecharge.methods.includes(e))return e}));break;default:r=this.initPayment;break}return this.payType=null===(t=r)||void 0===t?void 0:t[0],r}}),onShow:function(){this.orderDetail.id&&this.countDown()},onLoad:function(){this.orderType=this.$Route.query.orderType,"wxOfficialAccount"===this.$platform.get()&&"ios"===this.$platform.device()&&this.$platform.entry()!==location.href&&location.reload(),this.getOrderDetail()},onHide:function(){clearInterval(o),o=null},methods:{getOrderDetail:function(){switch(this.$Route.query.orderType){case"goods":this.getGoodsOrderDetail();break;case"recharge":this.getRechargeOrderDetail();break;default:this.getGoodsOrderDetail();break}},countDown:function(){var e=this,t=parseInt(1e3*e.orderDetail.ext_arr.expired_time)-parseInt((new Date).getTime());t/=1e3,o=setInterval((function(){if(t>0){var n=e.$tools.format(t);e.timeText="支付剩余时间 ".concat(n.m,":").concat(n.s),t--}else clearInterval(o),e.timeText="订单已过期!"}),1e3)},confirmPay:function(){var t=this;t.payType?"wallet"===t.payType?e.showModal({title:"支付提示",confirmColor:"#f0c785",content:"是否确认使用余额支付:".concat(t.orderDetail.total_fee||"0.00","元?"),success:function(e){e.confirm&&new a.default(t.payType,t.orderDetail,t.$Route.query.orderType)}}):new a.default(t.payType,t.orderDetail,t.$Route.query.orderType):this.$u.toast("请选择支付方式")},getGoodsOrderDetail:function(){var e=this;e.$http("order.detail",{id:e.$Route.query.orderId}).then((function(t){1===t.code&&(e.orderDetail=t.data,null!==t.data.ext_arr?e.countDown():e.isCountDown=!1)}))},getRechargeOrderDetail:function(){var e=this;e.$http("money.rechargeDetail",{id:e.$Route.query.orderId}).then((function(t){1===t.code&&(e.orderDetail=t.data,null!==t.data.ext_arr?e.countDown():e.isCountDown=!1)}))}}};t.default=d}).call(this,n("df3c")["default"])},f7f6:function(e,t,n){"use strict";var r=n("00d9"),o=n.n(r);o.a}},[["ba8f","common/runtime","common/vendor"]]]);