import React from 'react';
import {Table, Card} from 'antd';


const dataSource = [
    {
        key: '1',
        id: '1',
        buyer_email: 'taojian86@yahoo.com',
        buyer_phone: "15123035649",
        start_time: "2020-12-12",
        valid_days: 32,
        duration: 32,
        address: '西湖区湖底公园1号',
        is_valid: true,
        url: 'https://www.baidu.com',
        membership_type: "codecademy"
    },
    {
        key: '1',
        ID: '1',
        buyer_email: 'ID',
        buyer_phone: "12314124",
        startTime: "2020-12-12",
        valid_days: 32,
        address: '西湖区湖底公园1号',
    },
];

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '会员类型',
        dataIndex: 'membership_type',
        key: 'membership_type',
    },
    {
        title: '买家邮箱',
        dataIndex: 'buyer_email',
        key: 'buyer_email',
    },
    {
        title: '买家电话',
        dataIndex: 'buyer_phone',
        key: 'buyer_phone',
    },
    {
        title: '会员开始时间',
        dataIndex: 'start_time',
        key: 'start_time',
    },

    {
        title: '会员期限',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: '剩余天数',
        dataIndex: 'valid_days',
        key: 'valid_days',
    },
    {
        title: '是否过期',
        dataIndex: 'is_valid',
        key: 'is_valid',
    },
    {
        title: '链接',
        dataIndex: 'url',
        key: 'url',
        render: (text, record) => {
            return <a href={text} target="_blank">链接</a>
        }
    },
];

const Orders = () => {
    return (
        <Card title="订单列表" extra={<a href="#">More</a>} style={{height: 'calc(100vh - 10px)', margin: 10}}>
            <Table
                dataSource={dataSource}
                columns={columns}
                size={'small'}
                bordered
                align="center"
            />
        </Card>
    )
}
export default Orders;