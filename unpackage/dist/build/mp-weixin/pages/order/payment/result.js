(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/payment/result"],{"59e5":function(e,t,r){"use strict";var a=r("47a9");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(r("7eb4")),i=a(r("ee10")),o=a(r("7ca3")),s=a(r("3c53")),u=r("8f59");function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){(0,o.default)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p=null,l={components:{},data:function(){return{showModal:!1,messageType:"",templateIds:[],wxOpenTags:"",orderDetail:{},orderType:"",payText:{fail:"支付失败",success:"支付成功",paying:"查询中..."},payImg:{fail:this.$IMG_URL+"/imgs/order/order_pay_fail.gif",success:this.$IMG_URL+"/imgs/order/order_pay_success.gif",paying:this.$IMG_URL+"/imgs/order/order_paying.gif"},payState:""}},computed:d({},(0,u.mapGetters)(["subscribeMessageIdsMap"])),onLoad:function(){switch(this.payState=this.$Route.query.payState?this.$Route.query.payState:"paying",this.orderType=this.$Route.query.orderType,this.$Route.query.orderId&&this.getOrderDetail(),this.payState){case"success":this.getCartList();break;case"fail":break;case"paying":this.checkTimer();break;default:break}},onHide:function(){clearInterval(p),p=null},methods:d(d({},(0,u.mapActions)(["getCartList"])),{},{onConfirm:function(){this.templateIds.length&&this.$store.commit("subscribeMessage",this.messageType)},getOrderDetail:function(){switch(this.$Route.query.orderType){case"goods":this.getGoodsOrderDetail();break;case"recharge":this.getRechargeOrderDetail();break;default:break}},getGoodsOrderDetail:function(){var e=this,t=this;t.$http("order.detail",{id:t.$Route.query.orderId}).then(function(){var r=(0,i.default)(n.default.mark((function r(a){return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:1===a.code&&(t.orderDetail=a.data,a.data.status>0&&(e.messageType="groupon"==e.orderDetail.activity_type?"grouponResult":"result",e.templateIds=e.subscribeMessageIdsMap[e.messageType]));case 1:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())},getRechargeOrderDetail:function(){var e=this,t=this;t.$http("money.rechargeDetail",{id:t.$Route.query.orderId}).then((function(r){1===r.code&&(t.orderDetail=r.data,r.data.status>0&&(e.messageType="result"))}))},checkTimer:function(){var e=this,t=0;e.payState="paying",p=setInterval((function(){t++,t<5?e.checkPay():(clearInterval(p),e.payState="fail")}),800)},checkPay:function(){var e=this;return(0,i.default)(n.default.mark((function t(){var r,a,i;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e,a={goods:"order.detail",recharge:"money.rechargeDetail"},t.next=4,r.$http(a[r.orderType],{id:r.$Route.query.orderId},!1);case 4:i=t.sent,1===i.code&&i.data.status>0&&(r.payState="success",clearInterval(p));case 6:case"end":return t.stop()}}),t)})))()},onPay:function(){new s.default(this.$Route.query.type,this.orderDetail,this.orderType)}})};t.default=l},6542:function(e,t,r){"use strict";r.r(t);var a=r("a6be"),n=r("9606");for(var i in n)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(i);r("fc9a");var o=r("828b"),s=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=s.exports},"7a5e":function(e,t,r){},9606:function(e,t,r){"use strict";r.r(t);var a=r("59e5"),n=r.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(i);t["default"]=n.a},a6be:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return n})),r.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){return e.$Router.replace({path:"/pages/activity/groupon/detail",query:{id:e.orderDetail.ext_arr.groupon_id}})},e.e1=function(t){return e.$Router.push("/pages/activity/groupon/my-groupon")},e.e2=function(t){return e.$Router.pushTab("/pages/index/index")},e.e3=function(t){return e.$Router.replace({path:"/pages/order/detail",query:{id:e.orderDetail.id}})},e.e4=function(t){return e.$Router.pushTab("/pages/index/index")},e.e5=function(t){return e.$Router.pushTab("/pages/index/user")})},n=[]},dc6d:function(e,t,r){"use strict";(function(e,t){var a=r("47a9");r("7ea0");a(r("3240"));var n=a(r("6542"));e.__webpack_require_UNI_MP_PLUGIN__=r,t(n.default)}).call(this,r("3223")["default"],r("df3c")["createPage"])},fc9a:function(e,t,r){"use strict";var a=r("7a5e"),n=r.n(a);n.a}},[["dc6d","common/runtime","common/vendor"]]]);