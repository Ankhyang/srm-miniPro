import { TOKEN_INFO, USER_INFO } from './mutation-type.js'

export default{
	// 登录
	[TOKEN_INFO](state, {tokenInfo}){
		state.hasLogin = true
		state.tokenInfo = tokenInfo
	},
	[USER_INFO](state, {userInfo}) {
		state.userInfo = userInfo
	}
}