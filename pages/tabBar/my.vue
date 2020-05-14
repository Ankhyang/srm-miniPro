<template>
	<view class="main">
		<view class="content">
			<view class="set">
				<image src="../../static/set.png" mode=""></image>
			</view>
			<view class="logo">
				<image src="../../static/user-logo.png" mode=""></image>
			</view>
			<text class="name">{{userInfo.nick_name}}</text>
		</view>
		<view class="list">
			<navigator url="/pages/component/my/my_information" hover-class='none'>
				<view class="item">
					<image src="../../static/personal_info.png" mode=""></image>
					<text>我的信息</text>
					<image src="../../static/arrow_right.png" mode=""></image>
				</view>
			</navigator>
			<navigator url="/pages/component/my/account_security" hover-class='none'>
				<view class="item">
					<image src="../../static/security.png" mode=""></image>
					<text>账号与安全</text>
					<image src="../../static/arrow_right.png" mode=""></image>
				</view>
			</navigator>
			<navigator url="/pages/component/my/message_notification" hover-class='none'>
				<view class="item">
					<image src="../../static/info.png" mode=""></image>
					<text>消息通知</text>
					<image src="../../static/arrow_right.png" mode=""></image>
				</view>
			</navigator>
			<navigator url="/pages/component/my/service_counter" hover-class='none'>
				<view class="item">
					<image src="../../static/contact.png" mode=""></image>
					<text>服务台信息</text>
					<image src="../../static/arrow_right.png" mode=""></image>
				</view>
			</navigator>
			<navigator url="/pages/component/my/about" hover-class='none'>
				<view class="item">
					<image src="../../static/about.png" mode=""></image>
					<text>关于</text>
					<image src="../../static/arrow_right.png" mode=""></image>
				</view>
			</navigator>
			<view class="logout-container">
				<view class="logout" @tap="logout">
					<image src="../../static/logout.png" mode=""></image>
					<text>退出登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(['hasLogin', 'tokenInfo', 'userInfo'])
		},
		onShow() {
			if(!this.hasLogin) {
				uni.reLaunch({
					url: '/pages/component/login/login'
				})
			} else {
				this.loadUserInfo()
			}
		},
		methods:{
			...mapActions(['setUserInfo']),
			async loadUserInfo () {
				let res = await this.$service.user.curUserDetail()
				
				if(res.success) {
					this.setUserInfo(res.data)
				}
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定退出当前登录用户吗？',
					cancelColor: '#666',
					confirmColor: '#F83941',
					success({ confirm, cancel }){
						if(confirm) {
							
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		height: 100%;
		background-color: #fff;
		overflow: hidden;
	}
	.content{
		height: 30%;
		background-color: #74F9FF;
		background-image: linear-gradient(295deg,#74F9FF 0%,#00E0FF 100%);
		background-image: -webkit-linear-gradient(295deg,#74F9FF 0%,#00E0FF 100%);
		background-image: -moz-linear-gradient(295deg,#74F9FF 0%,#00E0FF 100%);
		background-image: -o-linear-gradient(295deg,#74F9FF 0%,#00E0FF 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	.set{
		width: 100%;
	}
	.set image{
		width: 50rpx;
		height: 50rpx;
		margin-top: 20rpx;
		margin-left: 90%;
	}
	.logo image{
		width: 128rpx;
		height: 128rpx;
	}
	.content text{
		color: #fff;
		font-size: 36rpx;
	}
	.list navigator{
		width: 100%;
		height: 110rpx;
		margin: 10rpx 4rpx;
	}
	.list .item {
		width: 96%;
		height: inherit;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin: 16rpx;
		border-radius: 20rpx;
		background-color: #fff;
		-moz-box-shadow: 0rpx 4rpx 6rpx #CCE1FF;
		-webkit-box-shadow: 0rpx 4rpx 6rpx #CCE1FF;
		box-shadow: 0rpx 4rpx 6rpx #CCE1FF;
	}
	.list .item image {
		width: 64rpx;
		height: 64rpx;
		margin: 0 20rpx;
	}
	.list .item image:last-child{
		margin-left: auto;
	}
	.list .item text {
		font-size: 32rpx;
	}
	.logout-container{
		width: 40%;
		margin-left: 30%
	}
	.logout {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
	}
	.logout image{
		width: 58rpx;
		height: 58rpx;
	}
	.logout text{
		padding-left: 10rpx;
		font-size: 38rpx;
		color: #F83941;
		text-decoration: underline;
	}
</style>
