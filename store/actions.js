import { TOKEN_INFO, USER_INFO } from './mutation-type.js'
import token from '@/common/js/token.js'

export default{
	// 登录
	login({commit}, tokenInfo){
		// 设置token缓存
		token.setTokenInfo(tokenInfo)
		commit(TOKEN_INFO, {tokenInfo});
	},
	// 设置用户信息
	setUserInfo({commit}, userInfo) {
		console.log('userInfo', userInfo)
		commit(USER_INFO, {userInfo});
	}
}