<template>
	<div class="house_timeline">
        <div class="title">小区时光机</div>
        <div class="block-timeline">
                <table class="timeline-table">
                <tbody>
                     <tr v-if="fromtype=='newHouse'" v-for="info in message"><td class="timeline-date">{{info.time*1000|new_time}}</td><td class="timeline-dot"><div></div></td><td class="timeline-text">{{info.simple}}</td></tr>
                     <tr v-if="fromtype=='secondHouse'" v-for="info in houseTimeLineInfo"><td class="timeline-date">{{info.time*1000|new_time}}</td><td class="timeline-dot"><div></div></td><td class="timeline-text">{{info.simple}}</td></tr>
                </tbody>
            </table>
        </div>
	</div>

</template>
<script>
    import { getHouseTimeline } from '../api/house_second.js'
	export default {
	  	name: 'house_timeline',
	  	data () {
	  	  	return {
                houseTimeLineInfo: {}
	  	  	}
	  	},
        props:['message','fromtype'],
	  	created() {
            if(this.fromtype == "secondHouse"){
              this.getHouseTimeLine();
            }else {

            }

	  	},
        watch: {
            // 如果路由有变化，会再次执行该方法
            $route () {
                if(this.fromtype == "secondHouse"){
                    this.getHouseTimeLine();
                }
            }
        },
	  	methods: {
            getHouseTimeLine() {
                let params = {
                    cityId: this.$route.query.cityId,
                    houseId: this.$route.query.houseId
                }
                getHouseTimeline(params).then(res => {
                    this.houseTimeLineInfo = res.data;
                }).catch(err => {
                    console.log(err)
                });
            }
	  	}
	}
</script>
<style lang="less" scoped>
.house_timeline {
    background: white;
    margin-top: .1rem;
    .title {
        padding: 0 .15rem;
        height: .5rem;
        line-height: .5rem;
        font-size: .16rem;
        border-bottom: 1px #dbdbdb solid;
    }
    .block-timeline {padding:0.1rem 0.1532rem;}
    .timeline-table {border-collapse:collapse}
    .timeline-table td {font-size: .13rem;;color:#8e8e8e;padding:0.08rem 0; vertical-align: top}
    .timeline-table .timeline-date {vertical-align:top;}
    .timeline-table .timeline-dot {position:relative;vertical-align:top;text-align:center;min-width:0.3rem;background:url('../assets/img/house/timeline-v-line.png') center top repeat-y;}
    .timeline-table .timeline-dot div {position:relative;background:url('../assets/img/house/timeline-dot.png') center center no-repeat;top:0.03rem;height:0.12rem;width:0.11rem;margin: 0 auto; background-size:cover;}
    .timeline-table tr:first-child .timeline-dot:before {content:'\200B';position:absolute;left:0;right:0;top:0;height:0.12rem;background-color:#FFF;}
    .timeline-table tr:last-child .timeline-dot:after {content:'\200B';position:absolute;left:0;right:0;top:0.21rem;bottom:0;background-color:#FFF;}
    .timeline-table .timeline-text {}
}
</style>
