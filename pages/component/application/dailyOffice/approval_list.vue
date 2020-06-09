<template>
	<view class="container">
		<scroll-view scroll-y :class="change" :style="{'height': scrollHeight+'px'}" @scrolltolower="loadData">
			<view class="list">
				<navigator class="item" v-for="(item, index) in list" :key="index" hover-class="none" :url="`/pages/component/application/dailyOffice/approval_info?apply=true&id=${item.id}&execution_id=${item.execution_id}`">
					<view class="head">
						<text class="title">{{item.title}}</text>
						<text class="status">待审批</text>
					</view>
					<text>申请人：{{item.create_by_name}}</text>
					<text>时间：2020-02-23 16:30</text>
				</navigator>
			</view>
			<load-more :loadingType="loadingType"></load-more>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				scrollHeight: 0,
				pageIndex: 0,
				pageSize: 20,
				loadingType: 0,
				tite: '',
				list: [], // 数据列表
				userList: {} ,// 用户
				userAddArray: {} // 索引
			}
		},
		computed:{
			change() {
				return this.length !== 0 ? 'have': 'none'
			}
		},
		onLoad(e) {
			this.tite = e.name || ''
			wx.setNavigationBarTitle({
				title: e.name || '待审批'
			})
			// 获取滚动高度
			let systemInfo = uni.getSystemInfoSync()
			this.scrollHeight = systemInfo.windowHeight
		},
		onShow() {
			// 初始化设置页面信息
			this.pageIndex = 0;
			this.loadingType = 0;
			// 清除数据
			this.list.splice(0, this.list.length)
			// 重新加载
			this.loadData()
		},
		methods:{
			// 加载列表数据
			async loadData() {
				if(this.loadingType !== 0) {
					return
				}
				this.loadingType = 1
				let pageIndex = this.pageIndex + 1
				let res = await this.$service.work_execute.list(pageIndex, this.pageSize, this.title)
				this.loadingType = 0
				// 获取数据
				if(res.success) {
					let {items} = res.data
					if(items.length > 0) {
						this.pageIndex = pageIndex
						let listLength = this.list.length
						for(let i =0; i<items.length; i++) {
							items[i].create_by_name = this.userList[items[i].create_by] || ''
							this.list.push(items[i])
							if(!this.userList.hasOwnProperty(items[i].create_by)) {
								this.loadUserName(items[i].create_by, listLength + i)
							}
						}
					}
					if(res.data.count <= this.pageSize * this.pageIndex) {
						this.loadingType = 2
					}
				}
				if(this.list.length === 0) {
					this.loadingType = 3
				}
			},
			async loadUserName(user_id, index) {
				if(!this.userAddArray.hasOwnProperty(user_id)) {
					this.userAddArray[user_id] = []
					this.userAddArray[user_id].push(index)
					let res = await this.$service.user.detail(user_id)
					if(res.success) {
						this.userList[user_id] = res.data.user_name
						for(let i =0; i<this.userAddArray[user_id].length; i++) {
							let idx = this.userAddArray[user_id][i]
							if(this.list.length > idx) {
								let cur = this.list[idx]
								cur.create_by_name = this.userList[user_id]
								this.list.splice(idx, 1, cur)
							}
						}
						delete this.userAddArray[user_id]
					}
				} else {
					this.userAddArray[user_id].push(index)
				}
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.have{
		padding-top: 10rpx;
		background-color: #e1f2fb;
	}
	.none{
		background-color: #fff;
	}
	.list{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin-top: 20rpx;
	}
	.list .item{
		width: 90%;
		min-height: 280rpx;
		padding: 20rpx;
		margin: 10rpx 0;
		background-color: #fff;
		border-radius: 10rpx;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	text {
		padding: 10rpx 0 10rpx 0;
		font-size: 32rpx;
		color: #666;
	}
	.head{
		width: 100%;
		height: auto;
		border-bottom: 2rpx dashed #ccc;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}
	.head:before{
		content: '';
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		background-color: #e1f2fb;
		position: absolute;
		bottom: -19rpx;
		left: -38rpx;
	}
	.head:after{
		content: '';
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		background-color: #e1f2fb;
		position: absolute;
		bottom: -19rpx;
		right: -38rpx;
	}
	.title{
		font-size: 33rpx;
		color: #000;
		width: 80%;
	}
	.status{
		width: 20%;
		height: 35rpx;
		font-size: 29rpx;
		line-height: 35rpx;
		text-align: center;
		border-radius: 30rpx;
		color: #ff926b;
		background-color: #ffe9c5;
		margin: 20rpx;
	}
	
</style>
