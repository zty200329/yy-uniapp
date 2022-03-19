<template>
  <view class="container">
    <view class="tui-page__hd">
      <view class="tui-page__title">反馈列表</view>
      <view class="tui-page__desc">查看和提交反馈</view>
    </view>
	<tui-button @click="submitFeedback">提交一条反馈</tui-button>
    <view class="tui-page__bd" v-for="(item,index) in feedbackList" :key="index">
      <tui-list-view backgroundColor="#fff">
        <view class="thorui-preview__hd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">反馈主题</view>
            <view class="thorui-preview__value_hd">{{ item.title }}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">创建时间</view>
            <view class="thorui-preview__value">{{ item.createTime }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">是否有回复</view>
            <view class="thorui-preview__value">{{ item.hasResponse ? '有' : '无' }}</view>
          </view>
          <view class="thorui-preview__ft">
            <tui-button class="thorui-preview__btn" hover-class="thorui-cell_active"
                        :hover-stay-time="150" plain link
                        @click="showResponse(item)">
              查看详情
            </tui-button>
          </view>
        </view>
      </tui-list-view>
    </view>
  </view>
</template>

<script>
import {getAllFeedback} from "../../api/feedback";
import utils from "@/components/common/tui-utils/tui-utils.js"

export default {
  data() {
    return {
      feedbackList: [],
    };
  },
  mounted() {
    this.getAllFeedback()
  },
  methods: {
    getAllFeedback() {
      getAllFeedback().then(res => {
        let data = res
        data.map(e => {
          e.createTime = utils.formatDate('y-m-d h:i:s', e.createTime, 2)
        })
        this.feedbackList = data
      }).catch(err => {
        console.error(err)
      })
    },
    showResponse(item) {
      item.showResponse = !item.showResponse
	  uni.navigateTo({
	  	url:'/pages/feedback_detail/feedback_detail?id='+item.id
	  })
    },
	submitFeedback(){
		uni.navigateTo({
			url:'/pages/submit_feedback/submit_feedback'
		})
	}
  }
}
</script>

<style lang="scss">

</style>
