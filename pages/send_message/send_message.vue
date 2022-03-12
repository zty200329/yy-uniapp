<template>
	<view>
		<tui-input label="用户id" placeholder="请输入用户id" v-model="userId"></tui-input>
    <tui-input label="发送者姓名" placeholder="请输入发送者姓名" v-model="senderName"></tui-input>
    <tui-textarea flexStart label="消息" placeholder="请输入要发送的消息" v-model="msg"></tui-textarea>
    <tui-button @click="sendMsg">发送</tui-button>
    <tui-toast ref="msg"></tui-toast>
  </view>
</template>

<script>
	import TuiInput from "../../components/thorui/tui-input/tui-input";
  import TuiTextarea from "../../components/thorui/tui-textarea/tui-textarea";
  import TuiButton from "../../components/thorui/tui-button/tui-button";
  import {sendMessageToUser} from "../../api/travel_apply";
  import TuiToast from "../../components/thorui/tui-toast/tui-toast";
  export default {
    components: {TuiToast, TuiButton, TuiTextarea, TuiInput},
    data() {
			return {
        userId: '',
        senderName: '',
        msg: '',
			};
		},
    methods:{
      sendMsg(){
        const form ={
          userId : this.userId,
          senderName : this.senderName,
          msg : this.msg
        }
        sendMessageToUser(form).then(res => {
          let params = {
            title: "操作成功",
            content: "更新个人信息成功！"
          }
          this.$refs.msg.show(params);
        }).catch(err => {
          console.error(err)
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
