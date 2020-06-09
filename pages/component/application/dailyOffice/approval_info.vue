<template>
	<view class="container">
		<view class="info">
			<view class="head">
				<image src="../../../../static/default_user.png" mode=""></image>
				<view class="name">
					<text>{{create_by_name}}</text>
					<text-time :time="create_time"></text-time>
				</view>
			</view>
			<view class="content">
				<text><text class="span">审批编号：</text> {{flow_data_code}}</text>
				<text><text class="span">申请人：</text>{{create_by_name}}</text>
				<text><text class="span">申请时间：</text><text-time :time="create_time"></text-time></text>
				<text><text class="span">说明：</text>{{flow_data_remark}}</text>
			</view>
			<view class="more">
				<text>查看更多>></text>
			</view>
		</view>
		<view class="process">
			<view class="ul">
				<view class="item" v-for="(item, index) in tasks" :key="index" >
					<uni-icons :class="{'point': pointClass(index)}" :type="statusType(index)" size="18" color="#46b3e6"></uni-icons>
					<view class="content">
						<image class="default_img" src="../../../../static/default_user.png" mode=""></image>
						<view class="detail">
							<view class="name_info">
								<view>{{item.name}}</view>
								 <view class="span">{{item.user_name}}</view>
							</view>
							<view class="opinion">意见：{{item.taskDesc}}</view>
						</view>
					</view>
					<view class="status">{{item.statusDesc}}</view>
				</view>
			</view>
		</view>
		<view class="btn_container" v-if="apply && title && !!currentTask">
			<view class="current" v-if="!!currentType">
				<view class="btn reject" @click="reject">反驳</view>
				<view class="btn agree" @click="agree">同意</view>
			</view>
			<view v-else class="current">
				<view class="btn pc_btn">请前往PC端审批</view>
			</view>
		</view>
		<uni-popup ref="rejectDialog" type="dialog">
		    <uni-popup-dialog type="input" message="成功消息" title="驳回理由" :duration="duration" :before-close="true" @close="closeReject" @confirm="confirmReject">
				<template v-slot:opinions>
					<view class="dialog_container">
						<textarea value="" v-model="rejectRemark" placeholder-class="dialog_placeholder" placeholder="请输入驳回理由"/>
					</view>
				</template>
			</uni-popup-dialog>
		</uni-popup>
		
		<uni-popup ref="agreeDialog" type="dialog">
		    <uni-popup-dialog type="input" message="成功消息" title="审批意见" :duration="duration" :before-close="true" @close="closeAgree" @confirm="confirmAgree">
				<template v-slot:opinions>
					<view class="dialog_container">
						<textarea value="" v-model="agreeRemark" placeholder-class="dialog_placeholder" placeholder="请输入审批意见"/>
					</view>
				</template>
			</uni-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>	
	import uniPopupDialog from '../../../../components/uni-popup/uni-popup-dialog.vue'
	import uniPopup from '../../../../components/uni-popup/uni-popup.vue'
	import auditType from '@/common/js/audit.js'
	import { mapState } from 'vuex'

	export default {
		components: { uniPopupDialog, uniPopup },
		data(){ 
			return{
				id: 0,
				execution_id: 0,
				apply: false,
				duration: 2000,
				currentType: '',
				agreeRemark: '',
				rejectRemark: '',
				create_by: 0,
				create_by_name: '',
				create_time: '',
				flow_data_code: '',
				flow_data_remark: '',
				usersObj: {}, // 用户信息
				tasks: [],
				title: '',
				handle_results: [],
				currentTask: null,
				query_next_task: {}
			}
		},
		computed: {
			...mapState(['userInfo']),
			pointClass() {
				return function(index) {
					return index+1 !== this.tasks.length
				}
			},
			statusType() {
				return function(index) {
					return index+1 === this.tasks.length ? 'circle-filled' : 'checkbox-filled'
				}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.execution_id = e.execution_id
			this.apply = !!e.apply
			this.init()
		},
		methods:{
			async init() {
				let res = await this.$service.work_execute.info(this.execution_id);
				let {data} = res
				if(res.success) {
					this.title = data.title || '';
					uni.setNavigationBarTitle({
						title: data.title || ''
					})
					this.create_time = data.create_time;
					this.create_by = data.create_by;
					this.flow_data_code = data.flow_data_code;
					this.flow_data_remark = data.flow_data_remark;
					this.handle_results = res.data.handle_results || [];
					this.loadCreateBy()
					let tasks = data.tasks;
					console.log('user_id', this.userInfo.user_id)
					console.log(tasks)
					for(let i = 0; i<tasks.length; i++) {
						tasks[i].statusDesc = this.getTaskStatusDesc(i, tasks[i]);
						tasks[i].taskDesc = this.getTaskDesc(tasks[i]);
						tasks[i].status = true;
						// 判断最后一条信息是否驳回
						if (i > 0 && i == tasks.length - 1 && !tasks[i].being) {
							tasks[i].status = this.getLastResult(tasks[i].assignee);
							tasks[i].statusDesc = tasks[i].status ? '已审批' : '已驳回';
						}
						this.tasks.push(tasks[i])
						this.loadTaskUser(i, tasks[i].assignee);
						// 当前人需要处理的task
						if (tasks[i].being && tasks[i].assignee == this.userInfo.user_id) {
							this.currentTask = tasks[i];
						}
					}
					this.setCurrentType()
					if(this.apply) {
						this.queryNextTask()
					}
				}
			},
			async loadCreateBy () {
				await this.loadUserInfo(this.create_by)
				this.create_by_name = this.usersObj[this.create_by]
			},
			// 存取用户对象 
			async loadUserInfo(user_id) {
				let res = await this.$service.user.detail(user_id)
				if(res.success) {
					this.usersObj[user_id] = res.data.user_name
				}
				return res
			},
			// 获取任务状态
			getTaskStatusDesc(index, task) {
				if(index === 0) {
					return "发起流程"
				} else if (task.being) {
					return "待审批"
				} else {
					return "已审批"
				}
			},
			// 获取任务描述
			getTaskDesc(task) {
				if (!task.being && task.hasOwnProperty('task_parm') && task['task_parm'].hasOwnProperty(task.activity_id)) {
					return task['task_parm'][task.activity_id];
				} else {
					return "未填写意见";
				}
			},
			// 获取最后一条审批是否通过
			getLastResult(user_id) {
				for (let i = this.handle_results.length - 1; i >= 0; i--) {
					if (user_id == this.handle_results[i].user_id) {
						return this.handle_results[i].result == 0;
					}
				}
				return true;
			},
			async loadTaskUser(index, user_id){
				if(!this.usersObj.hasOwnProperty(user_id)) {
					await this.loadUserInfo(user_id)
				}
				this.tasks[index].user_name = this.usersObj[user_id]
				this.tasks.splice(index, 1, this.tasks[index])
			},
			setCurrentType() {
				for(let i = 0; i<auditType.length; i++) {
					if (this.title.indexOf(auditType[i].name) > -1) {
						this.currentType = auditType[i];
						break;
					}
				}
			},
			queryNextTask() {
				
			},
			closeReject() {
				this.$refs.rejectDialog.close()
				this.rejectRemark = ''
			},
			reject() {
				this.$refs.rejectDialog.open()
			},
			confirmReject() {
				this.$refs.rejectDialog.close()
			},
			agree() {
				this.$refs.agreeDialog.open()
			},
			closeAgree() {
				this.$refs.agreeDialog.close()
				this.agreeRemark = ''
			},
			confirmAgree() {
				this.$refs.agreeDialog.close()
			}
 		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	.info{
		width: 97.5%;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 10rpx;
	}
	.head{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		border-bottom: 2rpx dashed #c2f0fc;
	}
	image{
		width: 80rpx;
		height: 80rpx;
		padding: 25rpx;
	}
	.name{
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		font-size: 30rpx;
		color: #666;
	}
	.name text:first-child{
		font-size: 36rpx;
		color: #383838;
	}
	.info .content{
		display: flex;
		flex-direction: column;
		font-size: 33rpx;
		padding: 18rpx;
		color: #383838;
	}
	.info .content .span{
		color: #9E9E9E;
		font-size: 30rpx;
	}
	.more{
		width: 50%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		border-radius: 60rpx;
		text-align: center;
		margin-left: 25%;
		margin-bottom: 25rpx;
		background-color: #ecfcff;
		color: #54CBF2;
	}
	.process{
		width: 97.5%;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 10rpx;
		margin-top: 15rpx;
		height: 44%;
		overflow: hidden;
	}
	.item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		margin: 32rpx 0 40rpx 0;
		height: 135rpx !important;
		max-height: 200rpx !important;
		box-sizing: border-box;
	}
	.item>.point{
		height: inherit;
	}
	.point{
		position: relative;
	}
	.point::after{
		content: '';
		width: 1rpx;
		height: inherit;
		border: 2rpx dashed #46b3e6;
		position: absolute;
		left: 21rpx;
		top: 58rpx;
	}
	.item .content{
		display: flex;
		flex-direction: row;
		width: 70%;
	}
	.default_img{
		width: 64rpx !important;
		height: 64rpx !important;
		padding: 14rpx;
	}
	.name_info view{
		display: inline-block;
	}
	.name_info .span{
		color: #666;
		padding-left: 10rpx;
	}
	.opinion{
		display: inline-block;
		color: #666;
		height: 90rpx;
		overflow-y: scroll;
	}
	.detail{
		display: flex;
		flex-direction: column;
		width: 86%;
	}
	.status{
		min-width: 110rpx;
		margin-left: auto;
		padding: 17rpx;
		height: 20rpx;
		line-height: 20rpx;
		background-color: #ffe7d1;
		color: #e47312;
		border-radius: 30rpx;
		text-align: center;
	}
	.btn_container{
		width: 100%;
		height: 110rpx;
		background-color: #fff;
		position: absolute;
		bottom: 0;
	}
	.current{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: inherit;
	}
	.btn{
		width: 180rpx;
		height: 70rpx;
		font-size: 35rpx;
		text-align: center;
		line-height: 70rpx;
		color: #fff;
		padding: 0 10rpx;
	}
	.reject{
		background-color: #fab95b;
	}
	.agree{
		background-color: #b0deff;
	}
	.pc_btn{
		width: 300rpx;
		background-color: #b1bed5;
		cursor: not-allowed;
	}
	.dl_title{
		font-size: 30rpx;
	}
	.dialog_container{
		width: 100%;
	}
	textarea{
		width: 640rpx;
		background-color: #F2F2F2;
		margin: 0 60rpx;
		border-radius: 10rpx;
		padding: 10rpx;
		color: #666;
		font-size: 35rpx;
	}
</style>
