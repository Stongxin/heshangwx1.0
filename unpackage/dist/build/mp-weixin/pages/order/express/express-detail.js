(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/express/express-detail"],{"309c":function(e,t,n){"use strict";(function(e,t){var a=n("47a9");n("7ea0");a(n("3240"));var o=a(n("ac7b"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},"4ba1":function(e,t,n){},"64fd":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,n=(e._self._c,e.goodsList.length||0),a=e.exrpessLog.length,o=e.__map(e.exrpessLog,(function(t,n){var o=e.__get_orig(t),r=a?t.changedate.split(" "):null,s=a?t.changedate.split(" "):null;return{$orig:o,g2:r,g3:s}})),r=e.exrpessLog.length;e.$mp.data=Object.assign({},{$root:{g0:n,g1:a,l0:o,g4:r}})},o=[]},ac7b:function(e,t,n){"use strict";n.r(t);var a=n("64fd"),o=n("c0c6");for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("cbec");var s=n("828b"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=c.exports},c0c6:function(e,t,n){"use strict";n.r(t);var a=n("e59e"),o=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=o.a},cbec:function(e,t,n){"use strict";var a=n("4ba1"),o=n.n(a);o.a},e59e:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{expressDetail:{},exrpessLog:[],firstGoods:{},goodsList:[]}},computed:{},onLoad:function(){this.getExpressDetail()},methods:{copyCode:function(t){var n=this;e.setClipboardData({data:t,success:function(){n.$u.toast("已复制到剪切板")}})},getExpressDetail:function(){var e=this;e.$http("order.expressDetail",{id:e.$Route.query.expressId,order_id:e.$Route.query.orderId}).then((function(t){1===t.code&&(e.expressDetail=t.data,e.goodsList=t.data.item,e.exrpessLog=t.data.log,e.firstGoods=t.data.item[0])}))}}};t.default=n}).call(this,n("df3c")["default"])}},[["309c","common/runtime","common/vendor"]]]);