<template>
  <view class="container">
    <view class="tui-page__hd">
      <view class="tui-page__title">出行申请</view>
      <view class="tui-page__desc">查看出行申请列表</view>
    </view>
    <view>
      <tui-button @click="creatQrcode">123123</tui-button>
      <tki-qrcode :val="'扬扬我爱你'" :size="120" ref="qrcode"></tki-qrcode>
    </view>
    <view class="tui-page__bd" v-for="(item,index) in travelApplyList" :key="index">
      <tui-list-view backgroundColor="#fff">
        <view class="thorui-preview__hd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">姓名</view>
            <view class="thorui-preview__value_hd">{{ item.name }}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">申请状态</view>
            <view class="thorui-preview__value">{{ item.status }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">申请理由</view>
            <view class="thorui-preview__value">{{ item.applyReason }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">预计目的地</view>
            <view class="thorui-preview__value">{{ item.expectedDestination }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">预计外出时间</view>
            <view class="thorui-preview__value">{{ item.expectedOutTime }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">预计返回时间</view>
            <view class="thorui-preview__value">{{ item.expectedReturnTime }}</view>
          </view>
        </view>
        <view class="thorui-preview__ft" v-show="item.showCode">
          <tui-button class="thorui-preview__btn" hover-class="thorui-cell_active" :hover-stay-time="150" plain link >查看二维码</tui-button>
        </view>
        <view>

        </view>
      </tui-list-view>


    </view>
  </view>
</template>

<script>
import TuiButton from "../../components/thorui/tui-button/tui-button";
import tkiQrcode from "../../components/tki-qrcode/tki-qrcode";
import {getTravelApply} from "../../api/travel_apply"
import utils from "@/components/common/tui-utils/tui-utils.js"

export default {
  components: {TuiButton, tkiQrcode},
  data() {
    return {
      travelApplyList: [],
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始获取数据
    init() {
      getTravelApply().then(res => {
        let data = res
        data.map(e => {
          e.expectedOutTime = utils.formatDate('y-m-d h:i:s', e.expectedOutTime, 2)
          e.expectedReturnTime = utils.formatDate('y-m-d h:i:s', e.expectedReturnTime, 2)
          e.showCode = !(e.status === '出行申请审核中' || e.status === '回家申请审核中' || e.status === '已驳回' || e.status === '已撤销');
        })
        this.travelApplyList = res
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    },
    //生成二维码
    creatQrcode() {
      this.$refs.qrcode._makeCode()
    }

  }
}
</script>

<style lang="scss">

</style>
