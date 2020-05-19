<script>
	import Token from '@/common/js/token.js'
	import { mapActions } from 'vuex'
    export default {
		methods:{
			...mapActions(['login', 'setUserInfo'])
		},
        onLaunch: function() {
            console.log('App Launch');
			// 获取token，存到缓存里面，再设置用户信息
			let token = Token.getTokenInfo()
			if(token) {
				this.login(token)
				let user = uni.getStorageSync('userInfo')
				if(user) {
					this.setUserInfo(user)
				}
			}
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        },
		globalData: {
			test: ''
		}
    }
</script>

<style>
    /* #ifndef APP-PLUS-NVUE */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */

    /* 以下样式用于 hello uni-app 演示所需 */
    page {
        background-color: #F4F5F6;
        height: 100%;
        font-size: 28rpx;
        line-height: 1.8;
    }

    .uni-header-logo {
        padding: 30rpx;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10rpx;
    }

    .uni-header-image {
        width: 100px;
        height: 100px;
    }

    .uni-hello-text {
        color: #7A7E83;
    }

    .uni-hello-addfile {
        text-align: center;
        line-height: 300rpx;
        background: #FFF;
        padding: 50rpx;
        margin-top: 10px;
        font-size: 38rpx;
        color: #808080;
    }

    /* #endif*/
</style>
