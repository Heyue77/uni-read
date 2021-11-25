<template>
	<view class="shortp">
		<view class="title">
			<view class="titleTag">
				<slot name="icon" />
				<!-- <text class="iconfont icon-jinpai"></text> -->
				<slot name="title" />
			</view>
			<view class="more">
				<navigator url="/pages/morelist/morelist?id=5" hover-class="none">
					更多
					<text class="iconfont icon-changyong_fanhui"></text>
				</navigator>
			</view>
		</view>
		<view class="shorpcontent">
			<view v-if="shorpt!=[]" class="shortpitem" v-for="item in shortps" :key="item.BookId">
				<navigator :url="`/pages/bookinfo/bookinfo?id=${item.BookId}`" hover-class="none">
					<view class="itemimg">
						<image :src="item.Cover" mode="widthFix"></image>
					</view>
					<view class="">{{item.Name}}</view>
					<view class="author">{{item.Author}}</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "store",
		props:["shortps"],
		data() {
			return {
                 list:[]
			};
		},
	}
</script>

<style lang="less" scoped>
.shortp {
	width: 700rpx;
	margin: 30rpx;
	border-radius: 20rpx;
	background-color: #fff;
	overflow: hidden;
	.title {
		display: flex;
		margin-top: 20rpx;
		.titleTag {
			flex: 5;
			font-size: 20px;
			display: flex;
		}
		.more {
			flex: 2;
			text-align: right;
			margin-right: 25rpx;
			font-size: 14px;
			color: #aaa;
			.icon-changyong_fanhui {
				font-size: 12px;
			}
		}
	}
	.shorpcontent {
		display: flex;
		// padding: 30rpx;
		.shortpitem {
			width: 45%;
			flex: 1;
			text-align: center;
			box-sizing: border-box;
			margin: 30rpx 0;
			.itemimg {
				width: 100%;
				image {
					width: 80%;
				}
			}
			.author {
				font-size: 14px;
				color: #aaa;
				margin-top: 20rpx;
			}
		}
	}
}

</style>
