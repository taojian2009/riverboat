import React from 'react';
import {Table, Card, Spin} from 'antd';


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '会员类型',
        dataIndex: 'membership_name',
        key: 'membership_name',
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
        dataIndex: 'start_date',
        key: 'start_date',
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
        render: (text, record) => {
            return text ? "否" : "是"
        }
    },
    {
        title: '链接',
        dataIndex: 'order_id',
        key: 'url',
        render: (text, record) => {
            const link = `/order/${text}`
            return <a href={link} target="_blank">链接</a>
        }
    },
];

const Orders = ({data}) => {
    if (data.length === 0) {
        return (<Spin tip={"loading..."}>
            <Table size="small" pagination={false}/>
        </Spin>)
    }


    return (
        <Card title="订单列表" extra={<a href="#">More</a>} style={{height: 'calc(100vh - 10px)', margin: 10}}>
            <Table
                dataSource={data}
                columns={columns}
                size={'small'}
                bordered
                align="center"
            />
        </Card>
    )
}
export default Orders;