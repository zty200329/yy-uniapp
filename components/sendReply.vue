<template>
<div class="mask" @click.stop="closeModal">
  <div class="container"  @click.stop="prevent">
 <textarea class='textarea' v-model="content1" placeholder="说点啥....."></textarea>
 <button class="button" @click.stop="send">提交</button>
  </div>
</div>
</template>
<script>
import {addComment} from "../api/article";

export default {
  props: {
    topicId: {
      default: "",
      type: Number,
    },
    replyId: {
      default: "",
      type: Number,
    },
    content: {
      default: "",
      type: String
    }
  },
  data(){
    return{
      content1: this.content,
    }
  },
  methods: {
    prevent() {},
    send() {
      const params = {
        content: this.content1,
        forumId: this.topicId,
        replyId: this.replyId
      }
      addComment(params).then(res => {
        this.content = "";
        this.$emit("reply-success");
      }).catch(err => {
        console.log(err)
      })
    },
    closeModal() {
      this.$emit("close-modal");
    }
  }
};
</script>
<style lang='scss' scoped>
.mask {
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    .textarea {
      border: 2rpx solid #888;
    }
    .button {
      background-color: rgb(65, 184, 131);
      color: white;
      width: 300rpx;
      margin-top: 26rpx;
    }
  }
}
</style>
