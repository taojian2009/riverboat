import React from 'react';
import {List, InputItem, NavBar, Icon, WhiteSpace, Button, Toast, Card, WingBlank} from 'antd-mobile';
import axios from 'axios';
import styles from './dashboard.less';

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
        amount: 0,
        name: "知行优学",
        catalog: "淘宝店",
        incomes: []
    }

    componentDidMount = () => {
        // send request for income list;
        this.getIncomeList()
    }

    onSubmit = () => {
        const {amount, name, catalog, incomes} = this.state;
        const data = {amount, name, catalog}
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

    getIncomeList = () => {
        axios.get('/income')
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
        const {incomes} = this.state;
        const params = {id: id}
        this.setState({
            incomes: incomes.filter(item => item.id !== id)
        })
        axios.delete('/income', {
            params: params
        }).then(res => {
            console.log("ok")
        })
            .catch(err => {
                Toast.fail(err.message)
            })
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
                    >Amount</InputItem>
                    <InputItem
                        clear
                        placeholder=""
                        value={this.state.name}
                        onChange={(name) => this.setState({name})}
                    >Name</InputItem>
                    <InputItem
                        clear
                        placeholder=""
                        value={this.state.catalog}
                        onChange={(catalog) => this.setState({catalog})}
                    >Catalog</InputItem>
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