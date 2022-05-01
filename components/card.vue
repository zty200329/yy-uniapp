<template>
  <div class='container' @click.stop="goDetail($event)">
    <div class='head'>
      <img class='head-img' :src='item.avatarUrl' :data-loginname='item.username'>
      <div class='info'>
        <span>{{item.username}}</span>
        <span class='time' v-if='!hidden'>{{formatCreateAt}}</span>
      </div>
      <span class="top" v-if="item.top">置顶</span>
    </div>
    <div class='body'>
      <p>{{item.title}}</p>
    </div>
    <div class='foot'>
      <div class='count' v-if='!hidden'>
        <span class='number'>回答：{{item.commentCount}}</span>
        <span class='number'>浏览：{{item.pageview}}</span>
      </div>
      <div class='later'>
        <span class='number'>最新动态：{{formatLastReply}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { passTime } from "../utils/index";
export default {
  props: {
    item: Object,
    hidden: {
      // 个人中心展示帖子隐藏一部分东西的复用
      default: false,
      type: Boolean
    }
  },
  computed: {
    formatLastReply() {
      return passTime(this.item.sendTime);
    },
    formatCreateAt() {
      return passTime(this.item.sendTime);
    }
  },
  methods: {
    goAuthorPage(e) {
      // e.currentTarget.dataset.author
      wx.navigateTo({
        url: `../user/main?loginname=${e.currentTarget.dataset.loginname}`
      });
    },
    goDetail() {
      wx.navigateTo({
        url: '/pages/forum_details/forum_details?id=' + this.item.id
      })
    }
  }
};
</script>

<style lang='scss'  scoped>
.container {
  height: 330rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    .top {
      position: absolute;
      right: 40rpx;
      color: red;
    }
  }
  .body {
    color: rgb(65, 184, 131);;
    & > p {
      font-weight: bold;
    }
  }
  .foot {
    display: flex;
    justify-content: space-between;
    .number {
      color: #888;
      font-size: 26rpx;
      & + & {
        margin-left: 20rpx;
      }
    }
  }
}
</style>
