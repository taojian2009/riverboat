import React from 'react';
import ReactEcharts from 'echarts-for-react';

class BarChart extends React.PureComponent {

    getOption = (chartData, dateType) => {

        const option = {
            color: ["#3276f6"],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: -10,
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: chartData.map(item => item.title),
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    },
                    axisLabel: {
                        rotate: 30
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {       //y轴
                        show: false

                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    show: false
                }

            ],
            series: [
                {
                    name: '收入',
                    type: 'bar',
                    barWidth: "50%",
                    data: chartData.map(item => Math.round(item.amount)),
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: 'black'
                            }
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            barBorderRadius: 7
                        },
                        normal: {
                            barBorderRadius: 7,
                            // color: new echarts.graphic.LinearGradient(
                            //     0, 0, 1, 1,
                            //     [
                            //         {offset: 0, color: '#37BBF8'},
                            //         {offset: 1, color: '#3977E6'},
                            //
                            //     ]
                            // )
                        }
                    }
                }
            ]
        };
        return option
    }

    render() {
        const {chartData, dateType} = this.props
        if (chartData.length === 0) {

        }

        return (<ReactEcharts option={this.getOption(chartData, dateType)}/>)
    }
}

export default BarChart;