import React from 'react';
import {List, InputItem, NavBar, Icon, WhiteSpace, Button, Toast, Picker, WingBlank, Calendar} from 'antd-mobile';
import axios from 'axios';
import styles from './dashboard.less';
import {startOfYear, startOfToday} from "../constants";
import * as Icons from "../../assets/icons/Icons";
import moment from 'moment';

const {Item} = List;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class H5NumberInputExample extends React.Component {

    state = {
        show: false,
        amount: 0,
        name: "知行优学",
        catalog: "淘宝店",
        incomes: [],
        models: [
            {label: "收入", value: "income"},
            {label: "支出", value: "outcome"},
            {label: "资产", value: "asset"},
            // {label: "负债", value: "debt"},
        ],
        model: ['income'],
        createTime: moment()
    }

    componentDidMount = () => {
        // send request for income list;
        this.getIncomeList()
    }

    onSubmit = () => {
        const {amount, name, catalog, incomes, model, createTime} = this.state;
        const data = {amount, name, catalog, model: model[0], create_time: createTime.format("YYYY-MM-DD HH:MM:SS")}
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrf_token'
        axios.post('/add_record', data)
            .then(res => {
                this.setState({
                    incomes: [
                        res.data.data,
                        ...incomes,
                    ]
                })
            })
            .catch(err => {
                Toast.fail(err.message)
            })
    }

    getIncomeList = (extra = {}) => {
        axios.get('/model', {
            params: {
                model: this.state.model[0],
                ...extra
            }
        })
            .then(res => {
                this.setState({
                    incomes: res.data.data
                })
            })
            .catch(err => {
                Toast.fail(err.message)
            })
    }

    deleteIncome = (id) => {
        const {incomes, model} = this.state;
        const params = {id: id, model: model[0]}
        this.setState({
            incomes: incomes.filter(item => item.id !== id)
        })
        axios.delete('/model', {
            params: params
        }).then(res => {
            console.log("ok")
        })
            .catch(err => {
                Toast.fail(err.message)
            })
    }

    onSelectModel = (model) => {
        this.setState({model})
        if (model[0] === "outcome") {
            this.setState({
                name: "餐饮",
                catalog: "生活",
            })
        }

        if (model[0] === "asset") {
            this.setState({
                name: "招行",
                catalog: "人民币",
            })
        }
        this.getIncomeList({model: model[0]})


    }

    onConfirm = (value) => {
        this.setState({show: false})
        const createTime = moment(value)
        this.setState({createTime})
    }


    render() {
        const {incomes} = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
                        <Icon key="1" type="ellipsis"/>,
                    ]}
                >记账</NavBar>

                <WhiteSpace size="xl"/>
                <List>
                    <InputItem
                        placeholder=""
                        clear
                        value={this.state.amount}
                        onChange={(amount) => this.setState({amount})}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >金额</InputItem>
                    <InputItem
                        clear
                        placeholder=""
                        value={this.state.name}
                        onChange={(name) => this.setState({name})}
                    >名称</InputItem>
                    <InputItem
                        clear
                        placeholder=""
                        value={this.state.catalog}
                        onChange={(catalog) => this.setState({catalog})}
                    >分类</InputItem>
                    <Picker
                        data={this.state.models}
                        title="选择季节"
                        cols={1}
                        extra="请选择(可选)"
                        value={this.state.model}
                        onChange={v => this.setState({model: v})}
                        onOk={this.onSelectModel}
                    >
                        <List.Item arrow="horizontal">账本类型</List.Item>
                    </Picker>

                    <List.Item
                        arrow="horizontal"
                        onClick={() => this.setState({show: true})}
                    >
                        日期
                        <div style={{float: 'right'}}>
                            {this.state.createTime.format("YYYY-MM-DD")}
                        </div>
                    </List.Item>
                    <Calendar
                        visible={this.state.show}
                        onConfirm={this.onConfirm}
                        onCancel={() => this.setState({show: false})}
                        minDate={new Date(startOfYear)}
                        defaultValue={new Date(startOfToday)}
                        initalMonths={24}
                        type={"one"}
                    />
                    <WhiteSpace size="xl"/>

                    <List.Item>
                        <Button type={"primary"} onClick={this.onSubmit}>保存</Button>
                    </List.Item>
                </List>

                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>

                <List>
                    {incomes && incomes.map(income => (
                        <List.Item>
                            <div>
                                <span style={{float: 'left'}}>{income.name}&nbsp; &nbsp; &nbsp;
                                    <span>

                                        <span className={styles.dateTag}>
                                                      {income.create_time} &nbsp; &nbsp; &nbsp;
                                        </span>


                                        <Icon
                                            type={"cross"}
                                            style={{
                                                position: "absolute",
                                                right: 5,
                                                top: 10
                                            }}
                                            onClick={() => {
                                                this.deleteIncome(income.id)
                                            }}
                                        />
                            </span>

                                </span>
                                <span style={{float: 'right', marginRight: 20}}>
                                    <span className={styles.amount}>+￥{income.amount} 元</span>
                                </span>
                            </div>


                        </List.Item>

                    ))}

                </List>


            </div>
        );
    }
}


export default H5NumberInputExample;