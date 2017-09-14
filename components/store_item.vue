<template>
	<div class="store_list" v-if="storeList.length>0">
        <div class="title">挂牌门店</div>
		<div class="item" :class="{rmBorder:key==storeList.length-1}" v-for="(item,key) in storeList" @click="gotoStoreDetail(item)">
			<div class="left_img">
				<img :src="item.headerUrl" />
			</div>
            <div class="right_box">
                <div class="left">
                    <p>店长-{{item.kpName}}<span>从业{{item.workYear}}年</span></p>
                    <p>{{item.storeName}}</p>
                    <div class="score"><span v-for="(itemClass,index) in item.itemClasses" :class="itemClass" class="star-item" track-by="index"></span> {{item.storeScore}}分<span class="line"></span>{{item.scoreMeaning}}
						</div>
                </div>
                <div class="right">
                    <a v-if="item.contactinfo&&item.contactinfo!=''" @click.stop="call(item.contactinfo)"><img src="../assets/img/house/red_call.png" /></a>
                    <!-- <div>该板块在售房源<span>{{item.saleEstateNum}}</span><span class="danwei">套</span></div> -->
                </div>
            </div>
		</div>
	</div>
		
</template>
<script>
    import {recordEvent,sendMsg} from '../assets/libs/recordEvent.js'
    import { recommendStoreList } from '../api/house_second.js'

	export default {
        name: 'store_item',
        props: ['houseName'],
	  	data () {
	  	  	return {
                storeList: [],
	  	  	}
	  	},
	  	created() {
            this.getStoreList();    
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getStoreList'
        },
	  	methods: {
            calculate(storeScore) {
                let result = [];
                let score = Math.floor(storeScore * 2 ) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for(let i=0;i<integer;i++){
                    result.push("on");
                }
                if(hasDecimal){
                    result.push("half");
                }
                while(result.length < 5){
                    result.push("off");
                }
                return result;
            },
            call(number) {
                sendMsg(number,this.houseName)
                recordEvent(41825,{"cityId":this.$route.query.cityId,"houseId":this.$route.query.houseId,"tel":number,"page_type":25,"userId":0,"appName":4,"appId":4});
                window.location.href = "tel:"+number;
            },
			gotoStoreDetail(item){
                let houseId = this.$route.query.houseId;
                let cityId = this.$route.query.cityId;
                recordEvent(41880,{"cityId":this.$route.query.cityId,"houseId":this.$route.query.houseId,storeId: item.storeId,"tel":item.contactinfo,"page_type":25,"userId":0,"appName":4,"appId":4});
                this.$router.push({path: '/store_detail',query:{cityId: cityId,houseId:houseId,storeId:item.storeId,from_page:'house'}});
            },
            getStoreList() {
                let params = {
                    cityId: this.$route.query.cityId,
                    houseId: this.$route.query.houseId
                }
                recommendStoreList(params).then(res => {
                    if(res.data.resultCode == 0) {
                        let that = this;
                        res.data.body.forEach((item,key)=>{
                            item.itemClasses = that.calculate(item.storeScore)
                        });
                        this.storeList = res.data.body;
                    }else {
                        this.storeList = [];
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
	  	}
	}
</script>
<style lang="less" scoped>
.store_list {
    background: white;
    margin-top: .1rem;
    .title {
        padding: 0 .15rem;
        height: .5rem;
        line-height: .5rem;
        font-size: .16rem;
        border-bottom: 1px #dbdbdb solid;
    }
    .item {
        margin: 0 .15rem;
        padding: .15rem 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px #dbdbdb solid;
        &.rmBorder {
            border-bottom: none;
        }
        .left_img {
            img {
                width: .6rem;
                min-width: .6rem;
                height: .6rem;
                border-radius: 100%;
                margin-right: .1rem;
            }
        }
        .right_box {
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .left {
                p {
                    margin-bottom: .05rem;
                }
                p:nth-of-type(1) {
                    font-size: .16rem;
                    color: #474747;
                    span {
                        font-size: .11rem;
                        background: #f5fafb;
                        color: #8e8e8e;
                        padding: 0 .05rem;
                        margin-left: .1rem;
                    }
                }
                p:nth-of-type(2) {
                    font-size: .14rem;
                    color: #474747;
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: space-between;
                height: .65rem;
                img {
                    width: .2rem;
                }
                div {
                    font-size: .11rem;
                    color: #8e8e8e;
                    span {
                        color: #fd5056;
                        font-size: .17rem;
                    }
                    .danwei {
                        font-size: .11rem;
                    }
                }
            }
        }
    }
    .score {
        color: #fd5056;
        font-size: .12rem;
        .line {
            display: inline-block;
            width: 1px;
            height: .1rem;
            background: #dbdbdb;
            margin: 0 .05rem;
        }
    }
    .star-item{
 		display: inline-block;
 		background-repeat: no-repeat;
 		width: .13rem;
 		height: .12rem;
 		margin-right: .01rem;
 		background-size: 100%;
 	}
 	.star-item.on{
 		background-image: url('../assets/img/on.png');
 	}
 	.star-item.half{
 		background-image: url('../assets/img/half.png');
 	}
 	.star-item.off{
 		background-image: url('../assets/img/off.png');
 	}
}
</style>