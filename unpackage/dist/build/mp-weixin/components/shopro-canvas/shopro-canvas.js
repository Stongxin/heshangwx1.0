(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/shopro-canvas/shopro-canvas"],{2842:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){}));var n=function(){var e=this.$createElement;this._self._c},r=[]},"5db9":function(e,t,a){"use strict";a.r(t);var n=a("a579"),r=a.n(n);for(var c in n)["default"].indexOf(c)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(c);t["default"]=r.a},"9c0a":function(e,t,a){},a579:function(e,t,a){"use strict";(function(e){var n=a("47a9");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("7eb4")),c=n(a("ee10")),o=n(a("7ca3")),u=n(a("40ee")),s=a("6979"),i=n(a("50c9")),f=a("8f59");function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(Object(a),!0).forEach((function(t){(0,o.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var v=null,p={components:{},data:function(){return{poster:{},canvasId:"self_canvas"}},props:{canvasParams:{type:Object,default:function(){}},isAutoInit:{type:Boolean,default:!0}},computed:l({},(0,f.mapGetters)(["initShare","userInfo"])),mounted:function(){var t=this;return(0,c.default)(r.default.mark((function a(){return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:v=e.createCanvasContext(t.canvasId,t),v&&t.isAutoInit&&t.shareFc();case 2:case"end":return a.stop()}}),a)})))()},methods:{shareFc:function(){var e=this;return(0,c.default)(r.default.mark((function t(){var a,n,c,o,f;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e,u.default.showLoading("绘制中..."),n={},a.canvasParams.backgroundImage&&(n={backgroundImage:i.default.checkImgHttp(a.canvasParams.backgroundImage,"bgImage")}),a.canvasParams.background&&(n={background:{width:(null===(c=a.canvasParams.background)||void 0===c?void 0:c.width)||100,height:(null===(o=a.canvasParams.background)||void 0===o?void 0:o.height)||100,backgroundColor:(null===(f=a.canvasParams.background)||void 0===f?void 0:f.color)||"#000"}}),t.prev=5,u.default.log("准备生成:"+new Date),t.next=9,(0,s.getSharePoster)(l(l({_this:a},n),{},{posterCanvasId:a.canvasId,Context:v,delayTimeScale:10,draw:!1,drawArray:function(e){var t=e.bgObj,n=(e.type,e.bgScale,i.default.initDrawArray(t,a.canvasParams.drawArray));return new Promise((function(e,t){e(n)}))},setCanvasWH:function(t){var a=t.bgObj;t.type,t.bgScale;e.poster=a}}));case 9:return t.sent,t.next=12,a.drawPoster();case 12:t.next=19;break;case 14:t.prev=14,t.t0=t["catch"](5),u.default.hideLoading(),u.default.showToast(JSON.stringify(t.t0)),console.log(JSON.stringify(t.t0));case 19:case"end":return t.stop()}}),t,null,[[5,14]])})))()},drawPoster:function(){var t=this;return(0,c.default)(r.default.mark((function a(){var n;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n=t,v.draw(!1,(function(){e.canvasToTempFilePath({canvasId:n.canvasId,success:function(e){u.default.hideLoading(),n.$emit("success",e.tempFilePath),u.default.log("海报生成成功, 时间:"+new Date+"， 临时路径: "+e.tempFilePath)},fail:function(e){u.default.hideLoading(),console.log("生成异常",e)}},n)}));case 2:case"end":return a.stop()}}),a)})))()}}};t.default=p}).call(this,a("df3c")["default"])},c457:function(e,t,a){"use strict";a.r(t);var n=a("2842"),r=a("5db9");for(var c in r)["default"].indexOf(c)<0&&function(e){a.d(t,e,(function(){return r[e]}))}(c);a("fffc");var o=a("828b"),u=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=u.exports},fffc:function(e,t,a){"use strict";var n=a("9c0a"),r=a.n(n);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/shopro-canvas/shopro-canvas-create-component',
    {
        'components/shopro-canvas/shopro-canvas-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("c457"))
        })
    },
    [['components/shopro-canvas/shopro-canvas-create-component']]
]);
