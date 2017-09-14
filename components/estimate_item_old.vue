<template>
	<div class="estimate_content">
		<div class="estimate_item" v-for="item in estimateLists" @click="gotoEstateDetail(item)">
			<div class="left_img">
				<img :src="item.picUrl" style="width: 1rem;height:0.75rem;"/>
			</div>
			<div class="house-desc" style="line-height: 1.2;right:.13rem;">
				<div class="ft-34px c-red" style="float: right;">{{item.fourLine}}</div>
				<div class="ft-34px c-grey-dark">{{item.firstLine}}</div>

				<div class="ft-28px c-grey-new" style="float:right;">{{item.sin_price}}</div>
				<div class="ft-28px c-grey-new" style="margin-top: 3px;">{{item.secondLine}}</div>

				<div class="ft-28px c-grey-new ft-light" style="margin-top: 2px;"><img src="../assets/img/icon_c.png" style="height:.1rem;"/> {{item.pub_date}}<span v-if="item.browseNum>0"><img src="../assets/img/icon_read.png" style="height:.1rem;margin: 0 .05rem;"/>{{item.browseNum||0}}</span></div>

				<div class="ft-32px c-red" style="float: right;position: relative;"><div style="width: 0.55rem;height: .16rem;position: absolute;top: -0.16rem;right: 0;" v-if="item.estateresult!==''"><img src="../assets/img/tu_estate.png" style="width: 100%;height: 100%;"></div><strong>{{item.estateresult}}</strong></div>
				<div class="ft-28px c-grey-new" style="margin-top: 6px;"><img src="../assets/img/icon_v.png" style="height:.1rem;"/> {{item.threeLine}}</div>

			</div>
		</div>
		<div v-if="estimateLists.length==0" class="none">暂无数据~</div>
	</div>

</template>
<script>
	export default {
	  	name: 'estimate_item',
	  	props: ['estimateLists'],
	  	methods: {
			gotoEstateDetail(item){
				location.href="/angularApp2/index_share.html#/estate-detail?estate_id="+item.estate_id+"&city_id="+this.$route.query.cityId+"&from_type=house";

			}
	  	}
	}
</script>
<style lang="less" scoped>
.estimate_content {
	.estimate_item{
	    position: relative;
	    box-sizing: border-box;
	    background: white;
	    width: 100%;
	    padding: 0.15rem;
	    .ft-34px {font-size: .17rem;}
	    .ft-32px {font-size: .16rem;}
	    .ft-30px {font-size: .15rem;}
	    .ft-28px {font-size: .13rem;}
		.c-grey-new{color: #aeaeae;}
		.c-grey-dark {color:#474747;}
		.c-red {color:#fd5056;}
		.left_img {
	        display: flex;
		}
	    .house-desc{
	        position: absolute;
	        top: .15rem;
	        left: 1.25rem;
	    }

	    &:before{

	    }
	    &:after{
	        position: absolute;
	        content: ' ';
	        display: block;
	        height: 1px;
	        background: #dbdbdb;
	        box-sizing: border-box;
	        bottom: 0;
	        left: .13rem;
	        right: .13rem;
	    }
	    &:nth-last-child(1){
	        &:after{
	            display: none;
	        }
	    }
	}
	.none {
		font-size: .14rem;
		text-align: center;
	}
}
</style>
