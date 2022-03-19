<template>
  <view>
    <tui-list-view backgroundColor="#fff">
      <view class="thorui-preview__hd">
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">反馈主题</view>
          <view class="thorui-preview__value_hd">{{ feedbackDetail.title }}</view>
        </view>
      </view>
      <view class="thorui-preview__bd">
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">提问人</view>
          <view class="thorui-preview__value">{{ feedbackDetail.username }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">问题详情</view>
          <view class="thorui-preview__value">{{ feedbackDetail.message }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">是否有回复</view>
          <view class="thorui-preview__value">{{ item.hasResponse ? '有' : '无' }}</view>
        </view>
        <view class="thorui-preview__item">
          <tui-button plain link @click="showApplyFilesFun">查看申请附件</tui-button>
          <tui-gallery :urls="applyFiles" :show="showApplyFiles" @hide="hideApplyFiles"></tui-gallery>
        </view>
      </view>
    </tui-list-view>
  </view>
</template>

<script>
import {getFeedbackDetailsById} from "../../api/feedback";
import TuiGallery from "../../components/thorui/tui-gallery/tui-gallery";

export default {
  component:{
    TuiGallery
  },
  data() {
    return {
      id: '',
      feedbackDetail: '',
      showApplyFiles: false,
      applyFiles: [],
    };
  },
  onLoad: function (option) {
    this.id = option.id
    this.init()
    console.log(option.id)
  },
  mounted() {
  },
  methods: {
    init() {
      getFeedbackDetailsById({id: this.id}).then(res => {
            console.log(this.id)
            let applyFiles = []
            Object.keys(res.attachment).forEach(function (key) {
              applyFiles[key] = {
                src: res.attachment[key],
                desc: '附件图片'
              }
            })

            this.applyFiles = applyFiles
            this.feedbackDetail = res
          }
      )
    },
    showApplyFilesFun() {
      this.showApplyFiles = true
    },
    hideApplyFiles() {
      this.showApplyFiles = false
    },
  }
}
</script>

<style lang="scss">

</style>
