import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col, message, Layout, Card, Descriptions} from 'antd';
import SendForm from './orders/components/SendFormV2';
import axios from 'axios';
import AuthCode from "./AuthCode";
import Orders from "./orders";

const {Header, Content, Footer, Sider} = Layout;

class Order extends React.Component {

    state = {
        orders: [],
        order: null
    }


    componentDidMount = () => {
        axios.get('/api/v1/orders')
            .then(res => {
                if (res.status === 200) {
                    const {data} = res.data;
                    this.setState({
                        orders: data
                    })
                }
            }).catch(error => {
            message.error(error.message)
        })
    }

    addOrder = (order) => {
        this.setState({
            orders: [order, ...this.state.orders],
            order: order
        })
    }


    render() {
        const {orders, order} = this.state;
        const link = order === null ? null : `http://${window.location.host}/order/${order.order_id}`
        return (

            <Layout>
                <SendForm
                    addOrder={this.addOrder}
                />
                <br/>

                {order && <Card>

                    <div style={{wordWrap: 'break-word'}}>
                        账号信息： <br/>
                        <a href={link}>{link}</a>
                        <br/>

                        亲，打开此链接即可查看账号密码， <br/>
                        温馨提示，第一次打开有点慢 ，请耐心等待哦！ <br/>
                        若密码错误，重新打开链接查看新密码。<br/>
                        若需要验证码，点击获取验证码的按钮即可获取哦！<br/>
                        请不要修改账号信息，自己记录一下学习进度哦，谢谢！<br/>
                        学习愉快！
                    </div>
                    <br/>


                </Card>}

                <Card style={{width: '100%'}}>
                    <Orders
                        data={orders}
                    />
                </Card>


            </Layout>


        )
    }
}

export default Order;