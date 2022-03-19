<template>
  <view class="content">
    <tui-notice-bar is-left scrollable color="#f54f46" :content="content">
      <template v-slot:left>
        <view class="tui-padding">
          <tui-icon name="news-fill" :size="48" unit="rpx" color="#f54f46"></tui-icon>
        </view>
      </template>
    </tui-notice-bar>
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
  </view>

</template>

<script>
import tuiGridItem from "@/components/thorui/tui-grid-item/tui-grid-item"
import TuiNoticeBar from "../../components/thorui/tui-notice-bar/tui-notice-bar";
import TuiIcon from "../../components/thorui/tui-icon/tui-icon";
import TuiButton from "../../components/thorui/tui-button/tui-button";

export default {
  data() {
    return {
      content: '通知！！',
    }
  },
  components: {
    TuiButton,
    TuiIcon,
    TuiNoticeBar,
    tuiGridItem,
  },
  onLoad() {

  },
  methods: {
    test(){

    }
  }
}
</script>

<style>

</style>
