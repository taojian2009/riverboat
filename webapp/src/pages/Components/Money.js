import React from 'react';
import {List, InputItem, NavBar, Icon, WhiteSpace, Button, Toast, Card, WingBlank} from 'antd-mobile';
import axios from 'axios';

const {Item} = List;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class H5NumberInputExample extends React.Component {

    /*
        {"amount": 36.6, "name": "知行优学", "catalog": "淘宝店", "create_time": datetime.now() + timedelta(days=0)}

     */


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
        const {amount, name, catalog} = this.state;
        const data = {amount, name, catalog}
        axios.post('/add_record', data)
            .then(res => {
                this.getIncomeList()
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
        const params = {id: id}
        axios.delete('/income', {
            params: params
        }).then(res => {
                this.getIncomeList()
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
                    >Name</InputItem>
                    <InputItem
                        clear
                        placeholder=""
                        value={this.state.catalog}
                    >Catalog</InputItem>
                    <WhiteSpace size="xl"/>
                    <List.Item>
                        <Button type={"primary"} onClick={this.onSubmit}>保存</Button>
                    </List.Item>


                </List>

                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                {incomes && incomes.map(income => (

                    <Card>
                        <Card.Header
                            title={income.name}
                            extra={<span>
                                日期: {income.create_time} &nbsp; &nbsp; &nbsp;
                                <Icon
                                    type={"cross"}
                                    style={{
                                        position: "absolute",
                                        right: 5,
                                        top: 5
                                    }}
                                    onClick={() => {
                                        this.deleteIncome(income.id)
                                    }}
                                />
                            </span>}
                        />
                        <Card.Body>
                            <div>
                                <span style={{float: 'left'}}>店铺：{income.catalog}</span>
                                <span style={{float: 'right'}}>金额：￥{income.amount} 元</span>
                            </div>
                        </Card.Body>
                    </Card>
                ))}

            </div>
        );
    }
}


export default H5NumberInputExample;