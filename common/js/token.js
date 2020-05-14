import hostConfig from './host_config.js'
import util from './util.js'

const token =  {
	// 获取用户token信息
	getTokenInfo() {
		return uni.getStorageSync('tokenInfo')
	},
	// 设置用户token信息
	setTokenInfo(tokenInfo) {
		if(tokenInfo) {
			uni.setStorageSync('tokenInfo', tokenInfo)
		} else {
			uni.removeStorageSync('tokenInfo')
			uni.removeStorageSync('userInfo')
		}
	},
	// 校验token是否过期
	async verifyToken() {
		let token = this.getTokenInfo()
		if(!token) return false
		let server_time = token.expires_at
		if(util.newDate(server_time) - new Date().getTime() < 30000) {
			if(!await this.refreshToken(token.refresh_token)) {
				this.setTokenInfo(null)
				return false
			}
		}
		return true
	},
	// 刷新token
	refreshToken(refresh_token) {
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				resolve(false)
			}, 1)
		})
	}
}
export default token;