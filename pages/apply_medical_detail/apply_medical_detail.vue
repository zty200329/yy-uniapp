<template>
  <view>
    <tui-list-view backgroundColor="#fff">
      <view class="thorui-preview__hd">
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">就医人姓名</view>
          <view class="thorui-preview__value_hd">{{ details.name }}</view>
        </view>
      </view>
      <view class="thorui-preview__bd">
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">性别</view>
          <view class="thorui-preview__value">{{ details.sex === 0 ? '女' : '男' }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">年龄</view>
          <view class="thorui-preview__value">{{ details.age }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">街道</view>
          <view class="thorui-preview__value">{{ details.street }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">社区</view>
          <view class="thorui-preview__value">{{ details.community }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">身份证号</view>
          <view class="thorui-preview__value">{{ details.idNum }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">手机号</view>
          <view class="thorui-preview__value">{{ details.phoneNum }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">就医原因</view>
          <view class="thorui-preview__value">{{ details.reason }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">预计前往医院</view>
          <view class="thorui-preview__value">{{ details.hospital }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">就医日期</view>
          <view class="thorui-preview__value">{{ details.doctorTime }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">陪伴人</view>
          <view class="thorui-preview__value">{{ details.otherName }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">与陪伴人关系</view>
          <view class="thorui-preview__value">{{ details.relation }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">陪伴人身份证号</view>
          <view class="thorui-preview__value">{{ details.otherIdNum }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">就医路线</view>
          <view class="thorui-preview__value">{{ details.way }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">社区负责人</view>
          <view class="thorui-preview__value">{{ details.leaderName }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">社区负责人电话</view>
          <view class="thorui-preview__value">{{ details.leaderPhoneNum }}</view>
        </view>
        <view class="thorui-preview__item">
          <view class="thorui-preview__label">审核日期</view>
          <view class="thorui-preview__value">{{ details.leaderTime }}</view>
        </view>

        <view class="thorui-preview__item">
          <tui-button plain link @click="openPDF">查看出行文件</tui-button>
        </view>
      </view>
    </tui-list-view>
  </view>
</template>

<script>
import {getMedicalApplyById} from "../../api/travel_apply";
import utils from "@/components/common/tui-utils/tui-utils.js"

export default {
  data() {
    return {
      id: '',
      details: ''
    };
  },
  onLoad: function (e) {
    this.id = e.id
    console.log(e)
    this.loadData()
  },
  methods: {
    loadData() {
      getMedicalApplyById({id: this.id}).then(res => {
        res.doctorTime = utils.formatDate('y-m-d', res.doctorTime, 1)
        res.leaderTime = utils.formatDate('y-m-d', res.leaderTime, 2)

        this.details = res
      })
    },
    androidOpenPdf(url) {

      wx.downloadFile({

        url: url,
        success: function (res) {

          var filePath = res.tempFilePath;
          wx.openDocument({

            filePath: filePath,
            success: function (res) {

              console.log("打开文档成功");
            },
          });
        },
      });
    },
    openPDF() {

      switch (uni.getSystemInfoSync().platform) {

        case "android":
          console.log("安卓");
          // 这里直接调用原生的方法，我们上面定义的
          this.androidOpenPdf(this.details.fileUrl);
          break;
        case "ios":
          console.log("IOS");
          //这里跳转web-view页面
          wx.navigateTo({

            url: "../web_view/web_view?contractUrl=" + this.details.fileUrl,
          });
          break;
        default:
          this.androidOpenPdf(this.contractUrl);
          break;
      }
    }

  }

}
</script>

<style lang="scss">

</style>
