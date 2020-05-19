<template>
	<view class="container" :class="[list.length > 0 ? 'have' : 'none']">
		<scroll-view scroll-y :style="{'height': scrollHeight+'px'}" @scrolltolower="loadData" v-if="list.length > 0">
			<view class="list">
				<navigator class="item">
					<view class="head">
						<text class="title">采购寻源结果审批-测试0004(BA2020040002)</text>
						<text class="status">待审批</text>
					</view>
					<text>申请人：云之佳管理员</text>
					<text>时间：2020-02-23 16:30</text>
				</navigator>
			</view>
		</scroll-view>
		<view v-else class="no_data">
			<image src="../../../../static/no-data.png" mode=""></image>
		</view>
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
				list: [], // 数据列表
				userList: [] // 用户列表
			}
		},
		onLoad(e) {
			wx.setNavigationBarTitle({
				title: e.name || '待审批'
			})
			// 获取滚动高度
			let systemInfo = uni.getSystemInfoSync()
			this.scrollHeight = systemInfo.scrollHeight
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
			loadData() {
				
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
		padding-top: 20rpx;
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
	}
	.list .item{
		width: 90%;
		min-height: 280rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		position: relative;
	}
	.list .item:before{
		content: '';
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		background-color: #e1f2fb;
		position: absolute;
		top: 43%;
		left: -3%;
	}
	.list .item:after{
		content: '';
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		background-color: #e1f2fb;
		position: absolute;
		top: 43%;
		right: -3%;
	}
	text {
		padding: 10rpx 0 10rpx 0;
		font-size: 32rpx;
		color: #666;
	}
	.head{
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		border-bottom: 2rpx dashed #ccc;
	}
	.title{
		font-size: 33rpx;
		color: #000;
	}
	.status{
		width: 214rpx;
		height: 35rpx;
		font-size: 29rpx;
		line-height: 35rpx;
		text-align: center;
		border-radius: 30rpx;
		color: #ff926b;
		background-color: #ffe9c5;
		margin: 20rpx;
		margin-left: auto;
	}
	
</style>
