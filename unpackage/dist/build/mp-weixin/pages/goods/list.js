(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/list"],{1751:function(t,e,s){"use strict";(function(t){var a=s("47a9");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(s("7eb4")),i=a(s("af34")),r=a(s("ee10")),n=(s("8f59"),t.getSystemInfoSync(),t.getStorageSync("searchHistoryArr")?JSON.parse(t.getStorageSync("searchHistoryArr")):[]),u={components:{shFilter:function(){s.e("pages/goods/components/sh-filter").then(function(){return resolve(s("d07a"))}.bind(null,s)).catch(s.oe)}},data:function(){return{isEmpty:!1,goodsList:[],searchVal:"",listParams:{category_id:0,keywords:"",page:1},loadStatus:"loadmore",lastPage:1,addTime:100,leftHeight:0,rightHeight:0,leftList:[],rightList:[],tempList:[]}},onReachBottom:function(){this.listParams.page<this.lastPage&&(this.listParams.page+=1,this.getGoodsList())},onLoad:function(){this.$Route.query.id?(this.listParams.category_id=this.$Route.query.id,this.getGoodsList()):this.$Route.query.hasOwnProperty("keywords")?(this.listParams.keywords=this.$Route.query.keywords,this.searchVal=this.$Route.query.keywords,!this.$Route.query.keywords&&this.getGoodsList()):this.getGoodsList()},methods:{splitData:function(){var t=this;return(0,r.default)(o.default.mark((function e(){var s;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.tempList.length){e.next=2;break}return e.abrupt("return");case 2:if(s=t.tempList[0],s){e.next=5;break}return e.abrupt("return");case 5:t.leftHeight<t.rightHeight?(t.leftHeight+=s.activity_discounts_tags.length?350:330,t.leftList.push(s)):t.leftHeight>t.rightHeight?(t.rightHeight+=s.activity_discounts_tags.length?350:330,t.rightList.push(s)):(t.leftHeight+=s.activity_discounts_tags.length?350:330,t.leftList.push(s)),t.tempList.splice(0,1),t.tempList.length&&setTimeout((function(){t.splitData()}),t.addTime);case 8:case"end":return e.stop()}}),e)})))()},clear:function(){this.leftList=[],this.rightList=[],this.leftHeight=0,this.rightHeight=0,this.tempList=[]},onFilter:function(t){this.listParams.order=t,this.goodsList=[],this.listParams.page=1,this.lastPage=1,this.clear(),this.$u.debounce(this.getGoodsList)},onSearch:function(){this.goodsList=[],this.listParams.page=1,this.lastPage=1,this.listParams.keywords=this.searchVal,this.clear(),this.$u.debounce(this.getGoodsList)},getArr:function(t,e){var s=t;return s.length<10?s.unshift(e):s.pop(),s},clearSearch:function(){this.searchVal="",this.clear()},getGoodsList:function(){var e=this,s=this;s.loadStatus="loading",s.$http("goods.lists",s.listParams,"加载中...").then((function(a){if(e.searchVal&&!n.includes(e.searchVal)){var o=JSON.stringify(e.getArr(n,e.searchVal));t.setStorageSync("searchHistoryArr",o)}1===a.code&&(s.goodsList=[].concat((0,i.default)(s.goodsList),(0,i.default)(a.data.data)),s.isEmpty=!s.goodsList.length,s.lastPage=a.data.last_page,s.loadStatus=s.listParams.page<a.data.last_page?"loadmore":"nomore",s.tempList=a.data.data,s.splitData())}))}}};e.default=u}).call(this,s("df3c")["default"])},"1a35":function(t,e,s){"use strict";s.r(e);var a=s("1751"),o=s.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){s.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},2310:function(t,e,s){"use strict";s.r(e);var a=s("4ade"),o=s("1a35");for(var i in o)["default"].indexOf(i)<0&&function(t){s.d(e,t,(function(){return o[t]}))}(i);s("9848");var r=s("828b"),n=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);e["default"]=n.exports},"4ade":function(t,e,s){"use strict";s.d(e,"b",(function(){return o})),s.d(e,"c",(function(){return i})),s.d(e,"a",(function(){return a}));var a={shoproNavbar:function(){return s.e("components/shopro-navbar/shopro-navbar").then(s.bind(null,"9733"))},uSearch:function(){return s.e("node-modules/uview-ui/components/u-search/u-search").then(s.bind(null,"dbf77"))},shoproGoodsCard:function(){return Promise.all([s.e("common/vendor"),s.e("components/shopro-goods-card/shopro-goods-card")]).then(s.bind(null,"0dd2"))},shoproEmpty:function(){return s.e("components/shopro-empty/shopro-empty").then(s.bind(null,"2400"))},uLoadmore:function(){return s.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(s.bind(null,"417c"))},shoproAuthModal:function(){return Promise.all([s.e("common/vendor"),s.e("components/shopro-auth-modal/shopro-auth-modal")]).then(s.bind(null,"326e"))}},o=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e,s){var a=arguments[arguments.length-1].currentTarget.dataset,o=a.eventParams||a["event-params"];s=o.leftGoods;return t.$Router.push({path:"/pages/goods/detail",query:{id:s.id}})},t.e1=function(e,s){var a=arguments[arguments.length-1].currentTarget.dataset,o=a.eventParams||a["event-params"];s=o.rightGoods;return t.$Router.push({path:"/pages/goods/detail",query:{id:s.id}})})},i=[]},5799:function(t,e,s){},"7def":function(t,e,s){"use strict";(function(t,e){var a=s("47a9");s("7ea0");a(s("3240"));var o=a(s("2310"));t.__webpack_require_UNI_MP_PLUGIN__=s,e(o.default)}).call(this,s("3223")["default"],s("df3c")["createPage"])},9848:function(t,e,s){"use strict";var a=s("5799"),o=s.n(a);o.a}},[["7def","common/runtime","common/vendor"]]]);