<template>
  <view class="content">
    <tui-grid-item :cell="2">

      <navigator url="../travel_query/travel_query" class="update-item">出行政策查询</navigator>
    </tui-grid-item>
    <tui-grid-item :cell="2" @click="detail">

      <navigator url="../travel_apply/travel_apply" class="update-item">紧急出行申请</navigator>
    </tui-grid-item>
    <tui-grid-item :cell="2" @click="detail">

      <navigator url="../travel_list/travel_list" class="update-item">查看出行申请</navigator>
    </tui-grid-item>
  </view>

</template>

<script>

import tuiGridItem from "@/components/thorui/tui-grid-item/tui-grid-item"

export default {
  data() {
    return {}
  },
  components: {
    tuiGridItem,
  },
  onLoad() {

  },
  methods: {}
}
</script>

<style>

</style>
