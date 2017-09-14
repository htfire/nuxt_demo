<template>
    <div class="tab1Height1" v-if="hasInfo">
      <!--饼图-->
      <div class="charts" id = "charts1" v-if="tab1Info.bargain.count != 0"></div>
      <!---->
      <div class="roomTypes" v-if="tab1Info.roomTypes != 0">
          <div class="tabList" v-if="tab1Info.roomTypes != 0">
              <div class="tabItem" :class="{active:subTabIndex==item.roomType}" @click="clickSubItem(item.roomType)" v-for="item in tab1Info.roomTypes">{{item.roomType}}房</div>
          </div>
          <div class="subList" >
              <ul v-for="item in tab1Info.roomTypes" v-if="tab1Info.roomTypes != 0">
                  <li v-for="items in item.roomList" v-if="items.roomType == subTabIndex">
                      <div>{{items.roomType}}房</div>
                      <div>
                          <p>{{items.priceSegment}}</p>
                          <p>总价区间</p>
                      </div>
                      <div>
                          <p style="color: #fd5056;">{{items.saledRate}}%/{{items.saleCount}}套</p>
                          <p>销售率/剩余库存</p>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      <!--主力户型-->
      <div class="mainUnit" v-if="tab1Info.majorTypes.length != 0">
          <div class="mainUnitTit">主力户型</div>
          <div class="imgList">
               <div class="box1" >
                 <div class="" @click="goMajorInfo(item)" style="width: 1.35rem;margin-right: 0.15rem;" v-for="(item, index) in tab1Info.majorTypes">
                   <div class="Unititem">
                     <img :src="item.image">
                     <p>{{item.roomName}}-{{saleStateMessage}}</p>
                     <p style="">{{item.typeDesc}} {{item.area}}㎡</p>
                     <p>{{item.priceSegment}}</p>
                   </div>
                 </div>
               </div>
            </div>
      </div>
    </div>
</template>
<script>
  import {recordEvent} from '../assets/libs/recordEvent.js'
//  import {download_app} from '../assets/libs/download_app.js'
  var Highcharts = require('highcharts');
  require('highcharts/modules/exporting')(Highcharts);

  import axios from 'axios';

    export default {
        data(){
            return {
              hasInfo:false,
              tab1Info:{
                bargain:{
                },
                roomTypes:[{
                  roomList:[
                    {saleCount:0,leftCount:0}
                  ],
                  roomType:""
                }],
                majorTypes:[
                  {saleStatus:0}
                ]
              },
              subTabIndex:1,
              swiperItemIndex: 1
            }
        },
        created (){
          Highcharts.getOptions().plotOptions.pie.colors = (function () {
            var colors = [],
              base = Highcharts.getOptions().colors[8],
              i;
            for (i = 0; i < 10; i += 1) {
              // Start out with a darkened base color (negative brighten), and end
              // up with a much brighter color
              colors.push(Highcharts.Color(base).brighten((i  ) / 9).get());
            }
            return colors;
          }());
        },
        mounted(){
          var self = this;
          self.getTab1Info();
        },
        components: {

        },
        methods: {
          goMajorInfo(item){
            console.log(item)
            recordEvent(41842,{houseId: this.$route.query.houseId,roomtype:item.roomName});
            location.href = this.$store.state.comm.downloadApp;

          },
          clickSubItem(roomtype){
            this.subTabIndex = roomtype;

          },
          getTab1Info(){
            let self = this;
            //        房型数据
            axios.get('estimate/customer/newHouse/houseTypeInfo/',{
              params:{
                cityId: this.$route.query.cityId,
                houseId: this.$route.query.houseId
              }
            }).then(res =>{
//            console.log(res)
              self.tab1Info = res.data.body;
              self.hasInfo = true;
              var listArr = self.tab1Info.bargain.list;
              for (var i=0;i<listArr.length;i++){
                listArr[i].y = (listArr[i].bargainCount)/(self.tab1Info.bargain.count);
              }
              this.renderChart(self.tab1Info.bargain);
              self.subTabIndex =self.tab1Info.roomTypes[0].roomType;

          }).catch(err => {
              console.log(err)
          });
          },
          renderChart(option) {
            let params = {};
            params = {
              noData: {
                style: {
                  fontWeight: 'bold',
                  fontSize: '15px',
                  color: '#303030'
                }
              },
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                reflow: true
              },
              credits: {
                enabled: false //不显示LOGO
              },
              exporting: {
                enabled: false
              },
              title: {
                floating:false,
                text: '<span class="pieTit" style="display: block;width: 0.8rem;white-space: pre-line;left: -0.3rem;top: -0.3rem;text-align: center;position: absolute;font-size: 0.12rem">近三个月共计成交<b style="color:#fd5056">'+option.count+'</b>套</span>',
                style:{ "color": "#333333", "fontSize": "9px"},
                useHTML:true,
                y:120,
                width:20,
                widthAdjust: -50
              },
              tooltip: {
                enabled: false,
                pointFormat: '<span>{point.rooms}房{point.bargainCount}套</span>'
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    distance:5,
                    showInLegend: true,
                    enabled: true,
                    format: '<span>{point.rooms}房{point.bargainCount}套</span>',
                    style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                  },
                  minSize:140
                }
              },
              series: [{
                type: 'pie',
                innerSize: '56%',
                data:option.list,
                style:{color:"#474747",fontSize:"18px"}
              }], function(c) {
                // 环形图圆心
                var centerX = c.series[0].center[1];
                var centerY = c.series[0].center[1];

                // 标题字体大小，返回类似 16px ，所以需要 parseInt 处理
                var titleHeight = parseInt(c.title.styles.fontSize);

                // 设置图表偏移
                c.setTitle({
                  y: centerY + titleHeight/2
                });
              }};
            Highcharts.chart('charts1', params)
          }
        },
        computed: {
          reversedMessage: function () {
            var self = this;
            for (let i in self.tab1Info.roomTypes){
              for(let j in self.tab1Info.roomTypes[i].roomList){
                if(self.tab1Info.roomTypes[i].roomList[j].saleCount == 0){
                  return 100
                }else {
                  return self.tab1Info.roomTypes[i].roomList[j].saleCount / self.tab1Info.roomTypes[i].roomList[j].leftCount
                }
              }
            }
          },
          saleStateMessage:function(){
            var self = this;
            for (let i=0;i<self.tab1Info.majorTypes.length;i++){
              if(self.tab1Info.majorTypes[i].saleStatus == 0){
                return "在售"
              }else if(self.tab1Info.majorTypes[i].saleStatus == 1){
                return "待售"
              }else{
                return "售完"
              }
            }
          }
        }
    }
</script>

<style scoped>

  .charts{
    width: 100%;
    /*height: 2.2rem;*/
    border-bottom: 1px solid #f0f0f0;
  }
  .roomTypes{
    margin-bottom: 0.1rem;
  }
  .subList {
    background: #fff;
  }
  .subList ul li {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem;
    border-bottom: 1px solid #f0f0f0;
  }
  .subList ul li div:nth-child(1) {
    width: 0.35rem;
    text-align: center;
    height:0.35rem;
    line-height: 0.35rem;
    color: #fd5056;
    border: 1px solid #fd5056;
    border-radius:50%;
    font-size: 0.15rem;
    font-family: PingFangSC-Semibold, sans-serif;
  }
  .subList ul li div {
    text-align: center;
    font-family: PingFangSC-Regular, sans-serif;
  }
  .subList ul li div p:nth-child(1){
    color: #474747;
    font-size: 0.15rem;
  }
  .subList ul li div p:nth-child(2){
    color: #8e8e8e;
    font-size: 0.13rem;
    font-family: PingFangSC-Light, sans-serif;
  }
  .box1 {
    overflow-x: auto;
    display: flex;
  }
  .imgList {
    padding:0.15rem;
    overflow: hidden;
  }
  .Unititem {
    width: 1.35rem;
    height:2rem;
  }
  .Unititem img {
    width: 1.35rem;
    height:1.35rem;
    border:1px solid #f0f0f0;
  }
  .Unititem p {
    text-align: center;
    font-family: PingFangSC-Regular, sans-serif;
  }
  .Unititem p:nth-of-type(1){
    color: #474747;
    font-size: 0.15rem;
    font-weight: 500;
  }
  .Unititem p:nth-of-type(2){
    color: #8e8e8e;
    font-size: 0.14rem;
  }
  .Unititem p:nth-of-type(3){
    color: #fd5056;
    font-size: 0.14rem;
  }
</style>
