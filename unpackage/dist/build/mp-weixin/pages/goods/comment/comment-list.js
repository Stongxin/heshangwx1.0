(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/comment/comment-list"],{"5ac2":function(t,e,n){},"88a6":function(t,e,n){"use strict";n.r(e);var o=n("dbe6"),a=n("c74e");for(var u in a)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("8a01");var c=n("828b"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=r.exports},"8a01":function(t,e,n){"use strict";var o=n("5ac2"),a=n.n(o);a.a},"994c":function(t,e,n){"use strict";var o=n("47a9");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("af34")),u={components:{shComment:function(){n.e("pages/goods/components/sh-comment").then(function(){return resolve(n("0a36"))}.bind(null,n)).catch(n.oe)}},data:function(){return{isEmpty:!1,typeCurrent:"all",commentList:[],commentTypeList:[],loadStatus:"loadmore",currentPage:1,lastPage:1}},computed:{},onLoad:function(){this.getCommentType()},methods:{selType:function(t){this.typeCurrent!==t&&(this.typeCurrent=t,this.commentList=[],this.currentPage=1,this.getCommentList())},getCommentType:function(){var t=this;t.$http("goods.commentType",{goods_id:t.$Route.query.goodsId}).then((function(e){1===e.code&&(t.commentTypeList=e.data,t.getCommentList())}))},getCommentList:function(){var t=this;t.loadStatus="loading",t.$http("goods.commentList",{goods_id:t.$Route.query.goodsId,pre_page:10,page:t.currentPage,type:t.typeCurrent},"加载中...").then((function(e){1===e.code&&(t.commentList=[].concat((0,a.default)(t.commentList),(0,a.default)(e.data.data)),t.isEmpty=!t.commentList.length,t.lastPage=e.data.last_page,t.loadStatus=t.currentPage<e.data.last_page?"loadmore":"nomore")}))},loadMore:function(){this.currentPage<this.lastPage&&(this.currentPage+=1,this.getCommentList())}}};e.default=u},bc98:function(t,e,n){"use strict";(function(t,e){var o=n("47a9");n("7ea0");o(n("3240"));var a=o(n("88a6"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},c74e:function(t,e,n){"use strict";n.r(e);var o=n("994c"),a=n.n(o);for(var u in o)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=a.a},dbe6:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}));var o={shoproEmpty:function(){return n.e("components/shopro-empty/shopro-empty").then(n.bind(null,"2400"))},uLoadmore:function(){return n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"417c"))}},a=function(){var t=this.$createElement,e=(this._self._c,this.commentList.length);this.$mp.data=Object.assign({},{$root:{g0:e}})},u=[]}},[["bc98","common/runtime","common/vendor"]]]);