import React from 'react';
import {Tooltip, Button, Avatar, Badge, Space} from 'antd';
import {message} from "antd";
import axios from "axios";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {CopyOutlined} from '@ant-design/icons';

export const ClipContent = ({text}) => (
    <CopyToClipboard
        text={text}
        onCopy={() => message.success("copied")}
    >
        <Tooltip placement="bottomRight" title={"点击复制"}>
            <CopyOutlined/>
        </Tooltip>
    </CopyToClipboard>
)

class AuthCode extends React.PureComponent {

    state = {
        loading: false,
        code: "0"
    }

    fetchCode = () => {
        const {uuid, order_id} = this.props;
        axios.defaults.xsrfHeaderName = "X-CSRFToken"
        axios.defaults.xsrfCookieName = 'csrf_token'
        this.setState({
            loading: true
        })
        axios.post(
            "/get_code", {uuid, order_id},
        ).then(res => {
            const {code} = res.data
            this.setState({
                code,
                loading: false
            })
        }).catch(err => {
                if (err.response.status === 401) {
                    message.error("警告！您已经使用超过2个设备, 账号密码只能自己使用，不能传给别人！")
                } else {
                    message.error("获取失败，请联系淘宝旺旺客服")
                }
            }
        )
    }


    render() {
        const {loading, code} = this.state;
        const {uuid, orderID} = this.props;
        return (

            <div style={{position: "relative"}}>

                <Space>
                    <Tooltip placement="bottomRight" title={"点击获取educative验证码"}>
                        {!loading &&
                        <Button
                            type={"primary"}
                            onClick={this.fetchCode}
                        >获取验证码</Button>}
                        {loading && <Button type="primary" loading>Loading </Button>}
                    </Tooltip>

                    {code !== '0' && !loading &&
                    <React.Fragment>
                        <Button
                            type={"danger"}
                            onClick={() => {
                            }}>{code}</Button>
                        <ClipContent
                            text={code}
                        />
                    </React.Fragment>}

                </Space>

            </div>

        )
    }
}

export default AuthCode;