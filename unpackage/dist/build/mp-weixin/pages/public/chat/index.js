(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/public/chat/index"],{"04b1":function(t,e,n){"use strict";n.r(e);var r=n("7d59"),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},"3b55":function(t,e,n){"use strict";var r=n("9673"),o=n.n(r);o.a},"7d59":function(t,e,n){"use strict";var r=n("47a9");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("7ca3")),i=n("8f59");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var a={components:{Chat:function(){Promise.all([n.e("common/vendor"),n.e("pages/public/chat/shopro/index")]).then(function(){return resolve(n("c689"))}.bind(null,n)).catch(n.oe)},Wm:function(){Promise.all([n.e("common/vendor"),n.e("pages/public/chat/wm/index")]).then(function(){return resolve(n("150d"))}.bind(null,n)).catch(n.oe)}},data:function(){return{isShoproChat:!1,kefuOptions:null,showChat:!1}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){(0,o.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},(0,i.mapGetters)(["initAddons","initChat"])),onLoad:function(t){this.kefuOptions=t,this.initChat&&"shopro"===this.initChat.type?this.isShoproChat=!0:this.initAddons.length&&this.initAddons.includes("kefu")&&(this.isShoproChat=!1),this.showChat=!0},methods:{}};e.default=a},8980:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var r=function(){var t=this.$createElement;this._self._c},o=[]},9673:function(t,e,n){},add8:function(t,e,n){"use strict";n.r(e);var r=n("8980"),o=n("04b1");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("3b55");var c=n("828b"),a=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],void 0);e["default"]=a.exports},ed58:function(t,e,n){"use strict";(function(t,e){var r=n("47a9");n("7ea0");r(n("3240"));var o=r(n("add8"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])}},[["ed58","common/runtime","common/vendor"]]]);