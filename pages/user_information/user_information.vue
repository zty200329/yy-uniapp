<template>
  <view>
    <block>修改个人信息</block>
    <tui-form ref="form" :model="formData">
      <tui-input label="姓名" placeholder="请输入姓名" clearable v-model="formData.name"></tui-input>
      <tui-input label="手机号" placeholder="请输入手机号" clearable v-model="formData.phoneNum"></tui-input>
      <tui-input label="紧急联系人电话" placeholder="请输入紧急联系人电话" clearable v-model="formData.emergencyCall"></tui-input>
      <tui-input label="家庭住址" placeholder="请输入家庭住址" clearable v-model="formData.homeAdd"></tui-input>
      <tui-input label="工作地址" placeholder="请输入工作地点" clearable v-model="formData.workAdd"></tui-input>
      <view>性别</view>
      <tui-radio-group name="radio" v-model="formData.sex">
        <view class="thorui-cells thorui-white__bg thorui-align__center">
          <tui-label>
            <view class="thorui-align__center">
              <tui-radio value="1"></tui-radio>
              <text class="tui-text">男</text>
            </view>
          </tui-label>
          <tui-label margin="0 0 0 40rpx">
            <view class="thorui-align__center">
              <tui-radio value="0"></tui-radio>
              <text class="tui-text">女</text>
            </view>
          </tui-label>
        </view>
      </tui-radio-group>
      <tui-button type="white" shape="circle" @click="show()">
        {{ formData.birthday ? '生日:' + formData.birthday : '生日' }}
      </tui-button>
      <tui-toast ref="msg"></tui-toast>
      <tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor"
                    :color="color"
                    :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="change"></tui-datetime>
      <tui-button width="400rpx" height="84rpx" bold formType="submit" @click="submit()">提交</tui-button>
    </tui-form>
  </view>
</template>

<script>
import utils from "@/components/common/tui-utils/tui-utils.js"
import tuiForm from "@/components/thorui/tui-form/tui-form"
import tuiInput from "@/components/thorui/tui-input/tui-input"
import tuiToast from "@/components/thorui/tui-toast/tui-toast"
import tuiRadio from "@/components/thorui/tui-radio/tui-radio"
import tuiRadioGroup from "@/components/thorui/tui-radio-group/tui-radio-group"
import tuiDatetime from "@/components/thorui/tui-datetime/tui-datetime"
import {getUserInfo, updateUserInfo} from "@/api/user.js"

export default {
  components: {
    tuiForm,
    tuiInput,
    tuiRadio,
    tuiRadioGroup,
    tuiDatetime,
    tuiToast
  },
  data() {
    return {
      userInfo: '',
      formData: {
        name: '',
        phoneNum: '',
        emergencyCall: '',
        homeAdd: '',
        workAdd: '',
        sex: '',
        birthday: ''
      },
      type: 2,
      startYear: 1900,
      endYear: 2022,
      cancelColor: '#888',
      color: '#5677fc',
      setDateTime: '',
      result: '',
      unitTop: false,
      radius: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const data = res
          this.userInfo = data
          this.formData.name = data.name
          this.formData.phoneNum = data.phoneNum
          this.formData.emergencyCall = data.emergencyCall
          this.formData.homeAdd = data.homeAdd
          this.formData.workAdd = data.workAdd
          this.formData.birthday = utils.formatDate('y-m-d',data.birthday,2)
          console.log(data.birthday)
		  console.log(utils.formatDate('y-m-d',data.birthday,2))
          this.formData.sex = data.sex
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    submit() {
      const form = {
        birthday: this.formData.birthday,
        emergencyCall: this.formData.emergencyCall,
        homeAdd: this.formData.homeAdd,
        workAdd: this.formData.workAdd,
        phoneNum: this.formData.phoneNum,
        sex: this.formData.sex,
        username: this.formData.name
      }
      updateUserInfo(form).then(res => {
        let params = {
          title: "操作成功",
          content: "更新个人信息成功！"
        }
        this.$refs.msg.show(params);
      }).catch( err => {
        console.log(err)
      })
    },
    show() {
      this.$refs.dateTime.show();
    },
    change: function (e) {
      console.log(e)
      this.formData.birthday = utils.formatDate('y-m-d',e.result,3)
    },

  }
}
</script>

<style lang="scss">

</style>
