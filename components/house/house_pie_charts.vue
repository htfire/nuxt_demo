<template>
    <div class="pie_charts" v-if="showPieCharts">
		<div class="charts_box" id="pieCharts"></div>
    </div>
</template>
<script>
    import { getHouseBargainsByRoomInfo } from '../../api/house_second.js'
    var Highcharts = require('highcharts');
    require('highcharts/modules/exporting')(Highcharts);
    
	export default {
	  	name: 'pie_charts',
	  	data () {
	  	  	return {
                showPieCharts: true
	  	  	}
		},
	  	created() {
            this.getChartsData();
            Highcharts.getOptions().plotOptions.pie.colors = (function () {
                var colors = [],
                base = Highcharts.getOptions().colors[8],
                i;
                for (i = 0; i < 10; i += 1) {
                // Start out with a darkened base color (negative brighten), and end
                // up with a much brighter color
                colors.push(Highcharts.Color(base).brighten((i  ) / 9).get());
                }
                return colors;
            }());
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getChartsData'
        },
		mounted() {
			
		},
	  	methods: {
			getChartsData() {
                let params = {
                    city_id: this.$route.query.cityId,
                    house_id: this.$route.query.houseId
                }
                let that = this;
                getHouseBargainsByRoomInfo(params).then(response => {
                    if(response.data.resultCode==0) {
                        var totalCount = 0;
                        response.data.body.forEach((item,key)=> {
                            totalCount = totalCount + item.count;
                        });
                        response.data.body.forEach((item,key)=> {
                            item.y = item.count/totalCount;
                        });
                        if(response.data.body.length==0) {
                            this.showPieCharts = false;
                            return;
                        }
                        that.renderChart(response.data.body)
					}
                }).catch(err => {
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
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        reflow: true,
                    },
                    credits: {
                        enabled: false //不显示LOGO
                    },
                    exporting: {
                        enabled: false
                    },
                    title: {
                        floating:false,
                        style: { "color": "#333333", "fontSize": "14px" },
                        text: '近六个月',
                        verticalAlign: "middle"
                    },
                    tooltip: {
                        enabled: false,
                        pointFormat: '<span>{point.rooms}房{point.bargainCount}套</span>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                            distance:15,
                            showInLegend: true,
                            enabled: true,
                            format: '<span>{point.rooms}房{point.count}套</span>',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#333333'
                            }
                            },
                            minSize:140
                        }
                    },
                    series: [{
                        type: 'pie',
                        innerSize: '56%',
                        data:option,
                        style:{color:"#474747",fontSize:"14px"}
                    }]
                };
                Highcharts.chart('pieCharts', params)
            }
        }
    }
</script>
<style lang="less" scoped>
@import (reference) "../../common/common.less";
.pie_charts {
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