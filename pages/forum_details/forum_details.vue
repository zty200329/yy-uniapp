<template>
  <div  class='container'>
    <sendReply v-if='sendVisible' @close-modal='closeModal' @reply-success='replySuccess' :content=content :topicId=id :replyId=replyId></sendReply>
    <div>
      <div class='header'>
        <div class='author'>
          <img class='author-img' :src='details.avatarUrl' alt="头像">
          <span class='name'>{{details.username}}</span>
        </div>
<!--        <div class='list'><img @click.stop="collect" :src="detailData.is_collect?'/static/star2.png':'/static/star1.png'" style='width:40rpx;height:40rpx;'><span>楼主</span></div>-->
      </div>
      <scroll-view class='body' scroll-y='true' >
        <div class='title'>
          <p class='big'>{{details.title}}</p>
          <div class='time-info'>
            <span>发布于:{{details.sendTime}}</span>
            <span>浏览:{{details.pageview}}</span>
            <span>评论:{{details.commentCount}}</span>
          </div>
        </div>
        <div v-if='!sendVisible' class='reply-buton' @click.stop="showReplyModal">评论</div>
        <div class='content'>
          <uParse :content="details.htmlContent || ''"/>
        </div>
        <div class='reply'>
          <div>评论：</div>
          <div class='reply-container' v-for='(item,index) in details.commentVOS' :key='item.id' :data-id='item.id'>
            <div class='head'>
              <img class='head-img' :src='item.avatarUrl' :data-loginname='item.username'>
              <div class='info'>
                <span>{{item.username}}</span>
                <span class='time'>{{item.createTime}}</span>
              </div>
            </div>
            <p class='reply-content'>
<!--              <wemark :mdData='item.content'></wemark>-->
                <uParse :content="item.content || ''"/>
            </p>
            <div class='foot'>
              <div :data-loginname='item.username' @click.stop="showReplyModal($event)" :data-replyid='item.id'><img class='icon' src='/static/chat.png' /><span>回复</span></div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import utils from "../../components/common/tui-utils/tui-utils.js"

	import {getForumById} from "../../api/article";
  import sendReply from "../../components/sendReply";
  import marked from '../../components/uni/marked'
  import uParse from '../../components/uni/uParse/src/wxParse'
  export default {
    components:{
      sendReply,
      uParse
    },
		data() {
			return {
        id:'',
        details:'',
        remainReplies: false,
        replyId: "",
        content: "",
        sendVisible: false,
      };
		},
    onLoad: function (option) {
      this.id = option.id
      console.log(option)
      this.loadData()
    },
    methods:{

      loadData(){
        getForumById({id:this.id}).then(res =>{
          let data = res
          data.commentVOS.map(e => {
            e.createTime = utils.formatDate('y-m-d h:i:s', e.createTime, 2)
          })
          data.sendTime =  utils.formatDate('y-m-d h:i:s', data.sendTime, 2)
          this.details = data
        }).catch(err => {
          console.log(err)
        })
      },
      showReplyModal(e) {
        console.log(e)
        const replyname = e.currentTarget.dataset.loginname;
        if (replyname) {
          this.content = `@${replyname} `;
        } else {
          this.content = "";
        }

        this.replyId = e.currentTarget.dataset.replyid;
        this.sendVisible = true;
      },
      closeModal() {
        this.sendVisible = false;
      },
      replySuccess() {
        wx.showToast({
          title: "评论成功",
          icon: "none",
          duration: 1500
        });
        this.closeModal();
        this.loadData();
      },


    }
	}
</script>

<style lang='scss' scoped>
.container {
  height: 100vh;
  background-color: rgb(245, 245, 239);
  .header {
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 20rpx;
    padding: 30rpx;
    .author {
      color: rgb(65, 184, 131);;
      display: flex;
      align-items: center;
      .author-img {
        width: 64rpx;
        height: 64rpx;
      }
      .name {
        margin-left: 20rpx;
      }
    }
    .list {
      display: flex;
      align-items: center;
    }
  }
  .body {
    height: 90vh;
  }
  .title {
    background-color: white;
    margin-bottom: 20rpx;
    padding: 30rpx;
    .big {
      font-size: 50rpx;
    }
    .time-info {
      display: flex;
      justify-content: space-around;
    }
  }
  .reply-buton {
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    text-align: center;
    font-size: 30rpx;
    position: fixed;
    line-height: 100rpx;
    background-color: rgb(65, 184, 131);;
    top: 86vh;
    left: 81vw;
    color: white;
  }
  .up-png {
    width: 100rpx;
    top: 75vh;
    left: 81vw;
    position: fixed;
  }
  .content {
    background-color: white;
    margin-bottom: 20rpx;
    padding: 30rpx;
  }
}
.reply {
  background-color: white;
  margin-bottom: 20rpx;
  padding: 30rpx;
  .reply-container {
    padding: 30rpx;
    .head {
      color: rgb(65, 184, 131);;
      display: flex;
      align-items: center;
      .head-img {
        width: 64rpx;
        height: 64rpx;
      }
      .info {
        flex-direction: column;
        display: flex;
        margin-left: 26rpx;
        .time {
          color: #888;
        }
      }
    }
    .reply-content {
      font-size: 40rpx;
      & + & {
        border-top: 2rpx solid #888;
      }
    }
    .foot {
      display: flex;
      & > div {
        margin-right: 20rpx;
        display: flex;
        align-items: center;
      }
      .icon {
        width: 56rpx;
        height: 56rpx;
      }
    }
  }
}
</style>
