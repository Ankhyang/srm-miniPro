import http from './http.js'

//分页查询
// $offset：查询的起始行数
// $limit：查询返回的条数
// $count=true，可以返回总条数

const user = {
	// 用户登录获取token
	tokens: (params) => http.request('POST', false, '', 'uc', '/v0.1/tokens', params, '登录中...'),
	// 获取当前登录用户详情
	curUserDetail: () => http.request('GET', true, '', 'uc', '/v0.1/users/my/detail')
}
export default {
	user
}