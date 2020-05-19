<template>
	<view class="container">
		<view class="header">
			<view class="approval">
				<navigator class="item" url="./approval_list" hover-class="none">
					<image src="../../../../static/approval.png" mode=""></image>
					<text>待审批</text>
				</navigator>
				<navigator class="item" url="./approval_history" hover-class="none">
					<image src="../../../../static/approvaled.png" mode=""></image>
					<text>已审批</text>
				</navigator>
			</view>
		</view>
		<view class="content">
			<text class="tag">业务流程</text>
			<view class="list">
				<navigator v-for="(item, index) in type" :key="index" :url="`/pages/component/application/dailyOffice/approval_list?name=${item.name}`" class="item" hover-class="none">
					<image :src="item.image" mode=""></image>
					<text>{{item.name}}</text>
					<image src="../../../../static/m-next.png" mode=""></image>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import type from '@/common/js/audit.js'
	export default{
		data(){
			return {
				type: []
			}
		},
		onLoad() {
			this.type = type
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 100%;
	}
	.header{
		width: inherit;
		height: 140rpx;
		position: relative;
		background-color: #0066CC;
	}
	.approval{
		width: 84%;
		height: 200rpx;
		margin: 0 auto;
		border-radius: 14rpx;
		position: absolute;
		left: 8%;
		top: 33%;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.approval .item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
	}
	.approval .item image{
		width: 64rpx;
		height: 64rpx;
	}
	.content{
		width: 95%;
		height: 56%;
		margin: 130rpx 10rpx 10rpx 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
		overflow: hidden;
		position: relative;
	}
	.tag {
	    width: 140px;
	    height: 20px;
	    top: 16px;
	    left: -40px;
	    text-align: center;
	    line-height: 20px;
	    transform: rotate(-45deg);
	    position: absolute;
	    color: white;
	    background: #74d4c0;
	}
	.list{
		padding: 33rpx;
		margin-top: 4%;
		margin-left: 5%;

	}
	.list .item{
		padding: 25rpx 0 25rpx 10rpx;
		font-size: 32rpx;
		color: #444444;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.list .item image:first-child{
		width: 60rpx;
		height: 60rpx;
		margin-right: 15rpx;
	}
	.list .item image:last-child{
		width: 32rpx;
		height: 32rpx;
		margin-left: auto;
	}
</style>
