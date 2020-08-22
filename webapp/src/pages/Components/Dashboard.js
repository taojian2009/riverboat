import React from 'react';
import {Icon, List, NavBar, WhiteSpace, Tag, Flex, Button} from "antd-mobile";
import {Tabs, Badge} from 'antd-mobile';
import {Card, WingBlank} from 'antd-mobile';
import {current, dateTypes} from "../constants";
import axios from 'axios';
import * as Icons from '../../assets/icons/Icons.js'
import styles from './dashboard.less';
import moment from 'moment';


// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css


class Dashboard extends React.PureComponent {


    state = {
        income: 0,
        outcome: 0,
        asset: 0,
        catalogs: ["全部", "淘宝店", "流利说", "微信"],
        catalog: "淘宝店",
        dateType: "day",
        startTime: dateTypes[0].startTime,
        endTime: dateTypes[1].endTime,
        cardData: {
            change: "120",
            changeRate: "+45%",
            items: [
                {title: "今日收入", amount: 1000},
                {title: "昨日收入", amount: 1000},
            ]
        }
    }

    componentDidMount() {
        this.fetch_data();
        this.getCardData({})
    }

    fetch_data = () => {
        axios.get('/summary', {}).then(res => {
            this.setState({
                ...res.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }

    onSelectTag = (catalog) => {
        this.setState({catalog})
        // todo send request to filter data
        this.getCardData({catalog})
    }

    onSelectDateType = (dateType) => {
        this.setState({dateType})
        // todo send request to filter data
        const dateRange = dateTypes.filter(d => d.key === dateType)[0]
        const params = {
            dateType: dateType,
            startTime: dateRange.startTime,
            endTime: dateRange.endTime,
        }
        console.log(params)
        this.setState({
            ...params
        })
        this.getCardData(params)
    }

    getCardData = (extra) => {
        const {startTime, endTime, catalog, dateType} = this.state;

        const params = {
            startTime, endTime, catalog, dateType,
            ...extra
        }
        const dateObj = dateTypes.filter(d => d.key === params.dateType)[0]
        const titles = dateObj.titles
        axios.get('/card_data', {params: params})
            .then(res => {
                const {items} = res.data.data
                const currentValue = items[0].amount.toFixed(2);
                const lastValue = items[1].amount.toFixed(2);
                const change = currentValue - lastValue
                const changeRate = (change / lastValue * 100).toFixed(2) + "%";

                const cardData = {
                    change: change.toFixed(2),
                    changeRate: changeRate,
                    items: [
                        {title: titles[0], amount: currentValue},
                        {title: titles[1], amount: lastValue},
                    ]
                }
                this.setState({
                    cardData
                })
            })
    }


    render() {
        const {
            catalogs,
            catalog,
            dateType,
            startTime,
            endTime,
            cardData
        } = this.state;

        return (
            <div className={styles.page}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>收入分析</div>
                    <div className={styles.tagContainer}>
                        {
                            catalogs.map((tag) => (
                                <Button
                                    type={tag === catalog ? "default" : "primary"}
                                    onClick={() => this.onSelectTag(tag)}
                                >
                                    {tag}
                                </Button>
                            ))
                        }
                    </div>
                    <div className={styles.dateContainer}>
                        {
                            dateTypes.map(({name, key, startTime, endTime}) => (
                                <Button
                                    type={key === dateType ? "default" : "primary"}
                                    onClick={() => this.onSelectDateType(key)}
                                >{name}</Button>
                            ))
                        }
                        <div className={styles.calendar}>
                            <div className={styles.left}>
                                <span>{moment(startTime).format("MM/DD")}</span>
                                <span>~</span>
                                <span>{moment(endTime).format("MM/DD")}</span>
                            </div>
                            <div className={styles.right}><Icons.Calendar/></div>
                        </div>
                    </div>
                </div>
                <Card className={styles.contentCard}>
                    <div className={styles.headerLine}>
                        <span>{moment().format('YYYY-MM-DD')}</span>
                        <span className={styles.tag}>￥{cardData.change}&nbsp;&nbsp;{cardData.changeRate}</span>
                    </div>
                    <div>
                        <Flex>

                            {cardData.items && cardData.items.map(({title, amount}) => (
                                <Flex.Item>
                                    <span className={styles.cardTitle}>{title}</span><br/>
                                    <span className={styles.cardAmount}>￥{amount}</span><br/>
                                </Flex.Item>

                            ))}
                        </Flex>
                    </div>

                </Card>


                {/*<WingBlank size="lg">*/}
                {/*    <WhiteSpace size="lg"/>*/}
                {/*    <Card>*/}
                {/*        <Card.Header*/}
                {/*            title="收入总计"*/}
                {/*            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"*/}
                {/*            extra={<span>日期: </span>}*/}
                {/*        />*/}
                {/*        <Card.Body>*/}
                {/*            <div>收入：￥{this.state.income} 元</div>*/}
                {/*            <div>支出：￥{this.state.outcome} 元</div>*/}
                {/*            <div>资产：￥{this.state.asset} 元</div>*/}
                {/*        </Card.Body>*/}
                {/*    </Card>*/}
                {/*    <WhiteSpace size="lg"/>*/}
                {/*</WingBlank>*/}
            </div>

        )
    }
}

export default Dashboard;