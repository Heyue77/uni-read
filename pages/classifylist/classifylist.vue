<template>
	<view>
		<view class="ctitle">
			{{title}}
		</view>
		<cell :list="booklist"></cell>
		<view class="more">
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'nomore'"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		baseURL
	} from "@/utils/http.js";
	export default {
		data() {
			return {
				title: '',
				booklist: [],
				loading: true,
				pageIndex: 1,
				actionid:null,
				type:'',
				id:null,
				title:'',
				flag: false
			}
		},
		onLoad(options) {
			console.log(options)
			this.title = options.title;
			this.actionid=options.actionid;
			this.type=options.type;
			this.id=options.id,
			this.title=options.title,
			this.getRankmoreData()
		},
		methods: {
			async getRankmoreData() {
				let result = await requestGet(baseURL +
					`actionid=${this.actionid}&type=${this.type}&id=${this.id}&name=${this.title}&pageindex=${this.pageIndex}`
				);
				console.log(result)
				this.booklist = [...this.booklist, ...result.ResponseObject[0].module.itemList]

			}
		},
		onReachBottom: function() {
			this.pageIndex = this.pageIndex+1;
			console.log("aaaaa")
			this.getRankmoreData()
		},
		onPullDownRefresh(){
			this.flag = false;
			this.booklist = [];
			this.pageIndex = 1;
			this.getRankmoreData().then(()=>{
				uni.stopPullDownRefresh();
			})
		}
	}
</script>

<style lang="less" scoped>
	.ctitle {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		background-color: #fff;
		text-align: center;
	}
</style>
