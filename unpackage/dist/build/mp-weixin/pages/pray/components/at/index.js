(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pray/components/at/index"],{"0938":function(t,e,n){"use strict";n.r(e);var i=n("effd"),c=n("4495");for(var a in c)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return c[t]}))}(a);n("c51f");var u=n("828b"),o=Object(u["a"])(c["default"],i["b"],i["c"],!1,null,"50cda670",null,!1,i["a"],void 0);e["default"]=o.exports},4495:function(t,e,n){"use strict";n.r(e);var i=n("e3de"),c=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=c.a},"7d90":function(t,e,n){},c51f:function(t,e,n){"use strict";var i=n("7d90"),c=n.n(i);c.a},d3c7:function(t,e,n){"use strict";(function(t,e){var i=n("47a9");n("7ea0");i(n("3240"));var c=i(n("0938"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(c.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},e3de:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{coverImage:"",urlOptions:{},detail:{},temple_id:t.getStorageSync("temple_id")}},onLoad:function(t){this.urlOptions={id:t.column_id,column_type:t.column_type,buddhist_id:t.buddhist_id},this.getList()},methods:{getList:function(){var t=this;this.$request({url:"buddhist/atList/".concat(this.temple_id),method:"GET"}).then((function(e){t.detail=e,t.coverImage=e.image}))}}};e.default=n}).call(this,n("df3c")["default"])},effd:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement,e=(this._self._c,this.coverImage?this.$common.disposeSrc(this.coverImage):null);this.$mp.data=Object.assign({},{$root:{g0:e}})},c=[]}},[["d3c7","common/runtime","common/vendor"]]]);