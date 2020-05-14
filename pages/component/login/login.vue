<template>
	<view class="main">
		<view class="logo">
			<image src="../../../static/logo.png" mode=""></image>
		</view>
		<view class="uni-flex uni-row form">
			<view class="flex-item form-input">
				<image src="../../../static/user.png" mode=""></image>
				<input type="text" v-model="user_name" placeholder="请输入用户名">
			</view>
			<view class="flex-item form-input">
				<image src="../../../static/pwd.png" mode=""></image>
				<input type="text" password v-model="pwd" placeholder="请输入密码" @confirm="formSubmit">
			</view> 
		</view>
		<view class="button">
			<button @tap="formSubmit">登录</button>
		</view>
		<!-- 波浪特效 -->
		<view class="wave-wrapper">
			<i class="wave wave1"></i>
			<i class="wave wave2"></i>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import CryptoJS from '@/common/js/CryptoJS.js'
	export default {
		data(){
			return {
				user_name: 'jcloud-admin',
				pwd: ''
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods:{
			...mapActions(['login']),
			async formSubmit() {
				// 验证输入是否规范
				let login_name = this.user_name.trim(), password = this.pwd.trim()
				if(!login_name) {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					})
					return
				}
				if(!password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}
				// 密码转换
				password = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex)
				let res = await this.$service.user.tokens({
					login_name,
					password
				})
				if(res.success) {
					// 存入store
					this.login(res.data)
					uni.switchTab({
						url: '/pages/tabBar/message'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		height: 100%;
		position: relative;
		background-color: #e6f8f9;
		overflow: hidden;
	}
	.logo{
		width: 100%;
		height: 30%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #08AEEA;
		background-image: linear-gradient(30deg,#08AEEA 0%,#7BCDFD 100%);
		background-image: -webkit-linear-gradient(30deg,#08AEEA 0%,#7BCDFD 100%);
		background-image: -moz-linear-gradient(30deg,#08AEEA 0%,#7BCDFD 100%);
		background-image: -o-linear-gradient(30deg,#08AEEA 0%,#7BCDFD 100%);
	}
	.logo image{
		width: 332rpx;
		height: 113rpx;
	}
	.form{
		width: 94%;
		height: 40%;
		margin: 0 auto;
		position: absolute;
		z-index: 2;
		left: 3%;
		top:25%;
		border-radius: 20rpx;
		background-color: #fff;
		-moz-box-shadow:6rpx 10rpx 24rpx #ccc;
		-webkit-box-shadow:6rpx 10rpx 24rpx #ccc;
		box-shadow: 6rpx 10rpx 24rpx #ccc;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.form-input{
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 60rpx 20rpx;
		padding-left: 60rpx;
	}
	.form-input image{
		width: 50rpx;
		height: 50rpx;
	}
	.form-input input{
		width: 73%;
		border-bottom: 2rpx solid #ccc;
		padding-left: 10rpx;
		margin-left: 32rpx;
	}
	.button{
		position: absolute;
		left: 15%;
		top: 62%;
		z-index: 3;
		width: 70%;
		height: 64rpx;
	}
	.button button{
		color: #fff;
		font-size: 32rpx;
		border-radius: 70rpx;
		background-color: #08AEEA;
		background-image: linear-gradient(60deg,#08AEEA 0%,#A1F8F9 100%);
		background-image: -webkit-linear-gradient(60deg,#08AEEA 0%,#A1F8F9 100%);
		background-image: -moz-linear-gradient(60deg,#08AEEA 0%,#A1F8F9 100%);
		background-image: -o-linear-gradient(60deg,#08AEEA 0%,#A1F8F9 100%);
		box-shadow: 6rpx 6rpx 20rpx #A1F8F9;
	}
	.button button::after{
		border: 0;
	}
	.wave-wrapper{
		width: 100%;
		height: 80px;
		position: absolute;
		bottom: -5%;
	}
	.wave {
		width: 100%;
		height: 60px;
		position: absolute;
	}
	.wave1 {
		bottom: 20px;
		background: url(../../../static/wave_01.png);
		background-position: 0 0;
		opacity: 0.4;
		animation: moveLeft 15s linear infinite;
	}
	.wave2 {
		bottom: 10px;
		background: url(../../../static/wave_02.png);
		background-position: 0 0;
		opacity: 0.6;
		animation: moveRight 18s linear infinite;
	}
	@keyframes moveLeft {
		0% {
			background-position-x: 0;
		}
		100% {
			background-position-x: 3840rpx;
		}
	}
	@keyframes moveRight {
		0% {
			background-position-x: 0;
		}
		100% {
			background-position-x: -3840rpx;
		}
	}
</style>
