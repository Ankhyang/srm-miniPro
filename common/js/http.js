import CryptoJS from './CryptoJS.js'
import token from './token.js'
import hostConfig from'./host_config.js'
import util from './util.js'

// 设置请求头信息
function getHeader(type, vorg, hosts, url) {
	let formatUrl = hosts + url;
	let header = {};
	header['content-type'] = 'application/json';
	if (vorg) {
		header['Vorg'] = vorg;
	}
	let tokenInfo = token.getTokenInfo();
	if (tokenInfo) {
		hosts = formatUrl.replace('http://', '').replace('https://', '').split('/')[0].split('?')[0];
		if (formatUrl.startsWith("http://") || formatUrl.startsWith("https://")) {
		    formatUrl = formatUrl.replace("https://", '');
		    formatUrl = formatUrl.replace("http://", '');
		}
		if (formatUrl.startsWith(hosts)) {
		    formatUrl = formatUrl.replace(hosts,'');
		}
		let timestamp = Date.parse(new Date());
		let id = tokenInfo.access_token;
		let mac_key = tokenInfo.mac_key;
		let nonce = timestamp + ":" + Math.random().toString(36).substr(2, 8);
		let macstr = nonce + "\n" + type + "\n" + formatUrl + "\n" + hosts + "\n";
		let HMACSHA256 = CryptoJS.HmacSHA256(macstr, mac_key);
		let mac = CryptoJS.enc.Base64.stringify(HMACSHA256);
		header['Authorization'] = 'MAC id=' + id + ',nonce="' + nonce + '",mac="' + mac + '"';
	}
	return header;
}

// 检查返回结果
function checkResult (res) {
	// 错误/异常返回数据结构
	// host_id: 请求主机地址
	// request_id 请求唯一标识
	// server_time 服务器返回时间，格式：ISO8601格式
	// code 错误代码
	// message 错误信息
	// detail 错误详情
	if (res && res.data && res.data.request_id && res.data.code) {
		uni.showToast({
			title: res.data.message || res.data.code,
			icon: 'none'
		})
		// 游客访问受限
		if(res.data.code === 'WAF/GUEST_ACCESS_DENIED') {
			uni.reLaunch({
				url: '/pages/component/login/login.vue'
			})
		}
		return false
	}
	if(res.data.code === 401) {
		uni.reLaunch({
			url: '/pages/component/login/login.vue'
		})
		return false
	}
	// 没有权限操作
	if(res.data.code === 403) {
		uni.showModal({
			title: '提示',
			content: '您当前没有权限进行此操作',
			showCancel: false,
			success(res) {
				uni.switchTab({
					url: '/pages/tabBar/message.vue'
				})
			}
		})
		return true
	}
	// 参数校验错误
	if(res.data.code === 400) {
		uni.showToast({
			title: '参数校验错误，请稍后再试',
			icon: 'none'
		})
		return false
	}
	if(res.data.code == 404 || res.data.code === 500) {
		uni.showToast({
			title: '接口异常，请稍后再试',
			icon: 'none'
		})
		return false
	}
	return true
}

const http = {
	// 请求
	async request (method, verify, vorg, module, url, params, loadingText) {
			//加载中效果
		if(loadingText) {
			uni.showLoading({
				title: loadingText,
				mask: true
			})
		}
		if(verify && !await token.verifyToken()) {
			uni.reLaunch({
				url: '/pages/component/login/login.vue'
			})
			loadingText && uni.hideLoading()
			return {
				success: false
			}
		}
		url = encodeURI(url)
		let hosts = hostConfig.getUrl(module)
		let header = getHeader(method, vorg, hosts, url)
		console.log('header', header)
		return await new Promise((resolve, reject)=>{
			uni.request({
				url: hosts + url,
				data: params || {},
				method,
				header,
				success(res) {
					res.success = checkResult(res)
					resolve(res)
				},
				fail(error) {
					uni.showToast({
						title: '接口异常',
						icon: 'none'
					})
					reject(error)
				},
				complete(r) {
					loadingText && uni.hideLoading()
				}
			})
		})
	}
}
export default http