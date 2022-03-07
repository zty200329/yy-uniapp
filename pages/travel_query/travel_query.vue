<template>
  <view>
    <tui-button type="gray-primary" :size="34" bold width="372rpx" height="84rpx" margin="40rpx auto"
                @click="picker_start">{{ startCityName ? '自:' + startCityName : '请选择出发城市' }}
    </tui-button>
    <tui-picker :show="start" :layer="2" :pickerData="citys" :params="1" @hide="start_hide" @change="change_start">
    </tui-picker>
    <tui-button type="gray-primary" :size="34" bold width="372rpx" height="84rpx" margin="40rpx auto"
                @click="picker_end">{{ endCityName ? '到:' + endCityName : '请选择到达城市' }}
    </tui-button>
    <tui-picker :show="end" :layer="2" :pickerData="citys" :params="1" @hide="end_hide" @change="change_end">
    </tui-picker>
    <tui-button @click="submit_query">查询出行政策</tui-button>
    <view v-show="queryComplete">
      <tui-list-view backgroundColor="#afceff">
        <view class="thorui-preview__hd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">出发城市</view>
            <view class="thorui-preview__value_hd">{{ fromInfo.city_name }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">出发城市健康码</view>
            <view class="thorui-preview__value_hd">
              <tui-button @click="showFormHealthCode">点击查看健康码</tui-button>
            </view>
            <tui-gallery :show="formHealthCodeShow" @hide="hideFormHealthCode"
                         :urls="fromInfo.health_code_picture"></tui-gallery>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">风险等级</view>
            <view class="thorui-preview__value_hd">
              <span v-if="fromInfo.risk_level === '0'">暂无</span>
              <span v-else-if="fromInfo.risk_level === '1'">低风险</span>
              <span v-else-if="fromInfo.risk_level === '2'">中风险</span>
              <span v-else-if="fromInfo.risk_level === '3'">高风险</span>
              <span v-else-if="fromInfo.risk_level === '4'">部分地区中风险</span>
              <span v-else-if="fromInfo.risk_level === '5'">部分地区高风险</span>
              <span v-else-if="fromInfo.risk_level === '6'">部分地区中、高风险</span>
            </view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">出行政策描述</view>
            <view class="thorui-preview__value_hd">{{ fromInfo.out_desc }}</view>
          </view>

        </view>
      </tui-list-view>
      <tui-list-view backgroundColor="#cafffe" marginTop="60rpx">
        <view class="thorui-preview__hd">
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">到达城市</view>
            <view class="thorui-preview__value_hd">{{ toInfo.city_name }}</view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">到达城市健康码</view>
            <view class="thorui-preview__value_hd">
              <tui-button @click="showToHealthCode">点击查看健康码</tui-button>
            </view>
            <tui-gallery :show="toHealthCodeShow" @hide="hideToHealthCode"
                         :urls="toInfo.health_code_picture"></tui-gallery>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">风险等级</view>
            <view class="thorui-preview__value_hd">
              <span v-if="toInfo.risk_level === '0'">暂无</span>
              <span v-else-if="toInfo.risk_level === '1'">低风险</span>
              <span v-else-if="toInfo.risk_level === '2'">中风险</span>
              <span v-else-if="toInfo.risk_level === '3'">高风险</span>
              <span v-else-if="toInfo.risk_level === '4'">部分地区中风险</span>
              <span v-else-if="toInfo.risk_level === '5'">部分地区高风险</span>
              <span v-else-if="toInfo.risk_level === '6'">部分地区中、高风险</span>
            </view>
          </view>
          <view class="thorui-preview__item">
            <view class="thorui-preview__label">高风险地区，进入政策描述</view>
            <view class="thorui-preview__value_hd">{{ toInfo.high_in_desc }}</view>
          </view>
		  <view class="thorui-preview__item">
		    <view class="thorui-preview__label">低风险地区，进入政策描述</view>
		    <view class="thorui-preview__value_hd">{{ toInfo.low_in_desc }}</view>
		  </view>
        </view>
      </tui-list-view>
    </view>
  </view>
</template>

<script>
import tuiPicker from "@/components/thorui/tui-picker/tui-picker"
import tuiButton from "@/components/thorui/tui-button/tui-button"
import tuiGallery from "@/components/thorui/tui-gallery/tui-gallery"
import {getCitys, travelQuery} from "@/api/travel_query.js"

export default {
  components: {
    tuiPicker,
    tuiButton,
    tuiGallery
  },
  data() {
    return {
      start: false,
      end: false,
      citys: '',
      startCityName: '',
      endCityName: '',
      startCityCode: '',
      endCityCode: '',
      queryComplete: false,
      fromInfo: '',
      toInfo: '',
      formHealthCodeShow: false,
      toHealthCodeShow: false,
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getCitys().then(res => {
        const data = res
        console.log(data)
        console.log(typeof (data))
        const json = JSON.parse(data)
        this.citys = json.result
        console.log(this.citys)
      }).catch(err => {
        console.log(err)
      })
    },
    hideFormHealthCode() {
      this.formHealthCodeShow = false
    },
    showFormHealthCode() {
      console.log(this.fromInfo.health_code_picture)
      this.formHealthCodeShow = true
    },
	hideToHealthCode() {
	  this.toHealthCodeShow = false
	},
	showToHealthCode() {
	  console.log(this.toInfo.health_code_picture)
	  this.toHealthCodeShow = true
	},
    submit_query() {
      const params = {
        from: this.startCityCode,
        to: this.endCityCode
      }
      travelQuery(params).then(res => {
        const result = JSON.parse(res)
        console.log(result)
        this.fromInfo = result.result.from_info
		// 因为ui要求这个格式 所以转换一下
		var arr = new Array();
		arr[0] = {
		  src: this.fromInfo.health_code_picture,
		  desc: this.fromInfo.health_code_desc
		}
		this.fromInfo.health_code_picture = arr
        console.log(this.fromInfo)
		
        this.toInfo = result.result.to_info
		// 因为ui要求这个格式 所以转换一下
		var arr1 = new Array();
		arr1[0] = {
		  src: this.toInfo.health_code_picture,
		  desc: this.toInfo.health_code_desc
		}
		this.toInfo.health_code_picture = arr1
        this.queryComplete = true
      }).catch(err => {
        console.log(err)
      })
    },
    picker_start() {
      this.start = true;
    },
    picker_end() {
      this.end = true;
    },
    start_hide(e) {
      this.start = false
    },
    end_hide(e) {
      this.end = false
    },
    change_start(e) {
      console.log(e)
      this.startCityName = e.result
      this.startCityCode = e.value[1]
      console.log(this.startCityName)
      console.log(this.startCityCode)
    },
    change_end(e) {
      console.log(e)
      this.endCityName = e.result
      this.endCityCode = e.value[1]
      this.resulut = JSON.stringify(e)
    },
  }
}
</script>

<style lang="scss">

</style>
