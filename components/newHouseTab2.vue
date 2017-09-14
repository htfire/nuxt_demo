<template>
    <div class="tab1Height2">
      <div class="lineCharts" id="lineCharts"></div>
      <!--成交行情-->
      <div class="mainUnit" v-if="JSON.stringify(tab2Info.marketInfo) != '{}'">
        <div class="mainUnitTit">成交行情</div>
        <div class="closingQu">
            <div style="border-right: 1px solid #f0f0f0">
                <p><span>{{tab2Info.marketInfo.precedingMonth.price}}</span>元/㎡</p>
                <p>{{tab2Info.marketInfo.precedingMonth.count}}套 | 前月</p>
            </div>
            <div style="border-right: 1px solid #f0f0f0">
                <p><span>{{tab2Info.marketInfo.lastMonth.price}}</span>元/㎡</p>
                <p>{{tab2Info.marketInfo.lastMonth.count}}套 | 上月</p>
            </div>
            <div>
                <p><span>{{tab2Info.marketInfo.currentMonth.price}}</span>元/㎡</p>
                <p>{{tab2Info.marketInfo.currentMonth.count}}套 | 本月</p>
            </div>
        </div>
      </div>
      <!--历史成交-->
      <div class="mainUnit">
        <div class="mainUnitTit">历史成交<span class="last3Month">(最近三个月)</span></div>
        <div>
          <div class="tabList">
            <div class="tabItem" :class="{active:tabHistoryIndex==1}" @click="clickHistoryItem(1)">总价</div>
            <div class="tabItem" :class="{active:tabHistoryIndex==2}" @click="clickHistoryItem(2)">单价</div>
          </div>
          <!--总价-->
          <div class="historylist" v-if="tabHistoryIndex==1">
            <!--最多-->
            <div class="historylistItem"  v-if="tab2Info.totalPrice.salesRate != null">
              <div class="">
                <p class="bestM">最多</p>
                <div>
                  <p class="subT">{{tab2Info.totalPrice.salesRate.pricePeriod}}</p>
                  <p class="subP">总价区间</p>
                </div>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.totalPrice.salesRate.rate}}</p>
                <p class="subP textAlignR">成交占比</p>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.totalPrice.salesRate.salesCount}}</p>
                <p class="subP textAlignR">成交套数</p>
              </div>
            </div>
            <!--最高-->
            <div class="historylistItem"  v-if="tab2Info.totalPrice.highestPrice != null">
              <div class="">
                <p class="bestM">最高</p>
                <div>
                  <p class="subT">{{tab2Info.totalPrice.highestPrice.tprice}}万</p>
                  <p class="subP">{{tab2Info.totalPrice.highestPrice.sinPrice}}元/平</p>
                </div>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.totalPrice.highestPrice.roomtype}} {{tab2Info.totalPrice.highestPrice.area}}平</p>
                <p class="subP textAlignR">{{tab2Info.totalPrice.highestPrice.building}}号 {{tab2Info.totalPrice.highestPrice.floorText}}</p>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.totalPrice.highestPrice.bargaindate}}</p>
                <p class="subP textAlignR">成交日期</p>
              </div>
            </div>
            <!--最低-->
            <div class="historylistItem"  v-if="tab2Info.totalPrice.lowestPrice != null">
              <div class="">
                <p class="bestM" style="background: #00aea8">最低</p>
                <div>
                  <p class="subT">{{tab2Info.totalPrice.lowestPrice.tprice}}万</p>
                  <p class="subP">{{tab2Info.totalPrice.lowestPrice.sinPrice}}元/平</p>
                </div>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.totalPrice.lowestPrice.roomtype}} {{tab2Info.totalPrice.lowestPrice.area}}平</p>
                <p class="subP textAlignR">{{tab2Info.totalPrice.lowestPrice.building}}号 {{tab2Info.totalPrice.lowestPrice.floorText}}</p>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.totalPrice.lowestPrice.bargaindate}}</p>
                <p class="subP textAlignR">成交日期</p>
              </div>
              </div>
            <!--无数据-->
            <div class="nodata" v-if="(tab2Info.totalPrice.salesRate == null) && (tab2Info.totalPrice.highestPrice == null) && (tab2Info.totalPrice.lowestPrice == null)">暂无数据</div>

          </div>
          <!--单价-->
          <div class="historylist" v-if="tabHistoryIndex==2">
            <!--最多-->
            <div class="historylistItem"  v-if="tab2Info.unitPrice.salesRate != null">
              <div class="">
                <p class="bestM">最多</p>
                <div>
                  <p class="subT">{{tab2Info.unitPrice.salesRate.pricePeriod}}</p>
                  <p class="subP">总价区间</p>
                </div>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.unitPrice.salesRate.rate}}</p>
                <p class="subP textAlignR">成交占比</p>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.unitPrice.salesRate.salesCount}}</p>
                <p class="subP textAlignR">成交套数</p>
              </div>
            </div>
            <!--最高-->
            <div class="historylistItem"  v-if="tab2Info.unitPrice.highestPrice != null">
              <div class="">
                <p class="bestM">最高</p>
                <div>
                  <p class="subT">{{tab2Info.unitPrice.highestPrice.tprice}}万</p>
                  <p class="subP">{{tab2Info.unitPrice.highestPrice.sinPrice}}元/平</p>
                </div>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.unitPrice.highestPrice.roomtype}} {{tab2Info.unitPrice.highestPrice.area}}平</p>
                <p class="subP textAlignR">{{tab2Info.unitPrice.highestPrice.building}}号 {{tab2Info.unitPrice.highestPrice.floorText}}</p>
              </div>
              <div>
                <p class="textAlignR">{{tab2Info.unitPrice.highestPrice.bargaindate}}</p>
                <p class="subP textAlignR">成交日期</p>
              </div>
            </div>
            <!--最低-->
            <div class="historylistItem"  v-if="tab2Info.unitPrice.lowestPrice != null">
                <div class="">
                  <p class="bestM"  style="background: #00aea8">最低</p>
                  <div>
                    <p class="subT">{{tab2Info.unitPrice.lowestPrice.tprice}}万</p>
                    <p class="subP">{{tab2Info.unitPrice.lowestPrice.sinPrice}}元/平</p>
                  </div>
                </div>
                <div>
                  <p class="textAlignR">{{tab2Info.unitPrice.lowestPrice.roomtype}} {{tab2Info.unitPrice.lowestPrice.area}}平</p>
                  <p class="subP textAlignR">{{tab2Info.unitPrice.lowestPrice.building}}号 {{tab2Info.unitPrice.lowestPrice.floorText}}</p>
                </div>
                <div>
                  <p class="textAlignR">{{tab2Info.unitPrice.lowestPrice.bargaindate}}</p>
                  <p class="subP textAlignR">成交日期</p>
                </div>
            </div>
            <!--无数据-->
            <div class="nodata" v-if="tab2Info.unitPrice.salesRate == null && tab2Info.unitPrice.highestPrice == null && tab2Info.unitPrice.lowestPrice == null">暂无数据</div>
          </div>
        </div>
      </div>
      <!--房源成交实例-->
      <div class="mainUnit">
        <div class="mainUnitTit">房源成交实例<span class="lookMore" style="position: relative" @click="downApp">查看更多<img src="../img/gray-array-right.png" class="toRight"></span></div>
        <div style="padding: 0 0.15rem;">
          <div class="dealitem" v-for="item in tab2Info.realSales">
            <div class="itemBox itemLeft">
              <p><img src="../img/icon-bargain_red.png"></p>
              <p><span>{{item.tprice}}</span>万</p>
            </div>
            <div class="itemBox itemCenter" >
              <p>{{item.sprice}}元/平</p>
              <p>{{item.area}}平</p>
            </div>
            <div class="itemBox itemCenter">
              <p>{{item.building}} {{item.floorText}}</p>
              <p style="width: 0.78rem;">{{item.date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import {recordEvent} from '../assets/libs/recordEvent.js'

    import axios from 'axios';

    var Highcharts = require('highcharts');
    require('highcharts/modules/exporting')(Highcharts);
    export default {
        data(){
            return {
              tab2Info:{
                priceTrend:{},
                totalPrice:{},
                unitPrice:{},
                realSales:[],
                marketInfo:{
                  precedingMonth:{
                    price:"--",
                    count:"--"
                  },
                  lastMonth:{
                    price:"--",
                    count:"--"
                  },
                  currentMonth:{
                    price:"--",
                    count:"--"
                  }
                }
              },
              tabHistoryIndex:1
            }
        },
        created (){

        },
        mounted(){
          var self = this;
          self.getTab2Info();
        },
        components: {},
        methods: {
          getTab2Info(){
            let self = this;
            //        成交参考
            axios.get('estimate/customer/newHouse/saleInfo/',{
              params:{
                cityId: this.$route.query.cityId,
                houseId: this.$route.query.houseId
              }
            }).then(res =>{
//                console.log(res)
                self.tab2Info = res.data.body;
                let legendArr = [];
                let monthArr = [];
                let housePrice = [];
                let platePrice = [];
                let houseTrend = [];
                let plateTrend = [];
                for(var i in self.tab2Info.priceTrend) {//不使用过滤
                  legendArr.push(self.tab2Info.priceTrend[i].name);
                  if(i == "house"){
                    for(let j=0;j<self.tab2Info.priceTrend[i].list.length;j++){
                      var obj = {}
                      if(self.tab2Info.priceTrend[i].list[j].price == 0){
                        obj.y = null;
                      }else {
                        obj.y = self.tab2Info.priceTrend[i].list[j].price;
                      }
                      let  state = ""
                      if(self.tab2Info.priceTrend[i].list[j].trend<0){
                        self.tab2Info.priceTrend[i].list[j].trend =  Math.abs(self.tab2Info.priceTrend[i].list[j].trend)
                        state = "环比下跌:"
                      }else {
                        state = "环比上涨:"
                      }
                      obj.id = state + self.tab2Info.priceTrend[i].list[j].trend +"%";
                      housePrice.push(obj);
                    }
                  }else if(i == "plate"){
                    for(let j=0;j<self.tab2Info.priceTrend[i].list.length;j++){
                      var obj = {}
                      if(self.tab2Info.priceTrend[i].list[j].price == 0){
                        obj.y = null;
                      }else {
                        obj.y = self.tab2Info.priceTrend[i].list[j].price;
                      }
                      let  state = ""
                      if(self.tab2Info.priceTrend[i].list[j].trend<0){
                        self.tab2Info.priceTrend[i].list[j].trend =  Math.abs(self.tab2Info.priceTrend[i].list[j].trend)
                        state = "环比下跌:"
                      }else {
                        state = "环比上涨:"
                      }
                      obj.id =state + self.tab2Info.priceTrend[i].list[j].trend +"%";
                      platePrice.push(obj);
                    }
                  }
                  for(let j=0;j<self.tab2Info.priceTrend[i].list.length;j++){
                    monthArr.push(self.tab2Info.priceTrend[i].list[j].month +"月");
                  }
                }
                let option = {
                  legendArr:legendArr,
                  monthsData :self.removeArrItem(monthArr),
                  houseInfo : housePrice,
                  plateInfo : platePrice
                };
//                console.log(option);
                self.renderLineChart(option);
          }).catch(err => {
              console.log(err)
          });
          },
          clickHistoryItem(index){
            this.tabHistoryIndex = index;
          },
          renderLineChart(option){
//          console.log(option);
            let params = {};
            params = {
              noData: {
                style: {
                  fontWeight: 'bold',
                  fontSize: '15px',
                  color: '#303030'
                }
              },
              credits: {
                enabled: false
              },
              exporting: {
                enabled: false
              },
              chart: {
                type:"spline",
                plotBackgroundColor: null,
                plotBorderWidth: null,
                zoomType: 'xy' //支持图表放大缩小的范围
              },
              title: {
                text: ''
              },
              xAxis: {
                categories: option.monthsData,
                type:"linear",
                crosshair: {
                  width: 1,
                  color: '#fd5056',
                  dashStyle: 'Solid'
                },
                gridLineColor: '#ededed',
                gridLineWidth: 1,
                gridLineDashStyle: 'ShortDash',
                tickLength: 0,
                lineWidth: 0
              },
              yAxis: [
                {
                  labels: {
                    format: '{value}',
                    style: {
                      color: '#8e8e8e'
                    }
                  },
                  title: {
                    text: ''
                  },
                  gridLineColor: '#ededed',
                  gridLineWidth: 1,
                  gridLineDashStyle: 'ShortDash',
                  tickAmount: 7,
                  showFirstLabel: true,
                  min:0
                },
                {
                  title: {
                    text: ''
                  },
                  labels: {
                    format: '{value}',
                    style: {
                      color: '#8e8e8e'
                    }
                  },
                  gridLineColor: '#ededed',
                  gridLineWidth: 1,
                  gridLineDashStyle: 'ShortDash',
                  tickAmount: 7,
                  opposite:true,
                  showFirstLabel: true,
                  min:0
                }
              ],
              tooltip: {
                shared: true, //公用一个提示框
                useHTML: true,
                formatter: function() {
                  let array =[];
                  array = this.points;
                  var str = '<table>';
                  for(var i=0;i<array.length;i++){
//                    console.log(array[i])
                    let name,danwei;
                    name = array[i].series.name;
                    danwei = '元/㎡';
                    if(array[i].y == 0){
                      str += ''
                    }else{
                      str += '<tr><td style="text-align: left">'+name +':'+array[i].y+danwei+'</td></tr><tr><td>'+array[i].point.id+'</td></tr>';
                    }
                  }
                  return str
                },
                valueDecimals: 0,
                backgroundColor: "#8e8e8e",
                borderColor:"#8e8e8e",
                style:{"color":"#fff"}
              },
              legend: {
                layout: 'horizontal',
                itemDistance: 50,
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
              },
              series: [{
                name: option.legendArr[0],
                data: option.plateInfo,
                yAxis: 0,
                min:10000,
                color:'#00aea7'
              }, {
                name: option.legendArr[1],
                data: option.houseInfo,
                yAxis: 1,
                min:10000,
                color:'#fd5256'
              }],
              plotOptions:{
                series: {
                  connectNulls: false // by default
                }
              }
            };
            Highcharts.chart('lineCharts', params)
          },
          removeArrItem (ar) {
            var ret = [];
            for (var i = 0, j = ar.length; i < j; i++) {
              if (ret.indexOf(ar[i]) === -1) {
                ret.push(ar[i]);
              }
            }
            return ret;
          },
          downApp (){
            recordEvent(41843,{houseId: this.$route.query.houseId});
            location.href = this.$store.state.comm.downloadApp;
          }
        }
    }
</script>

<style scoped>
  .lineCharts{
    width: 100%;
    height: 2.2rem;
    margin-bottom: 0.1rem;
  }
  .closingQu {
    height:0.4rem;
    padding: 0.18rem;
    display: flex;
    justify-content: space-around;
  }
  .closingQu div{
    width: -webkit-fill-available;
  }
  .closingQu div p {
    text-align: center;
  }
  .closingQu div p:nth-of-type(1){
    color: #fd5056;
    font-size: 0.14rem;
    font-family: PingFangSC-Light, sans-serif;
  }
  .closingQu div p:nth-of-type(1) span {
    font-size: 0.19rem;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .closingQu div p:nth-of-type(2){
    color: #8e8e8e;
    font-size: 0.13rem;
    font-family: PingFangSC-Light, sans-serif;
  }
  .historylist{
    padding: 0 0.15rem;
  }
  .historylistItem {
    display: flex;
    justify-content: space-between;
    padding:0.15rem 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .historylistItem div:nth-child(1){
    display: flex;
    justify-content: start;
    width: 1.5rem;
  }
  .bestM {
    width:0.27rem;
    height:0.27rem;
    line-height:0.27rem;
    text-align: center;
    background: #fd5056;
    color: #fff;
    border-radius: 50%;
    font-size: 0.1rem;
    margin-top: 0.08rem;
    margin-right: 0.1rem;
  }
  .subP {
    color: #8e8e8e;
    font-size: 0.14rem;
    font-family: PingFangSC-Light, sans-serif;
  }
  .subT {
    color: #fd5056;
    font-size: 0.15rem;
    font-family: PingFangSC-Regular, sans-serif;
  }
  .textAlignR {
    text-align: right;
  }
  .lookMore {
    font-size: 0.14rem;
    color: #8e8e8e;
    font-family: PingFangSC-Light, sans-serif;
    float: right;
    display: block;
    padding-right: 0.15rem;
    width: 0.7rem;
  }
  .dealitem {
    display: flex;
    justify-content: space-between;
    padding: 0.14rem 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .itemBox{
      /*width: -webkit-fill-available;*/
   }
  .itemLeft p:nth-child(2){
    font-size: 0.18rem;
    color: #fd5056;
    font-family: PingFangSC-Semibold, sans-serif;
  }
  .itemLeft p:nth-child(2) span {
    font-size: 0.22rem;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin-top: 0.05rem;
  }
  .itemCenter p:nth-child(1){
    font-size: 0.14rem;
    color: #474747;
    font-family: PingFangSC-Regular, sans-serif;
  }
  .itemCenter p:nth-child(2){
    font-size: 0.13rem;
    color: #8e8e8e;
    font-family: PingFangSC-Light, sans-serif;
    background: #efefef;
    padding: 0 0.075rem;
    width: 0.4rem;
    margin: 0 auto;
    margin-top: 0.1rem;
  }
  .itemBox p {
    text-align: center;
  }
  .itemBox img {
    width:0.18rem;
    height:0.21rem;
    margin: 0 auto;
    display: block;
  }
  .nodata {
    height:0.44rem;
    line-height:0.44rem;
    font-size: 0.13rem;
    color: #474747;
    text-align: center;
  }
  .last3Month {
    font-size: 0.14rem;
    color: #8e8e8e;
    font-family: PingFangSC-Light, sans-serif;
  }
</style>
