<template>
  <div class='container'>
    <div class='header'>
      <div :class='{ active: tab==="all" }' @click.stop='changeTab($event)' data-tab='all' :data-offset='0'>全部</div>
      <div v-for="(item,index) in categoryList" :key="index">
        <div :class='{ active: tab===item.id }' @click.stop='changeTab($event)' :data-tab=item.id :data-offset=0>{{ item.name }}</div>
      </div>
    </div>
    <div class="containers" :animation='animation'>
<!--      <div v-for='(listItem,index) in list' :key='index'>-->
        <scroll-view scroll-y class='scroll-container' >
          <div v-for='(listItem,index) in list' :key='index'>
          <card :item='listItem'></card>
          </div>
        </scroll-view>
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import card from "../../components/card";

import {getAllCategory, getForumList, getForumListById} from "../../api/article";

  export default {
    components: {
      card
    },
		data() {
			return {
        list:[],
        tab: 'all',
        animation:'',
        categoryList:[],
			};
		},
    activated(){
      this.loadData()
    },
    mounted(){
      this.loadData()
      this.getCategory()
    },
    methods:{
      getCategory(){
        getAllCategory().then(res => {
          this.categoryList = res
        }).catch(err => {
          console.log(err)
        })
      },
      loadData(){
        getForumList().then(res => {
          this.list = res
        }).catch(err =>{
          console.log(err)
        })
      },
      changeTab(e) {
        const currentTab = e.target.dataset.tab;
        const offset = e.target.dataset.offset;

        if(currentTab === 'all'){
          this.loadData()
        }else {
          this.tab = currentTab;
          this.getById(currentTab);
        }
        this.animation = wx
            .createAnimation({
              duration: 1000,
              timingFunction: "ease"
            })
            .left(`-${offset * 100}vw`)
            .step()
            .export();

      },
      getById(id){
        getForumListById({id:id}).then(res => {
          this.list = res
        }).catch(err => {
          console.log(err)
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(245, 245, 249);
  font-size: 30rpx;
  overflow:hidden;
  width:100vw;
  .header {
    display: flex;
    & > div {
      width: 20%;
      background-color: #41b883;
      color: white;
      text-align: center;
      height: 86rpx;
      line-height: 86rpx;
    }
  }
  .containers {
    display: flex;
    position: relative;
    .scroll-container {
      height: 90vh;
      width: 100vw;
    }
  }
}
.header .header > div + .header > div {
  border-left: 2rpx solid white;
}
.active {
  font-weight: bold;
}
</style>
