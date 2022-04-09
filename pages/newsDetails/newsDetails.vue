<template>
  <view class="container">
    <view class="tui-news-title">{{detail.title}}</view>
    <view class="tui-sub-info">
      <view class="tui-sub-left">
        <text class="tui-author">{{detail.username}}</text>
        <text>{{ detail.publishTime }}</text>
      </view>

<!--      <view class="tui-sub-right">阅读 2453</view>-->
    </view>
    <view class="tui-news-content">

      <uParse :content="markdown || ''"/>
    </view>
<!--      <view class="tui-article">北京时间6月22日，重庆斯威队召开了赛前新闻发布会，主教练小克鲁伊夫和球员彭欣力出席。</view>-->
<!--      <view class="tui-article">-->
<!--        这是一场很重要的比赛，武汉卓尔在中超目前打的还是不错的，现在积分与我们一样。我们面对这个对手做了充分的准备，他们的战术变化很多，我也认为他们是一支训练有素的队伍。虽然这是一场艰难的比赛，我们也充满了动力去拿到我们想要的分数，实现我们的目标。联赛上半程还有两场比赛，我们也会竭尽全力拿到尽量多的分数。-->
<!--      </view>-->
<!--      <image src="/static/images/news/banner_2.jpg" class="tui-article-pic" mode="widthFix"></image>-->
<!--      <view class="tui-article">大家下午好，明天非常重要，这星期我们的备战时间比较充裕，我们针对对手做了有效的布置，希望明天给大家呈现精彩的比赛。</view>-->
<!--      <view class="tui-article">-->
<!--        我相信大家比我更了解他，但是就像刚刚提到的一样，这支球队的战术是丰富而多变的，这就意味着他在应对不同比赛时做了充分的准备。我们非常尊重明天的对手，他们最近状态出色，拿到许多分数。-->
<!--      </view>-->
<!--      <image src="/static/images/news/banner_1.jpg" class="tui-article-pic" mode="widthFix"></image>-->
<!--      <view class="tui-article">-->
<!--        对我而言，我还是想保持沉默，我不打算就这个问题做过多的评论。因为这个政策的变化是马上实施了，我们肯定是尊重它，然后在我们力所能及的范围上找到最好的应对的方案，我个人意见并不重要，我们尊重和遵守相关决定。-->
<!--      </view>-->
<!--    </view>-->

<!--    <view class="tui-news-source">消息参考来源：体坛大精汇</view>-->

<!--    <view class="tui-operate-box">-->
<!--      <tui-tag padding="26rpx 56rpx" :type="isFabulous ? 'primary' : 'gray'" shape="circle" :plain="true" @click="btnFabulous">-->
<!--        <tui-icon :name="iconName(isFabulous)" :size="20" :color="iconColor"></tui-icon>-->
<!--        <text class="tui-black" :class="[isFabulous ? 'tui-primary' : '']">{{ fabulous }}赞</text>-->
<!--      </tui-tag>-->
<!--      <button open-type="share" class="tui-share-btn" @tap="btnShare">-->
<!--        <tui-tag padding="26rpx 60rpx" type="gray" shape="circle" :plain="true">-->
<!--          <tui-icon name="partake" :size="20" color="#333"></tui-icon>-->
<!--          <text class="tui-black">分享</text>-->
<!--        </tui-tag>-->
<!--      </button>-->
<!--    </view>-->

<!--    <view class="tui-cmt-title">精彩评论（20）</view>-->
<!--    <view class="tui-cmtbox">-->
<!--      <view class="tui-cmt-cell" v-for="(item, index) in cmtList" :key="index">-->
<!--        <image :src="'/static/images/news/' + item.avatar" class="tui-avatar"></image>-->
<!--        <view class="tui-cmt-detail">-->
<!--          <view class="tui-header-box">-->
<!--            <view class="tui-cmt-nickname">{{ item.nickname }}</view>-->
<!--            <view class="tui-fabulous" :class="[item.isFabulous ? 'tui-primary' : '']" :id="index" @tap="cmtFabulous">-->
<!--              <text>{{ item.fabulous == 0 ? '赞' : item.fabulous }}</text>-->
<!--              <tui-icon :name="iconName(item.isFabulous)" :size="15" :color="itemIconColor(item.isFabulous)"></tui-icon>-->
<!--            </view>-->
<!--          </view>-->
<!--          <view class="tui-cmt-content">{{ item.content }}</view>-->
<!--          <view class="tui-reply-box" v-if="item.replayNum > 0">-->
<!--            <tui-list-cell-->
<!--                backgroundColor="#f2f2f2"-->
<!--                :size="28"-->
<!--                v-for="(items, index2) in item.reply"-->
<!--                :key="index2"-->
<!--                :unlined="item.replayNum < 2 && item.reply.length - 1 == index"-->
<!--                @tap="cmtReply"-->
<!--            >-->
<!--              <view class="tui-flex-1 tui-reply-nickname">{{ items.nickname }}</view>-->
<!--              <view class="tui-flex-1">{{ items.content }}</view>-->
<!--            </tui-list-cell>-->
<!--            <tui-list-cell padding="20rpx 30rpx" backgroundColor="#f2f2f2" :size="28" :unlined="true" v-if="item.replayNum > 2" @tap="cmtReply">-->
<!--              <view class="tui-flex-1  tui-cell-last">-->
<!--                <text>共{{ item.replayNum }}条回复</text>-->
<!--                <tui-icon name="arrowright" :size="22" color="#5677fc"></tui-icon>-->
<!--              </view>-->
<!--            </tui-list-cell>-->
<!--          </view>-->
<!--          <view class="tui-footer">-->
<!--            {{ item.time }}-->
<!--            <view class="tui-primary tui-ml" hover-class="opcity" :hover-start-time="150" @tap="cmtReply">回复</view>-->
<!--          </view>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->

<!--    <view class="tui-operation">-->
<!--      <view class="tui-operation-left tui-col-7"><view class="tui-btn-comment" @tap="btnCmt">发表你的评论...</view></view>-->
<!--      <view class="tui-operation-right tui-right-flex tui-col-5">-->
<!--        <view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="cmtAll">-->
<!--          <tui-icon name="message" :size="30" color="#444"></tui-icon>-->
<!--          <tui-badge absolute type="white_primary" :scaleRatio="0.7">501</tui-badge>-->
<!--        </view>-->
<!--        <view class="tui-operation-item" @tap="collection">-->
<!--          <tui-icon :name="isCollection ? 'star-fill' : 'star'" :size="29" :color="isCollection ? '#5677fc' : '#444'"></tui-icon>-->
<!--        </view>-->
<!--        <view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="btnShare">-->
<!--          <button open-type="share" class="tui-share-btn"><tui-icon name="share" :size="31" color="#444"></tui-icon></button>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->

<!--    &lt;!&ndash;加载loadding&ndash;&gt;-->
<!--    <tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>-->
<!--    <tui-nomore v-if="!pullUpOn" backgroundColor="#fff" text="没有更多评论"></tui-nomore>-->
<!--    &lt;!&ndash;加载loadding&ndash;&gt;-->
<!--    <view class="tui-safearea-bottom"></view>-->
  </view>
</template>

<script>
	import {getArticleDetail} from "../../api/article";
  import utils from "@/components/common/tui-utils/tui-utils.js"
  import marked from '@/components/uni/marked'
  import uParse from '@/components/uni/uParse/src/wxParse'
  export default {
    components: {
      uParse
    },
		data() {
			return {
        id:'',
        detail:'',
        markdown:''
			};
		},
    onLoad: function (option) {
      this.id = option.id
      this.loadData()
      console.log(option.id)
    },
    mounted(){

    },
    methods:{
      loadData(){
        getArticleDetail({id:this.id}).then(res =>{
          this.detail = res
          this.detail.publishTime = utils.formatDate('y-m-d h:i:s', this.detail.publishTime, 2)
          this.markdown=marked(this.detail.content)
        }).catch(err => {
          console.log(err)
        })
      }
    }
	}
</script>

<style lang="scss">
page {
  background: #fff;
  color: #333;
}

.container {
  padding: 40rpx 30rpx 110rpx 30rpx;
  box-sizing: border-box;
}

.tui-news-title {
  font-size: 48rpx;
  font-weight: 500;
  text-align: justify;
}

.tui-sub-info {
  padding-top: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  color: #999;
}

.tui-author {
  color: #5677fc;
  padding-right: 20rpx;
}

.tui-news-content {
  padding-top: 40rpx;
}

.tui-article {
  /* text-indent: 2em; */
  font-size: 34rpx;
  padding-bottom: 40rpx;
  line-height: 60rpx;
  text-align: justify;
  word-break: break-all;
  word-wrap: break-word;
}

.tui-article-pic {
  width: 100%;
  display: block;
  margin-bottom: 40rpx;
}

.tui-news-source {
  font-size: 24rpx;
  color: #999;
}

.tui-operate-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60rpx 40rpx;
  box-sizing: border-box;
}

.tui-black {
  color: #333;
  padding-left: 12rpx;
}

.tui-cmt-title {
  font-size: 30rpx;
  font-weight: bold;
  position: relative;
}

.tui-cmt-title::after {
  content: '';
  position: absolute;
  left: -18rpx;
  top: 18%;
  width: 6rpx;
  height: 64%;
  background: #5677fc;
}

.tui-cmtbox {
  padding-bottom: 20rpx;
}

.tui-cmt-cell {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 44rpx;
}

.tui-avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 32rpx;
  display: block;
  flex-shrink: 0;
}

.tui-cmt-detail {
  width: 100%;
  padding-left: 16rpx;
  box-sizing: border-box;
}

.tui-header-box {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 30rpx;
}

.tui-cmt-nickname {
  color: #5677fc;
}

.tui-fabulous {
  color: #9a9a9a;
}

.tui-fabulous text {
  padding-right: 4rpx;
  font-size: 24rpx;
}

.tui-cmt-content {
  font-size: 32rpx;
  color: #333;
  text-align: justify;
  padding-top: 8rpx;
  word-break: break-all;
  word-wrap: break-word;
}

.tui-reply-box {
  border-radius: 8rpx;
  overflow: hidden;
  margin-top: 16rpx;
}

.tui-cell-last {
  display: flex;
  align-items: center;
  word-wrap: break-word;
  color: #5677fc;
}
.tui-flex-1 {
  flex: 1;
  width: 100%;
}

.tui-reply-nickname {
  font-size: 24rpx;
  color: #7a7a7a;
  padding-bottom: 8rpx;
}

.tui-footer {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  margin-top: 16rpx;
  color: #9a9a9a;
}

.tui-primary {
  color: #5677fc !important;
}

.tui-ml {
  margin-left: 16rpx;
}

.tui-operation {
  width: 100%;
  height: 100rpx;
  overflow: hidden;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99999;
  padding-bottom: env(safe-area-inset-bottom);
}

.tui-safearea-bottom {
  width: 100%;
  height: env(safe-area-inset-bottom);
}

.tui-operation::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  border-top: 1rpx solid #eaeef1;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.tui-operation-left {
  display: flex;
  align-items: center;
}

.tui-operation-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

.tui-operation-right {
  height: 100rpx;
  box-sizing: border-box;
  padding-top: 0;
}

.tui-right-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tui-btn-comment {
  height: 64rpx;
  width: 84%;
  background: #ededed;
  color: #999;
  border-radius: 8rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  padding-left: 20rpx;
  box-sizing: border-box;
  padding-top: 0;
  margin-left: 30rpx;
}

.tui-col-7 {
  width: 58.33333333%;
}

.tui-col-5 {
  width: 41.66666667%;
}

.tui-share-btn {
  display: block;
  background: none;
  margin: 0;
  padding: 0;
}
</style>
