<template>
    <div class="house_list">
        <div class="house_list_item" v-if="estimateLists&&estimateLists.length>0" :class="{rmBorder:key==estimateLists.length-1}" v-for="(item,key) in estimateLists">
            <div class="top" @click="gotoEstateDetail(item)">
                <div class="left"><img :src="item.picUrl"><div v-if="item.paySeq==2" class="recomend">推荐</div></div>
                <div class="right">
                    <div class="right_l">
                        <div class="two"><div style="height: 0.2rem;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width:1.3rem">{{item.houseName}}</div></div>
                        <div class="one">{{item.firstLine}}</div>
                        <div class="four"><img src="../../assets/img/icon_date.png">{{item.firstPubDate}}</div>
                    </div>
                    <div class="right_r">
                        <div class="one">{{item.totalPrice}}</div>
                        <div class="two">{{item.sinPrice}}元/㎡</div>
                        <img class="three" src="../../assets/img/tu_estate.png">
                        <div class="four">{{item.estateResult}}</div>
                    </div>
                </div>
            </div>
            <div class="bottom clearfix">
                <div class="left">门店：{{item.threeLine}}</div>
                <a class="right" @click.stop="call(item)"><img class="three" src="../../assets/img/house/red_call.png"><span>立即咨询</span></a>
            </div>
        </div>
    </div>
</template>

<script>
import { recordEvent, sendMsg} from '../../assets/libs/recordEvent.js'

export default {
    name: 'house_list_item',
    props: ['estimateLists','cityId'],
    methods: {
        gotoEstateDetail(item){
            let chanelName;
            if (window.chanelName.chanelName==undefined||window.chanelName.chanelName=='') {
                chanelName = localStorage.getItem('chanelName');
                if(chanelName == '直接访问新版M站') {
                    chanelName = 'mnew_page';
                }
            }else if(window.chanelName.chanelName=='直接访问新版M站'){
                chanelName = 'mnew_page';
            }else {
                chanelName = window.chanelName.chanelName;
            };
            location.href="/angularApp2/index_share.html#/estate-detail?estate_id="+item.estateId+"&city_id="+this.cityId+"&randomKeyId="+item.randomKeyId+"&from_type=m_house_list&chanelName="+chanelName;
        },
        call(item) {
            sendMsg(item.threePhone,item.houseName)
            recordEvent(41867,{cityId: this.cityId, estateId: item.estateId,houseId: item.houseId, tel: item.threePhone, page_type: 25}); 
            window.location.href = "tel://"+item.threePhone;
        }
    }	
}
</script>

<style lang="less" scoped>
.house_list {
    .house_list_item {
        margin-bottom: .1rem;
        background: white;
        color: #474747;
        &.rmBorder {
            margin-bottom: 0;
        }
        .top {
            padding: .1rem .15rem;
            border-bottom: 1px #dbdbdb solid;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            .left {
                width: 1rem;
                height: .75rem;
                margin-right: .15rem;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                .recomend {
                    position: absolute;
                    left: .05rem;
                    top: .05rem;
                    background: #fd5056;
                    color: white;
                    padding: 0 .02rem;
                    font-size: .1rem;
                }
            }
            .right {
                height: .75rem;
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                color: #474747;
                .right_l {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    -webkit-justify-content: space-between;
                    align-items: flex-start;
                    .one {
                        font-size: .13rem;
                    }
                    .two {
                        font-size: .15rem;
                        margin-bottom: -0.16rem;
                    }
                    .four {
                        font-size: .12rem;
                        color: #8e8e8e;
                        img {
                            width: .12rem;
                            margin-right: .04rem;
                            vertical-align: -.01rem;
                        }
                    }
                }
                .right_r {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-end;
                    width:1rem;
                    .one {
                        font-size: .16rem;
                        color: #fd5056;
                        .num {
                            font-size: .16rem;
                            font-family: 'Helvetica Neue Medium';
                        }
                    }
                    .two {
                        font-size: .13rem;
                        color: #8e8e8e;
                        margin-bottom: .03rem;
                        .num {
                            font-family: 'Helvetica Neue Medium';
                        }
                        .danwei {
                            font-size: .15rem;
                        }
                    }
                    .three {
                        width: .6rem;
                        height: .17rem;
                    }
                    .four {
                        font-size: .15rem;
                        color: #fd5056;
                        font-weight: bold;
                    }
                }
            }
        }
        .bottom {
            height: .5rem;
            padding: 0 .21rem 0 .15rem;
            .left {
                float: left;
                line-height: .5rem;
                font-size: .15rem;
            }
            .right {
                float: right;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: .1rem;
                img {
                    width: .22rem;
                    margin-top: .05rem;
                }
            }
        }
    }
}
</style>
