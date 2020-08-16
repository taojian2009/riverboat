import React from 'react';
import {List, InputItem, WhiteSpace, Button, Result, WingBlank, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import history from '../../utils/history.js'

class LoginForm extends React.Component {

    onSubmit = () => {
        this.props.form.validateFields((error, value) => {
            if (error === null) {
                const {username, password} = value;
                if (username === "taojian" && password === "tj545242") {
                    localStorage.setItem("token", "taojian")
                    Toast.success("登录成功")
                    window.location.href = "/"
                }
            }
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WhiteSpace/>

                <Result
                    img={<div style={{
                        backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)',
                        backgroundSize: 'cover',
                        height: '60px',
                        width: '60px'
                    }}/>}
                    title="知行优学"
                />

                <WhiteSpace/>
                <WhiteSpace/>
                <List>
                    <InputItem {...getFieldProps('username')}>账号:</InputItem>
                    <WhiteSpace/>
                    <InputItem {...getFieldProps('password')} type="password">密码:</InputItem>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WingBlank>
                        <Button type="primary" onClick={this.onSubmit}>登录</Button><WhiteSpace/>
                    </WingBlank>
                </List>

            </div>
        );
    }
}

export default createForm()(LoginForm);