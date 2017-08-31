<template>
  <div style="color: #666;background: #fff;width: 100vw;height: 100vh;font-size: 0.16rem;">
    <estimate-head :go-back="true" :title="'选择城市'" :select-nav="true"></estimate-head>
    <div class="cityPosition" style="padding-top: .45rem;">城市定位</div>
    <div class="current_cityPosition">{{currentCity}}</div>
    <div class="cityPosition">热门城市</div>
    <ul class="allCity">
      <li @click="selectCity(item)" v-for="item in list">
        <img :src="item.icon" style="width: 0.48rem;height: 0.48rem;">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import estimateHead from '~components/head.vue'
export default {
  asyncData ({ params }) {
    return axios.get(`https://inner299.2boss.cn/estimate/customer/home/getCityList`)
    .then((res) => {
      return { list: res.data.body.list }
    })
  },
  data() {
    return {
      list: [],
      currentCity: '',
      cityInfo: {}
    }
  },
  created() {
    // this.cityInfo = this.$store.state.comm.cityInfo;
    // if (this.$route.query.cityLevel == 1 || this.$route.query.cityLevel == 2) {
    //   this.currentCity = this.cityInfo.cityName;
    // } else if (this.$route.query.cityLevel == -2) {
    //   this.currentCity = '您的定位失败，请手动选择城市';
    // } else if (this.$route.query.cityLevel == -1) {
    //   this.currentCity = '您所在的城市暂未开通，请手动选择城市';
    // } else {
    //   this.currentCity = "抱歉您的定位失败";
    // }

  },
  mounted() {
    this.getCityList();
  },
  components: {
    estimateHead
  },
  methods: {
    selectCity(item) {
      // this.$store.commit('changeCityInfo', {
      //   cityId: item.id,
      //   cityName: item.name,
      //   getLocation: false,
      //   plateId: null,
      //   plateName: ''
      // })
      // let cityInfo = {
      //   cityId: item.id,
      //   cityName: item.name
      // };
      // var self = this;
      // try {
      //   sessionStorage.setItem("cityinfo", JSON.stringify(cityInfo));
      //   var houseINfo = localStorage.getItem("houseInfo");
      //   if (houseINfo) {
      //     localStorage.removeItem("houseInfo")
      //   }
      // } catch (err) {

      // };
      // setTimeout(function() {
      //   self.$router.go(-1);
      // }, 500);
    },
    getCityList() {
      // axios.get('estimate/customer/home/getCityList')
      //   .then((res) => {
      //     if (res.data.resultCode !== 0) {
      //       this.list = [];
      //     } else {
      //       this.list = res.data.body.list;
      //     }

      //   }).catch(function(error) {
      //     this.list = [];
      //     console.log(error);
      //   });
    }
  }
}
</script>
<style lang="less" scoped>
.cityPosition {
  height: 0.44rem;
  line-height: 0.44rem;
  padding: 0 0.15rem;
  font-size: 0.16rem;
  background: #eee;
}

.current_cityPosition {
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.16rem;
  background: #fff;
}

.allCity {
  padding: .2rem .1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.allCity li {
  width: .48rem;
  margin: 0 .2rem .2rem;
  text-align: center;
  /*float: left;
    display: table-row;
    width: 15%;
    padding: 0 0.12rem;
    margin-bottom: 0.15rem;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: .48rem;
  }
}
</style>
