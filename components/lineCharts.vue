<template>
	<div class="lineCharts">
		<div class="title">
			<div class="red_left"></div><span class="name">本小区行情走势和预估</span>
		</div>
		<div class="newLine" id="chart_box" style="height:2.4rem;"></div>
		<div class="current-status">
			<div class="left-block">
				<div class='row-1 red'>
					<span></span>
					<span>{{lineData.forcast.bargainPrice}}</span>元/㎡
				</div>
				<div class='row-2'>
					{{lineData.forcast.latestBargainMonth}}月成交均价
					<img src='../img/gray_up.png' v-if="lineData.forcast.bargainRate>=0">
					<img src='../img/gray_down.png' v-if="lineData.forcast.bargainRate<0">
					<span>{{lineData.forcast.bargainRate | abs_number}}</span>%
				</div>
			</div>
			<div class="middle-line"><div></div></div>
			<div class="right-block">
				<div class='row-1 red'>
					<span></span><span>{{lineData.forcast.estatePrice}}</span>元/㎡
				</div>
				<div class='row-2'>{{lineData.forcast.latestEstateMonth}}月挂牌均价
				
				<img src='../img/gray_up.png' v-if="lineData.forcast.estateRate>=0">
				<img src='../img/gray_down.png' v-if="lineData.forcast.estateRate<0">
				<span>{{lineData.forcast.estateRate | abs_number}}</span>%
				</div>
			</div>
		</div>
	</div>
</template>

<script>

var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

export default {
	name: 'lineCharts',
	props: ['lineData'],
	data () {
		return {
			
		}
	},
	mounted(){
		this.renderChart(this.lineData);
	},
	methods: {
		renderChart(option) {
			let dateList = [];
			option.date.forEach((it,key)=>{
				if(it.indexOf('未来')!==-1) {
					dateList.push('30天预测')
				}else {
					dateList.push(it.substr(it.indexOf('年')+1))
				}
				
			})
			option.dateList = dateList;
			let params = {};
			params = {
				noData: {
					style: {
						fontWeight: 'bold',
						fontSize: '15px',
						color: '#303030'
					}
				},
				credits: {
					enabled: false
				},
				exporting: {
					enabled: false
				},
				chart: {
					zoomType: 'xy',
					panning: false, //禁用放大
					pinchType: '', //禁用手势操作
					// zoomType: "",
					panKey: 'shift'
				},
				title: {
					text: ' _',
					style: {
						"color": "#fff"
					}
				},
				xAxis: [{
					labels: {
						format: '{value}',
						style: {
							color: '#8e8e8e',
							fontSize: "10px"
						},
						rotation: 0
					},
					categories: option.dateList,
					// crosshair: true,
					crosshair: {
						color: '#fc5055',
						width: 2,
					},
					gridLineColor: '#ededed',
					gridLineWidth: 1,
					gridLineDashStyle: 'ShortDash',
					tickLength: 0,
					lineWidth: 0
				}],
				yAxis: [{ // Primary yAxis
					labels: {
						format: '{value}元',
						style: {
							color: '#8e8e8e',
							fontSize: "10px"
						}
					},
					title: {
						text: '',
					},
					gridLineColor: '#ededed',
					gridLineWidth: 1,
					gridLineDashStyle: 'ShortDash',
					tickAmount: 6,
					minRange: 10,
					min: 0
				}, { // Secondary yAxis
					title: {
						text: ''
					},
					labels: {
						format: '{value}元',
						style: {
							color: '#8e8e8e',
							fontSize: "10px"
						}
					},
					gridLineColor: '#ededed',
					gridLineWidth: 1,
					gridLineDashStyle: 'ShortDash',
					opposite: true,
					tickAmount: 6,
					minRange: 10,
					min: 0
				}],
				tooltip: {
					shared: true,
					useHTML: true,
					valueDecimals: 0,
					shadow: false,
					backgroundColor: '#8e8e8e',
					borderColor: '#8e8e8e',
					padding: 2,
					style: {

						background: '#8e8e8e',
						color: '#fff',
						opacity: 1
					}
				},
				legend: {
					align: 'center',
					verticalAlign: 'top',
					floating: true,
					backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
					reversed: true,
					symbolHeight: 10,
					symbolWidth: 16,
					symbolRadius: 0,
				},
				series: [{
					name: '挂牌均价',
					description: "挂牌",
					type: 'spline',
					color: '#00ada7',
					yAxis: 1,
					connectNulls: true,
					data: option.quote.data
				},{
					name: '成交均价',
					description: '成交',
					type: 'spline',
					zIndex: 2,
					color: '#fc5055',
					connectNulls: true,
					data: option.bargain.data
					
				}]
			}
			Highcharts.chart('chart_box', params);
		} 
	}	
}
</script>

<style lang="less" scoped>
.lineCharts {
	position: relative;
	font-size: .16rem;
	background: white;
	margin-top: .1rem;
	.title {
		height: .5rem;
		padding: 0 .15rem;
		border-bottom: 1px #dbdbdb solid;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.red_left {
			height: .2rem;
			width: .04rem;
			background: #fe5157;
		}
		span {
			margin-left: .1rem;
			color: #474747;
			font-size: .16rem;
		}
		.name {
			font-weight: bold;
		}
	}
	.current-status {
	    border-top: solid 1px #dbdbdb;
	    padding: .1rem 0 .1rem 0;
	    margin: -0.1rem 0.1rem 0 0.1rem;
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    align-items: center;
	    .left-block {
	        width: 49%;
	        text-align: center;
	    }
	    .row-1 {
	        // .trem-fs(35rem);
	        // .ff-pr();
	        span {
				font-size: .30rem;
	        }
	        img {
	            height: .12rem;
	            vertical-align: -0.009rem;
	        }
	    }
	    .red {color: #fd5056;}
	    .green {color: #00ADA9;}
	    .row-2 {
	        // .trem-fs(32rem);
	        // .ff-pl();
	        color: #8e8e8e;
	        white-space:nowrap;
	        margin-top: 0.02rem;
	        img {
	            height: .10rem;
	            vertical-align: -0.009rem;
	            margin: 0 .01rem;
	        }
	        .percent {
	            // .trem-fs(30rem);
	        }
	    }
	    .right-block {
	        width: 49%;
	        text-align: center;
	    }
	    .middle-line {
	        display: block;
	        -webkit-flex:1;
	        flex: 1;
	        div {
	            width: 1px;
	            height: 0.5rem;
	            margin: 0 auto;
	            background: #dbdbdb;
	        }

	    }
	}
}
</style>
