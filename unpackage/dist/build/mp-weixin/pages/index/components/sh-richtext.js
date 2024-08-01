(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/components/sh-richtext"],{"20d4":function(t,e,n){"use strict";var i=n("8afe"),u=n.n(i);u.a},2766:function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uParse:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-parse/u-parse")]).then(n.bind(null,"bc80"))}},u=function(){var t=this.$createElement;this._self._c},r=[]},8610:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={components:{},data:function(){return{richText:""}},computed:{},props:{richId:{type:[Number,String],default:0}},created:function(){this.richId&&this.getRichText()},methods:{getRichText:function(){var t=this;this.$http("common.richText",{id:this.richId}).then((function(e){1===e.code&&(t.richText=e.data)}))}}};e.default=i},"8afe":function(t,e,n){},e9db:function(t,e,n){"use strict";n.r(e);var i=n("8610"),u=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=u.a},f50b:function(t,e,n){"use strict";n.r(e);var i=n("2766"),u=n("e9db");for(var r in u)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(r);n("20d4");var c=n("828b"),o=Object(c["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/components/sh-richtext-create-component',
    {
        'pages/index/components/sh-richtext-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("f50b"))
        })
    },
    [['pages/index/components/sh-richtext-create-component']]
]);
