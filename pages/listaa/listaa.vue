<template>
	<view>
		<view class="tupian">
			<!-- #ifdef H5 -->
			<image class="tp" :src="resourcem.bookDetail?.bestCover" mode="widthFix"></image>
			
			<view class="xinxi">
				<text class="name">书名：{{resourcem.bookDetail?.name}}</text>
				<text class="author">作者:{{resourcem.bookDetail?.author}}</text>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<image class="tp" :src="resourcem.bookDetail.bestCover" mode="widthFix"></image>
			
			<view class="xinxi">
				<text class="name">书名：{{resourcem.bookDetail.name}}</text>
				<text class="author">作者:{{resourcem.bookDetail.author}}</text>
			</view>
			<!-- #endif -->
		</view>

		<scroll-view scroll-y="true">
			<view v-for="item in resource" :key="item.id" class="item" @click="bf(item)">
				{{item.name}}
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import {
		requestGet,
		getBookMenuURL,
		getBookDetailURL,
		
	} from "@/utils/http.js";
// import {
// 		formatRichText
// 	} from '@/utils/format.js'
	export default {
		data() {
			return {
				resource: [],
				resourcem: [],
				// resourceb: [],
				pageIndex: 1,
				flag: false,
			}
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
			this.getResourceData()
			this.getResourcemData()
			// this.getResourcebData()
		},
		methods: {
			async getResourceData() {
				// const result = await requestGet("https://m.lrts.me/ajax/getBookMenu?bookId=5181&pageNum=1&pageSize=50&sortType=0")
				const result = await requestGet(getBookMenuURL, {
					bookId: this.id,
					pageNum: this.pageIndex,
					pageSize:50,
					sortType:0,
				})
				this.resource = [...this.resource, ...result.list];
				console.log(result.list)
			},
			async getResourcemData() {
				const result = await requestGet(getBookDetailURL, {
					bookId: this.id
				});
				this.resourcem = result.data
	
				// console.log(this.resourcem)
			},
			// 获取播放资源
			
			bf(item) {
				uni.navigateTo({
				    url: '/pages/ts/ts?id=' + item.id+'&bookId='+this.id+'&section='+item.section
				})
			},
		},

		onReachBottom() {
			if (this.flag === false) {
				pageIndex: this.pageIndex++
				console.log(this.pageIndex);
				this.getResourceData();
			}

		},

		onPullDownRefresh() {
			pageIndex = 1;
			this.resource = [];
			this.getResourceData().then(() => {
				uni.stopPullDownRefresh();
			})
		}
	}
</script>

<style lang="less" scoped>
	.tupian {
		padding: 10px;
		display: flex;

		.tp {
			flex: 2;
		}

		.xinxi {
			flex: 5;
			display: flex;
			flex-direction: column;
			padding: 10px;

			.name {
				flex: 1;
				padding-top: 8px;
			}

			.author {
				flex: 1;
			}
		}
	}

	.item {
		line-height: 40px;
		padding-left: 8px;
	}
</style>
