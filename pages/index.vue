<template>
    <div class="m_index">
        <div class="red_head">
            <div class="top">
                <div class="left" @click="gotoCityList">
                    <span>上海</span><img src="~assets/img/arrow_down.png"></div>
                <div class="center"><img src="~assets/img/tuboshi.png"></div>
                <div class="right" @click="downloadApp">下载app</div>
            </div>
            <div class="search" @click="gotoHouseSearch"><img src="~assets/img/search.png">
                <span>查小区最新房价</span>
            </div>
            <div class="nav_bar">
                <div class="tab tab1" @click="gotoEstimateIndex"><img src="~assets/img/estimate.png">
                    <span>估价格</span>
                </div>
                <div class="tab tab2" @click="gotoHouseList"><img src="~assets/img/search_house.png">
                    <span>找房源</span>
                </div>
                <div class="tab tab3" @click="downloadApp"><img src="~assets/img/search_school.png">
                    <span>查学区</span>
                </div>
                <div class="tab tab4" @click="downloadApp"><img src="~assets/img/search_agent.png">
                    <span>找经纪人</span>
                </div>
            </div>
        </div>
        <content class="content_box">
            <div class="tab_bar">
                <div class="left" :class='{active: tabIndex ==1}' @click="changeTabIndex(1)">二手房</div>
                <div class="right" :class='{active: tabIndex ==2}' @click="changeTabIndex(2)">新房</div>
            </div>
            <div class="market_box" v-if="tabIndex ==1">
                <div class="title">热门二手房</div>
                <second-item :list="secondHouseData"></second-item>
            </div>
            <div class="market_box" v-if="tabIndex ==2">
                <div class="title">热门新房</div>
                <new-item :list.sync="newHouseData"></new-item>
            </div>
        </content>
    </div>
</template>

<script>
import service from '~/plugins/axios'
import secondItem from '~/components/index/secondItem.vue'
import newItem from '~/components/index/newItem.vue'

export default {
    // fetch({ store }) {
    //     console.log(1)
    //     return Promise.all([
    //         store.dispatch('loadSecondList'),
    //     ])
    // },
    asyncData(params) {
        return service({
            url: '/estimate/customer/mobileSite/salesRank',
            method: 'get',
            params: {
                type: 2,
                cityId: 605,
                page: 1,
                pageSize: 5
            }
        })
        .then(res => {
            console.log(res)
            if(res.data.resultCode==0) {
                return { secondHouseData: res.data.body.datas }
            }else {
                return { secondHouseData: [] }
            }
        })
        .catch(err => {
            //   commit('article/GET_LIST_FAILURE', err)
            console.log(err)
            return { secondHouseData: [] }
        })
    },
    data() {
        return {
            tabIndex: 1,
            newHouseData: []
        }
    },
    components: {
        secondItem,
        newItem
    },
    // computed: {
    //     listData() {
    //         // console.log(this.$store.state.mIndex.secondList.data.data)
    //         return this.$store.state.mIndex.secondList
    //     },
    //     name() {
    //         return this.$store.state.mIndex.secondList.fetching
    //     },
    //     nextPageParams() {
    //         return {
    //             // page: this.article.data.pagination.current_page + 1
    //         }
    //     }
    // },
    methods: {
        gotoCityList() {
            this.$router.push({ path: '/cityList' })
        },
        downloadApp() {
            this.$router.push({ path: '/download' })
        },
        gotoHouseSearch() {
            this.$router.push({ path: '/search' })
        },
        gotoEstimateIndex() {
            this.$router.push({ path: '/estimate' })
        },
        gotoHouseList() {
            this.$router.push({ path: '/houseList' })
        },
        changeTabIndex(index) {
            this.tabIndex = index
            if(index == 2) {
                this.getNewHouseData();
            }
        },
        loadmoreArticle() {
            this.$store.dispatch('loadArticles', this.nextPageParams)
        },
        getNewHouseData() {
            service({
                url: '/estimate/customer/mobileSite/salesRank',
                method: 'get',
                params: {
                    type: 1,
                    cityId: 605,
                    page: 1,
                    pageSize: 5
                }
            })
            .then(res => {
                console.log(res)
                if(res.data.resultCode==0) {
                    this.newHouseData =  res.data.body.datas;
                }else {
                    this.newHouseData =  [];
                }
            })
            .catch(err => {
                //   commit('article/GET_LIST_FAILURE', err)
                console.log(err)
                this.newHouseData =  [];
            })
        }
    }
}
</script>

<style lang="less" scoped>
.m_index {
    .red_head {
        background: #fc5055;
        color: #fff;
        padding: .2rem .15rem .18rem;
        .top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .left {
                font-size: .16rem;
                img {
                    width: .1rem;
                    height: .06rem;
                    margin-left: .05rem;
                    vertical-align: 0.02rem;
                }
            }
            .center {
                img {
                    width: .8rem;
                }
            }
            .right {
                width: .61rem;
                height: .21rem;
                border: 1px #fff solid;
                text-align: center;
                line-height: .21rem;
            }
        }
        .search {
            width: 100%;
            height: .3rem;
            background: #fd7477;
            margin: .3rem 0 .19rem 0;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            font-size: .13rem;
            img {
                width: .12rem;
                height: .12rem;
                margin: 0 .05rem 0 .15rem;
            }
        }
        .nav_bar {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            .tab {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                    width: .3rem;
                    height: .3rem;
                    margin-bottom: .08rem;
                }
            }
        }
    }
    .content_box {
        width: 100%;
        background: #f0f0f0;
        .tab_bar {
            height: .51rem;
            border-bottom: 1px #bfbfbf solid;
            padding: 0 .15rem;
            text-align: center;
            line-height: .5rem;
            background: white;
            font-size: .15rem;
            color: #474747;
            clear: both;
            overflow: hidden;
            .left {
                float: left;
                width: 50%;
            }
            .right {
                float: right;
                width: 50%;
            }
            .active {
                color: #fd5056;
                border-bottom: 2px #fd5156 solid;
            }
        }
        .market_box {
            min-height: 2.3rem;
            .title {
                height: .4rem;
                line-height: .4rem;
                font-size: .15rem;
                color: #474747;
                padding-left: .15rem;
                font-family: '黑体';
                font-weight: bold;
            }
            .box_detail {
                background: white;
                padding: .18rem 0;
                text-align: center;
                .col {
                    width: 33%;
                    display: inline-block;
                    border-right: solid 1px #dbdbdb;
                    .row-1 {
                        font-size: .11rem;
                        color: #fd5056;
                        .large {
                            font-size: .23rem;
                        }
                    }
                }
                .row-2 {
                    font-size: .12rem;
                    white-space: nowrap;
                    margin-top: 0.01rem;
                    color: #8e8e8e;
                    .large {
                        font-size: .12rem;
                        font-weight: lighter;
                        span {
                            font-size: .14rem;
                        }
                    }
                    img {
                        width: .07rem;
                        margin-left: .02rem;
                    }
                }
                .ex-num {
                    font-size: .3rem;
                }
                .ex-text {
                    font-size: .25rem;
                }
            }
            .chartsContaniner {
                width: 100%;
                height: 2.4rem;
                background: #fff;
            }
            .house_item {
                padding: .15rem;
                background: #fff; // height: .95rem;
                margin-bottom: .1rem;
                box-sizing: border-box;
                .top {
                    clear: both;
                    overflow: hidden;
                    .left {
                        float: left;
                        font-size: .16rem;
                        color: #474747;
                    }
                    .right {
                        float: right;
                        font-size: .13rem;
                        color: #fd5056;
                        span {
                            font-size: .20rem;
                            font-family: 'Helvetica Neue Regular';
                        }
                        img {
                            width: .07rem;
                            margin-left: .04rem;
                        }
                        .rotate {
                            transform: rotate(180deg);
                        }
                    }
                }
                .bottom {
                    color: #fd5056;
                    clear: both;
                    overflow: hidden;
                    .left {
                        float: left;
                        font-size: .13rem;
                        color: #8e8e8e;
                    }
                    .right {
                        float: right;
                        font-size: .13rem;
                        color: #8e8e8e;
                        img {
                            width: .07rem;
                            margin-left: .01rem;
                        }
                        .rotate {
                            transform: rotate(180deg);
                        }
                    }
                }
            }
        }
        .get_more {
            margin: .23rem .25rem .2rem .25rem;
            text-align: center;
            height: .4rem;
            line-height: .4rem;
            border-radius: 5px;
            background: white;
            color: #474747;
            font-size: .14rem;
            img {
                width: .2rem;
                vertical-align: -.04rem;
            }
        }
    }
}
</style>
