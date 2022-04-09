<template>
  <view class="tui-container">

    <!--新闻列表-->
    <view class="tui-news-view">
      <block v-for="(item,index) in banner" :key="index">
        <tui-list-cell :index="index" @click="bannerDetail(item)">
          <view class="tui-news-flex" :class="['tui-flex-start']">
            <view class="tui-news-picbox" :class="['tui-w220 tui-h165']">
              <image :src="item.cover" mode="widthFix" class="tui-block"
                     :class="['']"></image>
            </view>
          </view>
          <view class="tui-news-tbox tui-flex-column tui-flex-between" :class="['tui-h165 tui-pl-20']">
            <view class="tui-news-title">{{ item.summary }}</view>
            <view class="tui-sub-box">
              <view class="tui-sub-source">{{ item.username }}</view>
              <view class="tui-sub-cmt">
                <view>{{ item.commentCount }}评论</view>
                <view class="tui-scale">
                  <tui-tag padding="10rpx 24rpx" :plain="true" shape="circleRight" v-if="item.original">置顶</tui-tag>
                </view>
              </view>
            </view>
          </view>
        </tui-list-cell>
      </block>

    </view>
  </view>
</template>

<script>
import {getAllArticleList, getTopArticleList} from "../../api/article";

export default {
  data() {
    return {
      banner: [],
    };
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      getAllArticleList().then(res => {
        this.banner = res;
      }).catch(err => {
        console.log(err)
      })
    },
    bannerDetail(item) {
      uni.navigateTo({
        url: '/pages/newsDetails/newsDetails?id=' + item.id
      })
    },
  }
}
</script>

<style>

.tui-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom);
}

.tui-searchbox {
  padding: 16 rpx 20 rpx;
  box-sizing: border-box;
  background-color: #F2F2F2;
}

.tui-rolling-search {
  width: 100%;
  height: 60 rpx;
  border-radius: 35 rpx;
  padding: 0 40 rpx 0 30 rpx;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: #999;
}

.tui-swiper {
  font-size: 26 rpx;
  height: 60 rpx;
  flex: 1;
  padding-left: 12 rpx;
}

.tui-swiper-item {
  display: flex;
  align-items: center;
}

.tui-hot-item {
  line-height: 26 rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tui-banner-swiper {
  width: 100%;
  height: 300 rpx;
  position: relative;
}

.tui-slide-image {
  width: 100%;
  height: 300 rpx;
  display: block;
}

.tui-banner-title {
  width: 100%;
  height: 100 rpx;
  position: absolute;
  z-index: 9999;
  color: #fff;
  bottom: 0;
  padding: 0 30 rpx;
  padding-top: 25 rpx;
  font-size: 34 rpx;
  font-weight: bold;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* #ifdef MP-WEIXIN  */
.tui-banner-swiper .wx-swiper-dots.wx-swiper-dots-horizontal {
  width: 100%;
  top: 280 rpx;
  text-align: right;
  padding-right: 30 rpx;
  box-sizing: border-box;
}

.tui-banner-swiper .wx-swiper-dot {
  width: 8 rpx;
  height: 8 rpx;
  display: inline-flex;
  background: none;
  justify-content: space-between;
}

.tui-banner-swiper .wx-swiper-dot::before {
  content: '';
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8 rpx;
}

.tui-banner-swiper .wx-swiper-dot-active::before {
  background: #5677fc;
}

.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
  width: 18 rpx;
}

/* #endif */

/* #ifndef MP-WEIXIN */
> > > .tui-banner-swiper .uni-swiper-dots.uni-swiper-dots-horizontal {
  width: 100%;
  top: 280 rpx;
  text-align: right;
  padding-right: 30 rpx;
  box-sizing: border-box;
}

> > > .tui-banner-swiper .uni-swiper-dot {
  width: 8 rpx;
  height: 8 rpx;
  display: inline-flex;
  background: none;
  justify-content: space-between;
}

> > > .tui-banner-swiper .uni-swiper-dot::before {
  content: '';
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8 rpx;
}

> > > .tui-banner-swiper .uni-swiper-dot-active::before {
  background: #5677fc;
}

> > > .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
  width: 18 rpx;
}

/* #endif */

.tui-news-flex {
  width: 100%;
  display: flex;
}

.tui-flex-start {
  align-items: flex-start !important;
}

.tui-flex-center {
  align-items: center !important;
}

.tui-flex-column {
  flex-direction: column !important;
}

.tui-flex-between {
  justify-content: space-between !important;
}

.tui-news-cell {
  display: flex;
  padding: 20 rpx 30 rpx;
}

.tui-news-tbox {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}

.tui-news-picbox {
  display: flex;
  position: relative;
}

.tui-w220 {
  width: 220 rpx;
}

.tui-h165 {
  height: 165 rpx;
}

.tui-block {
  display: block;
}

.tui-w-full {
  width: 100%;
}

.tui-one-third {
  width: 33%;
}

.tui-news-title {
  width: 100%;
  font-size: 34 rpx;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  box-sizing: border-box;
}

.tui-pl-20 {
  padding-left: 20 rpx;
}

.tui-pt20 {
  padding-top: 20 rpx;
}

.tui-sub-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999;
  box-sizing: border-box;
  line-height: 24 rpx;
}

.tui-sub-source {
  font-size: 26 rpx;
}

.tui-sub-cmt {
  font-size: 24 rpx;
  line-height: 24 rpx;
  display: flex;
  align-items: center;
}


.tui-scale {
  transform: scale(0.6);
  transform-origin: center center;
}

.tui-btm-badge {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 24 rpx;
  color: #fff;
  padding: 2 rpx 12 rpx;
  background: rgba(0, 0, 0, 0.6);
  z-index: 20;
  transform: scale(0.8);
  transform-origin: 100% 100%;
}

.tui-video {
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 0 0;
}

.tui-icon {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 26 rpx;
}
</style>
