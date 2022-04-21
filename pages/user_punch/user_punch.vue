<template>
  <view>
    <view class="tui-title thorui-cells" v-for="(item,index) in titleList" :key="index">
      <view>{{ item.titleNum }}:{{ item.titleDes }}</view>
      <view class="tui-list-view">
        <checkbox-group @change="((e) => { checkboxChange(e,item)})">
          <tui-list-cell padding="0" v-for="(item1,index1) in item.choices" :key="index1">
            <label class="thorui-checkbox thorui-primary thorui-align__center thorui-padding">
              <checkbox color="#fff" :value="item1.choice"></checkbox>
              <text class="thorui-left__sm">{{ item1.des }}</text>
            </label>
          </tui-list-cell>
        </checkbox-group>
      </view>
    </view>
    <tui-input label="体温" placeholder="请输入你现在的体温" clearable v-model="temperatureValue"></tui-input>

    <view @click="setLocationFun" v-show="location === ''">点击获取地理位置</view>
    <view @click="setLocationFun" v-show="location !== ''">{{location}}</view>
    <tui-button @click="submit">提交</tui-button>
    <tui-toast ref="msg"></tui-toast>
  </view>
</template>

<script>
import {answerTheQuestion, getLatitudeAndLongitude, getTitleList} from "../../api/punch";
import TuiCheckboxGroup from "../../components/thorui/tui-checkbox-group/tui-checkbox-group";
import TuiLabel from "../../components/thorui/tui-label/tui-label";
import TuiButton from "../../components/thorui/tui-button/tui-button";
import TuiSlider from "../../components/thorui/tui-slider/tui-slider";
import TuiInput from "../../components/thorui/tui-input/tui-input";

export default {
  components: {TuiInput, TuiSlider, TuiButton, TuiLabel, TuiCheckboxGroup},
  data() {
    return {
      test: {},
      choices: [],
      titleList: [],
      latitude: 0.0,
      longitude: 0.0,
      location: '',
      temperatureValue: 0.0,
    };
  },
  mounted() {
    this.getTitles()
  },
  methods: {
    getTitles() {
      getTitleList().then(res => {
        this.titleList = res
      }).catch(err => {
        console.log(err)
      })
    },
    checkboxChange(e, item) {
      console.log('change事件，携带value值为：', e.detail.value)
      console.log(item.titleNum)
      let param = {
        titleNum: item.titleNum,
        choices: e.detail.value
      }
      console.log(param)
      // this.setData({
      //   [`test.${item.titleNum}`]: param
      // })
      this.test = {...this.test, [item.titleNum]: param};
    },
    submit() {
      for (let key in this.test) {
        this.choices.push(this.test[key])
      }
      console.log(this.choices)
      let params = {
        choices: this.choices,
        temperatureValue: this.temperatureValue,
        longitude: this.longitude,
        latitude: this.latitude,
        isMiddleRisk: 0,
        isHighRisk: 0,
        isHome: 1
      }
      answerTheQuestion(params).then(res => {
        let params = {
          title: "操作成功",
          content: "更新个人信息成功！"
        }
        this.$refs.msg.show(params);
      }).catch(err => {
        console.error(err)
      })
    },
    setLocationFun() {
      let that = this
      this.getLocationFun().then(res => {
        this.latitude = res.latitude
        this.longitude = res.longitude
        let params = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        getLatitudeAndLongitude(params).then(res =>{
          that.location = res
        }).catch(err => {
          console.error(err)
        })
      }).catch(err => {
        console.error(err)
      })
    },
    getLocationFun() {
      return new Promise((resolve, reject) => {
        uni.getLocation({
          type: 'gcj02',
          success: function (res) {
            resolve(res)
          },
          fail: function (error) {
            console.log('执行', error)
            reject(error)
          }
        });
      })

    }
  }
}
</script>

<style lang="scss">
.tui-title {
  width: 100%;
  font-size: 28 rpx;
  color: #888;
  padding: 40 rpx 30 rpx 20 rpx;
  box-sizing: border-box;
}

.tui-text {
  font-size: 30 rpx;
  padding-left: 12 rpx;
}
</style>
