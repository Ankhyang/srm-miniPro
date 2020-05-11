<template>
	<text>消息</text>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data(){
			return {
				
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onShow() {
			if(!this.hasLogin) { // 未登录
				uni.reLaunch({
					url: '/pages/component/login/login'
				})
			}
		}
	}
</script>

<style>
</style>
