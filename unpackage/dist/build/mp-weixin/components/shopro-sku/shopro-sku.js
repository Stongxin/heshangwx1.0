(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/shopro-sku/shopro-sku"],{1250:function(t,r,n){"use strict";var e=n("9acc"),i=n.n(e);i.a},"13be":function(t,r,n){"use strict";n.d(r,"b",(function(){return i})),n.d(r,"c",(function(){return o})),n.d(r,"a",(function(){return e}));var e={uNumberBox:function(){return n.e("node-modules/uview-ui/components/u-number-box/u-number-box").then(n.bind(null,"7049"))}},i=function(){var t=this,r=t.$createElement;t._self._c;t._isMounted||(t.e0=function(r){r.stopPropagation(),t.showModal=!1},t.e1=function(r){r.stopPropagation(),t.showModal=!1})},o=[]},"9acc":function(t,r,n){},a1bf:function(t,r,n){"use strict";n.r(r);var e=n("13be"),i=n("d014");for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(r,t,(function(){return i[t]}))}(o);n("1250");var u=n("828b"),s=Object(u["a"])(i["default"],e["b"],e["c"],!1,null,"0432fe78",null,!1,e["a"],void 0);r["default"]=s.exports},d014:function(t,r,n){"use strict";n.r(r);var e=n("d643"),i=n.n(e);for(var o in e)["default"].indexOf(o)<0&&function(t){n.d(r,t,(function(){return e[t]}))}(o);r["default"]=i.a},d643:function(t,r,n){"use strict";(function(t){var e=n("47a9");Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i=e(n("7ca3")),o=n("8f59");function u(t,r){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,r){if(!t)return;if("string"===typeof t)return s(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(t,r)}(t))||r&&t&&"number"===typeof t.length){n&&(t=n);var e=0,i=function(){};return{s:i,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){c=!0,o=t},f:function(){try{u||null==n.return||n.return()}finally{if(c)throw o}}}}function s(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function c(t,r){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);r&&(e=e.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),n.push.apply(n,e)}return n}function a(t){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?c(Object(n),!0).forEach((function(r){(0,i.default)(t,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))}))}return t}var f={components:{},data:function(){return{maxStep:999,skuList:[],currentSkuPrice:{},currentSkuArray:[],goodsNum:1,confirmGoodsInfo:{},type:this.buyType}},props:{goodsInfo:{},activityRules:{},value:{},buyType:{type:String,default:"sku"},goodsType:{type:String,default:"goods"},grouponBuyType:{type:String,default:"alone"},grouponId:{type:Number,default:0}},created:function(){this.skuList=this.goodsInfo.sku,this.changeDisabled(!1)},mounted:function(){this.goodsInfo.is_sku||(this.currentSkuPrice=this.skuPrice[0],this.maxStep=this.skuPrice[0].stock>999?999:this.skuPrice[0].stock)},watch:{type:function(t,r){return newVal}},computed:{skuPrice:function(){return this.goodsInfo.sku_price},showModal:{get:function(){return this.value},set:function(r){return r?t.hideTabBar():t.showTabBar(),this.$emit("input",r),r}},currentSkuText:function(){var t=this,r="",n=this.currentSkuArray;return n.forEach((function(n){t.skuList.forEach((function(t){t.content.forEach((function(t){t.id===n&&(r+=" "+t.name)}))}))})),t.$emit("getSkuText",r),r}},methods:a(a({},(0,o.mapActions)(["addCartGoods","getCartList"])),{},{jump:function(t,r){this.$Router.push({path:t,query:r})},chooseSku:function(t,r){var n=!0;this.goodsNum=1,this.maxStep=999,void 0!=this.currentSkuArray[t]&&this.currentSkuArray[t]==r?(n=!1,this.currentSkuArray.splice(t,1,"")):this.$set(this.currentSkuArray,t,r);var e=[];this.currentSkuArray.forEach((function(t){""!=t&&e.push(t)}));var i=this.getCanUseSkuPrice();e.length==this.skuList.length&&i.length?this.currentSkuPrice=i[0]:this.currentSkuPrice={},this.changeDisabled(n,t,r)},changeDisabled:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,e=[];if(t){var i,o=u(this.skuPrice);try{for(o.s();!(i=o.n()).done;){var s=i.value;s.stock<=0||s.goods_sku_id_arr.indexOf(n.toString())>=0&&e.push(s)}}catch(y){o.e(y)}finally{o.f()}}else e=this.getCanUseSkuPrice();var c,a=[],f=u(e);try{for(f.s();!(c=f.n()).done;){var h=c.value;a=a.concat(h.goods_sku_id_arr)}}catch(y){f.e(y)}finally{f.f()}if(a=Array.from(new Set(a)),t){var d=a.indexOf(n.toString());a.splice(d,1)}else this.currentSkuArray.forEach((function(t){if(""!=t.toString()){var r=a.indexOf(t.toString());r>=0&&a.splice(r,1)}}));var l=[];for(var p in t?l=[r]:this.currentSkuArray.forEach((function(t,r){""!=t&&l.push(r)})),this.skuList)if(!(l.indexOf(this.skuList[p]["id"])>=0))for(var g in this.skuList[p]["content"])a.indexOf(this.skuList[p]["content"][g]["id"].toString())>=0?this.skuList[p]["content"][g]["disabled"]=!1:this.skuList[p]["content"][g]["disabled"]=!0},getCanUseSkuPrice:function(){var t,r=this,n=[],e=u(this.skuPrice);try{var i=function(){var e=t.value;if(e.stock<=0)return"continue";o=!0,r.currentSkuArray.forEach((function(t){""!=t.toString()&&e.goods_sku_id_arr.indexOf(t.toString())<0&&(o=!1)})),o&&n.push(e)};for(e.s();!(t=e.n()).done;){var o;i()}}catch(s){e.e(s)}finally{e.f()}return n},changeNum:function(t){this.changeDisabled(!1)},plus:function(t){if(t.value>=this.currentSkuPrice.stock)return this.maxStep=this.currentSkuPrice.stock,void this.$u.toast("库存不足");if("seckill"===this.goodsInfo.activity_type||"groupon"===this.goodsInfo.activity_type){var r=this.goodsInfo.activity.rules;if(0!=r.limit_buy&&t.value>=r.limit_buy)return this.maxStep=r.limit_buy,void this.$u.toast("本次活动最多购买"+r.limit_buy+"件")}},confirmCart:function(){var t=this;if(this.confirmSku()){var r={list:[t.confirmGoodsInfo],from:"goods"};t.addCartGoods(r).then((function(r){1===r.code&&(t.showModal=!1,t.$u.toast(r.msg))}))}},confirmBuy:function(){if(this.showModal=!1,this.confirmSku()){var t=[];t.push(this.confirmGoodsInfo),this.jump("/pages/order/confirm",{goodsList:t,from:"goods",orderType:this.goodsType,grouponBuyType:this.grouponBuyType,grouponId:this.grouponId})}},confirm:function(){if(this.confirmSku())switch(this.buyType){case"cart":this.confirmCart();break;case"buy":this.confirmBuy();break;default:}},confirmSku:function(){return 0==this.currentSkuPrice.stock||this.currentSkuPrice.stock<this.goodsNum?(this.$u.toast("库存不足"),this.showModal=!1,!1):(this.currentSkuPrice.goods_num=this.goodsNum,this.confirmGoodsInfo={goods_id:this.currentSkuPrice.goods_id,goods_num:this.currentSkuPrice.goods_num,sku_price_id:this.currentSkuPrice.id,goods_price:this.currentSkuPrice.price},this.confirmGoodsInfo.sku_price_id?(this.showModal=!1,!0):(this.$u.toast("请选择规格"),!1))}})};r.default=f}).call(this,n("df3c")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/shopro-sku/shopro-sku-create-component',
    {
        'components/shopro-sku/shopro-sku-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("a1bf"))
        })
    },
    [['components/shopro-sku/shopro-sku-create-component']]
]);