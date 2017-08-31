<template>
  <div class="house_second" id="sec_box">
    <m-head :go-back="true" :header-layout="1" :title="'上海康城'" :select-nav="true"></m-head>
    <div class="house_header">
      <div class="title clearfix">
        <div class="left">
          <span class="tag"  @click="gotoPlateDetail()">浦东-张江<img src="~assets/img/house/white-arrow_right.png" style="width: .06rem;vertical-align: -0.01rem;margin-left: .03rem;"></span>
        </div>
        <div class="right">88人关注</div>
      </div>
      <div class="house_info">
        <div class="house_info_top">
          <div class="price">
            <span>88888</span>元/㎡</div>
          <div class="bottom">最新挂牌行情</div>
        </div>
        <div class="house_info_bottom flex-row">
          <div class="left-block">
            <div class="row-1">
              <span>88</span>套</div>
            <div class="row-2">在售房源<img src="~assets/img/house/white_up_bold.png"><img src="~assets/img/house/white_down_bold.png">88%
            </div>
          </div>
          <div class="center-block">

            <div class="row-1">
              <span>88</span>套</div>
            <div class="row-2">最近成交17年8月</div>
            <!-- <div class="row-2" v-if="houseHeaderInfoTwo.mon3Flag!='1'">{{houseHeaderInfoTwo.ValMonth}}月份成交<img v-if="houseHeaderInfoTwo.bargainchange>=0" src="~assets/img/house/white_up_bold.png"><img v-if="houseHeaderInfoTwo.bargainchange<0" src="~assets/img/house/white_down_bold.png">{{houseHeaderInfoTwo.bargainchange}}%</div> -->
          </div>
          <div class="right-block">
            <div class="row-1">
              <span>888888</span>元/月</div>
            <div class="row-2">参考租金
              <span class="house_type">2室1厅</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mHead from '~components/head.vue'
import axios from 'axios'
export default {
  async asyncData (params) {
    console.log(params)
    let houseId = params.query.houseId;
    let paramsData = {
      city_id: 605,
      house_id: houseId
    }
    const { data } = await axios.get('https://inner299.2boss.cn/house/getHouseDetailHead',{
      params: {
        cityId: 605,
        houseId: houseId
      }
    })
    // const { houseHeaderInfoTwo } = await axios.get('https://inner299.2boss.cn/rabbit/v1/house/getHouseTopareaInfo',{
    //   params: paramsData
    // })
    console.log(data)
    return {
      houseHeaderInfoOne: data
    }
  },
  name: 'house_second',
  data() {
    return {
      show_dowload: true,
      tabIndex: 1,
      houseHeaderInfoOne: {},
      houseHeaderInfoTwo: {},
      onSalelists: [],
      agencyList: [],
      samePlateInfo: {
        houses: []
      },
      houseTrend: {
        desArray: []
      }
    }
  },
  components: {
    mHead,
  },
  methods: {
    gotoPlateDetail() {

    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) "~assets/common/common.less";
.house_second {
  background: @bk;
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .border_b {
    border-bottom: 1px solid @line_gray;
  }
  .has-padding-margin {
    margin: 0 .15rem;
    padding: .1rem 0;
  }
  .content_box {
    &.addPadding {
      padding-bottom: .65rem;
    }
    &.rmPadding {
      padding-bottom: 0;
    }
  }
  .house_header {
    padding: .5rem 0 15px;
    background: #fd5056;
    color: white;
    .clearfix:after {
      content: '.';
      visibility: hidden;
      display: block;
      height: 0;
      clear: both;
    }
    .title {
      font-size: 12px;
      padding: 0 15px; // clear: both;
      // overflow: hidden;
      .tag {
        background: #dd4449;
        border-radius: 0.2rem;
        text-align: center;
        padding: 0.03rem 0.1rem;
        font-size: 14px;
      }
      .left {
        float: left;
      }
      .right {
        float: right;
      }
      >div {
        &:nth-child(1) {
          text-align: left;
        }

        &:nth-child(2) {
          font-size: 13px;
          text-align: right;
        }
      }
    }
    .house_info {
      min-height: .5rem;
      .house_info_top {
        text-align: center;
        margin: .2rem 0;
        .price {
          font-size: .16rem;
          span {
            font-size: .45rem;
          }
        }
        .bottom {
          font-size: .16rem;
        }
      }
      .house_info_bottom {
        justify-content: space-around;
        .left-block {
          width: 33%;
          text-align: center;
          border-right: 1px white solid;
        }
        .row-1 {
          font-size: .12rem;
          span {
            font-size: .25rem;
          }
          img {
            height: .12rem;
            vertical-align: -0.009rem;
          }
        }
        .row-2 {
          font-size: .12rem;
          span {
            font-size: .14rem;
          }
          img {
            height: .10rem;
            vertical-align: -0.009rem;
            margin: 0 .02rem;
          }
          .percent {
            font-size: .15rem;
          }
          .house_type {
            border: 1px white solid;
            border-radius: 10px;
            text-align: center;
            margin-left: .01rem;
            padding: 0 0.05rem;
            font-size: 0.10rem;
          }
        }
        .center-block {
          width: 33%;
          text-align: center;
          border-right: 1px white solid;
        }
        .right-block {
          width: 33%;
          text-align: center;
        }
      }
    }
  }
  .tabList {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 .15rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .15rem;
    background: #fff;
    color: #474747;
    z-index: 99999999;
    .border_b();
    .active {
      color: @red;
      border-bottom: 2px solid @red;
    }
    .tabItem {
      text-align: center;
      width: 40%;
      flex: 1;
    }
  }
  .charts_box {
    background: white;
    .charts {
      height: 2.1rem;
    }
  }
  .forecast_box {
    .box_content {
      .house_info_bottom {
        justify-content: space-around;
        padding: .2rem 0;
        .left-block {
          width: 33%;
          text-align: center;
          border-right: 1px @line_gray solid;
        }
        .row-1 {
          font-size: .12rem;
          color: #fd5056;
          &.green {
            color: @green;
          }
          span {
            font-size: .25rem;
          }
          img {
            height: .12rem;
            vertical-align: -0.009rem;
          }
        }
        .row-2 {
          font-size: .12rem;
          color: @color_gray;
          span {
            font-size: .14rem;
          }
          img {
            height: .10rem;
            vertical-align: -0.009rem;
            margin: 0 .02rem;
          }
          .percent {
            font-size: .15rem;
          }
          .house_type {
            border: 1px white solid;
            border-radius: 10px;
            text-align: center;
            margin-left: .05rem;
            padding: 0 0.07rem;
            font-size: .12rem;
          }
        }
        .center-block {
          width: 33%;
          text-align: center;
          border-right: 1px @line_gray solid;
        }
        .right-block {
          width: 33%;
          text-align: center;
        }
      }
      .forecast {
        padding: .15rem;
        background: #f9f9f9;
        color: #8f8f8f;
      }
    }
  }
  .same_box {
    .box_content {
      padding: .2rem .15rem;
      .flex-row();
      justify-content: space-around;
      .item {
        width: 1rem;
        text-align: center;
        border: 1px @red solid;
        margin-right: .2rem;
        p:nth-of-type(1) {
          font-size: .12rem;
          height: .22rem;
          line-height: .22rem;
          color: white;
          background: @red;
        }
        p:nth-of-type(2) {
          font-size: .14rem;
          color: @color_gray;
          padding: .1rem .05rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      .item:nth-of-type(3) {
        margin-right: 0;
        border: 1px @green solid;
        p:nth-of-type(1) {
          background: @green;
        }
      }
    }
  }
  .tab2 {
    .pie_box {
      min-height: 1.5rem;
      background: white;
    }
    .trad_agency {
      .agency-content {
        width: 100%;
        align-items: center;
        justify-content: space-around;
        font-size: .13rem;
        color: @color_gray;
        white-space: nowrap;
        .agency-name {
          width: 20%;
        }
        .agency-progress {
          width: 60%;
          background: #f5f9fc;
          height: .15rem;
          border-radius: .15rem;
          position: relative;
          .progress-inner {
            height: .15rem;
            position: absolute;
            left: 0;
            top: 0;
            background: #fd5056;
            border-radius: .15rem;
            line-height: .15rem;
            color: #fff;
            font-size: .13rem;
          }
          .progress-number {
            position: absolute;
            left: .1rem;
            top: 0;
            height: .15rem;
            color: #fff;
          }
        }
        .trade-number {
          color: #dd4449;
        }
      }
    }
    .same_plate {
      .block-content {
        width: 100%;
        align-items: center;
        font-size: .15rem;
        color: #474747;
        white-space: nowrap;
        border-bottom: 1px #dbdbdb solid;
        &.red {
          color: #dd4449 !important;
        }
        .block-name {
          width: 54%;
        }
        .block-right {
          justify-content: space-around;
          width: 70%;
          .block-progress {
            width: 61%;
            text-align: left;
          }
          .block-number {
            color: #dd4449;
          }
        }
      }
    }
  }
  .new_download {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: .4rem;
    line-height: .4rem;
    padding: 0 0.15rem;
    background: white;
    margin-bottom: .1rem;
    margin-top: .01rem;
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .left {
      width: .25rem;
      height: .19rem;
    }
    .right {
      width: .2rem;
      height: .2rem;
    }
    span {
      color: #8e8e8e;
      font-size: .14rem;
    }
  }
}
</style>
