<template>
	<div class="bargainDailog">
		<div class="Dr2Layer" style="position: fixed;" @click="closeDialog"></div>
		<div class="real-house-dialog">
		    <div class="Dr2Cancel-quotation"  @click="closeDialog"></div>
		    <div class="quotation-message quotation-title">{{bargainInfo.house_name}}
		    </div>
		    <div class="quotation-title" style="letter-spacing: -0.05rem;">
		        <span style="width: 100%;line-height: .3rem;"><b><span>{{bargainInfo.house_name}}</span> <span v-show="bargainInfo.rooms">{{bargainInfo.rooms}}室</span> <span v-show="bargainInfo.bargain_area">{{bargainInfo.bargain_area}}平</span></b></span>
		    </div>

		    <div class="quotation-container">
		        <div class="quotation-price" style="border-bottom: 1px solid #d7d7d7;">
		            <div>
		                <p ><span v-show="bargainInfo.totalprice">{{bargainInfo.totalprice}}</span>万</p>
		                <p class="desc">签约价格</p>
		            </div>
		            <div>
		                <p v-if="bargainInfo.estate_price > 0">
		                    <span>{{bargainInfo.estate_price}}</span>万
		                </p>
		                <p v-if="bargainInfo.estate_price == 0">
		                    <span>--</span>
		                </p>
		                <p class="desc">当月行情价</p>
		            </div>
		            <div>
		                <p v-if="bargainInfo.estate_price > 0" >
		                    <span v-if="bargainInfo.price_rise=='溢价率'">{{((bargainInfo.totalprice-bargainInfo.estate_price)*100/bargainInfo.estate_price) | number}}</span>
		                    <span v-if="bargainInfo.price_rise=='做低比率'">{{((bargainInfo.estate_price-bargainInfo.totalprice)*100/bargainInfo.estate_price) | number}}</span>
		                    <span v-if="bargainInfo.price_rise=='做高比率'">{{((bargainInfo.totalprice-bargainInfo.estate_price)*100/bargainInfo.estate_price) | number}}</span>%
		                </p>
		                <p v-if="bargainInfo.estate_price == 0">
		                    <span>--</span>
		                </p>
		                <p class="desc">{{ bargainInfo.price_rise }}</p>
		            </div>
		        </div>
		        <div style="float: right;margin-top: .05rem;margin-right: .1rem;font-size: .14rem;">楼栋号: <span>{{bargainInfo.building_no}}号</span></div>
		        <div class="border-bottom">楼层: <span>{{bargainInfo.floorText}}</span></div>
		        <div class="border-bottom">成交日期: <span>{{bargainInfo.bargain_date}}</span></div>
		        <div class="quotation-gap"></div>
		        <div class="quotation-container-title"><b>本小区同房型近六月</b></div>
		        <div class="chengjiao-box">
		            <div style="margin-left: -3%;">
		                <p style="width: 60%;display: inline-block;text-align: right;">本楼栋成交 </p>
		                <p style="width: 30%;display: inline-block;" class="bold-red">第 <span>{{bargainInfo.building_no_number}}</span> 套</p>
		                <br>
		                <p style="width: 57%;display: inline-block;text-align: right;">单价排名 </p>
		                <p style="width: 30%;display: inline-block;" class="bold-red">第 <span>{{bargainInfo.building_no_price}}</span> 名</p>
		            </div>
		            <div style="margin-left: -5%;">
		                <p style="width: 60%;display: inline-block;text-align: right;">本小区成交 </p>
		                <p style="width: 30%;display: inline-block;" class="bold-red">第 <span>{{bargainInfo.rooms_number}}</span> 套</p>
		                <br>
		                <p style="width: 57%;display: inline-block;text-align: right;">单价排名 </p>
		                <p style="width: 30%;display: inline-block;" class="bold-red">第 <span>{{bargainInfo.rooms_price}}</span> 名</p>
		            </div>
		        </div>
		        <div class="quotation-gap"></div>
		        <div v-show="bargainInfo.superior_name && bargainInfo.phone">
		            <div class="quotation-container-title"><b>成交机构</b></div>
		            <div style="float: right;margin-top: .05rem;margin-right: .1rem;font-size: .14rem;">经纪人: <span>{{bargainInfo.superior_name}}</span></div>
		            <div class="border-bottom">
		                <img src='../img/icon-agent-row.png' style="height: .1rem;"/>
		                <span>{{bargainInfo.agent_name}}</span>
		            </div>
		            <div class="border-bottom">该机构三月成交本小区: <span class="bold-red"> <span>{{bargainInfo.three_salescount}}</span> 套</span></div>
		            <div class="border-bottom">在本小区成交机构排名: <span class="bold-red">第 <span>{{bargainInfo.threerank}}</span> 名</span></div>

		            <div class="quotation-gap"></div>
		             <div style="padding: .1rem;text-align: center;background:#FD5056;color: #fff;font-size:.13rem;" @click="callPhone(bargainInfo.phone)">核价电话</div> 
		        </div>
		    </div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
	export default {
	  	name: 'bargainDailog',
	  	props: ['bargainParams'],
	  	data () {
	  	  	return {
	  	  		bargainInfo: {},
	  	  		showAttention: true
	  	  	}
	  	},
	  	created() {
				this.getData();
	  	},
	  	methods: {
				closeDialog(){
					this.$emit('closebargindailog'/* , this.somedata */)
				},
				getData(){
					// 获取在售房源
					axios.get('house/getBargainDetailInfo',{
							params: {
							cityId: 605,
							bargainId: this.bargainParams.bargainId,
							sourcetype: this.bargainParams.sourcetype
							}
					})
					.then(res =>{
							this.bargainInfo = res.data;
					})
					.catch(err => {
						console.log(err)
					});
				}
	  	}
	}
</script>
<style lang="less" scoped>
.bargainDailog {
	font-size: .16rem;
	.Dr2Layer{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 110;
		background: rgba(0,0,0,.4);
	}
	.quotation-container {
		font-size: .16rem;
	}
	
	.real-house-dialog{
	  color: #222;
	  z-index: 111;
	  transform: translateY(-50%);
	  margin: 0 auto;
	  background-color: white;
	  width: 2.389rem;
	  top: 50%;
	  position: fixed;
	  left: e('calc(50% - 1.11945rem)');

	  .Dr2Cancel-quotation{

	    position: absolute;
	    bottom: -.4rem;
	    left: e('calc(50% - .128rem)');
	    background-size: cover;
	    height: 0.256rem;
	    width: 0.256rem;
	    background-image: url("../img/Dr2Cancel.png");
	  }
	  .quotation-message{
	    font-size: 0.18rem;
	    background-color: #FD5056;
	    color: white;
	  }
	  .quotation-title{
	    text-align: center;
	    white-space: nowrap;
	    overflow: hidden;
	    height: 0.395rem;
	    line-height: 0.38rem;
	  }
	  .quotation-title .active{
	    border-bottom: 2px solid #FD5056;
	  }
	  .quotation-title span{
	    letter-spacing: normal;
	    font-size: 0.16rem;
	    width: 50%;
	    text-align: center;
	    border-bottom: 2px solid #e3e3e3;
	  }
	  .quotation-gap{
	    background-color: #F0F0F0;
	    height: 0.043rem;

	  }
	  .quotation-price{
	    padding: 0.09rem 0rem;
	    text-align: center;
	    white-space: nowrap;
	    width: 100%;
	    line-height: normal;

	    p{
	      color : #FD5056;

	      &.desc{
	        color : #222;
	        font-size: .12rem;
	      }

	      span{
	        color : #FD5056;
	        font-size: 0.1536rem;
	        font-weight: bold;
	      }
	    }

	  }
	  .quotation-price>div{
	    display: inline-block;
	    width: 32%;
	    max-width: 33%;
	    box-sizing: border-box;
	    border-right: 1px solid #d7d7d7;
	  }
	  .quotation-price div:nth-child(4){
	    clear: both;
	  }
	  .quotation-price div:nth-child(3){
	    border-right: none;
	  }
	  .quotation-container-title{
	    color: black;
	    height: 0.29rem;
	    line-height: 0.29rem;
	    border-bottom: 1px solid #e3e3e3;
	    text-align: center;
	  }


	  .chengjiao-box{
	    padding: 0.119rem 0rem;
	    text-align: center;
	    white-space: nowrap;
	    width: 100%;
	    line-height: normal;
	    font-size:.11rem;
	  }
	  .chengjiao-box div p:nth-child(1) span{
	    font-size: 0.1536rem;
	    font-weight: bold;
	  }
	  .chengjiao-box>div{
	    display: inline-block;
	    width: 49%;
	    max-width: 49%;
	    border-right: 1px solid #d7d7d7;
	  }
	  .chengjiao-box div:nth-child(3){
	    clear: both;
	  }
	  .chengjiao-box div:nth-child(2){
	    border-right: none;
	  }

	  .border-bottom{
	    padding: .05rem .1rem;
	    border-bottom: 1px solid #d7d7d7;
	    font-size: .14rem;
	  }
	  .bold-red{
	    font-weight: bold;
	    color:#FD5056;
	  }
	}
}
</style>