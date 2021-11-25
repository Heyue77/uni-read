<template>
	<view class="">
		<scroll-view scroll-y="true" class="container">
			<view class="book">
				<image class="bookimg" v-if="books.cover" :src="books.cover" mode="widthFix"></image>
				<view class="booktitle">{{books.name}}</view>
				<view class="bookauthor">{{books.author}}</view>
				<view class="cate">
					<uni-tag  :text="books.category" type="error" circle="true" size="small">
					</uni-tag>
				</view>
				<view class="bookstore">
					<text class="score">评分：{{books.score}}</text>
					<text class="line">|</text>
					<text class="count">{{books.peopleRate}}</text>
				</view>
				<view class="rate">
					<uni-rate allow-half="true" :readonly="true" :value="score" />
				</view>
		
			</view>
		
			<view class="grid">
				<view class="item">
					<text class="text">{{books.wordCount}}</text>
					<text class="name">总字数</text>
				</view>
				<view class="item">
					<text class="text">{{books.star}}</text>
					<text class="name">好评率</text>
				</view>
				<view class="item">
					<text class="text">{{books.update}}</text>
					<text class="name">最新状态</text>
				</view>
			</view>
			<view class="info">
				<view class="title">简介</view>
				<view class="longIntro " v-bind:class="[fold?'fold':'unfold']" @click="clickInfo">
					{{books.introduce}}
				</view>
				<text @click="clickInfo">{{fold?'查看全部':'收起'}}</text>
			</view>
			<view class="newcomment">
				<view class="commenttitle">最新评论</view>
				<view class="commentitem" v-for="item in commentlist" :key="item.CommentId">
		
					<image class="left" v-if="item.HeadUrl" :src="item.HeadUrl" mode="widthFix"></image>
		
					<view class="msg">
						<view class="name">{{item.SenderName}}</view>
						<view class="time">{{item.SendTime}}</view>
						<view class="content">{{item.Content}}</view>
					</view>
		
					<uni-rate class="right" allow-half="true" :readonly="true" :value="item.Score==0?'5':item.Score " />
		
				</view>
			
			</view>
			<view class="hobit">
				<view class="itemtitle">相似推荐</view>
				<navigator class="hobititem" :url="'/pages/bookinfo/bookinfo?id='+item.BookId" v-for="item in hobitlist"
					:key="item.BookId">
					<image class="hobitcover" v-if="item.Cover" :src="item.Cover" mode="widthFix"></image>
					<view class="itemname">{{item.Name}}</view>
				</navigator>
			</view>
		
		</scroll-view>
		<view class="btn">
			<view class="butt add ">加入书架</view>
			<navigator class="butt read" :url="'/pages/bookpage/bookpage?bookId='+books.bookId+'&chapterId='+books.chapterId">
				开始阅读
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		bookInfoURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				books: [],//书籍详情
				score: 5,//评分
				fold: true, //默认简介折叠
				hobitlist: [],//相似推荐列表
				commentlist: [],//最新评论列表
				
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getBookInfoData();
		},
		methods: {
			async getBookInfoData() {
				const result = await requestGet(bookInfoURL + this.id); //19187
				this.books = result.ResponseObject[0].module.book;
				this.score = Math.round(this.books.score * 2) / 2;
				this.hobitlist = this.books.hobitList.Data;
				this.commentlist = result.ResponseObject[0].module.commentList;
				
				
			},
			clickInfo: function(e) {
				this.fold = !this.fold;
				console.log(this.fold)
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		// padding: 0 20rpx;
		// height: 650px;
		height: 93vh;
		position: relative;
		color: #333;

		.book {
			overflow: hidden;
			padding: 20rpx;
			background-color: #fff;

			.bookimg {
				float: left;
				width: 250rpx;
				vertical-align: top;
				margin: 0 20rpx 20rpx 0;
			}

			.booktitle {
				font-size: 20px;
				font-weight: 700;
			}

			.bookauthor {
				font-size: 14px;
				margin: 20rpx 0;
			}

			.cate {
				margin: 20rpx 0;

				.bookauthor {
					margin-right: 18rpx;
				}
			}

			.bookstore {
				font-size: 14px;
				margin: 20rpx 0;

				.line {
					margin: 0 20rpx;
				}

				.count {

					color: #aaa;

				}
			}
		}

		.grid {
			display: flex;
			padding: 20rpx 0 40rpx 0;

			background-color: #fff;

			.item {
				flex: 1;
				display: flex;
				flex-direction: column;
				text-align: center;

				.name {
					color: #aaa;
					font-size: 14px;
				}
			}



		}

		.info {
			padding: 20rpx;
			font-size: 14px;

			.title {
				font-size: 16px;
				font-weight: 700;
				margin: 20rpx 0;
			}

			.longIntro {
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				display: -webkit-box;

			}

			.fold {
				-webkit-line-clamp: 3;
			}

			.unfold {
				-webkit-line-clamp: 0;
			}
		}

		.newcomment {

			.commenttitle {
				font-size: 16px;
				font-weight: 700;
				padding: 20rpx 10rpx;
				background-color: #fff;
			}

			.commentitem {
				padding: 20rpx;
				width: 100%;
				// height  : 200rpx;
				display: flex;
				flex-direction: row;
				position: relative;
				background-color: #fff;



				.left {
					flex: 1;
					margin-right: 20rpx;
					vertical-align: center;
				}


				.msg {
					flex: 5;
					display: flex;
					flex-direction: column;
					padding: 0 20rpx 10rpx 0;

					.time {
						font-size: 10px;
					}
				}

				.right {
					position: absolute;
					top: 0;
					right: 50rpx;
				}
			}
		}

		.hobit {
			margin: 60rpx 0rpx;
			overflow: hidden;
			display: inline-block;
			padding-bottom: 80rpx;
			// flex-direction: row;
			background-color: #fff;
			width: 100%;

			.itemtitle {
				font-size: 16px;
				font-weight: 700;
				padding: 20rpx 10rpx;

			}

			.hobititem {
				// flex      : 1;
				padding: 20rpx;
				width: 25%;
				float: left;
				text-align: center;
				box-sizing: border-box;


				.hobitcover {
					width: 90%;

				}

				.itemname {
					font-size: 14px;
				}
			}
		}

	}

	.btn {
		display: flex;
		flex-direction: row;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;

		.butt {
			width: 80%;
			flex: 1;
			padding: 10px 20rpx;
			margin: 20rpx;

			text-align: center;
			border-radius: 10px;

		}

		.add {
			background-color: rgb(141, 165, 180);
		}

		.read {
			background-color: rgb(189, 154, 159);
		}
	}
</style>
