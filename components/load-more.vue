<template>
	<view class="main">
		<!-- 正在加载中 -->
		<view class="loading" v-if="loadingType === 1">
			<view class="loading-container">
				<view class="loading-circle"></view>
				<view class="loading-circle"></view>
				<view class="loading-circle"></view>
			</view>
			<text class="loading-text">{{contentText.refresh}}</text>
		</view>
		
		<!-- 没有更多数据了 -->
		<view class="noMore" v-else-if="loadingType === 3">
			<image :src="imageUrl+icon" mode=""></image>
			<text class="loading-text">{{contentText.noMore}}</text>
		</view>
		
		<!-- 加载更多 -->
		<view class="showMore" v-else>
			<text class="i"></text>
			<text v-if="loadingType === 0" class="loading-text">{{contentText.down}}</text>
			<text v-else-if="loadingType === 2" class="loading-text">{{contentText.noMore}}</text>
			<text class="i"></text>
		</view>
	</view>
</template>

<script>
	export default{
		name: "load-type",
		props:{
			loadingType:{
				// 上拉状态： -1不显示；0 loading前；1-loading中；2 没有更多了；3-还没有数据
				type: Number,
				default: 0
			},
			icon:{
				type: String,
				default: "no-data.png"
			},
			contentText: {
				type: Object,
				default(){
					return {
						down: '上拉显示更多',
						refresh: '正在加载...',
						noMore: '没有更多数据了'
					}
				}
			}
		},
		data(){
			return {
				imageUrl: '/static/'
			}
		}
	}
</script>

<style scoped>
	.loading-text{
		color: #999;
	}
	/* 加载更多 */
	.showMore {
		display: table;
		margin: 0 auto;
		padding-top: 40upx;
		padding-bottom: 65upx;
	}
	.showMore .i {
		width: 24upx;
		height: 1px;
		top: -7.5upx;
		position: relative;
		display: inline-block;
		background-color: #ccc;
	}
	
	/* 没有更多数据了 */
	.noMore{
		width: 100%;
		height: 100%;
		background: #fff;
		text-align: center;
	}
	
	/* 加载中 */
	.loading{
		width: 100%;
		text-align: center;
	}
	.loading-circle {
		margin: 20rpx;
		height: 30rpx;
		width: 30rpx;
		border-radius: 50%;
		display: inline-block;
		transform: scale(0);
		position: relative;
		animation: bulge 2s infinite ease-in-out;
	}
	.loading-circle::after {
		position: absolute;
		display: inline-block;
		content: '';
		height: 100%;
		width: 100%;
		border-radius: 50%;
		background-color: inherit;
		top: 0;
		left: 0;
		z-index: -1;
		transform: scale(1);
		animation: blow 2s infinite ease-in-out;
	}
	.loading-circle:nth-child(1) {
		background-color: #00bcd4;
		animation-delay: 0s;
	}
	.loading-circle:nth-child(2) {
		background-color: #f57b51;
		animation-delay: .25s;
	}
	.loading-circle:nth-child(3) {
		background-color: #1eb2a6;
		animation-delay: .5s;
	}
	@keyframes bulge {
		50% {
			transform: scale(1);
		}
	}
	@keyframes blow{
		25% {
			opacity: 0.5;
		}
		50% {
			opacity: 0.5;
		}
		90% {
			opacity: 0;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}
</style>
