<template>
    <div>
      <!--轮播和介绍-->
      <div class="bannerCon" v-if="(tab3Info.basicInfo.images.length != 0) || tab3Info.basicInfo.content">
        <div class="bannerImg" v-if="tab3Info.basicInfo.images.length != 0">
          <swiper :aspect-ratio="345/600">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in tab3Info.basicInfo.images" :key="index"><img :src="item"></swiper-item>
          </swiper>
        </div>
        <div class="bannerText" :class="{ 'class-a' : tabHistoryIndex}" v-if="tab3Info.basicInfo.content">
            {{tab3Info.basicInfo.content}}
        </div>
        <img v-if="tabHistoryIndex && tab3Info.basicInfo.content" src="../img/toDown3.png" class="downBtn" @click="changeH()">
        <img v-if="!tabHistoryIndex && tab3Info.basicInfo.content" src="../img/toUp1.png" class="downBtn" @click="changeH()">
      </div>
      <!--楼盘档案-->
      <div class="mainUnit" style="padding-bottom: 0.1rem;" v-if="tab3Info.archives.length != 0">
        <div class="mainUnitTit">楼盘档案 <span class="plateId" @click="goPlateInfo(1)">{{plateName}}板块</span></div>
        <div class="houseInfo" :class="{ 'classA' : isA}">
            <div class="houseInfoItem" v-for="item in tab3Info.archives">
              <div>{{item.key}}:</div>
              <div>{{item.value}}</div>
            </div>
        </div>
        <img v-if="isA" src="../img/toDown3.png" class="downBtn" @click="changeC()">
        <img v-if="!isA" src="../img/toUp1.png" class="downBtn" @click="changeC()">
      </div>
      <!--小区时光机-->
      <timeStamp style="margin-bottom: 0.1rem" :message="tab3Info.timeStamp" :fromtype="'newHouse'"></timeStamp>
      <!--位置及周边  v-if="tab3Info.basicInfo.address" -->
      <div class="mainUnit" v-if="tab3Info.basicInfo.lng && tab3Info.basicInfo.lat">
        <div class="mainUnitTit" style="position: relative">位置及周边:{{tab3Info.basicInfo.address}}<img src="../img/gray-array-right.png"  @click="goMap" class="toRight"></div>
        <div class="mapInfo">
          <baidu-map class="map" :center="center" :zoom="15" @ready="handler"  ak="7yQQ0ifmKGlDGIq9LhrA7jE7BQrC23BY">
            <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
              <!-- <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/> -->
            </bm-marker>
          </baidu-map>
            <span class="mapTips" @click="goMap">{{housename}}</span>
        </div>
      </div>
      <!--板块指数-->
      <div class="mainUnit">
        <div class="mainUnitTit">板块指数<span class="plateId" @click="goPlateInfo(2)">{{plateName}}板块</span></div>
        <div class="plateInfo">
          <div class="plateItem" v-for="item in tab3Info.plateIndexs" v-if="item.index != 0">
            <div>
              <p>{{item.name}}</p>
              <p>{{item.index}}分</p>
            </div>
            <div><p :style="{width:(item.index)+'%'}"></p></div>
          </div>
        </div>
      </div>

    </div>
</template>
<script>
    import timeStamp from "../components/house_timeline.vue"
    import { BaiduMap,BmMarker } from 'vue-baidu-map'

    import {recordEvent} from '../assets/libs/recordEvent.js'
    import { Swiper,  SwiperItem  } from 'vux'

    import axios from 'axios';
    export default {
        data(){
            return {
              mapDetail: {},
              tab3Info:{
                archives:[
                ],
                basicInfo:{
                  images:[]
                },
                plateIndexs:[],
                timeStamp:[]
              },
              center: {lng: '', lat: ''},
              tabHistoryIndex:true,
              isA:true
            }
        },
        mounted(){
          var self = this;
          self.getTab3Info();
        },
        components: {
          timeStamp,Swiper,SwiperItem,BaiduMap,BmMarker
        },
        props:['housename','plateName','plateId'],
        methods: {
          getTab3Info(){
            let self = this;
            //楼盘详情
            axios.get('estimate/customer/newHouse/houseDetail/',{
              params:{
                cityId: this.$route.query.cityId,
                houseId: this.$route.query.houseId
              }
            }).then(res =>{
//              console.log(res);
              self.tab3Info = res.data.body;
            console.log(this.tab3Info.basicInfo)

            }).catch(err => {
                console.log(err)
            });
          },
          handler(){
            this.center.lat = this.tab3Info.basicInfo.lat;
            this.center.lng = this.tab3Info.basicInfo.lng;
          },
          goMap() {
            location.href = this.$store.state.comm.downloadApp;
          },
          changeH(){
            this.tabHistoryIndex = !this.tabHistoryIndex;
          },
          changeC(){
            this.isA = !this.isA;
          },
          goPlateInfo(index){
            if(index == 1){
              recordEvent(41844,{houseId: this.$route.query.houseId});
            }else if (index == 2){
              recordEvent(41845,{houseId: this.$route.query.houseId});
            }
            location.href="/angularApp2/index_share.html#/plate?city_id="+this.$route.query.cityId+"&plate_id="+this.plateId
          }
        }
    }
</script>

<style scoped>
  .plateId{
    float: right;
    border: 1px solid #fd5056;
    display: block;
    text-align: center;
    height: 0.22rem;
    line-height: 0.22rem;
    margin-top: 0.12rem;
    color: #fd5056;
    font-size: 0.15rem;
    padding: 0 0.05rem;
  }
  .mapTips{
    background: #fd5056;
    color: #fff;
    padding: 0.02rem 0.05rem;
    border-radius: 0.1rem;
    /* margin-top: 0.3rem; */
    position: absolute;
    top: 0.5rem;
    left: 1.38rem;
  }
.bannerCon {
  background: #fff;
  padding:0.1rem 0.15rem;
  margin-bottom: 0.1rem;
}
  .bannerText {
    font-size: 0.14rem;
    color: #8e8e8e;
    min-height: 0.2rem;
    font-family: PingFangSC-Light, sans-serif;
  }
  .class-a {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .classA {
    height:1.2rem;
    overflow: hidden;
  }
  .downBtn{
    width: 0.13rem;
    height: 0.075rem;
    margin: 0 auto;
    display: block;
    margin-top: 0.1rem;
  }
  .houseInfo {
    padding:0.15rem;
    padding-bottom: 0;
  }
  .houseInfoItem {
    display: flex;
    font-family: PingFangSC-Light, sans-serif;
    margin-bottom: 0.1rem;
  }
  .houseInfoItem div:nth-child(1){
    width: 0.65rem;
     display: inline-table;
     color: #8e8e8e;
     font-size: 0.14rem;
   }
  .houseInfoItem div:nth-child(2){
    display: inline-table;
    color: #474747;
    font-size: 0.14rem;
    width: 2.8rem;
  }
  .mapInfo {
    height:1rem;
    /*background:#f0f0f0 url("../img/map.png") no-repeat center;*/
    background-size: cover;
    text-align: center;
    /*padding-top: 0.3rem;*/
    position: relative;
  }
  .mapInfo .map {
    width: 100%;
    height: 1rem;
  }
.lookMore {
  font-size:0.14rem;
  color: #8e8e8e;
  font-family: PingFangSC-Light, sans-serif;
  float: right;
}
  .plateInfo {
    padding:0.15rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .plateInfo .plateItem {
    width: 1.55rem;
  }
.plateItem div:nth-child(1){
  display: flex;
  justify-content: space-between;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular, sans-serif;
}
.plateItem div:nth-child(1) p:nth-child(1){
  color: #8e8e8e;
}
.plateItem div:nth-child(1) p:nth-child(2){
  color: #fd5056;
}
.plateItem div:nth-child(2){
  width:100%;
  background: #f0f0f0;
  height:0.03rem;
  margin-top: 0.05rem;
  border-radius: 0.1rem;
}
.plateItem div:nth-child(2) p{
  background: #fd5056;
  width: 1rem;
  height: 100%;
  border-radius: 0.1rem;
}
.bannerImg{
  height: 2rem;
}
.bannerImg img {
  width:100%;
  height:100%;
}
</style>
