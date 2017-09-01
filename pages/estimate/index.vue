<template>
  <div style="background: #eee;padding-bottom: 0.5rem;">
    <estimate-head :go-back="showBack" :title="'兔博士估价'" :select-nav="true"></estimate-head>
    <div class="city_nav">
      <div class="logo_div">
        <img src="~assets/img/logo1.png">
      </div>
      <a class="addr_div" style="color: #fff;" @click="gotoCityList">
        <span>
          <img src="~assets/img/addr1.png">
        </span>
        <b>{{cityInfo.cityName}}</b>
        <span>
          <img src="~assets/img/toDown1.png">
        </span>
      </a>
      <div class="house_info">
        <div v-if="boardType" class="citywide_info">
          <span>全市-最新行情</span>
          <span>{{avgPrice}}元/平</span>
        </div>
        <div v-if="!boardType" class="board_info">
          <span>{{plateName}}-最新行情</span>
          <span>{{avgPrice}}元/平</span>
        </div>
      </div>
    </div>
    <div class="area_list">
      <div v-if="!boardType" class="area_list_tit">
        <span>同板块二手小区估价信息</span>
      </div>
      <div v-if="boardType" class="area_list_tit">
        <span>热门二手小区估价信息</span>
      </div>
      <div class="area_info" v-if="houseList.length > 0" v-for="item in houseList">
        <div class="area_row" style="width: 30%;">
          <p>{{item.date}}</p>
          <p>估价时间</p>
        </div>
        <div class="area_row" style="width: 45%;">
          <p>{{item.houseName}}</p>
          <p>{{item.structure}} | {{item.area}}平</p>
        </div>
        <div class="area_row" style="width: 18%;">
          <p class="red">{{item.estimatePrice}}万</p>
          <p>估价</p>
        </div>
      </div>
      <div class="noData" v-if="houseList.length == 0">暂无数据</div>
    </div>
    <a @click="goEstimate" class="guess_city">立即评估</a>
    <download-app :fromPage="'index'" :cityId="cityId"></download-app>
  </div>
</template>

<script>
import axios from 'axios'

import estimateHead from '~/components/head.vue'
import downloadApp from '~/components/download_app.vue'
import setShareInfoForWechat from '~/assets/libs/shareForWechat.js'
import { recordEvent } from '~/assets/libs/recordEvent.js'
export default {
  asyncData ({  }) {
    let params = {
      cityId: 605
    }
    return axios.get(`https://inner299.2boss.cn/estimate/customer/estimate/header-basic-info`,params)
    .then((res) => {
      // return { list: res.data.body.list }
    })
  },
  data() {
    return {
      boardType: true,
      cityName: null,
      plateName: null,
      avgPrice: null,
      latitude: null,
      longitude: null,
      houseList: [],
      noData: false,
      cityInfo: {},
      showBack: true,
      geoData: {},
      firstStep: 0
    }
  },
  created() {
    if (this.$route.query.from_page != 'm_index') {
      if (navigator.geolocation) {
        this.firstStep = 1;
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.getPositionError, {
            "enableHighAcuracy": true //是否启用高精确度模
          });
      } else {
        alert("浏览器不支持定位");
      }
    };
    this.realChooseCity = this.$store.state.comm.cityInfo;
    this.cityId = this.realChooseCity.cityId;
    setShareInfoForWechat('index', window.location.href);
  },
  activated() {
    let lastCityId = this.cityId;
    this.realChooseCity = this.$store.state.comm.cityInfo;
    let queryData = this.$route.query;
    if (this.$route.query.from_page == 'm_index') {
      this.cityInfo = queryData;
      this.cityInfo.cityName = this.$store.state.comm.cityInfo.cityName;
      this.cityId = queryData.cityId;
      this.geoData.cityLevel = queryData.cityLevel;
    } else {
      this.cityInfo = this.$store.state.comm.cityInfo;
      this.cityId = this.$store.state.comm.cityInfo.cityId;
    };
    let a = 1;
    if (lastCityId != this.realChooseCity.cityId) {
      // 没有定位到板块=>请求城市信息
      this.cityInfo = this.$store.state.comm.cityInfo;
      a = 2;
      this.boardType = true;
      this.getBasicInfo({ cityId: this.cityInfo.cityId })
      recordEvent(41804, { cityId: this.cityInfo.cityId, page_type: 7 });
    }

    if (this.cityInfo.cityLevel == 1 && (this.cityInfo.plateId != null || this.cityInfo.plateId != undefined)) {
      // 说明定位到板块=>请求板块信息
      this.boardType = false;
      this.plateName = this.cityInfo.plateName;
      this.getBasicInfo({ cityId: this.cityInfo.cityId, plateId: this.cityInfo.plateId })
    } else if (a != 2 && this.firstStep == 0) {
      // 没有定位到板块=>请求城市信息
      this.boardType = true;
      this.getBasicInfo({ cityId: this.cityInfo.cityId })
    }
  },
  components: {
    estimateHead,
    downloadApp
  },
  methods: {
    gotoCityList() {
      this.$router.push({ path: '/cityList', query: { cityLevel: this.geoData.cityLevel } });
    },
    showPosition(position) {
      this.getLocationData(position.coords.latitude, position.coords.longitude);
    },
    getPositionError(err) {
      // 没有定位到
      this.geoData = {
        cityId: null,
        cityName: '',
        plateId: null,
        cityLevel: -2
      };
      this.cityName = '上海';
      this.getBasicInfo({ cityId: 605 });
      localStorage.removeItem("geoCityinfo")
      try {
        localStorage.setItem("geoCityinfo", '{}');
      } catch (err) {
        console.log(err)
      }
    },
    getLocationData(latitude, longitude) {
      axios({
        url: "estimate/customer/estimate/location",
        method: "post",
        data: {
          longitude: longitude,
          latitude: latitude
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          if (res.data.resultCode !== 0) {
            // 定位在了没有开放的城市
            this.geoData = {
              cityId: null,
              cityName: '',
              plateId: null,
              cityLevel: -1
            };
            this.cityName = '上海'
            this.getBasicInfo({ cityId: 605 });
          } else {
            this.geoData = res.data.body;
            res.data.body.getLocation = true;
            this.$store.commit('changeCityInfo', res.data.body);
            try {
              localStorage.removeItem("geoCityinfo");
              localStorage.setItem("geoCityinfo", JSON.stringify(res.data.body));
            } catch (err) {
              console.log(err)
            }
            var params = {};
            params.cityId = res.data.body.cityId;
            this.cityName = res.data.body.cityName;
            if (res.data.body.plateId == "") {
              this.boardType = true;
              this.cityName = res.data.body.cityName;
            } else {
              params.plateId = res.data.body.plateId;
              this.plateName = res.data.body.plateName;
              this.boardType = false;
            }
            // console.log(params);
            this.getBasicInfo(params);
          }
        }).catch((error) => {
          console.log(error);
          // 没有定位到
          this.geoData = {
            cityId: null,
            cityName: '',
            plateId: null,
            cityLevel: -2
          };
        });
    },
    getBasicInfo(params) {
      axios.get('estimate/customer/estimate/header-basic-info', { params })
        .then((res) => {
          // alert(JSON.stringify(res))
          if (res.data.resultCode !== 0) {
            this.avgPrice = '--'
            this.houseList = [];
          } else {
            this.avgPrice = res.data.body.basicInfo.avgPrice;
            this.plateName = res.data.body.basicInfo.plateName;
            this.houseList = res.data.body.houseInfo;
            recordEvent(41804, { cityId: params.cityId, page_type: 7 });
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    goEstimate() {
      var estimateInfo = JSON.parse(localStorage.getItem("estimateInfo"));
      if (estimateInfo) {
        localStorage.removeItem("estimateInfo");
      }
      recordEvent('M站估价首页(立即评估按钮点击)', { 'sourcePage': 'M站估价首页' });
      if (this.$route.query.from_page == 'out') {
        this.$router.push({ path: '/estimate_add_out' });
      } else {
        this.$router.push({ path: '/estimate_add' });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.city_nav {
  margin-top: .42rem;
  height: 3.5rem;
  background: #fd5056;
}

.logo_div {
  width: 44vw;
  position: relative;
  left: 50%;
  top: 0.32rem;
  margin-left: -22vw;
  height: 2rem;
}

.logo_div img {
  width: 100%;
  height: 100%;
}

.addr_div {
  display: block;
  width: 1.35rem;
  height: 0.32rem;
  margin: 0 auto;
  position: relative;
  border: 1px solid #fff;
  border-radius: 2rem;
  overflow: hidden;
  padding: 0 0.4rem;
}

a:visited {
  color: white;
  text-decoration: none;
}

.addr_div b,
.addr_div span {
  float: left;
}

.addr_div span:nth-child(1) {
  margin-left: 0.15rem;
}

.addr_div span:nth-child(1) img {
  display: block;
  width: 0.15rem;
  height: 0.2rem;
  margin-top: 0.05rem;
}

.addr_div span:nth-child(3) {
  margin-left: 0.1rem;
}

.addr_div span:nth-child(3) img {
  display: block;
  width: 0.16rem;
  height: 0.1rem;
  margin-top: 0.13rem;
}

.addr_div b {
  color: #fff;
  font-weight: normal;
  font-size: 0.2rem;
  margin-left: 0.1rem;
  margin-top: 0.02rem;
  display: block; // width: 0.4rem;
}

.house_info {
  color: #fff;
  width: 61vw;
  font-size: 0.16rem;
  margin: 0.2rem auto;
  height: 0.2rem;
}

.board_info {
  width: 100%;
  height: 100%;
}

.house_info span:nth-child(1) {
  float: left;
}

.house_info span:nth-child(2) {
  float: right;
}

.guess_city {
  height: 0.44rem;
  line-height: 0.44rem;
  font-size: 0.2rem;
  display: block;
  width: 95vw;
  text-align: center;
  background: #fd5056;
  margin: 0.1rem auto;
  color: #fff;
  position: relative;
  bottom: 0.5rem;
}

.area_list {
  position: relative;
  background: #fff;
  top: -0.45rem;
  font-size: 0.16rem;
  width: 95vw;
  margin: 0 auto;
}

.area_list_tit {
  height: 0.45rem;
  line-height: 0.45rem;
}

.area_list_tit span {
  border-left: 3px solid #fd5056;
  margin-left: 0.1rem;
  padding-left: 0.15rem;
}

.area_info {
  padding: 0.15rem 0;
  border-top: 1px solid #ccc;
  margin: 0 0.1rem;
}

.area_row {
  display: inline-table;
  /*width: 32%;*/
  text-align: center;
}

.area_row p:nth-child(1) {
  font-size: 0.14rem;
  color: #666;
}

.area_row p:nth-child(2) {
  color: #bbb;
  font-size: 0.14rem;
}

.red {
  color: #fd5056!important;

  font-weight: bold;
}

.noData {
  min-height: 2rem;
  font-size: 0.2rem;
  text-align: center;
  line-height: 2rem;
  color: #666;
}
</style>
