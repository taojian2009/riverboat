import React from 'react';
import {Form, Input, InputNumber, Button, Card, DatePicker, Select} from 'antd';
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
        alert('send message')
        data['start_time'] = data['start_time'].format('YYYY-MM-DD HH:mm:ss')
        axios.post('/api/v1/membership', data)
            .then(res => {
                console.log(res.data)
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
                        name={'duration'}
                        label="会员有效期"

                    >
                        <InputNumber min={0} max={10000} defaultValue={30}/>
                        <span className="ant-form-text">天</span>
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