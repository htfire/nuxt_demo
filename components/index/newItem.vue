<template>
    <div>
        <div class="newItem" @click="gotoNewHouseDetail(item)" v-for="(item,key) in list" :key="key">
            <div class="top">
                <span class="left">TOP{{item.rank}}:{{item.houseName}}</span>
                <div class="right">
                    <span class="count">{{item.salesCount}}</span>套
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <span>最新成交价: </span>
                    <span style="font-size: .15rem;">{{item.avgPrice}}</span>元 /
                    <span style="font-size: .13rem;">㎡</span>
                </div>
                <div class="right">
                    <span class="right">近3月成交</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'newItem',
    props: ['list'],
    mounted() {
        console.log(this.list)
    },
    methods: {
        gotoNewHouseDetail(item) {
            this.$router.push({ path: '/houseNew', query: { cityId: 605, houseId: item.houseId } })
        }
    }
}
</script>

<style lang="less" scoped>
.newItem {
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
