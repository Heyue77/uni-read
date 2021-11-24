<template>
	<view class="bft">
		<view class="top">
			<!-- #ifdef H5 -->
			<image class="tp" :src="resourcem.bookDetail?.bestCover" mode="widthFix"></image>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<image class="tp" :src="resourcem.bookDetail.bestCover" mode="widthFix"></image>
			<!-- #endif -->
		</view>
		<view class="content">
			<!-- #ifdef H5 -->
			<view class="zu">
				<image class="zuo" src="@/static/tabs/zuo.png" mode="widthFix" @click="qec(resourceb)"></image>
			</view>
			<view @click="bf" class="tag">
				<text class="iconfont icon-bofang" v-show="!tag"></text>
				<text class="iconfont icon-zanting1" v-show="tag"></text>
			</view>
			<view class="yo">
				
				<image class="you" src="@/static/tabs/you.png" mode="widthFix" @click="nec(resourceb)"></image>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="zu">
				<image class="zuo" src="@/static/tabs/zuo.png" mode="widthFix" @click="qec(resourceb)"></image>
			</view>
			<view @click="bf" class="tag">
				<text class="iconfont icon-bofang" v-show="!tag"></text>
				<text class="iconfont icon-zanting1" v-show="tag"></text>
			</view>
			<view class="yo">
				
				<image class="you" src="@/static/tabs/you.png" mode="widthFix" @click="nec(resourceb)"></image>
			</view>

			<!-- #endif -->

		</view>
		<view class="bott">
			<h3>详情</h3>
			<!-- #ifdef H5 -->
			<text>{{resourcem.bookDetail?.desc}}</text>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<text>{{resourcem.bookDetail.desc}}</text>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		getPlayPathURL,
		getBookDetailURL
	} from "@/utils/http.js";
	const myAudio = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				resourcem: [],
				resourceb: [],
				tag: false
			}
		},
		onLoad(options) {
			console.log(options)
			this.section = options.section
			this.bookId = options.bookId
			this.id = options.id
			this.getResourcebData()
			this.getResourcemData()
		},

		methods: {

			async getResourcemData() {
				const result = await requestGet(getBookDetailURL, {
					bookId: this.bookId
				});
				this.resourcem = result.data
				console.log(this.resourcem, "nnnn")
			},

			// #ifdef H5
			async getResourcebData() {
				// const result = await requestGet("https://m.lrts.me/ajax/getPlayPath?entityId=36816&entityType=3&opType=1&sections=%5B1%5D&type=0")
				const result = await requestGet(getPlayPathURL, {
					entityId: this.bookId,
					entityType: 3,
					opType: 1,
					sections: `[` + this.section + `]`,
					type: 0
				});
				this.resourceb = result.list[0]
				console.log(this.resourceb, `[` + this.section + `]`, "xxxx")
			},
			bf() {
				myAudio.src = this.resourceb.path
				console.log(this.tag)
				this.tag = !this.tag
				if (this.tag === true) {
					myAudio.play()
				} else {
					myAudio.pause()
				}
			},
			nec(resourceb) {
				myAudio.pause()
				this.tag = false
				if (this.resourceb === undefined) {
					uni.showToast({
						title: `这是最后一个`,
						icon: 'none'
					})
				} else {
					this.section++
					this.getResourcebData()
				}

			},
			qec(resourceb) {
				this.tag = false
				myAudio.pause()
				if (this.section === 1) {
					uni.showToast({
						title: `这是第一个`,
						icon: 'none'
					})
				} else {
					this.section--
					this.getResourcebData()
				}

			},
			// #endif
			// #ifdef MP-WEIXIN
			async getResourcebData() {
				// const result = await requestGet("https://m.lrts.me/ajax/getPlayPath?entityId=36816&entityType=3&opType=1&sections=%5B1%5D&type=0")
				const result = await requestGet(getPlayPathURL, {
					entityId: this.bookId,
					entityType: 3,
					opType: 1,
					sections: [this.section]
				});
				this.resourceb = result.list[0]
				console.log(this.resourceb, "xxxx")
			},
			bf() {

				myAudio.src = this.resourceb.path
				console.log(this.tag)
				this.tag = !this.tag
				if (this.tag === true) {
					myAudio.play()
				} else {
					myAudio.pause()
				}
			},


			nec(resourceb) {
				this.tag = false
				myAudio.pause()
				if (this.resourceb === undefined) {
					uni.showToast({
						title: `这是最后一个`,
						icon: 'none'
					})
				} else {
					this.section++
					this.getResourcebData()
				}

			},
			qec(resourceb) {
				this.tag = false
				myAudio.pause()
				if (this.section === 1) {
					uni.showToast({
						title: `这是第一个`,
						icon: 'none'
					})
				} else {
					this.section--
					this.getResourcebData()
				}

			},
			// #endif

		}
	}
</script>

<style lang="less" scoped>
	//#ifdef MP-WEIXIN
	.bft {
		.tp {
			width: 100%;
		}
		.content {
			display: flex;
			.tag {
				flex: 1;
				text-align: center;
				.iconfont {
					font-size: 30px;
				}
			}
			.zu {
				flex: 1;

				.zuo {
					float: right;
					height: 30px;
					width: 30px;
				}
			}
			.yo {
				flex: 1;
				.you {
					float: left;
					height: 30px;
					width: 30px;
				}
			}
		}
	}
	.bott {
		width: 95%;
		margin: auto;
		background-color: #fff;
		border-radius: 5%;
		line-height: 30px;
	}
	//#endif
	//#ifdef H5
	.bft {
		.tp {
			width: 100%;
		}
		.content {
			width: 80%;
			height:50px;
			display: flex;
			.tag {	
				height: 100%;
				flex: 4;
				text-align: center;
				.iconfont {
					font-size: 50px;
				}
			}
			.zu {
				flex: 1;
				height: 100%;
				.zuo{
					width:100%;
					height:100%;
				}
			
			}
			.yo {
				flex: 1;
				height:100%;
				.you{
					width: 100%;
					height:100%;
				}
			}
		}
	}
	.bott {
		width: 95%;
		margin: auto;
		background-color: #fff;
		border-radius: 5%;
		line-height: 30px;
	}
	//#endif
</style>
