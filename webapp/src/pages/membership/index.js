import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col, message} from 'antd';
import Orders from './orders';
import SendForm from './orders/components/SendForm';
import axios from 'axios';


class Order extends React.Component {

    state = {
        orders: []
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
            orders: [order, ...this.state.orders]
        })
    }


    render() {
        const {orders} = this.state;
        return (
            <Row>
                <Col span={7}>
                    <SendForm
                        addOrder={this.addOrder}
                    /></Col>
                <Col span={17}>
                    <Orders
                        data={orders}
                    /></Col>
            </Row>
        )
    }
}

export default Order;