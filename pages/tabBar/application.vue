<template>
	<view class="main">
		<view class="content">
			<view class="tag">
				<uni-tag text="日常办公" type="bright" size="small" circle mark></uni-tag>
			</view>
			<view class="list">
				<view class="item" @click="goToPage('../component/application/dailyOffice/approval_process')">
					<image src="../../static/approval.png" mode=""></image>
					<text>审批流程</text>
				</view>
				<view class="item" @click="goToPage('../component/application/dailyOffice/chart')">
					<image src="../../static/chart.png" mode=""></image>
					<text>报表</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="tag">
				<uni-tag text="采购执行" type="bright" size="small" circle mark></uni-tag>
			</view>
			<view class="list">
				<view class="item">
					<image src="../../static/vendor_info.png" mode=""></image>
					<text>供应商档案</text>
				</view>
				<view class="item">
					<image src="../../static/purchase_order.png" mode=""></image>
					<text>采购订单</text>
				</view>
				<view class="item">
					<image src="../../static/delivery_order.png" mode=""></image>
					<text>送货单</text>
				</view>
				<view class="item">
					<image src="../../static/entry_order.png" mode=""></image>
					<text>入库单</text>
				</view>
				<view class="item">
					<image src="../../static/return_order.png" mode=""></image>
					<text>退货单</text>
				</view>
				<view class="item">
					<image src="../../static/daily_evaluation.png" mode=""></image>
					<text>日常性评价</text>
				</view>
				<view class="item">
					<image src="../../static/purchase_catalogue.png" mode=""></image>
					<text>采购目录</text>
				</view>
				<view class="item">
					<image src="../../static/purchase_catalogue.png" mode=""></image>
					<text>价格目录</text>
				</view>
				<view class="item">
					<image src="../../static/contract.png" mode=""></image>
					<text>合同查询</text>
				</view>
				<view class="item">
					<image src="../../static/ppap.png" mode=""></image>
					<text>PPAP列表</text>
				</view>
				<view class="item">
					<image src="../../static/scar.png" mode=""></image>
					<text>SCAR通知单</text>
				</view>
				<view class="item">
					<image src="../../static/claim.png" mode=""></image>
					<text>索赔管理</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components:{ uniTag },
		data(){
			return {
				
			}
		},
		methods:{
			goToPage(url) {
				uni.navigateTo({url})
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.content{
		width: inherit;
		height: auto;
	}
	.tag{
		width: 30%;
		margin: 20rpx 0 20rpx 0rpx;
	}
	.list{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.list .item{
		width: 160rpx;
		height: 130rpx;
		margin: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.list .item image{
		width: 64rpx;
		height: 64rpx;	
		padding-bottom: 4rpx;
	}
</style>
