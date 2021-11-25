<template>
	<view>
		<view class="contentbox">
			<view class="ranktitle">
				<text class="iconfont icon-huoyan"></text>
				{{module.name}}
			</view>
			<view class="rankcont">
				<view class="contitem" v-for="item in module.itemList.bookList" :key="item.bookId" >
					<navigator :url="`/pages/bookinfo/bookinfo?id=${item.bookId}`" hover-class="none"
						open-type="navigate">
						<image class="bookimg" :src="item.cover" mode="widthFix">
							<!-- <text class="iconfont icon-daochu1024-26"></text> -->
						</image>
						<view class="bookname">{{item.name}}</view>
						<view class="readnum">
							<text class="iconfont icon-huoyan"></text>
							{{item.readNumText}}
						</view>
					</navigator>
				</view>
			</view>
			<navigator class="more" :url="`/pages/rankmore/rankmore?${malehoturl}&title=${module.name}`"
				hover-class="none">查看完整榜单>>></navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ranckCom",
		props:['module'],
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
