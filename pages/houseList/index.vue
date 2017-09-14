<template>
    <div class="house_second" id="sec_box">
        <m-head :go-back="true" :header-layout="1" :title="houseHeaderInfoOne.house_name" :select-nav="true"></m-head>
        <div class="house_header">
            <div class="title clearfix">
                <div class="left">
                    <span class="tag" v-if="houseHeaderInfoOne.plate_name&&houseHeaderInfoOne.plate_name!=''" @click="gotoPlateDetail(houseHeaderInfoOne.plate_id)">{{houseHeaderInfoOne.district_name}}-{{houseHeaderInfoOne.plate_name}}<img src="../../assets/img/house/white-arrow_right.png" style="width: .06rem;vertical-align: -0.01rem;margin-left: .03rem;"></span>
                </div>
                <div class="right">{{houseHeaderInfoOne.pcount}}人关注</div>
            </div>
            <div class="house_info">
                <div class="house_info_top">
                    <div class="price">
                        <span>{{houseHeaderInfoTwo.sinprice | number_show}}</span>元/㎡</div>
                    <div class="bottom">最新挂牌行情</div>
                </div>
                <div class="house_info_bottom flex-row">
                    <div class="left-block">
                        <div class="row-1">
                            <span>{{houseHeaderInfoTwo.quotednumber | number_show}}</span>套</div>
                        <div class="row-2">在售房源<img v-if="houseHeaderInfoTwo.quotedchange>=0" src="../../assets/img/house/white_up_bold.png"><img v-if="houseHeaderInfoTwo.quotedchange<0" src="../../assets/img/house/white_down_bold.png">{{houseHeaderInfoTwo.quotedchange|abs_number}}%
                        </div>
                    </div>
                    <div class="center-block">

                        <div class="row-1">
                            <span>{{houseHeaderInfoTwo.bargainnumber | number_show}}</span>套</div>
                        <div class="row-2" v-if="houseHeaderInfoTwo.mon3Flag=='1'">最近成交{{houseHeaderInfoTwo.year}}年{{houseHeaderInfoTwo.ValMonth}}月</div>
                        <div class="row-2" v-if="houseHeaderInfoTwo.mon3Flag!='1'">{{houseHeaderInfoTwo.ValMonth}}月份成交<img v-if="houseHeaderInfoTwo.bargainchange>=0" src="../../assets/img/house/white_up_bold.png"><img v-if="houseHeaderInfoTwo.bargainchange<0" src="../../assets/img/house/white_down_bold.png">{{houseHeaderInfoTwo.bargainchange}}%</div>
                    </div>
                    <div class="right-block">
                        <div class="row-1">
                            <span>{{houseHeaderInfoTwo.rentPrice | number_show}}</span>元/月</div>
                        <div class="row-2">参考租金
                            <span class="house_type" v-if="houseHeaderInfoTwo.roomType!=null">{{houseHeaderInfoTwo.roomType}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Sticky>
            <div class="tabList house_second_header">
                <div class="tabItem" :class="{active:tabIndex==1}" @click="clickItem(1)">挂牌行情</div>
                <div class="tabItem" :class="{active:tabIndex==2}" @click="clickItem(2)">历史成交</div>
                <div class="tabItem" :class="{active:tabIndex==3}" @click="clickItem(3)">小区评价</div>
            </div>
        </Sticky>
        <div class="content_box" :class="show_dowload?'addPadding':'rmPadding'">
            <div class="tab1" v-show="tabIndex==1">
                <div class="charts_box">
                    <!-- <house-line-charts></house-line-charts> -->
                    <div class="new_download" @click="downloadApp(4)" v-if="!show_dowload">
                        <div><img class="left" src="../../assets/img/down_logo.png" alt="">
                            <span>&nbsp;查看更多房价信息，去下载兔博士吧！</span>
                        </div>
                        <div><img class="right" src="../../assets/img/new_load.png" alt=""></div>
                    </div>
                </div>
                <div class="forecast_box box">
                    <div class="box_title">兔博士涨跌预测</div>
                    <div class="box_content">
                        <div class="house_info_bottom flex-row">
                            <div class="left-block">

                                <div class="row-1" :class="{green: houseTrend.quote_rate<0}">
                                    <span>{{houseTrend.quote_rate}}</span>%</div>
                                <div class="row-2">三十天报价涨跌</div>
                            </div>
                            <div class="center-block">
                                <div class="row-1" :class="{green: houseTrend.change_rate<0}">
                                    <span>{{houseTrend.change_rate}}</span>%</div>
                                <div class="row-2">六十天成交量涨跌</div>
                            </div>
                            <div class="right-block">
                                <div class="row-1" :class="{green: houseTrend.trend_result=='下跌'}">
                                    <span>{{houseTrend.trend_result}}</span>
                                </div>
                                <div class="row-2">未来三十天房价预测</div>
                            </div>
                        </div>
                        <div class="forecast">本小区最近30天报价
                            <span style="text-decoration: underline;">{{houseTrend.desArray[0]||'--'}}</span>，最近60天成交量
                            <span style="text-decoration: underline;">{{houseTrend.desArray[1]||'--'}}</span>，根据咱们地产最强大脑兔博士Jarvis的预测，本小区未来30天成交价
                            <span style="text-decoration: underline;">{{houseTrend.desArray[2]||'--'}}</span>。
                        </div>
                    </div>
                </div>
                <!-- <div class="new_guapai box" v-if="onSalelists.length>0">
        					<div class="box_title">
        						<div class="left">
        							<p>最新挂牌房源</p>
        							<p>房源信息来自中介官网发布信息</p>
        						</div>
        						<div class="right">
        							<span @click="getMore">查看更多</span><img src="../../assets/img/new_arrow_right.png">
        						</div>
        					</div>
        					<div class="box_content">
        						<estimate-item :estimate-lists="onSalelists"></estimate-item>
        					</div>
        				</div>
        				<house-same :plate-info="{plateId: houseHeaderInfoOne.plate_id,plateName:houseHeaderInfoOne.plate_name}"></house-same> -->
            </div>
            <!-- <div class="tab2" v-show="tabIndex==2">
        				<house-pie-charts v-if="tabIndex==2"></house-pie-charts>
        				<div class="trad_agency box" v-if="tabIndex==2&&agencyList.length>0">
        					<div class="box_title">成交机构（近六个月）</div>
        					<div class="box_content">
        						<div class="agency-content flex-row has-padding-margin" v-if="key<5" v-for="(item,key) in agencyList">
        							<div class="agency-name">{{key+1}}.{{item.agent}}</div>
        							<div class="agency-progress"><div class="progress-inner" :style="{width: item.percent+'%'}"></div></div>
        							<div class="trade-number">{{item.count}}套</div>
        						</div>
        					</div>
        				</div>
        				<div class="trad-history box" v-if="tabIndex==2">
        					<div class="box_title">
        						<div class="left">成交历史</div>
        						<div class="right">
        							<span @click="getMore">查看更多</span><img src="../../assets/img/new_arrow_right.png">
        						</div>
        					</div>
        					<div class="box_content">
        						<trade-history></trade-history>
        					</div>
        				</div>
        				<div class="same_plate box" v-if="tabIndex==2&&samePlateInfo.newHouses&&samePlateInfo.newHouses.length>0">
        					<div class="box_title">
        						<div class="left">同板块销量排名</div>
        						<div class="right" @click="gotoPlateDetail(samePlateInfo.plate_id)"><p>{{samePlateInfo.plate_name}}</p></div>
        					</div>
        					<div class="box_content">
        						<div class="block-content flex-row has-padding-margin" v-for="(item,key) in samePlateInfo.newHouses"
        							:class="{'rmBorder':key==samePlateInfo.newHouses.length-1, 'red': key ==samePlateInfo.currentIndex|| (samePlateInfo.currentIndex>=5 && key ==4)}"
        							@click="gotoHouseDetail(item.house_id)">
        							<div class="block-name">
        								<span v-if="key<4">{{key+1}}.</span>
        								<span v-if="samePlateInfo.currentIndex>=5&&key==4">{{samePlateInfo.currentIndex+1}}</span>
        								<span v-if="samePlateInfo.currentIndex<5&&key==4">5</span>
        								<span>{{item.house_name}}</span>
        							</div>
        							<div class="block-right flex-row">
        								<div class="block-progress">{{item.sinprice}}元/㎡</div>
        								<div class="block-number">{{item.count}}套</div>
        							</div>
        						</div>
        					</div>
        				</div>
        			</div>
        			<div class="tab3" v-show="tabIndex==3">
        				<house-info></house-info>
        				<house-comment></house-comment>
        				<house-timeline :fromtype="'secondHouse'"></house-timeline>
        				<house-ad></house-ad>
        				<house-map></house-map>
        			</div> -->
            <!-- <store-item :houseName="houseHeaderInfoOne.house_name"></store-item> -->
        </div>
        <download-app @closedownload="closeDownload" v-if="show_dowload" :fromPage="'house_second'" :houseId="$route.query.houseId"></download-app>
    </div>
</template>

<script>
import mHead from '~/components/common/head.vue'
import downloadApp from '~/components/common/download_app.vue'
import Sticky from '~/components/common/Sticky';
// import houseLineCharts from '~/components/house/house_line_charts.vue'
// import estimateItem from '~/components/estimate_item_old.vue'
// import houseSame from '~/components/house/house_same.vue'

// import storeItem from '../../components/store_item.vue'
// import tradeHistory from '../../components/trade_history.vue'
// import houseInfo from '../../components/house/house_info.vue'
// import houseComment from '../../components/house/house_comment.vue'
// import houseAd from '../../components/ad_item.vue'
// import housePieCharts from '../../components/house/house_pie_charts.vue'
// import houseTimeline from '../../components/house_timeline.vue'
// import houseMap from '../../components/house/house_map.vue'



import service from 'axios'
// import service from '~/plugins/axios'

export default {
    asyncData(params) {
        // console.log(params)
        let houseId = params.query.houseId;
        return service.all([
            service.get('https://inner299.2boss.cn/house/getHouseDetailHead', {
                params: {
                    cityId: 605,
                    houseId: houseId
                }
            }),
            service.get('https://inner299.2boss.cn/rabbit/v1/house/getHouseTopareaInfo', {
                params: {
                    city_id: 605,
                    house_id: houseId
                }
            })
        ])
            .then(service.spread(function(houseHeadOne, houseHeadTwo) {
                console.log(houseHeadOne)
                console.log(houseHeadTwo)
                return {
                    houseHeaderInfoOne: houseHeadOne.data,
                    houseHeaderInfoTwo: houseHeadTwo.data.body
                }
            }))
            .catch(error => console.log(error))
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
        Sticky,
        downloadApp,
        // estimateItem,
        // houseSame,
        // storeItem,
        // tradeHistory,
        // houseInfo,
        // houseComment,
        // houseTimeline,
        // houseLineCharts,
        // housePieCharts,
        // houseAd,
        // houseMap,
        // Loading,
    },
    methods: {
        init() {
            window.scrollTo(0, 0);
            this.tabIndex = 1;
            this.params = {
                city_id: this.$route.query.cityId,
                house_id: this.$route.query.houseId
            }
            this.gethouseHeadOne();
            this.gethouseHeadTwo();
            this.getOnSales();
            this.getTradeAgency();
            this.getSamePlate();
            this.gethouseTrend();
        },
        clickItem(index) {
            this.tabIndex = index;
        },
        downloadApp() {
            // 搜狗
            recordEvent(41821, { "cityId": this.$route.query.cityId, 'houseId': this.$route.query.houseId, "page_type": 25 });
            download_app()
        },
        closeDownload() {
            this.show_dowload = false;
        },
        onScroll(e) {
            window.scrollY >= this.origOffsetY ? this.header.classList.add('sticky') : this.header.classList.remove('sticky');
        },
        gotoHouseDetail(houseId) {
            if (houseId == this.$route.query.houseId) {
                return
            }
            this.gethouseHeadOne(true, houseId);
        },
        gotoPlateDetail(plateId) {
            recordEvent(41852, { "cityId": this.$route.query.cityId, 'houseId': this.$route.query.houseId, 'plateId': plateId, "page_type": 25, "userId": 0, "appName": 4, "appId": 4 }).then((res) => {
                console.log(plateId)
                location.href = "/angularApp2/index_share.html#/plate?plate_id=" + plateId + "&city_id=" + this.$route.query.cityId;
            }).catch((err) => {
                location.href = "/angularApp2/index_share.html#/plate?plate_id=" + plateId + "&city_id=" + this.$route.query.cityId;
            });
        },
        getMore() {
            recordEvent(41822, { "cityId": this.$route.query.cityId, 'houseId': this.$route.query.houseId, "page_type": 25, "userId": 0, "appName": 4, "appId": 4 });
            location.href = this.$store.state.comm.downloadApp;
        },
        gethouseHeadOne(isGotoNext, houseId) {
            this.$vux.loading.show({
                text: '拼命加载中'
            });
            let params = {
                cityId: this.$route.query.cityId,
                houseId: this.$route.query.houseId
            }
            getHouseDetailHead(params).then(res => {
                this.$vux.loading.hide()
                this.houseHeaderInfoOne = res.data;
                if (isGotoNext) {
                    if (res.data.is_first == '2') {
                        this.$router.push({ path: '/house_second', query: { cityId: this.$route.query.cityId, houseId: houseId } });
                    } else {
                        this.$router.push({ path: '/house_new', query: { cityId: this.$route.query.cityId, houseId: houseId } });
                    }
                } else {
                    setShareInfoForWechat('house_second', window.location.href, { houseName: res.data.house_name });
                }
            }).catch(err => {
                console.log(err)
            });
        },
        gethouseHeadTwo() {
            getHouseTopareaInfo(this.params).then(res => {
                this.houseHeaderInfoTwo = res.data.body;
            }).catch(err => {
                console.log(err)
            });
        },
        gethouseTrend() {
            let params = {
                cityID: this.$route.query.cityId,
                houseID: this.$route.query.houseId
            }
            getHouseTrend(params).then(res => {
                res.data.body.desArray = res.data.body.description.split('|');
                this.houseTrend = res.data.body;
                if (this.houseTrend.trend_result == ('上涨' || '持平')) {
                    this.houseTrend.trendResultColor = '#fd5056'
                } else if (this.houseTrend.trend_result == '下跌') {
                    this.houseTrend.trendResultColor = '#00ADA9'
                }
            }).catch(err => {
                console.log(err)
            });
        },
        getOnSales() {
            getHouseSalesRoomList4Top5(this.params).then(res => {
                this.onSalelists = res.data.body;
            }).catch(err => {
                console.log(err)
            });
        },
        getTradeAgency() {
            getHouseBargainsByAgentInfo(this.params).then(res => {
                this.agencyList = res.data.body;
            }).catch(err => {
                console.log(err)
            });
        },
        getSamePlate() {
            getHouseSalesRandOfPlate(this.params).then(res => {
                var res = res.data.body;
                var j = -1;
                for (let i = 0; i < res.houses.length; i++) {
                    if (res.houses[i].house_id == this.$route.query.houseId) {
                        j = i;
                        break
                    }
                }
                res.currentIndex = j;
                var currnetCourt = res.houses[j]
                if (j > 4 && j < res.houses.length - 1) {
                    var list = [];
                    list = res.houses.slice(0, 4);
                    list.push(currnetCourt);
                    res.newHouses = list;
                } else if (0 <= j <= 4) {
                    if (res.houses.length > 5) {
                        res.newHouses = res.houses.slice(0, 5);
                    } else {
                        res.newHouses = res.houses;
                    }
                } else {
                    res.newHouses = res.houses.slice(0, 5);
                }
                this.samePlateInfo = res;
            }).catch(err => {
                console.log(err)
            });
        }
    }
}
</script>
<style lang="less" scoped>
@import (reference) "../../assets/common/common.less";
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
        padding: 54px 0 15px;
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
