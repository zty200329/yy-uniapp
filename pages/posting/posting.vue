<template>
  <view class="container">
    <view class='list'>
      <span>标题:</span>
      <input class='input' type="text" placeholder="最少5个字" v-model="title">
    </view>
    <tui-button @click="picker"> <span>选择主题:</span><span style='margin-left:400rpx;'>{{result.text}}</span></tui-button>
    <tui-picker :show="show" :pickerData="items" @hide="hide" @change="change">
    </tui-picker>
<!--    <view class="textarea">-->
<!--      <span>简介:</span>-->
<!--      <tui-textarea v-model="summary" placeholder="请输入内容">>-->
<!--      </tui-textarea>-->
<!--    </view>-->

    <view>
    <jinEdit showImgSize="true" showImgToolbar="true" showImgResize="true"  placeholder="请输入内容" @editOk="editOk" :uploadFileUrl=url fileKeyName="img" :header=header></jinEdit>
    </view>
    <tui-button @click="add">发布</tui-button>
    <tui-toast ref="toast"></tui-toast>

  </view>
</template>

<script>
import jinEdit from '../../components/jin-edit/components/jin-edit/jin-edit.vue';
import TuiInput from "../../components/thorui/tui-input/tui-input";
import helper from "../../common/helper"
import store from "../../store";
import TuiButton from "../../components/thorui/tui-button/tui-button";
import TuiTextarea from "../../components/thorui/tui-textarea/tui-textarea";
import {addForum, getAllCategory} from "../../api/article";
import request from "../../utils/request";

const BASE_URL = helper.websiteUrl;
export default {
  data() {
    return {
      show: false,
      items: [],
      title: "",
      summary: '',
      content: "",
      visible: false,
      url: BASE_URL+'/file/uploadImg1',
      header: {
        Authorization: store.state.user.token,
        'Content-Type': 'multipart/form-data'
      },
      result: ''
    };
  },
  mounted(){
    this.loadData()
  },
  components: {
    TuiTextarea,
    TuiButton,
    TuiInput,
    jinEdit
  },
  methods: {
    loadData(){
      getAllCategory().then(res => {
        let data = res
        data.map(e => {
          e.value = e.id
          e.text = e.name
        })
        this.items = data
      }).catch(err => {
        console.log(err)
      })
    },
    hide(){
      this.show = false
    },
    change(e){
      console.log(e)
      this.result = e
    },
    picker() {
      this.show = true;
    },
    // 点击发布
    editOk(res) {
      console.log(res);
      this.content = res.html
    },
    add(){
      const params = {
        title: this.title,
        summary: this.summary,
        htmlContent: this.content,
        categoryId: this.result.value
      }
      addForum(params).then(res => {
        let params = {
          title: "发表成功",
        }
        this.$refs.toast.show(params);
        uni.navigateTo({
          url:'/pages/forum/forum'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  height: 100vh;
  background-color: rgb(245, 245, 249);
  .list {
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 30rpx;
    height: 90rpx;
    padding: 0 30rpx;
    line-height: 90rpx;
    .input {
      height: 90rpx;
      line-height: 90rpx;
    }
  }
  .picker {
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    padding: 0 30rpx;
  }
  .tabs {
    display: flex;
    background-color: white;
    & > div {
      width: 50%;
      text-align: center;
    }
  }
  .textarea {
    width: 100%;
    background-color: white;
    margin-bottom: 30rpx;
    height: 500rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
  }
}
.selected {
  color: rgb(65, 184, 131);
  border-bottom: 2rpx solid rgb(65, 184, 131);;
}
</style>

