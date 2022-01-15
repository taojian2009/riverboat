import React from 'react';
import {Button, Descriptions} from "antd";

class VerificationCode extends React.PureComponent{


    render() {



        return (
            <Descriptions.Item label={<Button
                type="primary"
                loading={false}
                size={"small"}
                onClick={() => console.log('clicked')}
            >
                获取验证码:
            </Button>}>
                <p style={{color: "#a88c53", fontWeight: 'bold'}}>345521</p>
            </Descriptions.Item>
        )
    }
}

export default VerificationCode;