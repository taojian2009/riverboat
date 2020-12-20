import React from 'react';
import 'antd/dist/antd.css';
import {Form, Input, InputNumber, Button, Card, Row, Col} from 'antd';
import Orders from './orders';
import SendForm from './orders/components/SendForm';


const Demo = () => {


    return (

        <Row>
            <Col span={7}><SendForm/></Col>
            <Col span={17}><Orders/></Col>
        </Row>
    );
};

export default Demo;