(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/after-sale/detail"],{"0ea6":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={components:{},data:function(){return{stepsCurrent:0,steps:[{name:"提交申请"},{name:"进行中"},{name:"完成"}],aftersaleDetail:{},aftersaleLog:[]}},computed:{},onLoad:function(){this.getAftersaleDetail()},methods:{jump:function(e,t){this.$Router.push({path:e,query:t})},onService:function(){this.$Router.push("/pages/public/chat/index")},onCopy:function(t){var a=this;e.setClipboardData({data:t,success:function(e){a.$u.toast("已复制到剪切板")}})},setSteps:function(e){if(e>=0&&e<2)this.stepsCurrent=e;else{this.stepsCurrent=2;var t="";switch(e){case 2:t="完成";break;case-1:t="取消";break;case-2:t="驳回";break;default:break}this.steps[2].name=t}},getAftersaleDetail:function(){var e=this;e.$http("order.aftersaleDetail",{id:e.$Route.query.aftersaleId}).then((function(t){1===t.code&&(e.aftersaleDetail=t.data,e.setSteps(t.data.aftersale_status),e.aftersaleLog=t.data.logs,e.aftersaleDetail.createtime=e.$u.timeFormat(t.data.createtime,"yyyy-mm-dd hh:MM"),e.aftersaleDetail.updatetime=e.$u.timeFormat(t.data.updatetime,"yyyy-mm-dd hh:MM"))}))},onCancel:function(e){var t=this;t.$http("order.cancelAftersaleOrder",{id:e},"取消中...").then((function(e){1===e.code&&t.$Router.back()}))},onDelete:function(t){var a=this;e.showModal({title:"删除订单",content:"确定要删除这个订单么？",cancelText:"取消",confirmText:"删除",success:function(e){e.confirm&&a.$http("order.deleteAftersaleOrder",{id:t}).then((function(e){1===e.code&&a.$Router.back()}))}})}}};t.default=a}).call(this,a("df3c")["default"])},1184:function(e,t,a){"use strict";(function(e,t){var n=a("47a9");a("7ea0");n(a("3240"));var r=n(a("bb50"));e.__webpack_require_UNI_MP_PLUGIN__=a,t(r.default)}).call(this,a("3223")["default"],a("df3c")["createPage"])},"1aa5":function(e,t,a){"use strict";a.r(t);var n=a("0ea6"),r=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=r.a},"329f":function(e,t,a){},4772:function(e,t,a){"use strict";var n=a("329f"),r=a.n(n);r.a},bb50:function(e,t,a){"use strict";a.r(t);var n=a("ca9e"),r=a("1aa5");for(var o in r)["default"].indexOf(o)<0&&function(e){a.d(t,e,(function(){return r[e]}))}(o);a("4772");var s=a("828b"),u=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=u.exports},ca9e:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var n={uSteps:function(){return a.e("node-modules/uview-ui/components/u-steps/u-steps").then(a.bind(null,"5a73"))},shoproMiniCard:function(){return a.e("components/shopro-mini-card/shopro-mini-card").then(a.bind(null,"b3a4"))}},r=function(){var e=this,t=e.$createElement,a=(e._self._c,Number(e.aftersaleDetail.refund_fee)),n=e.aftersaleLog&&e.aftersaleLog.length,r=n?e.aftersaleLog.length:null,o=e.aftersaleLog&&e.aftersaleLog.length,s=o?e.aftersaleLog.length:null;e.$mp.data=Object.assign({},{$root:{m0:a,g0:n,g1:r,g2:o,g3:s}})},o=[]}},[["1184","common/runtime","common/vendor"]]]);