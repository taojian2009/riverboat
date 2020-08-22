import React from 'react';
import {TabBar} from 'antd-mobile';
import {Dashboard as DashIcon} from "../assets/icons/Icons";
import Dashboard from "./Components/Dashboard";
import Money from "./Components/Money";
import {iconColor} from "./constants";

class App extends React.Component {
    state = {
        selectedTab: 'dashboard',
        hidden: false,
        fullScreen: true,
    };

    renderContent(pageText) {
        return (
            <div style={{backgroundColor: 'white', height: '100%', textAlign: 'center'}}>
                <div style={{paddingTop: 60}}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9'}}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           hidden: !this.state.hidden,
                       });
                   }}
                >
                    Click to show/hide tab-bar
                </a>
                <a style={{display: 'block', marginBottom: 600, color: '#108ee9'}}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           fullScreen: !this.state.fullScreen,
                       });
                   }}
                >
                    Click to switch fullscreen
                </a>
            </div>
        );
    }

    render() {
        return (
            <div style={this.state.fullScreen ? {
                position: 'fixed',
                height: '100%',
                width: '100%',
                top: 0
            } : {height: 400}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="分析"
                        key="Dashboard"
                        icon={<DashIcon color={iconColor.notSelected}/>}
                        selectedIcon={<DashIcon color={iconColor.selected}/>}
                        selected={this.state.selectedTab === 'dashboard'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'dashboard'
                            });
                        }}
                        data-seed="logId"
                    >
                        <Dashboard/>


                    </TabBar.Item>

                    <TabBar.Item
                        icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                        selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                        title="明细"
                        key="Money"
                        selected={this.state.selectedTab === 'money'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'money',
                            });
                        }}
                    >
                        <Money
                            history={this.props.history}
                        />
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default App;
