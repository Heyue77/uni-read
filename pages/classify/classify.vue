<template>
	<view>
		<!-- 分类页面 -->
		<view class='productNav'>
			<!-- 左侧 -->
			<view class='left'>
				<view :class="[active==0?'selected':'normal']" id="0" @click='switchNav'>男生</view>
				<view :class="[active==1?'selected':'normal']" id="1" @click='switchNav'>女生</view>
			</view>
			<!-- 右侧 -->
			<view class='right'>
				<view class='type'>
					<swiper :current='currentTab' vertical='true'>
						<swiper-item id="0" catchtouchmove="false">
							<scroll-view scroll-y="true">
								<view class="swpitem">
									<navigator :url="`/pages/classifylist/classifylist?${item.url}&title=${item.name}`"
										hover-class="none" class="rankitem" v-for="item in male" :key="item.url">
										<text class="title">{{item.name}}</text>
										<image class="img" :src="item.cover" mode="widthFix" />
									</navigator>
								</view>
							</scroll-view>
						</swiper-item>
						<swiper-item id="1" catchtouchmove="false">
							<scroll-view scroll-y="true">
								<view class="swpitem">
									<navigator :url="`/pages/classifylist/classifylist?${item.url}&title=${item.name}`"
										hover-class="none" class="rankitem" v-for="item in female" :key="item.url">
										<text class="title">{{item.name}}</text>
										<image class="img" :src="item.cover" mode="widthFix" />
									</navigator>
								</view>
							</scroll-view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		classifyURL
	} from "@/utils/http.js";
	export default {
		data() {
			return {
				active: 0,
				currentTab: 0,
				male: [],
				female: []
			}
		},
		onLoad() {
			this.getClassifyData();
		},
		methods: {

			switchNav: function(e) {
				var id = e.target.id;
				console.log(id)
				if (this.currentTab == id) {
					return false;
				} else {
					this.currentTab = id
				}
				this.active = id
			},
			async getClassifyData() {
				let result = await requestGet(classifyURL);
				console.log(result)
				this.male = result.ResponseObject[0].module[0].id==1? result.ResponseObject[0].module[0].itemList:result.ResponseObject[0].module[1].itemList;
				this.female =  result.ResponseObject[0].module[0].id==2? result.ResponseObject[0].module[0].itemList:result.ResponseObject[0].module[1].itemList;
				
				this.male.map((item)=>{
					item.url=item.url.slice(10)
				});
				this.female.map((item)=>{
					item.url=item.url.slice(10)
				})

			}
		}
	}
</script>

<style lang="less" scoped>
page {
	background-color: rgba(255, 255, 255, 0.3);
}

.productNav {
	display: flex;
	flex-direction: row;
	font-family: "Microsoft YaHei";
}
.left {
	width: 25%;
	font-size: 30rpx;
	background-color: #fff;
}
.left view {
	text-align: center;
	height: 90rpx;
	line-height: 90rpx;
}

.selected {
	background-color: #f4f4f4;
	border-left: 2px solid #c74772;
	font-weight: bold;
	color: #c74772;
}
.normal {
	background-color: #fff;
	// border-bottom: 1px solid #f2f2f2;
}
.right {
	width: 75%;
	margin: 0;
}
swiper {
	height: 100vh;
	background-color: #f4f4f4;
}
.type {
	background-color: #f4f4f4;
	// height: 800rpx;
}
.swpitem {
	display: flex;
	flex-wrap: wrap;
	.rankitem {
		width: 43%;
		background-color: #fff;
		height: 130rpx;
		line-height: 130rpx;
		text-align: center;
		margin: 10rpx;
		padding: 5rpx;
		border-radius: 30rpx;
		vertical-align: center;
		font-size: 14px;
		display: flex;
		border: 1px solid rgb(233, 191, 227);
		overflow: hidden;
		// navigator {
			display: flex;
			.title {
				flex: 2;
			}
			image {
				flex: 1;
				width: 70rpx !important;
				height: 150rpx !important;
				vertical-align: center;
			}
		// }
	}
}
scroll-view {
	height: 1200rpx;
}

</style>
