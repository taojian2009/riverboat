import React from 'react';
import { List, InputItem, NavBar, Icon, WhiteSpace, Button} from 'antd-mobile';




const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class H5NumberInputExample extends React.Component {
    state = {
        type: 'money',
        catalog: "",
        name: "",
        amount: null,
    }
    render() {
        const { type } = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >记账</NavBar>

                <WhiteSpace size="xl" />
                <List>
                    <InputItem
                        type={type}
                        placeholder=""
                        clear
                        value={this.state.amount}
                        onChange={(amount) => this.setState({amount}) }
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >Amount</InputItem>
                    <InputItem
                        clear
                        placeholder=""
                        value={this.state.name}
                    >Name</InputItem>
                    <InputItem
                        clear
                        placeholder=""
                        value={this.state.catalog}
                    >Catalog</InputItem>
                    <WhiteSpace size="xl" />
                    <WhiteSpace size="xl" />
                    <List.Item>
                       <Button type={"basic"}>Submit</Button>
                    </List.Item>
                </List>
            </div>
        );
    }
}


export default H5NumberInputExample;