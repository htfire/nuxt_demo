<template>
    <div class="house_same">
        <div class="same_box box" v-if="sameTotalPrice.sales_house_name">
            <div class="box_title">
                <div class="left">同总价段热门<span>（{{sameTotalPrice.totalprice}}）</span></div>
                <div class="right"><span></span></div>
            </div>
            <div class="box_content">
                <div class="item" @click="gotoDetail(sameTotalPrice.sales_house_id)">
                    <p>成交最多</p>
                    <p>{{sameTotalPrice.sales_house_name}}</p>
                </div>
                <div class="item" @click="gotoDetail(sameTotalPrice.hprice_house_id)">
                    <p>单价最高</p>
                    <p>{{sameTotalPrice.hprice_house_name}}</p>
                </div>
                <div class="item" @click="gotoDetail(sameTotalPrice.lprice_house_id)">
                    <p>单价最低</p>
                    <p>{{sameTotalPrice.lprice_house_name}}</p>
                </div>
            </div>
        </div>
        <div class="same_box box" v-if="plateInfo.sales_house_name">
            <div class="box_title">
                <div class="left">同街道热门</div>
                <div class="right"><p>{{plateInfo.plateName}}板块</p></div>
            </div>
            <div class="box_content">
                <div class="item" @click="gotoDetail(sameTotalPrice.sales_house_id)">
                    <p>成交最多</p>
                    <p>{{samePlate.sales_house_name}}</p>
                </div>
                <div class="item" @click="gotoDetail(sameTotalPrice.hprice_house_id)">
                    <p>单价最高</p>
                    <p>{{samePlate.hprice_house_name}}</p>
                </div>
                <div class="item" @click="gotoDetail(sameTotalPrice.lprice_house_id)">
                    <p>单价最低</p>
                    <p>{{samePlate.lprice_house_name}}</p>
                </div>
            </div>
        </div>
    </div>
		
</template>
<script>
import {getHouseTotalpriceRecommend,getHousePlateRecommend,getHouseDetailHead} from '../../api/house_second.js'
import { Loading, Toast } from 'vux'

export default {
	  	name: 'house_same',
	  	data () {
	  	  	return {
                sameTotalPrice: {},
                samePlate: {}
	  	  	}
	  	},
        props: {
            plateInfo: {
                plateId: null,
                plateName: null
            }
        },
	  	created() {
            this.getHouseInfo();    
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getHouseInfo'
        },
	  	methods: {
            getHouseInfo() {
                let params = {
                    cityId: this.$route.query.cityId,
                    houseId: this.$route.query.houseId
                }
                getHouseTotalpriceRecommend(params).then(res => {
                    this.sameTotalPrice = res.data;
                }).catch(err => {
                    console.log(err)
                });
                getHousePlateRecommend(params).then(res => {
                    this.samePlate = res.data;
                }).catch(err => {
                    console.log(err)
                });
            },
            gotoDetail(houseId) {
                this.$vux.loading.show({
                    text: '拼命加载中'
                });
                let params = {
                    cityId: this.$route.query.cityId,
                    houseId: houseId
                }
                getHouseDetailHead(params).then(res => {
                    this.$vux.loading.hide()
                    if(res.data.is_first == '2') {
                        this.$router.push({path: '/house_second',query:{cityId: this.$route.query.cityId,houseId:houseId}});
                    }else {
                        this.$router.push({path: '/house_new',query:{cityId: this.$route.query.cityId,houseId:houseId}});
                    }
                }).catch(err => {
                    this.$vux.loading.hide()
                    this.$vux.toast.show({
                        type: 'text',
                        text: '服务正忙，请稍后重试~',
                        width: '15em'
                    })
                    console.log(err)
                });
            }
	  	}
	}
</script>
<style lang="less" scoped>
@import (reference) "../../common/common.less";
.house_same {
	.same_box {
		.box_content {
			padding: .2rem .15rem;
            display: flex;
            flex-direction: row;
            align-items: center;
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
			.item:nth-of-type(3){
				margin-right: 0;
				border: 1px @green solid;
				p:nth-of-type(1) {
					background: @green;
				}
			}
		}
	}
}
</style>