<template>
	<view>
		<view class="shortp">
		    <view class="title">
		        <view class="titleTag">
		            <text class="iconfont icon-jinpai"></text>
		            <slot name="title">
		        </view>
		        <view class="more">
		            <navigator url="/pages/list/list?id=5" hover-class="none">
		                更多
		                <text class="iconfont icon-changyong_fanhui"></text>
		            </navigator>
		        </view>
		    </view>
		    <view class="shorpcontent">
		        <view class="shortpitem" wx:for="{{shortps}}" wx:for-item="item" wx:key="id">
		            <navigator url="/pages/bookinfo/bookinfo?id={{item.BookId}}" hover-class="none">
		                <view class="itemimg">
		                    <image src="{{item.Cover}}" mode="widthFix"></image>
		                </view>
		                <view class="">{{item.Name}}</view>
		                <view class="author">{{item.Author}}</view>
		            </navigator>
		        </view>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"store",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
