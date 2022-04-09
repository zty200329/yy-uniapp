<template>
  <view class="tui-container">
    <tui-notice-bar is-left scrollable color="#f54f46" :content="content">
      <template v-slot:left>
        <view class="tui-padding">
          <tui-icon name="news-fill" :size="48" unit="rpx" color="#f54f46"></tui-icon>
        </view>
      </template>
    </tui-notice-bar>
    <!--banner-->
    <swiper indicator-dots autoplay circular :interval="5000" :duration="150" indicator-color="rgba(255, 255, 255, 0.9)"
            indicator-active-color="#5677fc" class="tui-banner-swiper">
      <swiper-item v-for="(item,index) in banner" :key="index" @tap.stop="bannerDetail(item)">
        <view class="tui-banner-title">{{item.title}}</view>
        <image :src='item.cover' class="tui-slide-image" mode="widthFix" />
      </swiper-item>
    </swiper>
    <view>
      <tui-grid-item :cell="2">

        <navigator url="../news_list/news_list" class="update-item">所有新闻</navigator>
      </tui-grid-item>
      <tui-grid-item :cell="2">

        <navigator url="../travel_query/travel_query" class="update-item">出行政策查询</navigator>
      </tui-grid-item>
      <tui-grid-item :cell="2">

        <navigator url="../travel_apply/travel_apply" class="update-item">紧急出行申请</navigator>
      </tui-grid-item>
      <tui-grid-item :cell="2">

        <navigator url="../travel_list/travel_list" class="update-item">查看出行申请</navigator>
      </tui-grid-item>
      <tui-grid-item :cell="2">

        <navigator url="../user_punch/user_punch" class="update-item">健康打卡</navigator>
      </tui-grid-item>
      <tui-grid-item :cell="2">

        <navigator url="../feedback_main/feedback_main" class="update-item">意见反馈</navigator>
      </tui-grid-item>
      <tui-grid-item :cell="2">
        <navigator url="../disease_manage/disease_manage" class="update-item">疾病管理</navigator>

      </tui-grid-item>
    </view>

  </view>

</template>

<script>
import tuiGridItem from "@/components/thorui/tui-grid-item/tui-grid-item"
import TuiNoticeBar from "../../components/thorui/tui-notice-bar/tui-notice-bar";
import TuiIcon from "../../components/thorui/tui-icon/tui-icon";
import TuiButton from "../../components/thorui/tui-button/tui-button";
import {getAllArticleList, getTopArticleList} from "../../api/article";

export default {
  data() {
    return {
      content: '通知！！',
      banner: [],
    }
  },
  components: {
    TuiButton,
    TuiIcon,
    TuiNoticeBar,
    tuiGridItem,
  },
  mounted(){
    this.loadData()
  },
  methods: {
    loadData(){
      getTopArticleList().then(res => {
        this.banner = res;
      }).catch(err => {
        console.log(err)
      })
    },
    test(){

    },
    bannerDetail(item) {
      uni.navigateTo({
        url: '/pages/newsDetails/newsDetails?id='+item.id
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

.tui-banner-swiper {
  width: 100%;
  height: 300rpx;
  position: relative;
}
.tui-slide-image {
  width: 100%;
  height: 300rpx;
  display: block;
}
.tui-banner-title {
  width: 100%;
  height: 100rpx;
  position: absolute;
  z-index: 9999;
  color: #fff;
  bottom: 0;
  padding: 0 30rpx;
  padding-top: 25rpx;
  font-size: 34rpx;
  font-weight: bold;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
