(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/info"],{"395f":function(e,t,n){"use strict";(function(e,t){var r=n("47a9");n("7ea0");r(n("3240"));var a=r(n("b770"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(a.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},"54c4":function(e,t,n){"use strict";n.r(t);var r=n("f2ed"),a=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},9618:function(e,t,n){"use strict";var r=n("fdac"),a=n.n(r);a.a},b4c6:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var r={shoproAuthModal:function(){return Promise.all([n.e("common/vendor"),n.e("components/shopro-auth-modal/shopro-auth-modal")]).then(n.bind(null,"326e"))},uPicker:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-picker/u-picker")]).then(n.bind(null,"0b9b"))},uModal:function(){return n.e("node-modules/uview-ui/components/u-modal/u-modal").then(n.bind(null,"8970"))}},a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showCalendar=!0},e.e1=function(t){return e.$Router.push("/pages/user/address/list")},e.e2=function(t){e.showModal=!0})},o=[]},b770:function(e,t,n){"use strict";n.r(t);var r=n("b4c6"),a=n("54c4");for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("9618");var u=n("828b"),i=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"1ef34b2e",null,!1,r["a"],void 0);t["default"]=i.exports},f2ed:function(e,t,n){"use strict";(function(e){var r=n("47a9");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("7eb4")),o=r(n("ee10")),u=r(n("7ca3")),i=n("8f59"),c=r(n("a25c")),s=r(n("3421"));function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){(0,u.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l={components:{},data:function(){return{platform:this.$platform.get(),userData:{},showCalendar:!1,showModal:!1,editInfoDisabled:!0,thirdOauthInfo:null}},computed:d({},(0,i.mapGetters)(["userInfo","authType"])),onLoad:function(){this.userData=JSON.parse(JSON.stringify(this.userInfo)),this.getThirdOauthInfo()},methods:d(d({},(0,i.mapActions)(["getUserInfo","showAuthModal","logout"])),{},{changeCalendar:function(e){this.userData.birthday="".concat(e.year,"-").concat(e.month,"-").concat(e.day),this.editInfoDisabled=this.userData.birthday==this.userInfo.birthday},changePwd:function(){this.showAuthModal("changePwd")},onChangeNickName:function(){this.editInfoDisabled=this.userData.nickname==this.userInfo.nickname},bindMobile:function(){!this.userInfo.verification.mobile&&this.showAuthModal("bindMobile")},onChooseImg:function(){var e=this;return(0,o.default)(a.default.mark((function t(){var n,r,o;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=0,t.t0=n,t.next=4,new c.default("writePhotosAlbum").check();case 4:if(n=t.t0+=t.sent,!(n<1)){t.next=7;break}return t.abrupt("return");case 7:return t.t1=n,t.next=10,new c.default("camera").check();case 10:if(n=t.t1+=t.sent,!(n<2)){t.next=13;break}return t.abrupt("return");case 13:return t.next=15,e.chooseImage(1);case 15:return r=t.sent,t.next=18,e.uploadImage(r[0]);case 18:o=t.sent,e.userData.avatar=o.fullurl,e.userData.fileUrl=o.url,e.editInfoDisabled=e.userData.avatar==e.userInfo.avatar;case 22:case"end":return t.stop()}}),t)})))()},getThirdOauthInfo:function(){var e=this;e.$http("user.thirdOauthInfo").then((function(t){1===t.code&&(e.thirdOauthInfo=t.data)}))},unbindThirdOauth:function(t,n){var r=this;r.$http("user.unbindThirdOauth",{platform:t,provider:n}).then((function(t){1===t.code&&(e.showToast({title:t.msg}),r.thirdOauthInfo=null,r.getUserInfo())}))},bindThirdOauth:function(e,t){var n=arguments,r=this;return(0,o.default)(a.default.mark((function o(){var u,i;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:u=n.length>2&&void 0!==n[2]?n[2]:null,i=r,a.t0=e,a.next="wxOfficialAccount"===a.t0?5:"wxMiniProgram"===a.t0?7:"App"===a.t0?11:17;break;case 5:return s.default.bind(),a.abrupt("break",17);case 7:return a.next=9,s.default.bind(u);case 9:return i.getUserInfo(),a.abrupt("break",17);case 11:if("Wechat"!==t){a.next=14;break}return a.next=14,s.default.bind();case 14:return i.getUserInfo(),i.getThirdOauthInfo(),a.abrupt("break",17);case 17:case"end":return a.stop()}}),o)})))()},confirmLogOut:function(){this.logout(),this.$Router.back()},editUserInfo:function(){var e=this;if(!e.userData.nickname)return this.$u.toast("昵称不能为空"),!1;e.$http("user.profile",{nickname:e.userData.nickname,birthday:e.userData.birthday,avatar:e.userData.fileUrl},"保存中...").then((function(t){1===t.code&&(e.getUserInfo(),e.editInfoDisabled=!0,e.$u.toast("保存成功"))}))},chooseImage:function(){var t=arguments;return(0,o.default)(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t.length>0&&void 0!==t[0]?t[0]:1,n.abrupt("return",new Promise((function(t,n){e.chooseImage({count:r,sizeType:["original","compressed"],sourceType:["album"],success:function(e){t(e.tempFilePaths)}})})).catch((function(e){console.log(e)})));case 2:case"end":return n.stop()}}),n)})))()},uploadImage:function(t){var n=this;return(0,o.default)(a.default.mark((function r(){var o;return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return o=n,r.abrupt("return",new Promise((function(n,r){o.$u.toast("上传中..."),e.uploadFile({url:o.$BASE_URL+"/api/common/upload",filePath:t,name:"file",header:{token:e.getStorageSync("sh_token")},success:function(e){e=JSON.parse(e.data),1===e.code?(o.$u.toast("上传成功"),n(e.data)):o.$u.toast("上传失败")},complete:function(t){e.hideLoading()}})})).catch((function(e){console.log(e)})));case 2:case"end":return r.stop()}}),r)})))()}})};t.default=l}).call(this,n("df3c")["default"])},fdac:function(e,t,n){}},[["395f","common/runtime","common/vendor"]]]);