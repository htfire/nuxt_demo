<template>
    <div>
        <div class="secondItem" @click="gotoHouseDetail(item)" v-for="(item,key) in list" :key="key">
            <div class="top">
                <span class="left">TOP{{item.rank}}:{{item.houseName}}</span>
                <div class="right" style="margin-right: .25rem;">
                    <span class="count">{{item.salesCount}}</span>套
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <span>最新挂牌价</span>
                    <span style="font-size: .15rem;">{{item.avgPrice}}</span>元 /
                    <span style="font-size: .13rem;">㎡</span>
                </div>
                <div class="right">
                    <span>{{item.valMonth}}月成交</span>
                    <img :class="item.salesRate<0?'rotate':''" src="../../assets/img/gray_up.png">
                    <span class="rate">{{item.salesRate | abs_number | number_show}}</span>%
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'secondItem',
    props: ['list'],
    methods: {
        gotoHouseDetail(item) {
            this.$router.push({ path: '/houseSecond', query: { cityId: 605, houseId: item.houseId } })
        }
    }
}
</script>

<style lang="less" scoped>
.secondItem {
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
</style>
