(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/app/commission/order"],{"3ca6":function(t,e,n){"use strict";(function(t,e){var a=n("47a9");n("7ea0");a(n("3240"));var r=a(n("7fb5"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(r.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},"6acf":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={shoproNavbar:function(){return n.e("components/shopro-navbar/shopro-navbar").then(n.bind(null,"9733"))},shoproEmpty:function(){return n.e("components/shopro-empty/shopro-empty").then(n.bind(null,"2400"))},uLoadmore:function(){return n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"417c"))},uCalendar:function(){return n.e("node-modules/uview-ui/components/u-calendar/u-calendar").then(n.bind(null,"c182"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.orderList,(function(e,n){var a=t.__get_orig(e),r=t.$u.timeFormat(e.order.createtime," yyyy.mm.dd hh:MM ");return{$orig:a,g0:r}}))),a=t.orderList.length;t._isMounted||(t.e0=function(e){t.showCalendar=!0}),t.$mp.data=Object.assign({},{$root:{a0:{},l0:n,g1:a}})},o=[]},7695:function(t,e,n){"use strict";var a=n("ef97"),r=n.n(a);r.a},"7fb5":function(t,e,n){"use strict";n.r(e);var a=n("6acf"),r=n("c8ec");for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("7695");var c=n("828b"),s=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);e["default"]=s.exports},c8ec:function(t,e,n){"use strict";n.r(e);var a=n("cc35"),r=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},cc35:function(t,e,n){"use strict";(function(t){var a=n("47a9");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("af34")),o=a(n("7ca3")),c=n("8f59");function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}var u={components:{},data:function(){return{backTextStyle:{color:"#fff",fontSize:"40rpx",fontWeight:"500"},stateCurrent:"all",stateMap:{all:"全部",yes:"已计入",back:"已退回",cancel:"已取消"},statusList:[{name:"全部",value:"all"},{name:"已计入",value:"yes"},{name:"已退回",value:"back"},{name:"已取消",value:"cancel"}],orderList:[],loadStatus:"loadmore",currentPage:1,lastPage:1,isEmpty:!1,showCalendar:!1,selDateText:"",propsDate:"",amount:""}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){(0,o.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},(0,c.mapGetters)(["userInfo","agentInfo"])),onLoad:function(){this.getToday(),this.getOrderList()},onPullDownRefresh:function(){this.orderList=[],this.currentPage=1,this.lastPage=1,this.getOrderList()},methods:{jump:function(t,e){this.$Router.push({path:t,query:e})},getToday:function(){var t=new Date;this.selDateText="".concat(t.getFullYear(),".").concat(t.getMonth()+1,".").concat(t.getDate());var e="".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate());this.propsDate="".concat(e,"-").concat(e)},selDate:function(t){this.orderList=[],this.currentPage=1,this.lastPage=1,this.selDateText="".concat(t.startYear,".").concat(t.startMonth,".").concat(t.startDay,"-").concat(t.endYear,".").concat(t.endMonth,".").concat(t.endDay);var e="".concat(t.startYear,"/").concat(t.startMonth,"/").concat(t.startDay,"-").concat(t.endYear,"/").concat(t.endMonth,"/").concat(t.endDay);this.propsDate=e,this.getOrderList(),this.$refs.uCalendar.init()},onTab:function(t){this.stateCurrent!==t&&(this.orderList=[],this.currentPage=1,this.lastPage=1,this.stateCurrent=t,this.getOrderList())},getOrderList:function(){var e=this;e.loadStatus="loading",e.$http("commission.orderLog",{date:e.propsDate,type:e.stateCurrent,page:e.currentPage}).then((function(n){t.stopPullDownRefresh(),1===n.code&&(e.orderList=[].concat((0,r.default)(e.orderList),(0,r.default)(n.data.orders.data)),e.amount=n.data.amount,e.lastPage=n.data.orders.last_page,e.isEmpty=!e.orderList.length,e.loadStatus=e.currentPage<n.data.orders.last_page?"loadmore":"nomore")}))},loadMore:function(){this.currentPage<this.lastPage&&(this.currentPage+=1,this.getOrderList())}}};e.default=u}).call(this,n("df3c")["default"])},ef97:function(t,e,n){}},[["3ca6","common/runtime","common/vendor"]]]);