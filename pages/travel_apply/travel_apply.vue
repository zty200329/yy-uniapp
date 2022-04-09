<template>
  <view>
	  <view class="tui-page__hd">
	  	<view class="tui-page__title">出行申请</view>
	  	<view class="tui-page__desc">紧急情况申请出行，以及申请返家</view>
	  </view>
    <tui-input label="出行人姓名" placeholder="请输入出行人姓名" v-model="form.name"></tui-input>
    <view class="thorui-flex__between">
      <text>是否为他人申请：{{ form.forOther ? '是' : '否' }}</text>
      <tui-switch @change="changeForOther"></tui-switch>
    </view>
    <view class="thorui-flex__between" v-show="form.forOther">
      <tui-input label="与申请人关系:" placeholder="请输入与申请人的关系" v-model="form.relation"></tui-input>
    </view>
    <view class="thorui-flex__between">
      <text>出行申请</text>
      <tui-switch @change="changeForIsOutside"></tui-switch>
      <text>回家申请</text>
    </view>
    <tui-textarea v-model="form.applyReason" flexStart label="申请理由"
                  placeholder="请输入你为什么要出行,为什么,为什么？tell me why!!!and then 我会给你审批的哦.."></tui-textarea>
    <text>上传申请附件(最多3张图片)</text>
    <tui-upload :value="form.applyFile" :limit="3" :header="header" :delConfirm="true" :fileKeyName="fileKey"
                :serverUrl="url" @complete="uploadApplyFileComplete" @remove="removeApplyFileComplete"></tui-upload>
    <tui-button @click="showOutTime" plain link shape="circle">
      {{ form.expectedOutTime ? '出行时间:' + form.expectedOutTime : '请选择出行时间' }}
    </tui-button>
    <tui-datetime ref="outDataTime" :type="1" @confirm="changeOutTime"></tui-datetime>
    <tui-button @click="showReturnTime" plain link shape="circle">
      {{ form.expectedReturnTime ? '返回时间:' + form.expectedReturnTime : '请选择返回时间' }}
    </tui-button>
    <tui-datetime ref="returnDataTime" :type="1" @confirm="changeReturnTime"></tui-datetime>
    <tui-textarea v-model="form.expectedDestination" flexStart label="预计目的地:"
                  placeholder="请输入你准备去哪里,写清楚,否则不通过.(如果在外面申请回家,填写清楚你现在在哪)"></tui-textarea>
    <tui-textarea v-model="form.travelInformation" flexStart label="行程信息:"
                  placeholder="请输入你去那里以及回家时的路线信息"></tui-textarea>
    <view class="tui-title thorui-cells">请选择健康码状态</view>
    <tui-radio-group name="radio" v-model="form.healthCodeStatus" @change="changeHealthCodeStatus">
      <view class="thorui-cells thorui-white__bg thorui-align__center">
        <tui-label>
          <view class="thorui-align__center">
            <tui-radio value="0"></tui-radio>
            <text class="tui-text">绿码</text>
          </view>
        </tui-label>
        <tui-label margin="0 0 0 40rpx">
          <view class="thorui-align__center">
            <tui-radio value="1"></tui-radio>
            <text class="tui-text">黄码</text>
          </view>
        </tui-label>
        <tui-label margin="0 0 0 40rpx">
          <view class="thorui-align__center">
            <tui-radio value="2"></tui-radio>
            <text class="tui-text">红码</text>
          </view>
        </tui-label>
      </view>
    </tui-radio-group>
    <text>上传健康码截图</text>
    <tui-upload :limit="1" :header="header" :delConfirm="true" :fileKeyName="fileKey" :serverUrl="url"
                @complete="uploadHealthCodeFileComplete" @remove="removeHealthCodeFileComplete"></tui-upload>
    <text>上传行程卡截图</text>
    <tui-upload :limit="1" :header="header" :delConfirm="true" :fileKeyName="fileKey" :serverUrl="url"
                @complete="uploadTravelCardFileComplete" @remove="removeTravelCardFileComplete"></tui-upload>
    <tui-textarea v-model="form.homeAdd" flexStart label="家庭住址" placeholder="请输入你的家庭住址，写清楚门牌号"></tui-textarea>
    <tui-input label="手机号" placeholder="请输入出行人手机号" v-model="form.phoneNum"></tui-input>
    <tui-input label="紧急联系人手机号" placeholder="请输入紧急联系人手机号" v-model="form.emergencyNum"></tui-input>
    <tui-button  plain link  @click="requestMsg">订阅消息，请务必订阅，否则无法接收消息</tui-button>

    <tui-button  @click="submitApply">提交申请</tui-button>
    <tui-toast ref="msg"></tui-toast>
  </view>
</template>

<script>
import helper from "../../common/helper"
import utils from "@/components/common/tui-utils/tui-utils.js"
import store from '../../store/index.js';
import tuiUpload from "@/components/thorui/tui-upload/tui-upload"
import { submitTravelApplication } from "@/api/travel_apply.js"
export default {
  components: {
    tuiUpload
  },
  data() {
    return {
      form: {
        name: '',
        forOther: 0,
        applyReason: '',
        applyFile: [],
        expectedOutTime: '',
        expectedReturnTime: '',
        expectedDestination: '',
        travelInformation: '',
        healthCodeStatus: '',
        healthCodeFile: '',
        travelCardFile: '',
        homeAdd: '',
        phoneNum: '',
        emergencyNum: '',
        relation: '',
        isOutside: false,
        isAuthorization: false,
      },
      url: helper.websiteUrl+'/file/uploadImg',
      // url: 'http://192.168.1.100:8083/api/file/uploadImg',
      // url: 'http://zyyzty.mynatapp.cc/api/file/uploadImg',
      header: {
        Authorization: store.state.user.token,
        'Content-Type': 'multipart/form-data'
      },
      fileKey: 'img',
    };
  },
  methods: {
    changeForIsOutside(e) {
      this.form.isOutside = e.detail.value
    },
    changeForOther(e) {
      if (e.detail.value) {
        this.form.forOther = 1
      } else {
        this.form.forOther = 0
        this.form.relation = ''
      }
    },
    uploadApplyFileComplete(e) {
      console.log(e)
      this.form.applyFile = e.imgArr
    },
    removeApplyFileComplete(e) {
      let index = e.index
    },
    uploadHealthCodeFileComplete(e) {
      console.log(e)
      this.form.healthCodeFile = e.imgArr[0]
    },
    removeHealthCodeFileComplete(e) {
      let index = e.index
    },
    uploadTravelCardFileComplete(e) {
      console.log(e)
      this.form.travelCardFile = e.imgArr[0]
    },
    removeTravelCardFileComplete(e) {
      let index = e.index
    },
    showOutTime(e) {
      this.$refs.outDataTime.show();
    },
    changeOutTime(e) {
      this.form.expectedOutTime = utils.formatDate('y-m-d h:i:s',e.result,1)
    },
    showReturnTime(e) {
      this.$refs.returnDataTime.show();
    },
    changeReturnTime(e) {
      this.form.expectedReturnTime = utils.formatDate('y-m-d h:i:s',e.result,1)
    },
    changeHealthCodeStatus(e) {
      this.form.healthCodeStatus = e.detail.value
    },
    // 提交申请
    submitApply(){
      const form = {
        applyFile: this.form.applyFile,
        applyReason: this.form.applyReason,
        emergencyNum: this.form.emergencyNum,
        expectedDestination: this.form.expectedDestination,
        expectedOutTime: this.form.expectedOutTime,
        expectedReturnTime: this.form.expectedReturnTime,
        forOther: this.form.forOther,
        healthCodeFile: this.form.healthCodeFile,
        healthCodeStatus: this.form.healthCodeStatus,
        homeAdd: this.form.homeAdd,
        name: this.form.name,
        phoneNum: this.form.phoneNum,
        relation: this.form.relation,
        isOutside: this.form.isOutside,
        travelCardFile: this.form.travelCardFile,
        travelInformation: this.form.travelInformation
      }
      if(this.isAuthorization){
        submitTravelApplication(form).then(res => {
          let params = {
            title: "操作成功",
            content: "更新个人信息成功！"
          }
          this.$refs.msg.show(params);
        }).catch(err => {
          console.log(err)
        })
      } else{
        let params = {
          title: "操作失败",
          content: "请先完成授权！"
        }
        this.$refs.msg.show(params);
      }

    },
    requestMsg(){
      this.isAuthorization = true
      uni.requestSubscribeMessage({
        tmplIds: ['y8IF9AbRw6sJPV255ExMSjIAGhqmE5mli6U-xbKWgAM'],
        success(res) {
          console.log('已授权接收订阅消息')
        }
      })
    }
  }
}

</script>

<style lang="scss">

</style>
