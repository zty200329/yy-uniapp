<template>
  <view>
    <view class="tui-page__hd">
      <view class="tui-page__title">就医证明申请</view>
      <view class="tui-page__desc">提交资料，申请开具证明</view>
    </view>
    <tui-input label="就医人姓名" placeholder="请输入姓名" v-model="form.name"></tui-input>
    <view class="tui-title thorui-cells">性别</view>
    <tui-radio-group name="radio" v-model="form.sex" @change="changeSex">
      <view class="thorui-cells thorui-white__bg thorui-align__center">
        <tui-label>
          <view class="thorui-align__center">
            <tui-radio value="0"></tui-radio>
            <text class="tui-text">女</text>
          </view>
        </tui-label>
        <tui-label margin="0 0 0 40rpx">
          <view class="thorui-align__center">
            <tui-radio value="1"></tui-radio>
            <text class="tui-text">男</text>
          </view>
        </tui-label>
      </view>
    </tui-radio-group>
    <tui-input label="街道" placeholder="请输入街道" v-model="form.street"></tui-input>
    <tui-input label="社区" placeholder="请输入社区" v-model="form.community"></tui-input>
    <tui-input label="年龄" placeholder="请输入年龄" v-model="form.age"></tui-input>
    <tui-input label="就医人身份证号" placeholder="请输入身份证号" v-model="form.idNum"></tui-input>
    <tui-input label="就医人手机号" placeholder="请输入手机号" v-model="form.phoneNum"></tui-input>
    <tui-textarea v-model="form.reason" flexStart label="就医原因："
                  placeholder="请输入去就医的原因"></tui-textarea>
    <tui-datetime ref="outDataTime" :type="1" @confirm="changeOutTime"></tui-datetime>
    <tui-button @click="showOutTime" plain link shape="circle">
      {{ form.doctorTime ? '就医时间:' + form.doctorTime : '请选择就医时间' }}
    </tui-button>
    <tui-input label="医院" placeholder="请输入计划前往的医院" v-model="form.hospital"></tui-input>
    <tui-input label="陪护人" placeholder="请输入陪护人姓名" v-model="form.otherName"></tui-input>
    <tui-input label="陪护人关系" placeholder="请输入与陪护人的关系" v-model="form.relation"></tui-input>
    <tui-input label="陪护人身份证号" placeholder="请输入陪护人的身份证号码" v-model="form.otherIdNum"></tui-input>
    <tui-textarea v-model="form.way" flexStart label="就医路线："
                  placeholder="请输入详细的路线"></tui-textarea>
    <tui-button  plain link  @click="requestMsg">订阅消息，请务必订阅，否则无法接收消息</tui-button>

    <tui-button  @click="submitApply">提交申请</tui-button>
    <tui-toast ref="msg"></tui-toast>
  </view>
</template>

<script>
import utils from "@/components/common/tui-utils/tui-utils.js"
import {submitMedicalApply} from "../../api/travel_apply";

export default {
  data() {
    return {
      form: {
        name:'',
        sex:'',
        street:'',
        community:'',
        age:'',
        idNum:'',
        phoneNum:'',
        reason:'',
        doctorTime:'',
        hospital:'',
        otherName:'',
        relation:'',
        otherIdNum:'',
        way:'',
      },
      isAuthorization: false
    };
  },
  activated() {

  },
  methods: {
    changeSex(e) {
      this.form.sex = e.detail.value
    },
    showOutTime(e) {
      this.$refs.outDataTime.show();
    },
    changeOutTime(e) {
      this.form.doctorTime = utils.formatDate('y-m-d h:i:s',e.result,1)
    },
    submitApply(){
      if (this.isAuthorization === true) {
        submitMedicalApply(this.form).then(res => {
          let params = {
            title: "操作成功",
            content: "更新个人信息成功！"
          }
          this.$refs.msg.show(params);
          wx.navigateTo({
            url: '/pages/apply_medical_list/apply_medical_list'
          }).catch(err => {
            console.log(err)
          })
        })
      }else {
        let params = {
          title: "请授权",
        }
        this.$refs.msg.show(params);
      }
    },
    requestMsg(){
      this.isAuthorization = true
      wx.requestSubscribeMessage({
        tmplIds: ['YQ4wpGCgrZeivhznoNg5IhnZxI0qjonqOmiiDObUxSo'],
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
