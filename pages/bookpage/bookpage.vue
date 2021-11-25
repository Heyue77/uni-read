<template>
	<view class="container">
		<scroll-view class="scroll " v-bind:class="[scrollValue?'fold':'unfold']" @click="getMenu"
			:style="{backgroundColor:backgroundcolor,color:color,fontSize:fontsize+'px'}" scroll-y="true"
			:scroll-top="scrollTop" @scroll="scroll">
			<rich-text class="content" :nodes="pages.txt" space="nbsp"></rich-text>
			<view class="change">
				<view class="prev item" @click="getPrev">上一章</view>
				<view class="next item" @click="getNext">下一章</view>
			</view>
		</scroll-view>
		<view class="menu " v-bind:class="[menuVlaue?'fold':'unfold']">
			<view class="list">
				<view class="prev item" @click="goPrev">上一章</view>
				<view class="catalog item" @click="getCata">目录</view>
				<view class="next item" @click="goNext">下一章</view>
			</view>
			<view class="color">
				<view class="white item" @click="bgWhite">白色</view>
				<view class="black item" @click="bgColorhui">黑色</view>
				<view class="green item" @click="bgColorlv">绿色</view>
			</view>
			<view class="font">
				<view class="big item" @click="fontbig">Aa+</view>
				<view class="small item" @click="fontsmall">Aa-</view>
			</view>
		</view>
		<scroll-view class="catapage " :class="[ cataValue?'fold':'unfold']" scroll-y="true"
			@scrolltolower="onReachBottom">
			<view class="catalog" v-for="item in chapters" :key="item.chapterId" @click="goPage" :id="item.chapterId">
				{{item.name}}
			</view>
			<view class="cancel" @click="getCata">取消</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		chapterURL,
		bookPageURL,
		requestGet
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				chapterindex: 0,
				pages: [],
				pageIndex: 1,
				chapters: [], //正序章节目录
				chapt: [],
				menuVlaue: true, //默认菜单不出现
				cataValue: true, //默认目录不出现
				scrollValue: false, //书籍内容页面，默认出现:0,
				screenHeight: null,
				screenWidth: null,
				scrollTop: 0, //滑动时距离顶部的距离
				oldscroll:0,
				backgroundcolor: "", //背景颜色
				bgColorwhite: "#eaeaea", //背景颜色为白色
				bgColorblack: "#666",
				bgColorgreen: "#d5f6d6",
				color: "", //字体颜色
				fontcolorblack: "#000", //字体颜色为黑色
				fontcolorwhite: "#eee",
				fontsize: 14, //字体大小,
				chapterIndex: 1,
				lastchapt: [],
				lastchapters: [], //倒序章节目录
				oldcata:true,



			}
		},
		onLoad(options) {
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.screenWidth = res.screenWidth;

				}
			})
			this.bookid = options.bookId;
			this.chapterid = options.chapterId;
			this.getPagesData();
			this.getChapterData();
		},
		//获取页面滚动出去的距离
		// onPageScroll(res) {
		// 	this.scrolltop = res.scrollTop
		// 	console.log(this.scrolltop, "lllllllll")

		// },
		methods: {
			async getPagesData() {
				uni.showToast({
					title: "加载中",
					icon: "loading",
					mask: true,
					duration: 1500
				});
				const result = await requestGet(
					bookPageURL +
					`bookId=${this.bookid}&IsPreload=0&chapterId=${this.chapterid}`
				);
				this.pages = result.ResponseObject[0].module;
				this.chapterIndex = this.pages.chapterIndex;
				uni.hideToast();
				if(this.pages.coin>0&&this.pages.noMoney==true){
					uni.showToast({
						title: "充值后才能阅读哦",
						mask: true,
						duration: 1500
					});
				}
				console.log(this.pages)

			},
			async getChapterData() {
				uni.showToast({
					title: "加载中",
					icon: "loading",
					mask: true,
					duration: 1500
				});
				const result = await requestGet(chapterURL + this.bookid, {
					pageIndex: this.pageIndex,
					pageSize: 20
				});
				this.chapt = result.ResponseObject[0].module.ascList; //正序每页章节
				this.chapters = [...this.chapters, ...this.chapt];
				this.lastchapt = result.ResponseObject[0].module.descList; //倒序每页章节
				this.lastchapters = [...this.lastchapters, ...this.lastchapt];

				uni.hideToast();


			},
			onReachBottom: function() {
				++this.pageIndex;
				this.getChapterData();
			},
			//当异步任务有了结果之后，就可以停止下拉刷新
			onPullDownRefresh: function() {
				this.getPagesData().then(() => {
					uni.stopPullDownRefresh();
				});
			},
			getMenu: function(event) { //375 667

				let xMid = this.screenWidth / 2;
				let yMid = this.screenHeight / 2;
				let x = event.detail.x;
				let y = event.detail.y;
				if (x > xMid - 100 && x < xMid + 100 && y > yMid - 150 && y < yMid + 120) {
					this.menuVlaue = !this.menuVlaue;
				}
				

			},
			//点击显示目录页面并隐藏原页面,取消隐藏菜单及目录
			getCata() {
				this.cataValue = !this.cataValue;
				this.scrollValue = !this.scrollValue;
				this.menuVlaue=this.oldcata;
				
			},
			goPage(e) {
				this.cataValue = !this.cataValue;
				this.scrollValue = !this.scrollValue;
				this.chapterid = e.target.id;
				this.getPagesData().then(() => {
					this.scrollTop=this.oldscroll;
					this.$nextTick(function() {
						this.scrollTop = 0;
					})
					
				});
				
			},
			scroll(e){
				this.oldscroll=e.detail.scrollTop;
			},
			//点击菜单下一章,菜单消失跳到下一章
			goNext() {
				this.menuVlaue = !this.menuVlaue;
				if (this.chapterIndex == this.pages.chapterCount) {
					//当前在最后一章
					uni.showToast({
						title: "已经是最新章节啦",
						icon: "loading",
						mask: true,
						duration: 800
					});
					return;
				}

				this.chapterid = this.pages.nextChapterId;
				this.getPagesData().then(() => {
					this.scrollTop=this.oldscroll;
					this.$nextTick(function() {
						this.scrollTop = 0;
					})
					
				});

				console.log(this.menuVlaue)
				//点击下一章先跳转章节再回到顶部
			},
			//点击内容下一章
			getNext() {
				if (this.chapterIndex == this.pages.chapterCount) {
					//当前在最后一章
					uni.showToast({
						title: "已经是最新章节啦",
						icon: "loading",
						mask: true,
						duration: 800
					});
					return;
				}
				this.chapterid = this.pages.nextChapterId;
				this.getPagesData().then(() => {
					this.scrollTop=this.oldscroll;
					this.$nextTick(function() {
						this.scrollTop = 0;
					})
				});

			},
			goPrev: function() {
				this.menuVlaue = !this.menuVlaue;
				if (this.chapterIndex == 1) {
					//当前在第一章
					uni.showToast({
						title: "已经在第一章啦",
						icon: "loading",
						mask: true,
						duration: 800
					});
					return;
				}
				this.chapterid = this.pages.prevChapterId;
				this.getPagesData().then(() => {
				this.scrollTop=this.oldscroll;
				this.$nextTick(function() {
					this.scrollTop = 0;
				})
				});
			},
			getPrev: function() {
				if (this.chapterIndex == 1) {
					//当前在第一章
					uni.showToast({
						title: "已经在第一章啦",
						icon: "loading",
						mask: true,
						duration: 800
					});
					return;
				}
				this.chapterid = this.pages.prevChapterId;
				this.getPagesData().then(() => {
					this.scrollTop=this.oldscroll;
					this.$nextTick(function() {
						this.scrollTop = 0;
					})
				});
			},
			bgWhite() {
				this.backgroundcolor = this.bgColorwhite;
				this.color = this.fontcolorblack;
			},
			bgColorhui() {
				this.backgroundcolor = this.bgColorblack;
				this.color = this.fontcolorwhite;
			},
			bgColorlv() {
				this.backgroundcolor = this.bgColorgreen;
				this.color = this.fontcolorblack;
			},
			fontbig() {
				this.fontsize++;

				if (this.fontsize > 20) {
					this.fontsize = 20;
					uni.showToast({
						title: '不能再大了',
					});
				}
			},
			fontsmall() {
				this.fontsize--;
				if (this.fontsize < 8) {
					this.fontsize = 8;
					uni.showToast({
						title: '不能再小了',
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}

	.container {

		position: relative;
		// #ifdef H5 */ 
		// height:93vh;
		// /* #endif */ 
		// /* #ifdef MP-WEIXIN */
		// height:100vh;
		// /* #endif 
		// margin-top: 40px;



		.scroll {
			padding: 0 20rpx;
			box-sizing: border-box;
			/* #ifdef H5*/
			height: 93vh;
			/* #endif*/
			/* #ifdef MP-WEIXIN*/
			height: 100vh;

			/* #endif*/
			.content {
				// height: 93vh;
				display: inline-block;
				line-height: 60rpx;
				text-indent: 2em;

			}

			.change {
				display: flex;

				.item {
					flex: 1;
					text-align: center;
					border: 1px solid #ccc;
					height: 60rpx;
					line-height: 60rpx;

				}
			}

		}





		.menu {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 300rpx;
			width: 100%;
			color: #000;
			font-size: 16px;
			background-color: #eee;

			.list {
				display: flex;
				border-bottom: 1px solid #e3e3e3;
			}

			.item {
				flex: 1;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
				// border     : 1px solid #aaa;
			}

			.color {
				display: flex;
				border-bottom: 1px solid #e3e3e3;

				.white {
					background-color: #eaeaea;
				}

				.black {
					background-color: #666;
				}

				.green {
					background-color: #d5f6d6;
				}

			}

			.font {
				display: flex;
				border-bottom: 1px solid #e3e3e3;
			}
		}

		.catapage {
			width: 100%;
			position: fixed;
			height: 100vh;
			/*  #ifdef  H5  */
			top: 88rpx;
			/* #endif */
			/*  #ifdef  MP-WEIXIN  */
			top: 0;
			/* #endif */
			left: 0;
			background-color: pink;
			display: none;

			.catalog {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				padding-left: 20rpx;
				background-color: #fff;
			}

			.cancel {
				height: 80rpx;
				width: 100%;
				text-align: center;
				line-height: 80rpx;
				position: fixed;
				bottom: 0;
				left: 0;
				background-color: #fff;
			}
		}

		.fold {
			display: none;
		}

		.unfold {
			display: block;
		}
	}
</style>
