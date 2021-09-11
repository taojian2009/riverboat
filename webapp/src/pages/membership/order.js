import React from 'react';
import {Card, message, Descriptions, Button} from 'antd';
import axios from 'axios';
import AuthCode from "./AuthCode";
import {DeviceUUID} from 'device-uuid';


class OrderDetail extends React.Component {

    state = {
        data: {},
        isEducative: false,
    }

    componentDidMount = () => {

        const {match} = this.props;
        const {order_id} = match.params

        const device = new DeviceUUID();
        const uuid = device.get();
        const du = device.parse();
        const isMobile = du.isMobile;
        const params = {
            order_id,
            uuid,
            isMobile
        }

        axios.get('/api/v1/order', {params})
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    const {data} = res.data;
                    this.setState({
                        data
                    })
                }
                if (res.status === 401) {
                    message.error("警告！您已经使用超过2个设备！")
                }
            }).catch(err => {
            if (err.response.status === 401) {
                message.error("警告！您已经使用超过2个设备, 账号密码只能自己使用，不能传给别人！")
            } else {
                message.error("获取失败，请联系淘宝旺旺客服")
            }
        })
    }


    render() {
        const {match} = this.props;
        const {order_id} = match.params
        const device = new DeviceUUID();
        const uuid = device.get();
        const {data} = this.state;
        const loading = Object.keys(data).length === 0;
        if (loading) {
            return ""
        }
        const {account, password, website, expire_date, valid_days, membership_name} = data;
        const isEducative = membership_name.indexOf("educative") !== -1
        return (
            <div>
                <Card
                    hoverable
                    style={{width: "75%", margin: "80px auto"}}
                >
                    <br/>
                    <br/>
                    <Descriptions
                        title="会员信息"
                        subtitle={website}
                        size={this.state.size}
                        column={1}
                    >
                        <Descriptions.Item label="会员">{membership_name}</Descriptions.Item>
                        <Descriptions.Item label="账号">{account}</Descriptions.Item>
                        <Descriptions.Item label="密码">{password}</Descriptions.Item>
                        <Descriptions.Item label="到期时间">{expire_date}</Descriptions.Item>
                        <Descriptions.Item label="剩余天数">{valid_days}</Descriptions.Item>
                    </Descriptions>
                    {isEducative &&
                    <AuthCode
                        order_id={order_id}
                        uuid={uuid}
                    />}

                </Card>
            </div>
        )
    }


}

export default OrderDetail;