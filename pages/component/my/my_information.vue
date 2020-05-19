<template>
	<view class="main">
		<view class="list">
			<view class="item pic">
				<image src="../../../static/user-logo.png" mode=""></image>
			</view>
			<view class="item">
				<image src="../../../static/nickname.png" mode=""></image>
				<text>{{userInfo.nick_name}}</text>
			</view>
			<!-- <view class="item">
				<image src="../../../static/sex.png" mode=""></image>
				<text>女</text>
			</view> -->
			<view class="item">
				<image src="../../../static/position.png" mode=""></image>
				<text v-if="userInfo.organization">{{userInfo.organization.org_name}}</text>
			</view>
			<view class="item">
				<image src="../../../static/work_no.png" mode=""></image>
				<text v-if="userInfo.organization">{{userInfo.organization.org_code}}</text>
			</view>
			<view class="item">
				<image src="../../../static/telephone.png" mode=""></image>
				<text v-if="userInfo.member_info">{{userInfo.member_info.phone}}</text>
			</view>
			<view class="item">
				<image src="../../../static/email.png" mode=""></image>
				<text></text>
			</view>
			<view class="item">
				<image src="../../../static/address.png" mode=""></image>
				<text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		data(){
			return {
				
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onShow() {
			
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		height: 100%;
		background-color: #08AEEA;
		background-image: linear-gradient(287deg,#08AEEA 0%,#C3F3F4 50%,#ffffff 100%);
		background-image: -webkit-linear-gradient(287deg,#08AEEA 0%,#C3F3F4 50%,#ffffff 100%);
		background-image: -moz-linear-gradient(287deg,#08AEEA 0%,#C3F3F4 50%,#ffffff 100%);
		background-image: -o-linear-gradient(287deg,#08AEEA 0%,#C3F3F4 50%,#ffffff 100%);
		display: flex;
		align-items: center;
	}
	.list{
		width: 86%;
		height: 73%;
		margin: 0 auto;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		background-color: #fff;
	}
	.list .item {
		width: 100%;
		height: 14%;
		padding-left: 5%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center; 
	}
	.list .item image{
		width: 64rpx;
		height: 64rpx;
	}
	.list .item text{
		padding-left: 5%;
		font-size: 34rpx;
	}
	.list .pic{
		padding-left: 0;
		justify-content: center;
		position: relative;
	}
	.list .pic image{
		width: 200rpx;
		height: 200rpx;
		position: absolute;
		bottom: 2%;
	}
</style>
