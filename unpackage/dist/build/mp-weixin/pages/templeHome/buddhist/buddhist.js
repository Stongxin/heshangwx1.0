(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/templeHome/buddhist/buddhist"],{"2f41":function(t,e,n){"use strict";var i=n("5346"),a=n.n(i);a.a},"389c":function(t,e,n){"use strict";n.r(e);var i=n("54b1"),a=n("5ff4");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("2f41"),n("678c");var c=n("828b"),u=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"9fd6f05a",null,!1,i["a"],void 0);e["default"]=u.exports},5346:function(t,e,n){},"54b1":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement,e=(this._self._c,this.formState.gy_image?this.$common.disposeSrc(this.formState.gy_image):null);this.$mp.data=Object.assign({},{$root:{g0:e}})},a=[]},"5ff4":function(t,e,n){"use strict";n.r(e);var i=n("c9d3"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"66d8":function(t,e,n){},"678c":function(t,e,n){"use strict";var i=n("66d8"),a=n.n(i);a.a},c9d3:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{id:"",formState:{temple_id:t.getStorageSync("temple_id"),name:"",law_name:"",gy_image:"",tel:""}}},onLoad:function(t){t.id&&(this.id=t.id,this.getDetail())},methods:{getDetail:function(){function e(){var e=this;this.$request({url:"signUp/lay/".concat(this.id),version:"/v3/",method:"GET",header:{token:t.getStorageSync("token")}},!0).then((function(t){Object.keys(e.formState).forEach((function(n){e.formState[n]=t[n]})),e.formState.temple_id=t.temple.id}))}t.getStorageSync("token")?e():this.$login().then((function(){e()}))},skip:function(e){t.navigateTo({url:e})},uploadGy:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(t){e.$alUploadImage(t.tempFilePaths[0]).then((function(t){e.formState.gy_image=t.file}))}})},submit:function(){var e=this;t.getStorageSync("token")?this.next():this.$login().then((function(){e.next()}))},next:function(){this.$request({url:this.id?"signUp/lay/".concat(this.id):"signUp/lay",version:"/v3/",method:this.id?"PUT":"POST",header:{token:t.getStorageSync("token")},data:this.formState},!0).then((function(e){t.showToast({title:"提交成功",mask:!0}),setTimeout((function(){t.navigateBack({delta:1})}),1e3)}))}}};e.default=n}).call(this,n("df3c")["default"])},cdf2:function(t,e,n){"use strict";(function(t,e){var i=n("47a9");n("7ea0");i(n("3240"));var a=i(n("389c"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])}},[["cdf2","common/runtime","common/vendor"]]]);