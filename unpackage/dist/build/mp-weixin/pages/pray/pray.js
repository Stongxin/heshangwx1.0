(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pray/pray"],{"1bff":function(e,t,n){"use strict";var i=n("916f"),a=n.n(i);a.a},2848:function(e,t,n){"use strict";(function(e,t){var i=n("47a9");n("7ea0");i(n("3240"));var a=i(n("4ee7"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(a.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},"4ee7":function(e,t,n){"use strict";n.r(t);var i=n("a338"),a=n("9624");for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("1bff");var r=n("828b"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"438db113",null,!1,i["a"],void 0);t["default"]=s.exports},"916f":function(e,t,n){},9624:function(e,t,n){"use strict";n.r(t);var i=n("f8ce"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},a338:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var i=function(){var e=this.$createElement;this._self._c},a=[]},f8ce:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={components:{maoScroll:function(){n.e("components/mao-scroll/mao-scroll").then(function(){return resolve(n("e178"))}.bind(null,n)).catch(n.oe)},calendar:function(){Promise.all([n.e("common/vendor"),n.e("components/calendar-boke/calendar")]).then(function(){return resolve(n("2bf4"))}.bind(null,n)).catch(n.oe)},taisui:function(){Promise.all([n.e("common/vendor"),n.e("pages/pray/components/taisui/taisui")]).then(function(){return resolve(n("dcf8"))}.bind(null,n)).catch(n.oe)},at:function(){n.e("pages/pray/components/at/at").then(function(){return resolve(n("0b96"))}.bind(null,n)).catch(n.oe)},toBlessing:function(){Promise.all([n.e("common/vendor"),n.e("pages/pray/components/to_blessing/to_blessing")]).then(function(){return resolve(n("41ca"))}.bind(null,n)).catch(n.oe)},merit:function(){n.e("pages/pray/components/merit/merit").then(function(){return resolve(n("a2d4"))}.bind(null,n)).catch(n.oe)}},data:function(){return{bullyForm:{area:"大殿普佛",names:[{name:""}],dateArr:[{start:"",end:""}],lunarDate:[{start:"",end:""}]},dataList:[],dateIndex:"",dateKey:"",dataType:"",urlOptions:{},page:1}},onLoad:function(e){console.log(e,13321),e.scene?this.login(e.scene):(this.urlOptions={id:e.column_id,column_type:e.column_type,buddhist_id:e.buddhist_id},this.getMeritList())},computed:{fn:function(){var e="";switch(this.urlOptions.column_type){case"to":case"blessing":e="water";break;case"taisui":e="ts";break;case"at":e="at";break;case"merit":e="gd";break}return e}},methods:{login:function(t){var n=this;e.login({provider:"weixin",success:function(i){n.$request({url:"onLogin",version:"/vx/",method:"GET",data:{code:i.code,temple_id:e.getStorageSync("temple_id")}}).then((function(i){e.setStorageSync("openid",i.openid),n.$request({url:"user/WxXxOpendiLogin",data:{openid:i.openid}}).then((function(i){e.setStorageSync("token",i.token),e.setStorageSync("mobile",i.mobile);var a=t.split("_");e.setStorageSync("temple_id",a[0]),n.urlOptions={id:a[1],column_type:a[2],buddhist_id:a[3]},n.getMeritList()}))}))}})},getMeritList:function(){var t=this;this.$request({url:"buddhist/meritList",method:"GET",data:{temple_id:e.getStorageSync("temple_id"),page:this.page,size:20,fn:this.fn,type:"water"==this.fn?this.urlOptions.column_type:"",buddhist_id:this.urlOptions.buddhist_id}}).then((function(e){t.dataList=e}))},addName:function(){this.bullyForm.names.push({name:""})},delName:function(e){this.bullyForm.names.splice(e,1)},confirmCalendar:function(e){this.bullyForm.lunarDate[this.dateIndex][this.dateKey]=e.lunarDate,this.bullyForm.dateArr[this.dateIndex][this.dateKey]=e.dateGL},openCalendar:function(e,t,n){this.$refs.calendar1.switchBtn(e),this.$refs.calendar1.isShowDateMask=!0,this.dataType=e,this.dateIndex=n,this.dateKey=t},addDate:function(e){this.bullyForm.lunarDate.push({start:"",end:""}),this.bullyForm.dateArr.push({start:"",end:""})},delDate:function(e){this.bullyForm.lunarDate.splice(e,1),this.bullyForm.dateArr.splice(e,1)}}};t.default=i}).call(this,n("df3c")["default"])}},[["2848","common/runtime","common/vendor"]]]);