<template>
	<view>
		<scroll-view scroll-y="true">
			<view v-for="item in con" :key="item.id" class="item" @click="mulu(item)">
				<image :src="item.cover" mode="widthFix" class="itemimg"></image>
				<view class="right">
					<view class="name">{{item.name}}</view>
					<view class="desc">{{item.desc}}</view>
					<view class="author">
						<text class="iconfont icon-fl-renyuan">
						</text>{{item.author}}
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import {
		requestGet,
		getResourceListURL
	} from "@/utils/http.js";
	export default {
		data() {
			return {
				con: [],
			}
		},
		onLoad(options) {
			console.log(options)
			this.entityId = options.entityId
			this.id = options.id
			this.getResourceData();
		},
		methods: {
			async getResourceData() {
				const result = await requestGet(getResourceListURL + this.entityId)
				this.con = result.books
				console.log(this.con)
			},
			mulu(item){
				uni.navigateTo({
				    url: '/pages/listaa/listaa?id=' + item.id
				})
			}

		}
	}
</script>

<style lang="less" scoped>
	.item {
		height:145px;
		display: flex;
		image {
			height:100%;
			flex: 2;
		}

		.right {
			height:100%;
			padding: 5px;
			flex: 5;
			display: flex;
			  flex-direction: column;
			.name{
				flex:1;
				font-weight: 700;	
			}
			.desc{
				flex:2;
				font-size: 14px;
				overflow: hidden;
			}
			.author{
				flex: 1;
				font-weight: 700px;
			
			.iconfont{
				color: orange;
				font-size: 24px;
			}}
		}

	}
</style>
