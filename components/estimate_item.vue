<template>
	<div class="estimate_content" :class='{hasMinHeight: isMinHeight == true}'>
		<div class="estimate_item" v-for="item in estimateLists.data" @click="gotoEstateDetail(item)">
			<div class="left_img">
				<img :src="item.picUrl" style="width: 1rem;height:0.75rem;"/>
			</div>
			<div class="house-desc" style="line-height: 1.2;right:.13rem;">
				<div class="ft-34px c-red" style="float: right;font-size: .16rem;">{{item.totalPrice}}</div>
				<div class="ft-34px c-grey-dark" style="font-size: .15rem;">{{item.houseName}}</div>

				<div class="ft-28px c-grey-new" style="position: absolute;top: .22rem;right: 0;font-size: .13rem;">{{item.sinPrice}}元/㎡</div>
				<div class="ft-28px c-grey-dark" style="margin-top: 3px;font-size: .13rem;">{{item.firstLine}}</div>
				<!-- <div class="ft-28px c-grey-new" style="float:right;">{{item.sinPrice}}</div> -->
				<div class="ft-28px c-grey-new ft-light" style="margin-top: .1rem;"><img src="../img/icon_c.png" style="height:.1rem;"/> {{item.firstPubDate}}<span v-if="item.browseNum>0"><img src="../img/icon_read.png" style="height:.1rem;margin: 0 .05rem;"/>{{item.browseNum||0}}</span></div>

				<div class="ft-32px c-red" style="float: right;position: relative;"><div style="width: 0.55rem;height: .16rem;position: absolute;top: -0.16rem;right: 0;" v-if="item.estateResult!==''"><img src="../img/tu_estate.png" style="width: 100%;height: 100%;"></div><strong>{{item.estateResult}}</strong></div>
				<div class="ft-28px c-grey-new" style="margin-top: 3px;"><img src="../img/icon_v.png" style="height:.1rem;"/> {{item.threeLine}}</div>

			</div>
		</div>
		<!-- <div v-if="estimateLists.data.length>=estimateLists.totalNum" class="none">已经没有了~</div> -->
	</div>
		
</template>
<script>
	export default {
	  	name: 'estimate_item',
	  	props: ['estimateLists','cityId'],
	  	data () {
	  	  	return {
	  	  		isMinHeight: true
	  	  	}
	  	},
	  	created() {
	  		console.log(this.$route.query.estateID)
	  		if(this.$route.query.estateID!=undefined) {
	  			this.isMinHeight = false;
	  		}
	  	},
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
				location.href="/angularApp2/index_share.html#/estate-detail?estate_id="+item.estateId+"&city_id="+this.cityId+"&from_type=m_house_list&chanelName="+chanelName;
			}
	  	}
	}
</script>
<style lang="less" scoped>
.estimate_content {
	&.hasMinHeight {
		min-height: 55vh;
	}
	.estimate_item{
	    position: relative;
	    box-sizing: border-box;
	    background: white;
	    width: 100%;
	    padding: 0.15rem;
	    .ft-34px {font-size: .17rem;}
	    .ft-32px {font-size: .15rem;}
	    .ft-30px {font-size: .15rem;}
	    .ft-28px {font-size: .12rem;}
		.c-grey-new{color: #aeaeae;}
		.c-grey-dark {color:#474747;}
		.c-red {color:#fd5056;}
		.left_img {
	        display: flex;
		}
	    .house-desc{
	        position: absolute;
	        top: .1rem;
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
		height: .5rem;
		line-height: .5rem;
		font-size: .14rem;
		text-align: center;
	}
}
</style>