<template>
	<view>
    <view class="tui-page__hd">
      <view class="tui-page__title">身体状态上报</view>
      <view class="tui-page__desc">填写自己的疾病信息</view>
    </view>
    <tui-input label="姓名" placeholder="请输入姓名" v-model="form.name"></tui-input>
    <tui-input label="年龄" placeholder="请输入年龄" v-model="form.age"></tui-input>
    <tui-textarea v-model="form.homeAdd" flexStart label="家庭地址"
                  placeholder="请输入您的家庭地址.."></tui-textarea>
    <view class="tui-page__bd">
      <view class="tui-title thorui-cells">健康状态</view>
      <tui-radio-group name="radio" v-model="form.healthStatus">
        <view class="thorui-cells thorui-white__bg thorui-align__center">
          <tui-label>
            <view class="thorui-align__center">
              <tui-radio value="0"></tui-radio>
              <text class="tui-text">健康</text>
            </view>
          </tui-label>
          <tui-label margin="0 0 0 40rpx">
            <view class="thorui-align__center">
              <tui-radio value="1"></tui-radio>
              <text class="tui-text">存在疾病</text>
            </view>
          </tui-label>
        </view>
      </tui-radio-group>
    </view>
    <view class="tui-page__bd">
      <view class="tui-title thorui-cells">是否需要常去医院</view>
      <tui-radio-group name="radio" v-model="form.isOftenHospital">
        <view class="thorui-cells thorui-white__bg thorui-align__center">
          <tui-label>
            <view class="thorui-align__center">
              <tui-radio value="0"></tui-radio>
              <text class="tui-text">是</text>
            </view>
          </tui-label>
          <tui-label margin="0 0 0 40rpx">
            <view class="thorui-align__center">
              <tui-radio value="1"></tui-radio>
              <text class="tui-text">否</text>
            </view>
          </tui-label>
        </view>
      </tui-radio-group>
    </view>
    <tui-input label="疾病名称" placeholder="请输入疾病名称" v-model="form.nameOfDisease"></tui-input>
    <tui-textarea v-model="form.diagnosticAdvice" flexStart label="诊断建议"
                  placeholder="请输入您的诊断建议.."></tui-textarea>
    <tui-input label="常去医院名称" placeholder="请输入常去的医院名称" v-model="form.oftenHospital"></tui-input>
    <tui-input label="手机号" placeholder="请输入手机号" v-model="form.phoneNum"></tui-input>
    <text>上传材料</text>
    <tui-upload :limit="3" :header="header" :delConfirm="true" :fileKeyName="fileKey" :serverUrl="url"
                @complete="uploadFileComplete" @remove="removeFileComplete"></tui-upload>
    <tui-button  @click="submitApply">提交健康信息</tui-button>
    <tui-toast ref="msg"></tui-toast>

  </view>
</template>

<script>
	import store from "../../store";
  import helper from "../../common/helper"
  import {addDiseaseInfo} from "../../api/travel_apply";

  export default {
		data() {
			return {
        form:{
          name: '',
          age: '',
          homeAdd: '',
          healthStatus:'',
          isOftenHospital:'',
          nameOfDisease:'',
          diagnosticAdvice: '',
          oftenHospital:'',
          phoneNum:'',
          credential:[],
        },
        url: helper.websiteUrl+'/file/uploadImg',
        // url: 'http://192.168.1.100:8083/api/file/uploadImg',
        // url: 'http://zyyzty.mynatapp.cc/api/fil
        // e/uploadImg',
        header: {
          Authorization: store.state.user.token,
          'Content-Type': 'multipart/form-data'
        },
        fileKey: 'img',
			};
		},
    methods:{
      uploadFileComplete(e) {
        console.log(e)
        this.form.credential = e.imgArr
      },
      removeFileComplete(e) {
        let index = e.index
      },
      submitApply(){
        addDiseaseInfo(this.form).then(
            res => {
              let params = {
                title: "添加成功",
                imgUrl: "/static/success.png",
                content: "添加个人信息成功！"
              }
              this.$refs.msg.show(params);
            }
        ).catch(err => {
          console.error(err)
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
