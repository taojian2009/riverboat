import React from 'react';
import {Form, Input, InputNumber, Button, Card, DatePicker, Select} from 'antd';
import {message} from 'antd';
import moment from 'moment';
import axios from 'axios';

const {Option} = Select;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 17,
    },
};
const formTailLayout = {
    labelCol: {
        span: 16,
    },
    wrapperCol: {
        span: 16,
        offset: 14,
    },
};


class SendForm extends React.PureComponent {

    state = {
        memberships: []
    }

    componentDidMount = () => {
        axios.get('/api/v1/memberships')
            .then(res => {
                const {data} = res.data
                this.setState({
                    memberships: data
                })
            })
    }

    onFinish = (data) => {
        const {addOrder} = this.props;
        data['start_time'] = data['start_time'].format('YYYY-MM-DD HH:mm:ss')
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrf_token'
        axios.post('/api/v1/order', data)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    message.success("添加成功")
                    // 刷新订单列表
                    const {data} = res.data;
                    addOrder(data)
                }
            }).catch(error => {
            message.error("添加失败，联系你老公")
        })
    }


    render() {


        const {memberships} = this.state;
        const initialValues = {
            membership_id: memberships.length > 0 ? memberships[0].value : 1,
            duration: 30,
            start_time: moment(),

        }

        return (
            <Card title="发货模板" extra={<a href="#">More</a>} style={{height: '80vh', margin: 10}}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={initialValues}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="会员类型"
                        name="membership_id"
                        rules={[{required: true, message: '请选择会员类型'}]}
                    >
                        <Select>
                            {memberships && memberships.map(({label, value}) => (
                                <Option value={value} key={label}>{label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={'duration'}
                        label="会员有效期/天"
                    >
                        <InputNumber min={0} max={10000} />
                    </Form.Item>

                    <Form.Item
                        label="开始时间"
                        name="start_time"
                        initialValue={moment()}
                        rules={[{required: true}]}
                    >
                        <DatePicker
                            format={"YYYY-MM-DD"}
                        />
                    </Form.Item>

                    <Form.Item
                        name="buyer_email"
                        label="买家邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '邮箱格式不正确',
                            },
                            {
                                required: true,
                                message: '请输入买家邮箱',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="buyer_phone"
                        label="买家电话"
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item  {...formTailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default SendForm;