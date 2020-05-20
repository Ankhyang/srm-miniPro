export default{
	// UC 用户中心
	ucUrl: 'https://test.j-cloud.cn/uc', 
	// CS 文件服务组件
	csUrl: 'https://test.j-cloud.cn/cs',
	// 审批组件
	imUrl: 'https://test.j-cloud.cn/im',
	// 供应商组件 云平台
	vendorUrl: 'https://test.j-cloud.cn/vendor',
	// 采购组件
	purchaseUrl: 'https://test.j-cloud.cn/purchase',
	// FLOW工作流
	flowUrl: 'https://test.j-cloud.cn/flow',
	// 基础数据
	baseDataUrl: 'https://test.j-cloud.cn/base_data',
	// 地区
	areaUrl: 'https://test.j-cloud.cn/srm_web',
	// 根据module获取对应url
	getUrl(module) {
		let url = this.ucUrl
		switch(module) {
			case 'uc':
				url = this.ucUrl
				break
			case 'cs':
				url = this.csUrl
				break
			case 'im':
				url = this.imUrl
				break
			case 'vendor':
				url = this.vendorUrl
				break
			case 'purchase':
				url = this.purchaseUrl
				break
			case 'fw':
				url = this.flowUrl
				break
			case 'baseData':
				url = this.baseDataUrl
				break
			case 'area':
				url = this.areaUrl
				break
		}
		return url
	}
}