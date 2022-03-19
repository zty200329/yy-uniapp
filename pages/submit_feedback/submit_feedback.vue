<template>
	<view>
    <tui-input label="主题" placeholder="请输入主题" v-model="formData.feedbackTheme"></tui-input>

    <tui-textarea v-model="formData.feedbackMsg" flexStart label="反馈详情"
                  placeholder="请输入你要反馈的内容.."></tui-textarea>
    <tui-upload :value="formData.attachment" :limit="3" :header="header" :delConfirm="true" :fileKeyName="fileKey"
                :serverUrl="url" @complete="uploadApplyFileComplete" @remove="removeApplyFileComplete"></tui-upload>
    <tui-button @click="submit">提交反馈</tui-button>
    <tui-toast ref="toast"></tui-toast>

  </view>
</template>

<script>
	import store from "../../store";
  import TuiButton from "../../components/thorui/tui-button/tui-button";
  import {addFeedback} from "../../api/feedback";

  export default {
    components: {TuiButton},
    data() {
			return {
				formData:{
          feedbackMsg: '',
          feedbackTheme: '',
          attachment: [],
        },
        header: {
          Authorization: store.state.user.token,
          'Content-Type': 'multipart/form-data'
        },
        fileKey: 'img',
        url: 'http://127.0.0.1:8083/api/file/uploadImg',
        // url: 'http://192.168.1.100:8083/api/file/uploadImg',
			};
		},
    methods:{
      uploadApplyFileComplete(e) {
        console.log(e)
        this.formData.attachment = e.imgArr
      },
      removeApplyFileComplete(e) {
        let index = e.index
      },
      submit(){
        addFeedback(this.formData).then(res => {
          let params = {
            title: "操作成功，我们将尽快给您答复",
            content: "我们将尽快给您答复"
          }
          this.$refs.toast.show(params);
        }).catch(err => {
          console.error(err)
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
