<template>
  <view>
    <view class="tui-page__hd">
      <view class="tui-page__title">就医申请列表</view>
      <view class="tui-page__desc">查看就医申请列表</view>
    </view>
    <view class="tui-page__bd" v-for="(item,index) in dataList" :key="index">
      <tui-list-view backgroundColor="#fff">
        <view class="thorui-preview__hd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">出行人姓名</view>
            <view class="thorui-preview__value_hd">{{ item.name }}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">就医日期</view>
            <view class="thorui-preview__value">{{ item.doctorTime }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">医院</view>
            <view class="thorui-preview__value">{{ item.hospital }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">状态</view>
            <view class="thorui-preview__value">{{ item.status === 0 ? '审核中' : '审核通过' }}</view>
          </view>
            <tui-button v-if="item.status === 1" type="primary" @click="showDetail(item)">查看详情</tui-button>
        </view>
      </tui-list-view>

    </view>
  </view>
</template>

<script>
import {getMyMedicalApply} from "../../api/travel_apply";
import utils from "@/components/common/tui-utils/tui-utils.js"
import TuiButton from "../../components/thorui/tui-button/tui-button";

export default {
  components: {TuiButton},
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      getMyMedicalApply().then(res => {
        let data = res
        data.map(e => {
          e.doctorTime = utils.formatDate('y-m-d', e.doctorTime, 1)
        })
        this.dataList = data
      })
    },
    showDetail(item){
      wx.navigateTo({
        url: '/pages/apply_medical_detail/apply_medical_detail?id=' + item.id
      })
    }
  }
}
</script>

<style lang="scss">

</style>
