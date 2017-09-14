<template>
    <div class="line_charts" v-if="showCharts">
		<div class="charts_box" id="lineCharts"></div>
		<div class="charts_data">
			<div class="left-block">
				<div class="row-1"><span>{{houseTrendData.compareInfo.currentBargainPrice | number_show}}</span>元/<span class="percent">㎡</span></div>
				<div class="row-2">{{houseTrendData.dateList[lastPriceIndex]}}预测成交均价
					 <img src="../../assets/img/gray_up.png" v-if="houseTrendData.compareInfo.currentBargainCompare>=0">
					<img src="../../assets/img/gray_down.png" v-if="houseTrendData.compareInfo.currentBargainCompare<0">{{houseTrendData.compareInfo.absBargainCompare}}%
				</div>
			</div>
			<div class="right-block">
				<div class="row-1"><span>{{houseTrendData.compareInfo.currentQuotePrice | number_show}}</span>元/<span class="percent">㎡</span></div>
				<div class="row-2">{{houseTrendData.dateList[quotelastPriceIndex]}}挂牌均价
					 <img src="../../assets/img/gray_up.png" v-if="houseTrendData.compareInfo.currentQuoteCompare>=0">
					<img src="../../assets/img/gray_down.png" v-if="houseTrendData.compareInfo.currentQuoteCompare<0">{{houseTrendData.compareInfo.absQuoteCompare}}%
				</div>
			</div>
		</div>
    </div>
</template>
<script>
	import { getHouseTrend2Info } from '../../api/house_second.js'
    var Highcharts = require('highcharts');
    require('highcharts/modules/exporting')(Highcharts);

	export default {
	  	name: 'line_charts',
	  	data () {
	  	  	return {
				houseTrendData: {
					compareInfo: {},
					dateList: []
				},
				lastPriceIndex: 0,
				quotelastPriceIndex: 0,
				showCharts: true
	  	  	}
		},
	  	created() {
			this.getLineCharts();
		},
		watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getLineCharts'
        },
	  	methods: {
			getLineCharts() {
				let params = {
                    cityID: this.$route.query.cityId,
                    houseID: this.$route.query.houseId
				}
				let that = this;
                getHouseTrend2Info(params).then(response => {
                    if(response.data.resultCode==0) {
						let res = response.data.body;
						if(res.date.length==0) {
							that.showCharts = false;
							return;
						}
						if(res.date.length>0||res.bargain.length>0||res.quote.length>0) {
							let i = 0,j = 0;
							res.bargain.list.forEach((item,key)=>{
								if(item == null) {
									i++;
								}
							})
							res.quote.list.forEach((item,key)=>{
								if(item == null) {
									j++;
								}
							})
							if(i==6&&j==6) {
								that.showCharts = false;
							}
						}
						if(res.date.length>0||res.bargain.length>0||res.quote.length>0) {
							res.dateList =[];
							res.compareInfo = {};
							for(let i=0;i<res.date.length;i++) {
								res.dateList.push(res.date[i].substr(res.date[i].indexOf('-')+1))
							}
							// 成交
							let lastPriceIndex = 0;
							let prePriceIndex = 0;
							// 先找最近的有数据的月份
							for(let i=0;i<res.bargain.list.length;i++) {
								if(res.bargain.list[res.bargain.list.length-i-1] != null) {
									lastPriceIndex = res.bargain.list.length-i-1;
									break;
								}
							}
							// 再找上个月份有数据的月份
							for(let i=0;i<res.bargain.list.length;i++) {
								if(res.bargain.list[res.bargain.list.length-i-1] != null) {
									prePriceIndex = res.bargain.list.length-i-1;
									if(prePriceIndex>=lastPriceIndex) {
										continue;
									}else {
										break;
									}
								}
							}
							that.lastPriceIndex = lastPriceIndex;
							res.compareInfo.currentBargainPrice = res.bargain.list[lastPriceIndex];
							let newBargainPrice = res.bargain.list[prePriceIndex];
							if(newBargainPrice==0) {
								res.compareInfo.currentBargainCompare = 0;
							}else {
								res.compareInfo.currentBargainCompare = (((res.bargain.list[lastPriceIndex]-newBargainPrice)/newBargainPrice)*100).toFixed(0);
							};

							// 挂牌
							let quotelastPriceIndex = 0;
							let quoteprePriceIndex = 0;
							// 先找最近的有数据的月份
							for(let i=0;i<res.quote.list.length;i++) {
								if(res.quote.list[res.quote.list.length-i-1] != null) {
									quotelastPriceIndex = res.quote.list.length-i-1;
									break;
								}
							}
							// 再找上个月份有数据的月份
							for(let i=0;i<res.quote.list.length;i++) {
								if(res.quote.list[res.quote.list.length-i-1] != null) {
									quoteprePriceIndex = res.quote.list.length-i-1;
									if(quoteprePriceIndex>=quotelastPriceIndex) {
										continue;
									}else {
										break;
									}
								}
							}

							that.quotelastPriceIndex = quotelastPriceIndex;
							res.compareInfo.currentQuotePrice = res.quote.list[quotelastPriceIndex];
							let newQuotePrice = res.quote.list[quoteprePriceIndex];
							if(newQuotePrice==0) {
								res.compareInfo.currentQuoteCompare = 0;
							}else {
								res.compareInfo.currentQuoteCompare = (((res.quote.list[quotelastPriceIndex]-newQuotePrice)/newQuotePrice)*100).toFixed(0);
							};
							if(res.compareInfo.currentBargainCompare == 'NaN') {
								res.compareInfo.currentBargainCompare = 0;
							}
							if(res.compareInfo.currentQuoteCompare ==  'NaN') {
								res.compareInfo.currentQuoteCompare = 0;
							}
							res.compareInfo.absBargainCompare = Math.abs(res.compareInfo.currentBargainCompare)
							res.compareInfo.absQuoteCompare = Math.abs(res.compareInfo.currentQuoteCompare)
							that.houseTrendData = res;
							that.renderChart(res)
						}
					}else {
						this.showCharts = false;
					}
                }).catch(err => {
					this.showCharts = false;
                    console.log(err)
                });
			},
            renderChart(option) {
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
								color: '#8e8e8e'
							}
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
								color: '#8e8e8e'
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
								color: '#8e8e8e'
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
						data: option.quote.list
					},{
						name: '成交均价',
						description: '成交',
						type: 'spline',
						zIndex: 2,
						color: '#fc5055',
						connectNulls: true,
						data: option.bargain.list

					}]
				}
				Highcharts.chart('lineCharts', params);
			}
	  	}
	}
</script>
<style lang="less" scoped>
@import (reference) "~/assets/common/common.less";
.line_charts {
    width: 100%;
	.charts_box {
		width: 100%;
		height: 2.2rem;
	}
	.charts_data {
		padding: .15rem 0;
		margin: 0 .15rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		border-top: 1px @line_gray solid;
		.left-block {
			width: 49%;
			text-align: center;
			border-right: 1px @line_gray solid;
		}
		.row-1 {
			font-size: .12rem;
			color: #fd5056;
			span {
				font-size: .25rem;
			}
			img {
				height: .12rem;
				vertical-align: -0.009rem;
			}
			.percent {
				font-size: .14rem;
			}
		}
		.row-2 {
			font-size: .14rem;
			color: @color_gray;
			span {
				font-size: .14rem;
			}
			img {
				height: .10rem;
				vertical-align: -0.009rem;
				margin: 0 .02rem;
			}
			.percent {
				font-size: .15rem;
			}
			.house_type {
				border: 1px white solid;
				border-radius: 10px;
				text-align: center;
				margin-left: .05rem;
				padding: 0 0.07rem;
				font-size: .12rem;
			}
		}
		.right-block {
			width: 49%;
			text-align: center;
		}
	}
}
</style>
