<template>
	<text>{{timeString}}</text>
</template>

<script>
	export default{
		props:{
			// 日期
			time: {
				type: String,
				default: ''
			},
			// 类型
			type: {
				type: Number,
				default: 0
			},
			format: {
				type: String,
				default: 'yyyy-MM-dd hh:mm'
			}
		},
		computed: {
			timeString() {
				if(this.time) {
					switch(this.type) {
						case 0:
							return this.$util.format(this.$util.newDate(this.time), this.format);
							break;
						case 1:
							return this.$util.msgTimeDesc(this.time);
							break;
						case 2:
							return this.$util.fommateDate(this.time);
							break;
						case 3:
							return this.$util.fommatetime(this.time);
							break;
					}
				}
				return ''
			}
		}
	}
</script>

<style>
</style>
