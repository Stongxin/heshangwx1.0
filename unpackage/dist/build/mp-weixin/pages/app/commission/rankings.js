(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/app/commission/rankings"],{"0e13":function(n,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return e}));var e={shoproNavbar:function(){return a.e("components/shopro-navbar/shopro-navbar").then(a.bind(null,"9733"))},uLoadmore:function(){return a.e("node-modules/uview-ui/components/u-loadmore/u-loadmore").then(a.bind(null,"417c"))}},o=function(){var n=this,t=n.$createElement,a=(n._self._c,n.__map(n.rankingsList,(function(t,a){var e=n.__get_orig(t),o=n.$u.timeFormat(t.createtime,"yyyy年mm月dd日");return{$orig:e,g0:o}}))),e=n.rankingsList.length;n.$mp.data=Object.assign({},{$root:{a0:{},l0:a,g1:e}})},i=[]},"105d":function(n,t,a){"use strict";(function(n,t){var e=a("47a9");a("7ea0");e(a("3240"));var o=e(a("a3f7"));n.__webpack_require_UNI_MP_PLUGIN__=a,t(o.default)}).call(this,a("3223")["default"],a("df3c")["createPage"])},"2adf":function(n,t,a){"use strict";a.r(t);var e=a("a89e"),o=a.n(e);for(var i in e)["default"].indexOf(i)<0&&function(n){a.d(t,n,(function(){return e[n]}))}(i);t["default"]=o.a},"61cb":function(n,t,a){"use strict";var e=a("da6f"),o=a.n(e);o.a},a3f7:function(n,t,a){"use strict";a.r(t);var e=a("0e13"),o=a("2adf");for(var i in o)["default"].indexOf(i)<0&&function(n){a.d(t,n,(function(){return o[n]}))}(i);a("61cb");var r=a("828b"),s=Object(r["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],void 0);t["default"]=s.exports},a89e:function(n,t,a){"use strict";var e=a("47a9");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e(a("af34")),i={components:{},data:function(){return{rankingsIcon:{0:this.$IMG_URL+"/imgs/commission/01.png",1:this.$IMG_URL+"/imgs/commission/02.png",2:this.$IMG_URL+"/imgs/commission/03.png"},rankingsList:[],loadStatus:"loadmore",currentPage:1,lastPage:1}},computed:{},onLoad:function(){this.getRankings()},methods:{getRankings:function(){var n=this;n.loadStatus="loading",n.$http("commission.ranking",{page:n.currentPage}).then((function(t){1===t.code&&(n.rankingsList=[].concat((0,o.default)(n.rankingsList),(0,o.default)(t.data.data)),n.lastPage=t.data.last_page,n.loadStatus=n.currentPage<t.data.last_page?"loadmore":"nomore")}))},loadMore:function(){this.currentPage<this.lastPage&&(this.currentPage+=1,this.getRankings())}}};t.default=i},da6f:function(n,t,a){}},[["105d","common/runtime","common/vendor"]]]);