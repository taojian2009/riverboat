import React from 'react';
import F2 from '@antv/f2';
import insertCss from 'insert-css';
import {Icon, List, NavBar, WhiteSpace} from "antd-mobile";
import {Card, WingBlank} from 'antd-mobile';
import {current} from "../constants";
import axios from 'axios';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  canvas.guage {
    border-radius: 5px;
    background-color: #1890ff;
    background-image: linear-gradient(#246BFF, #2797FF);
  }
`);

class Dashboard extends React.PureComponent {

    render_chart = () => {

        const container = document.getElementById('container');
        container.className = 'guage';
        container.width = window.innerWidth;
        container.height = window.innerWidth * 0.6;

        const {
            Shape,
            G,
            Util,
            Global
        } = F2;
        const Vector2 = G.Vector2;

// 极坐标下带圆角的柱子，只对极坐标生效
        Shape.registerShape('interval', 'polar-tick', {
            draw: function draw(cfg, container) {
                const points = this.parsePoints(cfg.points);
                const style = Util.mix({
                    stroke: cfg.color
                }, Global.shape.interval, cfg.style);

                let newPoints = points.slice(0);
                if (this._coord.transposed) {
                    newPoints = [points[0], points[3], points[2], points[1]];
                }

                const center = cfg.center;
                const x = center.x,
                    y = center.y;


                const v = [1, 0];
                const v0 = [newPoints[0].x - x, newPoints[0].y - y];
                const v1 = [newPoints[1].x - x, newPoints[1].y - y];
                const v2 = [newPoints[2].x - x, newPoints[2].y - y];

                let startAngle = Vector2.angleTo(v, v1);
                let endAngle = Vector2.angleTo(v, v2);
                const r0 = Vector2.length(v0);
                const r = Vector2.length(v1);

                if (startAngle >= 1.5 * Math.PI) {
                    startAngle = startAngle - 2 * Math.PI;
                }

                if (endAngle >= 1.5 * Math.PI) {
                    endAngle = endAngle - 2 * Math.PI;
                }

                const lineWidth = r - r0;
                const newRadius = r - lineWidth / 2;

                return container.addShape('Arc', {
                    className: 'interval',
                    attrs: Util.mix({
                        x,
                        y,
                        startAngle,
                        endAngle,
                        r: newRadius,
                        lineWidth,
                        lineCap: 'round'
                    }, style)
                });
            }
        });
        const data = [{
            const: 'a',
            actual: current(),
            expect: 100
        }];
        const chart = new F2.Chart({
            id: 'container',
            padding: [0, 30, 60],
            pixelRatio: window.devicePixelRatio
        });
        chart.source(data, {
            actual: {
                max: 100,
                min: 0,
                nice: false
            }
        });
        chart.coord('polar', {
            transposed: true,
            innerRadius: 0.8,
            startAngle: -Math.PI,
            endAngle: 0
        });
        chart.axis(false);
        chart.interval()
            .position('const*expect')
            .shape('polar-tick')
            .size(10)
            .color('rgba(80, 143, 255, 0.95)')
            .animate(false); // 背景条
        chart.interval()
            .position('const*actual')
            .shape('polar-tick')
            .size(10)
            .color('#fff')
            .animate({
                appear: {
                    duration: 1100,
                    easing: 'linear',
                    animation: function animation(shape, animateCfg) {
                        const startAngle = shape.attr('startAngle');
                        let endAngle = shape.attr('endAngle');
                        if (startAngle > endAngle) {
                            // -Math.PI/2 到 0
                            endAngle += Math.PI * 2;
                        }
                        shape.attr('endAngle', startAngle);
                        shape.animate().to(Util.mix({
                            attrs: {
                                endAngle
                            }
                        }, animateCfg)).onUpdate(function (frame) {
                            const textEl = document.querySelector('#text');
                            if (textEl) textEl.innerHTML = parseInt(current());
                        });
                    }
                }
            }); // 实际进度
        chart.guide().html({
            position: ['50%', '80%'],
            html: `
    <div style="width: 120px;color: #fff;white-space: nowrap;text-align:center;">
      <p style="font-size: 18px;margin:0;">本月进度</p>
      <p id="text" style="font-size: 48px;margin:0;font-weight: bold;">0</p>
    </div>`
        });
        chart.render();


    }

    state = {
        income: 0,
        outcome: 0,
        asset: 0
    }

    componentDidMount() {
        // this.render_chart();
        this.fetch_data();


    }

    fetch_data = () => {
        axios.get('/summary', {}).then(res => {
            this.setState({
                ...res.data
            })
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        return (
            <div style={{width: "100%"}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
                        <Icon key="1" type="ellipsis"/>,
                    ]}
                >看板</NavBar>
                <WhiteSpace size="xl"/>


                {/*<canvas id={"container"}/>*/}

                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <Card>
                        <Card.Header
                            title="收入总计"
                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<span>日期: </span>}
                        />
                        <Card.Body>
                            <div>收入：￥{this.state.income} 元</div>
                            <div>支出：￥{this.state.outcome} 元</div>
                            <div>资产：￥{this.state.asset} 元</div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg"/>
                </WingBlank>
            </div>

        )
    }
}

export default Dashboard;