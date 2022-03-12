<template>
  <view class="container">
    <view class="tui-page__hd">
      <view class="tui-page__title">出行登记</view>
      <view class="tui-page__desc">登记扫描出行</view>
    </view>
    <tui-button @click="scanOutCode">扫码出行码</tui-button>
    <view class="tui-page__bd" v-show="chooseType">
      <tui-list-view backgroundColor="#fff">
        <view class="thorui-preview__hd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">出行人姓名</view>
            <view class="thorui-preview__value_hd">{{ applyInfo.name }}</view>
          </view>
        </view>
        <view class="thorui-preview__bd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">申请状态</view>
            <view class="thorui-preview__value">{{ applyInfo.status }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">申请理由</view>
            <view class="thorui-preview__value">{{ applyInfo.applyReason }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">预计目的地</view>
            <view class="thorui-preview__value">{{ applyInfo.expectedDestination }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">行程信息</view>
            <view class="thorui-preview__value">{{ applyInfo.travelInformation }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">预计外出时间</view>
            <view class="thorui-preview__value">{{ applyInfo.expectedOutTime }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">预计返回时间</view>
            <view class="thorui-preview__value">{{ applyInfo.expectedReturnTime }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">健康码状态</view>
            <view class="thorui-preview__value"><span v-if="applyInfo.healthCodeStatus === 0">绿码</span>
              <span v-else-if="applyInfo.healthCodeStatus === 1">黄码</span>
              <span v-else-if="applyInfo.healthCodeStatus === 2">红码</span></view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">申请提交人</view>
            <view class="thorui-preview__value">{{ applyInfo.applyUsername }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">是否为他人申请</view>
            <view class="thorui-preview__value">
              <span v-if="applyInfo.forOther === 0">否</span>
              <span v-else-if="applyInfo.forOther === 1">是</span></view>
          </view>
          <view class="thorui-preview__item" v-show="applyInfo.forOther">
            <view class="thorui-preview__label">申请人与出行人关系</view>
            <view class="thorui-preview__value">{{ applyInfo.relation }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">家庭住址</view>
            <view class="thorui-preview__value">{{ applyInfo.homeAdd }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">手机号</view>
            <view class="thorui-preview__value">{{ applyInfo.phoneNum }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">紧急联系人手机号</view>
            <view class="thorui-preview__value">{{ applyInfo.emergencyNum }}</view>
          </view>
          <view class="thorui-preview__item">
            <tui-button plain link @click="showHealthCodeFileFun">查看健康码截图</tui-button>
            <tui-gallery :urls="healthCodeFile" :show="showHealthCodeFile" @hide="hideHealthCodeFile"></tui-gallery>
          </view>
          <view class="thorui-preview__item">
            <tui-button plain link @click="showTravelCardFileFun">查看行程卡截图</tui-button>
            <tui-gallery :urls="travelCardFile" :show="showTravelCardFile" @hide="hideTravelCardFile"></tui-gallery>
          </view>
          <view class="thorui-preview__item">
            <tui-button plain link @click="showApplyFilesFun">查看申请附件</tui-button>
            <tui-gallery :urls="applyFiles" :show="showApplyFiles" @hide="hideApplyFiles"></tui-gallery>
          </view>
        </view>

        <tui-radio-group name="radio" v-model="updateType">
          <view class="thorui-cells thorui-white__bg thorui-align__center">
            <tui-label>
              <view class="thorui-align__center">
                <tui-radio value="2"></tui-radio>
                <text class="tui-text">外出</text>
              </view>
            </tui-label>
            <tui-label margin="0 0 0 40rpx">
              <view class="thorui-align__center">
                <tui-radio value="3"></tui-radio>
                <text class="tui-text">回家</text>
              </view>
            </tui-label>
            <tui-label margin="0 0 0 40rpx">
              <view class="thorui-align__center">
                <tui-radio value="4"></tui-radio>
                <text class="tui-text">复查</text>
              </view>
            </tui-label>
          </view>
        </tui-radio-group>
        <tui-button @click="updateStatus">确认</tui-button>

      </tui-list-view>

    </view>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import TuiButton from "../../components/thorui/tui-button/tui-button";
import {getTravelApplyInfoById, updateTravelApplyStatus} from "../../api/travel_apply";
import utils from "@/components/common/tui-utils/tui-utils.js"
import TuiGallery from "../../components/thorui/tui-gallery/tui-gallery";

export default {
  components: {TuiGallery, TuiButton},
  data() {
    return {
      updateType: '',
      applyInfo: '',
      id: '',
      chooseType: false,
      applyFiles: '',
      healthCodeFile: '',
      travelCardFile: '',
      showApplyFiles: false,
      showHealthCodeFile: false,
      showTravelCardFile: false,
    };
  },
  methods: {
    getApplyInfo() {
      const params = {
        id: this.id
        // id: 8
      }
      getTravelApplyInfoById(params).then(result => {
        console.log(result)
        this.applyInfo = result
        this.applyInfo.expectedOutTime = utils.formatDate('y-m-d h:i:s',this.applyInfo.expectedOutTime,2)
        this.applyInfo.expectedReturnTime = utils.formatDate('y-m-d h:i:s',this.applyInfo.expectedReturnTime,2)
        let applyFiles = []

        Object.keys(result.applyFile).forEach(function(key){
          applyFiles[key] = {
            src: result.applyFile[key],
            desc: '申请附件图片'
          }
        })

        this.applyFiles = applyFiles
        this.healthCodeFile = [{
          src: result.healthCodeFile,
          desc: '健康码截图'
        }]
        this.travelCardFile = [{
          src: result.travelCardFile,
          desc: '行程卡截图'
        }]
        this.chooseType = true
      }).catch(err => {
        console.log(err)
      })
    },
    scanOutCode() {
      let that = this;
      uni.scanCode({
        success: function (res) {
          console.log(typeof (res))
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
          that.id = res.result
          that.getApplyInfo()
        }
      });
    },
    updateStatus() {
      const params = {
        id: this.id,
        status: this.updateType
      }
      updateTravelApplyStatus(params).then(res => {
        let params = {
          title: "操作成功",
          content: "更新成功哦！"
        }
        this.$refs.toast.show(params);
      }).catch(err => {
        console.log(err)
      })
    },
    showApplyFilesFun(){
      this.showApplyFiles = true
    },
    hideApplyFiles(){
      this.showApplyFiles = false
    },
    showHealthCodeFileFun(){
      this.showHealthCodeFile = true
    },
    hideHealthCodeFile(){
      this.showHealthCodeFile = false
    },
    showTravelCardFileFun(){
      this.showTravelCardFile = true
    },
    hideTravelCardFile(){
      this.showTravelCardFile = false
    }
  }
}
</script>

<style lang="scss">

</style>
