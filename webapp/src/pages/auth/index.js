import {Component} from 'react';
import {withRouter} from 'react-router-dom'


class CheckLogin extends Component {
    componentDidMount() {
        // 在这里请求相关接口判断用户是否完成登录
        this.props.history.push('/login')
    }

    render() {
        return null;
    }
}

export default CheckLogin;