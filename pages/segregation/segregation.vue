<template>
	<view class="tui-container">
    <view class="tui-searchbox">
      <view class="tui-rolling-search">
        <icon type="search" :size='13' color='#999'></icon>
        <swiper vertical autoplay circular interval="8000" class="tui-swiper">
          <swiper-item class="tui-swiper-item" @tap="search">
            <tui-input class="tui-hot-item" v-model="queryString" placeholder="请输入省、市、区县、街道、小区进行模糊查询"></tui-input>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="tui-page__bd" v-for="(item,index) in data" :key="index">
      <tui-list-view backgroundColor="#fff">
        <view class="thorui-preview__hd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">省份</view>
            <view class="thorui-preview__value_hd">{{item.provinces}}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">市</view>
            <view class="thorui-preview__value">{{item.city}}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">区（县）</view>
            <view class="thorui-preview__value">{{item.county}}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">街道</view>
            <view class="thorui-preview__value">{{item.street}}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">小区</view>
            <view class="thorui-preview__value">{{item.community}}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">发布时间</view>
            <view class="thorui-preview__value">{{ item.startTime }}</view>
          </view>
        </view>
        <view class="thorui-preview__item" v-show="item.open">
          <view class="thorui-preview__label">离开1-14天:</view>
          <view class="thorui-preview__value">{{ item.firstStage }}</view>
        </view>
        <view class="thorui-preview__item" v-show="item.open">
          <view class="thorui-preview__label">离开14-28天:</view>
          <view class="thorui-preview__value">{{ item.secondStage }}</view>
        </view>
        <view class="thorui-preview__ft">
          <tui-button class="thorui-preview__btn" hover-class="thorui-cell_active" :hover-stay-time="150" plain link
                      @click="showDetails(item,index)">{{ item.open ? '收起详情' : '查看具体隔离政策' }}
          </tui-button>
        </view>
      </tui-list-view>
    </view>

	</view>
</template>

<script>
import {getAllSegregation, getSegregationByCondition} from "../../api/travel_query";
  import TuiInput from "../../components/thorui/tui-input/tui-input";
  import utils from "@/components/common/tui-utils/tui-utils.js"
  import TuiListView from "../../components/thorui/tui-list-view/tui-list-view";

  export default {
    components: {TuiListView, TuiInput},
    data() {
			return {
        queryString:'',
        data:[],

			}
		},
    mounted(){
      this.loadData()
    },
		methods: {
      loadData(){
        getAllSegregation().then(res => {
          let data1 = res

          data1.map(e => {
            e.startTime =  utils.formatDate('y-m-d h:i:s', e.startTime, 2)
            e.open = false
          })
          this.data = data1
        }).catch(err => {
          console.error(err)
        })
      },
      search(){
        getSegregationByCondition({queryString:this.queryString}).then(res => {
          let data1 = res

          data1.map(e => {
            e.startTime =  utils.formatDate('y-m-d h:i:s', e.startTime, 2)
            e.open = false
          })
          this.data = data1
        }).catch(err => {
          console.log(err)
        })
      },
      showDetails(item){
        item.open = !item.open
      }
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
  padding: 16rpx 20rpx;
  box-sizing: border-box;
  background-color: #F2F2F2;
}
.tui-rolling-search {
  width: 100%;
  height: 60rpx;
  border-radius: 35rpx;
  padding: 0 40rpx 0 30rpx;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: #999;
}
.tui-swiper {
  font-size: 26rpx;
  height: 60rpx;
  flex: 1;
  padding-left: 12rpx;
}

.tui-swiper-item {
  display: flex;
  align-items: center;
}
.tui-hot-item {
  line-height: 26rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
