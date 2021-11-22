<template>
	<view class="content">
		<van-search :value="value" shape="round" background="#e3dae9" placeholder="请输入搜索关键词" bind:change="onChange"
			bind:search="onSearch" />
		<!-- 轮播图 -->
		<!-- <swiper class="swiper" indicator-dots="true" indicator-color="rgba(0,0,0,.3)" autoplay="true"
			interval="5000" duration="1000" circular="true">
			<swiper-item class="swpitem" v-for="item in banner"  v-key="id">
				<navigator url="/pages/list/list" open-type="navigate" hover-class="none">
					<image class="swpimg" :src="item.img" mode="widthFix" lazy-load="true" />
				</navigator>
			</swiper-item>
		</swiper> -->
		<!-- 宫格 -->
		<van-grid column-num="3" gutter=" 10 " border="false">
		    <van-grid-item class="gridbgc" v-for="item in slide" v-key="id"  text="item.name" url="item.url" link-type="item.link">
		          <view slot="icon"><text class="iconfont item.icon"></text></view>
		    </van-grid-item>
		</van-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				 slide:[
				      {
				        id:1,
				        name:"分类",
				        url:"/pages/classify/classify",
				        icon:"icon-fenlei",
				        link:"navigateTo"
				      },
				      {
				        id:2,
				        name:"排行榜",
				        url:"/pages/rank/rank",
				        icon:"icon-paihangbang",
				        link:"navigateTo"
				      },
				      {
				        id:3,
				        name:"听书",
				        url:"/pages/listen/listen",
				        icon:"icon-yangqitingshu",
				        link:"switchTab"
				      }
				     
				    ],
				    shortps:[],
				    populars:[],
				    likelist:[],
				    shortpid:null,
				    popid:null,
				    likeid:null,
				    value:null
				
				  },
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
