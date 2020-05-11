<template>
	<view class="main">
		<view class="logo">
			<image src="../../../static/logo.png" mode=""></image>
		</view>
		<view class="uni-flex uni-row form">
			<view class="flex-item form-input">
				<text>用户名</text>
				<input type="text" placeholder="请输入用户名">
			</view>
			<view class="line"></view>
			<view class="flex-item form-input">
				<text>密码</text>
				<input type="text" password placeholder="请输入密码">
			</view>
		</view>
		<view class="button">
			<button>登录</button>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.main{
		background-color: #46b3e6;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		align-content: center;
		flex-direction: column;
		justify-content: center;
	}
	.logo{
		margin: 20rpx 0;
	}
	.logo image{
		width: 332rpx;
		height: 113rpx;
	}
	.form{
		width: 90%;
		height: 370rpx;
		border-radius: 10rpx;
		background-color: #fff;
		font-size: 30rpx;
		align-items: center;
		align-content: stretch;
		margin: 30rpx 0;
		color: #666;
	}
	.form .form-input{
		margin: 30rpx 0;
	}
	.form-input text, .form-input input{
		padding: 20rpx 0 16rpx 18rpx;
	}
	::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	    font-size: 1rem;
	    color: #ccc;
	}
	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	    font-size: 1rem;
	    color: #ccc;
	}
	::-moz-placeholder { /* Mozilla Firefox 19+ */
	    font-size: 1rem;
	    color: #ccc;
	}
	:-ms-input-placeholder { /* Internet Explorer 10-11 */
	    font-size: 1rem;
	    color: #ccc;
	}
	.line{
		width: 100%;
		height: 2rpx;
		border-bottom: 2rpx solid #ccc;
	}
	.button{
		width: 90%;
	}
	button{
		background-color: #f39422;
		color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 36rpx;
	}
</style>
