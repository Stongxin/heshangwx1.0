import {
	Crypto,
	Base64
} from '@/utils/bundle.js'; //引入上面的代码
// export const domain = 'https://www.heshangsz.com' // 线上域名
export const domain = 'https://develop.heshangsz.com' // 本地域名
export const version = '/v2/'
export var requestTree = {}
export const common = {
	skip: function(url, type) {
		if (type == 'to') {
			uni.navigateTo({
				url: url,
				complete: (res) => {
					// console.log(res)
				}
			})
		} else if (type == 'back') {
			uni.navigateBack({
				delta: url
			})
		} else if (type == 'tabbar') {
			uni.switchTab({
				url
			})
		} else if (type == 'red'){
			uni.redirectTo({
				url
			})
		}
	},
	formatDate: function(date, formatstr) {
		//	使用示例
		// // 年、月、日、时、分、秒
		// var date = jutils.formatDate(new Date(1634002035*1000),"YYYY-MM-DD HH:ii:ss");
		// // 2021-10-12 09:27:15
		// //年、月、日、周
		// var date = jutils.formatDate(new Date(1634002035*1000),"YYYY-MM-DD 周W");
		// //2021-10-12 周二
		// //时、分、秒
		// var date = jutils.formatDate(new Date(1634002035*1000),"HH:ii:ss");
		// //09:27:15
		var arrweek = ["日", "一", "二", "三", "四", "五", "六"];
		var str = formatstr.replace(/yyyy|YYYY/, date.getFullYear()).replace(/yy|YY/,
				common.$addZero(date.getFullYear() % 100, 2)).replace(/mm|MM/, common.$addZero(date
				.getMonth() + 1,
				2)).replace(/m|M/g, date.getMonth() + 1).replace(/dd|DD/, common.$addZero(date.getDate(), 2))
			.replace(/d|D/g,
				date.getDate()).replace(/hh|HH/, common.$addZero(date.getHours(), 2)).replace(/h|H/g,
				date.getHours()).replace(/ii|II/, common.$addZero(date.getMinutes(), 2)).replace(/i|I/g,
				date.getMinutes()).replace(/ss|SS/, common.$addZero(date.getSeconds(), 2)).replace(/s|S/g,
				date.getSeconds()).replace(/w|g/, common.$addZero(date.getDay(), 2)).replace(/W/g, arrweek[date
				.getDay()]);
		return str;
	},
	$addZero: function(v, size) {
		for (var i = 0, len = size - (v + "").length; i < len; i++) {
			v = "0" + v;
		}
		return v + ""
	},
	// 随机数
	getFileNumber: function() {
		let timeNumber = new Date().getTime()
		let randomNumber = Math.floor(Math.random() * 999999)
		return timeNumber + '' + randomNumber
	},
	caculateTimeago: function(dateTimeStamp) {
		const minute = 1000 * 60; // 把分，时，天，周，半个月，一个月用毫秒表示

		const hour = minute * 60;
		const day = hour * 24;
		const week = day * 7;
		const now = new Date().getTime(); // 获取当前时间毫秒

		const diffValue = now - dateTimeStamp; // 时间差

		let result = '';

		if (diffValue < 0) {
			return;
		}

		const minC = diffValue / minute; // 计算时间差的分，时，天，周，月

		const hourC = diffValue / hour;
		const dayC = diffValue / day;
		const weekC = diffValue / week;

		if (weekC >= 1 && weekC <= 4) {
			result = ` ${parseInt(weekC, 10)}周前`;
		} else if (dayC >= 1 && dayC <= 6) {
			result = ` ${parseInt(dayC, 10)}天前`;
		} else if (hourC >= 1 && hourC <= 23) {
			result = ` ${parseInt(hourC, 10)}小时前`;
		} else if (minC >= 1 && minC <= 59) {
			result = ` ${parseInt(minC, 10)}分钟前`;
		} else if (diffValue >= 0 && diffValue <= minute) {
			result = '刚刚';
		} else {
			const datetime = new Date();
			datetime.setTime(dateTimeStamp);
			const Nyear = datetime.getFullYear();
			const Nmonth = datetime.getMonth() + 1 < 10 ? `0${datetime.getMonth() + 1}` : datetime.getMonth() +
				1;
			const Ndate = datetime.getDate() < 10 ? `0${datetime.getDate()}` : datetime.getDate();
			result = `${Nyear}-${Nmonth}-${Ndate}`;
		}

		return result;
	},
	formateTime: function(secondTime) {
		const time = secondTime;
		let newTime;
		let hour;
		let minite;
		let seconds;
		if (time >= 3600) {
			hour = parseInt(time / 3600) < 10 ? `0${parseInt(time / 3600)}` : parseInt(time / 3600);
			minite = parseInt(time % 60 / 60) < 10 ? `0${parseInt(time % 60 / 60)}` : parseInt(time % 60 / 60);
			seconds = time % 3600 < 10 ? `0${time % 3600}` : time % 3600;
			if (seconds > 60) {
				minite = parseInt(seconds / 60) < 10 ? `0${parseInt(seconds / 60)}` : parseInt(seconds / 60);
				seconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
			}
			newTime = `${hour}:${minite}:${seconds}`;
		} else if (time >= 60 && time < 3600) {
			minite = parseInt(time / 60) < 10 ? `0${parseInt(time / 60)}` : parseInt(time / 60);
			seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
			newTime = `00:${minite}:${seconds}`;
		} else if (time < 60) {
			seconds = time < 10 ? `0${time}` : time;
			newTime = `00:00:${seconds}`;
		}
		return newTime;
	},
	disposeSrc(src,type) {
		try {
			if (src == '') {
				return ''
			} else if (src.indexOf('http') > -1) {
				return src
			} else if (src.indexOf('base64') > -1) {
				return src
			} else {
				if(type == 'domain'){
					return domain + '/' + src
				}else{
					return 'https://heshang-app.oss-cn-hangzhou.aliyuncs.com' + src
				}
			}
		} catch (e) {
			//TODO handle the exception
		}
	},
	goHomePage(userId) {
		if (uni.getStorageSync('user').id === userId) {
			uni.switchTab({
				url: '/pages/my/my'
			})
		} else {
			uni.navigateTo({
				url: `/pages/others/others?id=${userId}`
			})
		}
	},
	baseUrl: domain + version,
	
}
export const request = function(options, showLoading = false) {
	return new Promise((resolved, rejected) => {
		if (showLoading) uni.showLoading({
			title: '加载中...'
		})
		// console.log('------------------------start------------------');
		// console.log('接口地址:' + domain + (options.version ? options.version : version) + options.url);
		// console.log('token:' + uni.getStorageSync('authorization'));
		// if (JSON.stringify(options.data) !== '{}') {
		// 	console.log('请求参数:');
		// 	for (let field in options.data) {
		// 		console.log(field + ':' + options.data[field]);
		// 	}
		// }
		// request请求封装
		requestTree[options.url] = uni.request({
			url: domain + (options.version ? options.version : version) + options.url, // 请求接口地址
			method: options.method || 'POST', // 方法从options中获取，如果没有传入method，则默认为POST，
			data: {...options.data,uuid: 'wx3348010e520bdffa'}, // 请求接口参数
			dataType: 'json',
			header: options.header || {
				'content-type': 'application/x-www-form-urlencoded',
				// 'Authorization': 'Bearer' + uni.getStorageSync('authorization'),
				// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoZXNoYW5nX2dvIiwiYXVkIjoiIiwiaWF0IjoxNjk1Nzk5MTUzLCJleHAiOjE3MDI5OTkxNTMsImRhdGEiOnsiaWQiOjIsInVzZXJuYW1lIjoiOTY1MjM0NDY5NTQiLCJtb2JpbGUiOiIxNTAwNDY1MTQxMiIsIm5pY2tuYW1lIjoiXHU5NjMzXHU2NTRjIn19.7I7P7ZkdgGuFsV6OR7kdecm4d0QtxRR9rZyPkn6gvT0'
			},
			success: (res) => {
				// console.log(res);
				if (res.statusCode == 200) {
					if(res.data.code == 406){
						uni.login({
							provider: 'weixin', //使用微信登录
							success:  (loginRes)=>{
								request({
									url: 'onLogin',
									version: '/vx/',
									method: 'GET',
									data: {
										code: loginRes.code,
										temple_id: uni.getStorageSync('temple_id')
									}
								}).then(openIdData=>{
									if(!openIdData.openid){
										uni.showModal({
											title: '提示',
											content: '配置信息错误',
											success: function (res) {
												if (res.confirm) {
													console.log('用户点击确定');
												} else if (res.cancel) {
													console.log('用户点击取消');
												}
											}
										});
										return
									}
									let temple_id = uni.getStorageSync('temple_id')
									let scene = uni.getStorageSync('scene')
									uni.clearStorageSync()
									uni.setStorageSync('openid', openIdData.openid)
									uni.setStorageSync('temple_id', temple_id)
									uni.setStorageSync('scene', scene)
									request({
										url: 'user/WxXxOpendiLogin',
										data: {
											openid: openIdData.openid
										}
									}).then(res=>{
										uni.setStorageSync('token', res.token)
										uni.setStorageSync('mobile', res.mobile)
										// 页面重载
										const pages = getCurrentPages()
										// 声明一个pages使用getCurrentPages方法
										const curPage = pages[pages.length - 1]
										console.log(curPage);
										// 声明一个当前页面
										curPage.onLoad(curPage.options) // 传入参数
										curPage.onShow()
										curPage.onReady()
									})
								})
							}
						});
					}else if (res.data.code != 1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						rejected(res.data)
					}
				} else if (res.statusCode == 401) {
					// uni.showToast({
					// 	title: '请登录后操作',
					// 	icon: 'none'
					// })
					// rejected(res)
					// uni.showModal({
					// 	title: '提示',
					// 	content: '请登录后操作',
					// 	success: function (res) {
					// 		if (res.confirm) {
					// 			uni.redirectTo({
					// 				url: "/pages/login/login"
					// 			})
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
					// uni.clearStorageSync()
					// uni.redirectTo({
					// 	url: "/pages/login/login"
					// })
					rejected(res)
				}else if(res.statusCode == 404){
					uni.showToast({
						title: '找不到资源',
						icon: 'none'
					})
					rejected(res)
				}  else if (res.statusCode == 500) {
					uni.showToast({
						title: '服务器错误',
						icon: 'none'
					})
					rejected(res)
				} else {
					uni.showToast({
						title: '服务器错误',
						icon: 'none'
					})
					rejected(res)
				}
				if(options.isTransformResponse){
					resolved(res.data)
				}else{
					resolved(res.data.data)
				}
				
			},
			fail: (err) => {
				rejected(err)
			},
			complete(all) {
				// 关闭加载中的特效
				if (showLoading) uni.hideLoading()
				console.log('------------------------end------------------');
			}
		})
	})
}

export const login = function(){
	return new Promise((reslove,rejected)=>{
		uni.login({
			provider: 'weixin', //使用微信登录
			success:  (loginRes)=>{
				this.$request({
					url: 'onLogin',
					version: '/vx/',
					method: 'GET',
					data: {
						code: loginRes.code,
						temple_id: uni.getStorageSync('temple_id')
					}
				}).then(openIdData=>{
					uni.setStorageSync('openid', openIdData.openid)
					this.$request({
						url: 'user/WxXxOpendiLogin',
						data: {
							openid: openIdData.openid
						}
					}).then(res=>{
						uni.setStorageSync('token', res.token)
						uni.setStorageSync('mobile', res.mobile)
						reslove(true)
					})
				})
			}
		});
	})
}
export const abortRequest = function(name){
	console.log(requestTree,111111);
	requestTree[name].abort();  
}
export const alUploadImage = function(path, showLoading = true) {
	return new Promise((resolve, reject) => {
		let date = new Date(new Date().getTime() + 1000 * 3600);
		let expiration = date.toISOString();
		//let expiration = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T'+date.getHours()+':'+date.getMinutes()+':00.000Z';
		let policyText = {
			expiration, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
			"conditions": [
				["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
			]
		};
		let bucketName = 'fuliushoucang'; //你的bucketName
		let policyBase64 = Base64.encode(JSON.stringify(policyText))
		let accessid = 'LTAIvgjdlMXtJLsn'; //你的阿里oss accessid
		let accesskey = 'tro0TiFJpOt5S58sdcOxQHFY7KOUra'; //你的阿里oss secret
		let host = 'http://' + bucketName + '.oss-cn-shanghai.aliyuncs.com'; //上传oss地址
		let bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
			asBytes: true
		});
		let signature = Crypto.util.bytesToBase64(bytes); //签名
		// 在阿里云存储路径=>文件地址
		let fileName = 'App/' + common.formatDate(new Date(), 'YYYYMMDD') + '/' + common.getFileNumber() +
			'.' + path.split('.').pop(); //文件名 注意：相同文件名会覆盖之前的文件

		if (showLoading) uni.showLoading({
			mask: true,
			title: '上传中..'
		})
		uni.uploadFile({
			url: host,
			filePath: path,
			fileType: '',
			name: 'file',
			formData: {
				name: fileName,
				key: fileName, //文件名
				policy: policyBase64, // 输入你获取的的policy
				OSSAccessKeyId: accessid, // 输入你的AccessKeyId
				success_action_status: '200', // 让服务端返回200,不然，默认会返回204
				signature, // 输入你获取的的signature
			},
			success: (res) => {
				if (showLoading) uni.hideLoading()
				res.file = host + '/' + fileName
				resolve(res)
			},
			fail: (res) => {
				if (showLoading) uni.hideLoading()
				reject(false)
			}
		})
	})
}

export const push = function(params){
	request({
		url: 'user/imJgSend',
		data: params
	}).then(res=>{
		
	},err=>{
		console.log(err);
	})
}

/**
        * debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。
        * @method 防抖函数(设定时间之后出结果，重复点击无效，如果重复点击，从点击的时刻,重新计算时间)
        * @param func 目标函数
        * @param wait 延迟执行毫秒数
      */

export const debounce = (func, wait) => {
    let _lastTime
    return function() {
        clearTimeout(_lastTime)
        _lastTime = setTimeout(() => {
            func.apply(this, arguments)
        }, wait)
    }
}
/**
    * @method 节流函数(设定时间之内只能点击一次，点击后立即触发，重复点击无效，必须等到设定时间执行完才执行第二次)	
    * @param func 函数
    * @param wait 延迟执行毫秒数
 */
export const throttle = (func, wait) => {
    if (wait == null || wait == undefined) {
        wait = 3000
    }
    let _lastTime = null
    // 返回新的函数
    return function() {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > wait || !_lastTime) {
            func.apply(this, arguments) // 将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}