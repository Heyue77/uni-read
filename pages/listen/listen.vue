<template>
	<view>
		<view class="leibie">类别</view>
		<view class="item" v-for="item in list" :key="item.id" @click="itemClick(item)">
			<text class="title">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageIndex: 1,
				list: [{
						id: 0,
						title: "有声小说",
						entityId: 1
					},
					{
						id: 1,
						title: "儿童",
						entityId: 6
					},
					{
						id: 2,
						title: "文学",
						entityId: 78
					},
					{
						id: 3,
						title: "相声评书",
						entityId: 3
					},
					{
						id: 4,
						title: "历史",
						entityId: 9049
					},
					{
						id: 5,
						title: "财经",
						entityId: 3085
					},
					{
						id: 6,
						title: "戏曲",
						entityId: 4
					},
					{
						id: 7,
						title: "成功",
						entityId: 79
					},
					{
						id:8,
						title: "财经",
						entityId: 3085
					},
					{
						id:9,
						title: "穿越架空",
						entityId: 3109
					},
					{
						id:10,
						title: "其他",
						entityId: 2
					},
				]
			}
		},
		methods: {
			itemClick(item) {
				uni.navigateTo({
					url: '/pages/lista/lista?id=' + item.id + '&entityId=' + item.entityId
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.leibie{
		width:100%;
		font-size: 24px;
		line-height: 50px;
		text-align: center;
	}
	.item {
		background-color: percentage(0);
		// text-align: center;
		line-height: 50px;
		margin-left: 20px;

		.title {
			font-size: 18px;
			color: #333;
		}
	}
</style>
