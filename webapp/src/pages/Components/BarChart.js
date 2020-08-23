import React from 'react';
import ReactEcharts from 'echarts-for-react';

// render echarts option.


class BarChart extends React.PureComponent {

    getOption = (chartData) => {
        const option = {
            color: ['#3276f6'],
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
                        alignWithLabel: true
                    },
                    axisLabel: {
                        rotate: 30
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
                    barWidth: '60%',
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
                }
            ]
        };
        return option
    }

    render() {
        const {chartData} = this.props
        if (chartData.length === 0) {

        }

        return (<ReactEcharts option={this.getOption(chartData)}/>)
    }
}

export default BarChart;