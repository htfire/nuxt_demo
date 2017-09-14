<template>
	<div class="trade_history" v-if="bargainHistoryLists.length>0">
        <div class="content-row" v-for="(item,key) in bargainHistoryLists" :class="{rmBorder:key==bargainHistoryLists.length-1}">
            <div class="row" @click="bargainDetail(item)">
                <div class="top">
                    <span class="col col-1">
                        <div class="row-1"><img src="../img/icon-bargain_red.png" alt=""></div>
                        <div class="row-2"><span class="stress">{{item.tprice}}万</span></div>
                    </span><span class="col col-2">
                        <div class="row-1"><span>{{item.sprice}}元/平</span> <span v-if="item.price_tag" class="tag" v-bind:style="{ background: item.price_tag.color}">{{item.price_tag.name}}</span></div>
                        <div class="row-2"><span class="b-tag">{{item.area}}平</span><span style="margin-left: .08rem" class="b-tag" v-show="item.agent_name">{{item.agent_name}}</span></div>
                    </span><span class="col col-3">
                        <div class="row-1"><span>{{item.building}}</span> <span>{{item.floorText}}</span></div>
                        <div class="row-2"><span class="b-tag">{{item.date}}</span></div>
                    </span>
                </div>
            </div>
            <div class="d-line"></div>
        </div>
        <div v-if="bargainHistoryLists.length==0" class="none">暂无数据~</div>
        <bargain-dailog v-if="showBargainDailog" @closebargindailog="closeBarginDailogHandler" :bargain-params="bargainParams"></bargain-dailog>
	</div>
</template>
<script>
    import axios from 'axios'
    import bargainDailog from './bargainDailog.vue'  

	export default {
	  	name: 'trade_history',
	  	data () {
	  	  	return {
                bargainHistoryLists: [],
                showBargainDailog: false,
                bargainParams: {}
	  	  	}
	  	},
	  	created() {
            this.getTradeHistoryData();
        },
        components: {
            bargainDailog
        },
	  	methods: {
            getTradeHistoryData() {
                // 获取其他房源历史成交
                axios.get('house/getHouseRealSales',{
                    params:{
                        cityId: this.$route.query.cityId,
                        houseId: this.$route.query.houseId,
                        lines: 5,
                        times: 1,
                        sortType: 2
                    }
                })
                .then(res =>{
                    this.bargainHistoryLists = res.data;
                })
                .catch(err => {
                    this.bargainHistoryLists = [];
                });
            },
            bargainDetail(item){
                this.bargainParams = {
                    bargainId: item.bargainid,
                    sourcetype: item.source_id
                }
                this.showBargainDailog = true;
            },
            closeBarginDailogHandler(){
                this.showBargainDailog = false;
            }
	  	}
	}
</script>
<style lang="less" scoped>
.trade_history {
    box-sizing: border-box;
    background: white;
    width: 100%;
    padding: 0 .15rem;
    .ft-34px {font-size: .17rem;}
    .ft-32px {font-size: .16rem;}
    .ft-30px {font-size: .15rem;}
    .ft-28px {font-size: .14rem;}
    .c-grey-new{color: #aeaeae;}
    .c-grey-dark {color:#474747;}
    .c-red {color:#fd5056;}
    .content-row {
        border-bottom: 1px #dbdbdb solid;
        padding: .1rem 0;
        .row {

                // border-left: solid 0.03rem #fd5056;
                text-align: center;
                // padding-left: 0.2rem;
                margin: 0.06rem 0;
                .top {
                    display: table;
                    width: 100%;
                    .b-tag {
                        background: #f9f9f9;
                        color: #8e8e8e;
                        padding: 0.02rem 0.1rem;
                        border-radius: 0.05rem;
                    }

                    .col {
                        display: table-cell;
                        white-space: nowrap;
                        vertical-align: bottom;
                    }

                    .col-1 {
                        width: 22%;
                    }
                    .col-2 {
                        width: 100%;
                    }
                    .col-3 {}

                    .row-1 {
                        .ft-34px();
                        img {
                            width: 0.16rem
                        }
                    }

                    .row-2 {
                        margin-top: 0.03rem;
                        .ft-28px();
                        line-height: 0.26rem;
                    }

                    .stress {
                        .c-red();
                        .ft-34px();
                    }

                    .tag {
                        color: white;
                        .ft-28px();
                        border-radius: 0.2rem;
                        padding: 0.01rem 0.07rem;
                    }
                }

                &:nth-last-child(1) {
                    margin-bottom: 0;
                }

        }
        .d-line{
            height: 1px;
            background: white;
        }

        &:nth-child(1){
            .row {margin-top: 0}
        }

        &:nth-last-child(1){
            .row { margin-bottom: 0}
            .d-line {
                height: 0;
            }
        }
    }
    .none {
        font-size: .14rem;
        text-align: center;
    }
}
</style>