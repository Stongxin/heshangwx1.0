(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/templeHome/volunteer/volunteer"],{1447:function(t,e,n){"use strict";var i=n("7c75"),a=n.n(i);a.a},"4de9":function(t,e,n){},"562b":function(t,e,n){"use strict";(function(t,e){var i=n("47a9");n("7ea0");i(n("3240"));var a=i(n("672f"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n("3223")["default"],n("df3c")["createPage"])},"5a13":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={uniCalendar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-calendar/components/uni-calendar/uni-calendar")]).then(n.bind(null,"0e6b"))},uniDataPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker")]).then(n.bind(null,"5264"))}},a=function(){var t=this.$createElement;this._self._c},u=[]},"672f":function(t,e,n){"use strict";n.r(e);var i=n("5a13"),a=n("ec73");for(var u in a)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("1447"),n("f873");var r=n("828b"),o=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"1dd2747a",null,!1,i["a"],void 0);e["default"]=o.exports},"7c75":function(t,e,n){},ec73:function(t,e,n){"use strict";n.r(e);var i=n("fdf5"),a=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=a.a},f873:function(t,e,n){"use strict";var i=n("4de9"),a=n.n(i);a.a},fdf5:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{id:"",formState:{temple_id:t.getStorageSync("temple_id"),name:"",sex:"",birthday:"",culture_level:"",health:"",matrimony:"",occupation:"",nation:"",id_card:"",work_unit:"",telephone:"",wechat_id:"",e_mail:"",gy_status:"",hobby:"",content:"",preparer_signature:"",referrer:"",idea:"",law_name:"",standing:""},formTitle:{culture_level:"",gy_status:"",matrimony:"",sex_text:""},pickerShow:!1,selectData:{},selectKey:"cultureLevel"}},onLoad:function(t){t.status&&(this.formState.standing=t.status),t.id&&(this.id=t.id,this.getDetail()),this.getSelect()},methods:{getDetail:function(){function e(){var e=this;this.$request({url:"signUp/volunteer/".concat(this.id),version:"/v3/",method:"GET",header:{token:t.getStorageSync("token")}},!0).then((function(t){Object.keys(e.formState).forEach((function(n){e.formState[n]=t[n]})),e.formState.temple_id=t.temple.id,e.formTitle.gy_status=t.gy_status_text,e.formTitle.matrimony=t.matrimony_text,e.formTitle.sex_text=t.sex_text,e.formTitle.culture_level=t.culture_level_text}))}t.getStorageSync("token")?e():this.$login().then((function(){e()}))},submit:function(){var e=this;t.getStorageSync("token")?this.next():this.$login().then((function(){e.next()}))},next:function(){this.$request({url:this.id?"signUp/volunteer/".concat(this.id):"signUp/volunteer",version:"/v3/",data:this.formState,method:this.id?"PUT":"POST",header:{token:t.getStorageSync("token")}},!0).then((function(e){t.showToast({title:"提交成功",mask:!0}),setTimeout((function(){t.navigateBack({delta:1})}),1e3)}))},getSelect:function(){var t=this;this.$request({url:"signUp/volunteer_select",method:"GET",version:"/v3/"}).then((function(e){e.cultureLevel=Object.keys(e.cultureLevel).map((function(t){return{text:e.cultureLevel[t],value:t}})),e.gyStatus=Object.keys(e.gyStatus).map((function(t){return{text:e.gyStatus[t],value:t}})),e.matrimony=Object.keys(e.matrimony).map((function(t){return{text:e.matrimony[t],value:t}})),t.selectData=e,t.selectData.sexList=[{text:"女",value:0},{text:"男",value:1}]}))},openCalendar:function(){this.$refs.calendar.open()},confirmCalendar:function(t){this.formState.birthday=t.fulldate,console.log(t)},openPicker:function(t){this.selectKey=t,this.$refs.namePicker.show()},confirmPicker:function(t){"cultureLevel"==this.selectKey?(this.formState.culture_level=t.detail.value[0].value,this.formTitle.culture_level=t.detail.value[0].text):"gyStatus"==this.selectKey?(this.formState.gy_status=t.detail.value[0].value,this.formTitle.gy_status=t.detail.value[0].text):"matrimony"==this.selectKey?(this.formState.matrimony=t.detail.value[0].value,this.formTitle.matrimony=t.detail.value[0].text):"sexList"==this.selectKey&&(this.formState.sex=t.detail.value[0].value,this.formTitle.sex_text=t.detail.value[0].text)}}};e.default=n}).call(this,n("df3c")["default"])}},[["562b","common/runtime","common/vendor"]]]);