import http from './http.js'

//分页查询
// $offset：查询的起始行数
// $limit：查询返回的条数
// $count=true，可以返回总条数

// 将页数换为起始行数
function getOffset(pageIndex, limit) {
	if(pageIndex && limit) {
		return (Number(pageIndex) - 1) * Number(limit)
	}
	return 0
}

// 用户信息
const user = {
	// 用户登录获取token
	tokens: (params) => http.request('POST', false, '', 'uc', '/v0.1/tokens', params, '登录中...'),
	// 获取当前登录用户详情
	curUserDetail: () => http.request('GET', true, '', 'uc', '/v0.1/users/my/detail'),
	// 根据用户id获取数据
	detail: (user_id) => http.request('GET', true, '', 'uc', `/v0.1/users/${user_id}/detail`)
}

// 流程审批
const work_execute = {
	list: (pageIndex, limit, title) => {
		let where = ''
		if(title) where = `&$filter= title like %${title}%`
		return http.request('GET', true, '', 'fw', 
		`/v0.1/work_execute/query_task?$offset=${getOffset(pageIndex,limit)}&$limit=${limit}&$count=true` + where)
	}
}

export default {
	user,
	work_execute
}