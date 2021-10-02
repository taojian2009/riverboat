import React from 'react';
import {Card, message, Descriptions, Space, Row, Col, Layout, Modal} from 'antd';
import axios from 'axios';
import AuthCode, {ClipContent} from "./AuthCode";
import {DeviceUUID} from 'device-uuid';

const {Header, Content, Footer, Sider} = Layout;

const {Meta} = Card;

const products = [
    {
        key: 2,
        image: "https://img.alicdn.com/imgextra/i4/3337787984/O1CN01zp4nBY28qirtlqF3c_!!3337787984.png",
        url: "https://item.taobao.com/item.htm?id=644511410019",
        title: "Educative",
        website: "https://www.educative.io",
        good_id: "644511410019"
    },
    {
        key: 1,
        image: "https://gd1.alicdn.com/imgextra/i2/3337787984/O1CN01ziNzNS28qimdmhx1s_!!3337787984.png",
        url: "https://item.taobao.com/item.htm?id=645143702925",
        title: "DataCamp",
        website: "https://www.datacamp.com",
        good_id: "645143702925"
    },

    {
        key: 3,
        image: "https://gd2.alicdn.com/imgextra/i1/3337787984/O1CN017CjzL628qimQA2rsc_!!3337787984.png",
        url: "https://item.taobao.com/item.htm?id=644338300313",
        title: "Dataquest",
        website: "https://www.dataquest.io",
        good_id: "644338300313"
    },

    {
        key: 5,
        image: "https://img.alicdn.com/imgextra/i1/3337787984/O1CN01j6GPQv28qirweiMoO_!!3337787984.png",
        url: "https://item.taobao.com/item.htm?id=644900506857",
        title: "Canva",
        website: "https://www.codecademy.com",
        good_id: "644900506857"
    },
    {
        key: 4,
        image: "https://gd2.alicdn.com/imgextra/i4/3522706591/O1CN01h4Ju2x1yYiwsYCH9F_!!3522706591.png",
        url: "https://item.taobao.com/item.htm?id=620922901078",
        title: "Codecademy",
        website: "https://www.codecademy.com",
        good_id: "620922901078"
    },
    {
        key: 6,
        image: "https://si.geilicdn.com/bj-pc-318097702-1503020289485-328205151_659_494.jpg.webp",
        url: "https://weidian.com/item.html?itemID=2150585586",
        title: "Grammarly",
        website: "https://www.grammarly.com",
        good_id: "2150585586"
    },
]

class OrderDetail extends React.Component {

    state = {
        data: {},
        isEducative: false,
        isMobile: false,
        visible: false
    }


    componentDidMount = () => {

        const {match} = this.props;
        const {order_id} = match.params



        const device = new DeviceUUID();
        const uuid = device.get();
        const du = device.parse();
        const isMobile = du.isMobile;
        this.setState({isMobile})
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
        const isDns = this.props.location.search.indexOf('isDns') !== -1
        this.setState({
            visible: isDns
        })
    }


    onClickGood = (good_id, url) => {
        axios.get('/click_good?good_id=' + good_id)
            .then(res => {
                console.log("ok")
            }).catch(err => {
            if (err.response.status === 401) {
                message.error("警告！您已经使用超过2个设备, 账号密码只能自己使用，不能传给别人！")
            } else {
                message.error("获取失败，请联系淘宝旺旺客服")
            }
        })
        window.open(url)
    }


    render() {
        const {match} = this.props;
        const {order_id} = match.params
        const device = new DeviceUUID();
        const uuid = device.get();
        const {data, isMobile} = this.state;
        const loading = Object.keys(data).length === 0;
        if (loading) {
            return ""
        }
        const {account, password, website, expire_date, valid_days, membership_name} = data;
        const isEducative = membership_name.indexOf("educative") !== -1
        const Mobile = (
            <Content style={{padding: 10}}>
                <div>
                    <Row gutter={16}>
                        <Col>
                            <Card
                                hoverable
                                size={"small"}
                                style={{height: '100%'}}

                            >
                                <h3 style={{fontSize: 16}}>已购会员信息</h3>
                                <hr/>
                                <Descriptions
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
                        </Col>

                        {products.map(product => {
                            return (
                                <Col>
                                    <Card
                                        hoverable
                                        style={{margin: 5}}
                                        onClick={() => this.onClickGood(product.good_id, product.url)}
                                        cover={<img alt="点击购买"
                                                    src={product.image}/>}
                                    >
                                        <Meta title={product.title}
                                              description={<a
                                                  onClick={() => this.onClickGood(product.good_id, product.url)}
                                              >{product.website}</a>}/>
                                    </Card>
                                </Col>
                            )
                        })}


                    </Row>
                </div>

            </Content>
        )

        const Desktop = (
            <Content style={{padding: 10}}>
                <div>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card
                                hoverable
                                size={"small"}
                                style={{height: '100%'}}

                            >
                                <h3 style={{fontSize: 16}}>已购会员信息</h3>
                                <hr/>
                                <Descriptions
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
                        </Col>

                        <Col span={18}>
                            <Card
                                hoverable
                                size={"small"}
                                style={{height: '100%'}}
                            >
                                <h3 style={{fontSize: 16}}>更多精品推荐</h3>
                                <hr/>
                                <Row gutter={16}>

                                    {products.map(product => {
                                        return (
                                            <Col span={6}>
                                                <Card
                                                    hoverable
                                                    style={{margin: 5}}
                                                    onClick={() => this.onClickGood(product.good_id, product.url)}
                                                    cover={<img alt="点击购买"
                                                                src={product.image}/>}
                                                >
                                                    <Meta title={product.title}
                                                          description={<a
                                                              onClick={() => this.onClickGood(product.good_id, product.url)}
                                                          >{product.website}</a>}/>
                                                </Card>
                                            </Col>
                                        )
                                    })}
                                </Row>

                            </Card>
                        </Col>


                    </Row>
                </div>

            </Content>
        )
        return (
            <Layout>
                <Header>
                    <p style={{color: "#fff", fontSize: 18}}>知行优学</p>
                </Header>
                <Layout style={{height: "calc(100vh-80px)"}}>
                    {isMobile && Mobile}
                    {!isMobile && Desktop}
                </Layout>
                <Modal
                    visible={this.state.visible}
                    onOk={()=>this.setState({visible: false})}
                    onCancel={()=>this.setState({visible: false})}
                    title={<b>重要通知</b>}
                >
                    您好，为了更好的服务广大用户，链接已经升级为域名，请保存一下链接。
                    <br/>

                    {window.location.href.split('?')[0]}
                    <ClipContent
                        text={window.location.href.split('?')[0]}
                    />
                    <br/>
                    请不用担心，所有信息保持不变。
                </Modal>
            </Layout>

        )
    }


}

export default OrderDetail;