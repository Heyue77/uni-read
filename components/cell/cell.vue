<template>
	<view>
		<view class="list-item" v-for="item in list" :key="item.bookId">
			<navigator :url="`/pages/bookinfo/bookinfo?id=${item.BookId}`" class="qqq">
				<view class="listicon">
					<image v-if="item.Cover" :src="item.Cover" mode="widthFix"></image>
					<image v-else :src="item.cover" mode="widthFix"></image>
				</view>
				<view class="right">
					<view v-if="item.Name" class="btitle">
						{{item.Name}}
					</view>
					<view v-else class="btitle">
						{{item.name}}
					</view>
					<view v-if="item.Introduction" class="shortinfo">{{item.Introduction}}</view>
					<view v-else class="shortinfo">{{item.introduce}}</view>
					<view class="auty">
						<view class="author">
							<text class="iconfont icon-fl-renyuan"></text>
							<text v-if="item.Author">{{item.Author}}</text>
							<text v-else>{{item.author}}</text>

						</view>
						<view v-if="item.ReadNumText" class="type">{{item.ReadNumText}}</view>
						<view v-else-if="!item.category" class="type">{{item.readNumText}}人在看</view>
						<view v-if="item.category" class="type">{{item.category}}</view>
						<view v-if="item.score" class="type">{{item.score}}分</view>
					</view>
				</view>
			</navigator>

		</view>
	</view>
</template>

<script>
	export default {
		name: "cell",
		props: ["list"],
		data() {
			return {

			};
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.list-item {
		padding: 10rpx 30rpx;
		background-color: #fff;
		border-radius: 5%;

		&:first-of-type {
			border-radius: 0 0 5% 5%;
		}

		.qqq {
			display: flex;

			.listicon {
				flex: 2;
				width: 140rpx;
				height: 290rpx;
				display: inline-block;
				padding-right: 20rpx;

				image {
					width: 100%
				}
			}

			.right {
				flex: 5;
				flex-direction: column;
				display: flex;
				overflow: hidden;
				padding-top: 30rpx;

				.btitle {
					width: 100%;
					font-size: 32rpx;
					font-weight: 700;
				}

				.shortinfo {
					width: 100%;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					/*两行,超出为省略号*/
					-webkit-box-orient: vertical;
					align-content: center;
					color: #6A6A6A;
					font-size: 28rpx;
					margin-top: 20rpx;
				}

				.auty {
					width: 100%;
					display: flex;
					margin-top: 20rpx;

					.author {
						flex: 5;
						color: #6A6A6A;
						font-size: 24rpx;
					}

					.type {
						flex: 3;
						background-color: rgba(196, 180, 191, .3);
						border-radius: 30rpx;
						color: rgb(95, 91, 91);
						font-size: 10px;
						text-align: center;
						padding: 0 8rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

	}
</style>
