<template>
  <view class="container">
    <view class="tui-page__hd">
      <view class="tui-page__title">出行申请</view>
      <view class="tui-page__desc">查看出行申请列表</view>
    </view>
    <view class="tui-page__bd" v-for="(item,index) in travelApplyList" :key="index">
      <tui-list-view backgroundColor="#fff">
        <view class="thorui-preview__hd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">出行人姓名</view>
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
          <view class="thorui-preview__item" v-show="item.showDetails">
            <view class="thorui-preview__label">行程信息</view>
            <view class="thorui-preview__value">{{ item.travelInformation }}</view>
          </view>
          <view class="thorui-preview__item" v-show="item.showDetails">
            <view class="thorui-preview__label">健康码状态</view>
            <view class="thorui-preview__value"><span v-if="item.healthCodeStatus === 0">绿码</span>
              <span v-else-if="item.healthCodeStatus === 1">黄码</span>
              <span v-else-if="item.healthCodeStatus === 2">红码</span></view>
          </view>
          <view class="thorui-preview__item" v-show="item.showDetails">
            <view class="thorui-preview__label">申请提交人</view>
            <view class="thorui-preview__value">{{ item.applyUsername }}</view>
          </view>
          <view class="thorui-preview__item" v-show="item.showDetails">
            <view class="thorui-preview__label">是否为他人申请</view>
            <view class="thorui-preview__value">
              <span v-if="item.forOther === 0">否</span>
              <span v-else-if="item.forOther === 1">是</span></view>
          </view>
          <view class="thorui-preview__item" v-show="item.forOther && item.showDetails">
            <view class="thorui-preview__label">申请人与出行人关系</view>
            <view class="thorui-preview__value">{{ item.relation }}</view>
          </view>
          <view class="thorui-preview__item" v-show="item.showDetails">
            <view class="thorui-preview__label">家庭住址</view>
            <view class="thorui-preview__value">{{ item.homeAdd }}</view>
          </view>
          <view class="thorui-preview__item" v-show="item.showDetails">
            <view class="thorui-preview__label">手机号</view>
            <view class="thorui-preview__value">{{ item.phoneNum }}</view>
          </view>
          <view class="thorui-preview__item" v-show="item.showDetails">
            <view class="thorui-preview__label">紧急联系人手机号</view>
            <view class="thorui-preview__value">{{ item.emergencyNum }}</view>
          </view>
          <view class="thorui-preview__item" v-show="item.showDetails">
            <tui-steps :type="2" :items="items" spacing="180rpx" :activeSteps="item.stepState"></tui-steps>
          </view>
          <view class="thorui-preview__item">
            <tui-button plain link @click="showHealthCodeFileFun(item)" v-show="item.showDetails">查看健康码截图</tui-button>
            <tui-gallery :urls="item.healthCodeFile" :show="item.showHealthCodeFile"
                         @hide="hideHealthCodeFile(item)"></tui-gallery>
          </view>
          <view class="thorui-preview__item">
            <tui-button plain link @click="showTravelCardFileFun(item)" v-show="item.showDetails">查看行程卡截图</tui-button>
            <tui-gallery :urls="item.travelCardFile" :show="item.showTravelCardFile"
                         @hide="hideTravelCardFile(item)"></tui-gallery>
          </view>
          <view class="thorui-preview__item">
            <tui-button plain link @click="showApplyFilesFun(item)" v-show="item.showDetails">查看申请附件</tui-button>
            <tui-gallery :urls="item.applyFiles" :show="item.showApplyFiles" @hide="hideApplyFiles(item)"></tui-gallery>
          </view>
        </view>
        <view class="thorui-preview__ft">
          <tui-button class="thorui-preview__btn" hover-class="thorui-cell_active" :hover-stay-time="150" plain link
                      @click="showDetails(item,index)">{{ item.showDetails ? '收起详情' : '查看详情' }}
          </tui-button>
        </view>
        <view class="thorui-preview__ft" v-show="item.showOutCode">
          <tui-button class="thorui-preview__btn" hover-class="thorui-cell_active" :hover-stay-time="150" plain link
                      @click="creatQrcode(item,index)">{{ item.showCode ? '收起出行码' : '获取出行码' }}
          </tui-button>
        </view>
        <view class="qrcode-box" v-show="item.showCode">
          <view class="qrcode">
            <tki-qrcode :val="item.id" :size="220" ref="qrcode"></tki-qrcode>
          </view>
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
import TuiSteps from "../../components/thorui/tui-steps/tui-steps";

export default {
  components: {TuiSteps, TuiButton, tkiQrcode},
  data() {
    return {
      items: [
        {
          title: '',
          desc: '发起申请'
        },
        {
          title: '',
          desc: '申请通过',
        },
        {
          title: '',
          desc: '已外出',
        },
        {
          title: '',
          desc: '已返家',
        },
        {
          title: '',
          desc: '已复核',
        }
      ],
      travelApplyList: [],
      showCodeButton: false,
      applyFiles: '',
      healthCodeFile: '',
      travelCardFile: '',
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
        // let count = 0
        // let codes = []
        data.map(e => {
          e.expectedOutTime = utils.formatDate('y-m-d h:i:s', e.expectedOutTime, 2)
          e.expectedReturnTime = utils.formatDate('y-m-d h:i:s', e.expectedReturnTime, 2)
          e.showOutCode = !(e.status === '出行申请审核中' || e.status === '回家申请审核中' || e.status === '已驳回' || e.status === '已撤销' || e.status === '已复查');
          e.showDetails = false
          e.showApplyFiles = false
          e.showHealthCodeFile = false
          e.showTravelCardFile = false
          e.showCode = false
          e.stepState = -1
          if (e.status === '已驳回' || e.status === '已撤销') {
            e.stepState = -1
          }else if(e.status === '出行申请审核中' || e.status === '回家申请审核中'){
            e.stepState = 0
          }else if(e.status === '待出行'){
            e.stepState = 1
          }else if(e.status === '已出行'){
            e.stepState = 2
          }else if(e.status === '已回家'){
            e.stepState = 3
          }else if(e.status === '已复查'){
            e.stepState = 4
          }
        })
        this.travelApplyList = res
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    },
    //生成二维码
    creatQrcode(item,index) {
      console.log(index)
      console.log(typeof(index))
      item.showCode = !item.showCode
      if (item.showCode) {
        console.error(this.$refs.qrcode)
        this.$refs.qrcode[index]._makeCode()
      }
    },
    showDetails(item) {
      let applyFiles = []
      Object.keys(item.applyFile).forEach(function (key) {
        applyFiles[key] = {
          src: item.applyFile[key],
          desc: '申请附件图片'
        }
      })

      item.applyFiles = applyFiles
      item.healthCodeFile = [{
        src: item.healthCodeFile,
        desc: '健康码截图'
      }]
      item.travelCardFile = [{
        src: item.travelCardFile,
        desc: '行程卡截图'
      }]
      item.showDetails = !item.showDetails
    },
    showApplyFilesFun(item) {
      item.showApplyFiles = true
    },
    hideApplyFiles(item) {
      item.showApplyFiles = false
    },
    showHealthCodeFileFun(item) {
      item.showHealthCodeFile = true
    },
    hideHealthCodeFile(item) {
      item.showHealthCodeFile = false
    },
    showTravelCardFileFun(item) {
      item.showTravelCardFile = true
    },
    hideTravelCardFile(item) {
      item.showTravelCardFile = false
    }

  }
}
</script>

<style lang="scss">

.qrcode {
  text-align: center;
}
</style>
