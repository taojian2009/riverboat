(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{30:function(e,t,a){e.exports={page:"dashboard__page__2PV41",header:"dashboard__header__P7vRe",headerTitle:"dashboard__headerTitle__UrNko",tagContainer:"dashboard__tagContainer__2DUkl",dateContainer:"dashboard__dateContainer__7Xc17",calendar:"dashboard__calendar__PAP_v",left:"dashboard__left__kz3Yl",right:"dashboard__right__3GdX-",contentCard:"dashboard__contentCard__3dWIu",headerLine:"dashboard__headerLine__V1Ala",tag:"dashboard__tag__1MBhv",cardTitle:"dashboard__cardTitle__3yJVe",cardAmount:"dashboard__cardAmount__8LkdZ",placeholder:"dashboard__placeholder__3OEJR",amount:"dashboard__amount__2Ynz0",dateTag:"dashboard__dateTag__3htrn"}},343:function(e,t,a){e.exports=a(814)},350:function(e,t,a){},812:function(e,t,a){},814:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),l=a(12),c=a.n(l),i=(a(348),a(349),a(350),a(51)),s=a(52),m=a(53),d=a(54),u=a(13),h=function(e){var t=e.color;return o.a.createElement("svg",{class:"icon",viewBox:"0 0 1024 1024",width:"22",fill:t,height:"22"},o.a.createElement("path",{d:"M553.984 128l342.016 0 0 256-342.016 0 0-256zM553.984 896l0-425.984 342.016 0 0 425.984-342.016 0zM128 896l0-256 342.016 0 0 256-342.016 0zM128 553.984l0-425.984 342.016 0 0 425.984-342.016 0z"}))},f=function(e){return o.a.createElement("svg",{viewBox:"64 64 896 896",focusable:"false",className:"","data-icon":"calendar",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",x:"50%",y:"50%"},o.a.createElement("path",{d:"M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"}))},p=a(100),g=a(27),E=a.n(g),b=(E()().startOf("week").add(1,"days").format("YYYY-MM-DD"),E()().endOf("week").add(1,"days").format("YYYY-MM-DD"),E()().startOf("day").format("YYYY-MM-DD")),v=E()().endOf("day").format("YYYY-MM-DD"),y=E()().startOf("month").subtract(1,"month").format("YYYY-MM-DD"),_=E()().startOf("year").format("YYYY-MM-DD"),T=(E()().endOf("month").format("YYYY-MM-DD"),[{name:"\u65e5",key:"day",startTime:E()().subtract(6,"days").format("YYYY-MM-DD"),endTime:v,titles:["\u4eca\u65e5\u6536\u5165","\u6628\u65e5\u6536\u5165"]},{name:"\u5468",key:"week",startTime:y,endTime:b,titles:["\u672c\u5468\u6536\u5165","\u4e0a\u5468\u6536\u5165"]},{name:"\u6708",key:"month",startTime:_,endTime:b,titles:["\u672c\u6708\u6536\u5165","\u4e0a\u6708\u6536\u5165"]}]),w="#33A3F4",k="#949494",D=a(58),C=a.n(D),Y=a(30),M=a.n(Y),S=a(336),O=a.n(S),j=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).getOption=function(e,t){return{color:["#3276f6"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:-10,right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:e.map((function(e){return e.title})),axisTick:{alignWithLabel:!0,show:!1},axisLabel:{rotate:30},splitLine:{show:!1},axisLine:{show:!1}}],yAxis:[{type:"value",axisTick:{show:!1},splitLine:{show:!1},show:!1}],series:[{name:"\u6536\u5165",type:"bar",barWidth:"50%",data:e.map((function(e){return Math.round(e.amount)})),label:{normal:{show:!0,position:"top",textStyle:{color:"black"}}},itemStyle:{emphasis:{barBorderRadius:7},normal:{barBorderRadius:7}}}]}},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.chartData,a=e.dateType;return t.length,o.a.createElement(O.a,{option:this.getOption(t,a)})}}]),a}(o.a.PureComponent),x=(a(740),a(742),function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={income:0,outcome:0,asset:0,catalogs:["\u5168\u90e8","\u6dd8\u5b9d\u5e97","\u6d41\u5229\u8bf4","\u5fae\u4fe1"],catalog:"\u6dd8\u5b9d\u5e97",dateType:"day",startTime:T[0].startTime,endTime:T[0].endTime,cardData:{change:"120",changeRate:"+45%",items:[{title:"\u4eca\u65e5\u6536\u5165",amount:1e3},{title:"\u6628\u65e5\u6536\u5165",amount:1e3}]},chartData:[],show:!1},e.fetch_data=function(){C.a.get("/summary",{}).then((function(t){e.setState(Object(p.a)({},t.data))})).catch((function(e){console.log(e)}))},e.onSelectTag=function(t){e.setState({catalog:t}),e.getCardData({catalog:t})},e.onSelectDateType=function(t){e.setState({dateType:t});var a=T.filter((function(e){return e.key===t}))[0],n={dateType:t,startTime:a.startTime,endTime:a.endTime};e.setState(Object(p.a)({},n)),e.getCardData(n)},e.getCardData=function(t){var a=e.state,n=a.startTime,r=a.endTime,o=a.catalog,l=a.dateType,c=Object(p.a)({startTime:n,endTime:r,catalog:o,dateType:l},t),i=T.filter((function(e){return e.key===c.dateType}))[0].titles;C.a.get("/card_data",{params:c}).then((function(t){var a=t.data.data.items,n=a[a.length-1].amount.toFixed(2),r=a[a.length-2].amount.toFixed(2),o=n-r,l=(o/r*100).toFixed(2)+"%",c={change:o.toFixed(2),changeRate:l,items:[{title:i[0],amount:n},{title:i[1],amount:r}]};e.setState({cardData:c,chartData:a})}))},e.pickCalendar=function(){"day"===e.state.dateType&&e.setState({show:!0})},e.onConfirm=function(t,a){var n=E()(t).format("YYYY-MM-DD"),r=E()(a).format("YYYY-MM-DD");e.getCardData({startTime:n,endTime:r}),e.setState({show:!1,startTime:n,endTime:r})},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.fetch_data(),this.getCardData({})}},{key:"render",value:function(){var e=this,t=this.state,a=t.catalogs,n=t.catalog,r=t.dateType,l=t.startTime,c=t.endTime,i=t.cardData,s=t.show,m={};return"day"===r&&(m={showShortcut:!0}),o.a.createElement("div",{className:M.a.page},o.a.createElement("div",{className:M.a.header},o.a.createElement("div",{className:M.a.headerTitle},"\u6536\u5165\u5206\u6790"),o.a.createElement("div",{className:M.a.tagContainer},a.map((function(t){return o.a.createElement(u.a,{type:t===n?"default":"primary",onClick:function(){return e.onSelectTag(t)}},t)}))),o.a.createElement("div",{className:M.a.dateContainer},T.map((function(t){var a=t.name,n=t.key;t.startTime,t.endTime;return o.a.createElement(u.a,{type:n===r?"default":"primary",onClick:function(){return e.onSelectDateType(n)}},a)})),o.a.createElement("div",{className:M.a.calendar,onClick:this.pickCalendar},o.a.createElement("div",{className:M.a.left},o.a.createElement("span",null,E()(l).format("MM/DD")),o.a.createElement("span",null,"~"),o.a.createElement("span",null,E()(c).format("MM/DD"))),o.a.createElement("div",{className:M.a.right},o.a.createElement(f,null))))),o.a.createElement(u.c,{className:M.a.contentCard},o.a.createElement("div",{className:M.a.headerLine},o.a.createElement("span",null,E()().format("YYYY-MM-DD")),o.a.createElement("span",{className:M.a.tag},"\uffe5",i.change,"\xa0\xa0",i.changeRate)),o.a.createElement("div",null,o.a.createElement(u.d,null,i.items&&i.items.map((function(e){var t=e.title,a=e.amount;return o.a.createElement(u.d.Item,null,o.a.createElement("span",{className:M.a.cardTitle},t),o.a.createElement("br",null),o.a.createElement("span",{className:M.a.cardAmount},"\uffe5",a),o.a.createElement("br",null))}))))),o.a.createElement("div",{className:M.a.placeholder}),o.a.createElement(u.c,null,o.a.createElement(j,{chartData:this.state.chartData,dateType:r})),o.a.createElement(u.b,Object.assign({},m,{visible:s,onConfirm:this.onConfirm,onCancel:function(){return e.setState({show:!1})},minDate:new Date(_),defaultValue:[new Date(l),new Date(c)],initalMonths:24})))}}]),a}(o.a.PureComponent)),I=a(341);u.g.Item;new RegExp("\\biPhone\\b|\\biPod\\b","i").test(window.navigator.userAgent)&&(n={onTouchStart:function(e){return e.preventDefault()}});var z=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={show:!1,amount:0,name:"\u77e5\u884c\u4f18\u5b66",catalog:"\u6dd8\u5b9d\u5e97",incomes:[],models:[{label:"\u6536\u5165",value:"income"},{label:"\u652f\u51fa",value:"outcome"},{label:"\u8d44\u4ea7",value:"asset"}],model:["income"],createTime:E()()},e.componentDidMount=function(){e.getIncomeList()},e.onSubmit=function(){var t=e.state,a=t.amount,n=t.name,r=t.catalog,o=t.incomes,l=t.model,c=t.createTime,i={amount:a,name:n,catalog:r,model:l[0],create_time:c.format("YYYY-MM-DD HH:MM:SS")};C.a.post("/add_record",i).then((function(t){e.setState({incomes:[t.data.data].concat(Object(I.a)(o))})})).catch((function(e){u.l.fail(e.message)}))},e.getIncomeList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};C.a.get("/model",{params:Object(p.a)({model:e.state.model[0]},t)}).then((function(t){e.setState({incomes:t.data.data})})).catch((function(e){u.l.fail(e.message)}))},e.deleteIncome=function(t){var a=e.state,n=a.incomes,r=a.model,o={id:t,model:r[0]};e.setState({incomes:n.filter((function(e){return e.id!==t}))}),C.a.delete("/model",{params:o}).then((function(e){console.log("ok")})).catch((function(e){u.l.fail(e.message)}))},e.onSelectModel=function(t){e.setState({model:t}),"outcome"===t[0]&&e.setState({name:"\u9910\u996e",catalog:"\u751f\u6d3b"}),"asset"===t[0]&&e.setState({name:"\u62db\u884c",catalog:"\u4eba\u6c11\u5e01"}),e.getIncomeList({model:t[0]})},e.onConfirm=function(t){e.setState({show:!1});var a=E()(t);e.setState({createTime:a})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.state.incomes;return o.a.createElement("div",null,o.a.createElement(u.h,{mode:"light",icon:o.a.createElement(u.e,{type:"left"}),onLeftClick:function(){return console.log("onLeftClick")},rightContent:[o.a.createElement(u.e,{key:"0",type:"search",style:{marginRight:"16px"}}),o.a.createElement(u.e,{key:"1",type:"ellipsis"})]},"\u8bb0\u8d26"),o.a.createElement(u.m,{size:"xl"}),o.a.createElement(u.g,null,o.a.createElement(u.f,{placeholder:"",clear:!0,value:this.state.amount,onChange:function(t){return e.setState({amount:t})},moneyKeyboardWrapProps:n},"\u91d1\u989d"),o.a.createElement(u.f,{clear:!0,placeholder:"",value:this.state.name,onChange:function(t){return e.setState({name:t})}},"\u540d\u79f0"),o.a.createElement(u.f,{clear:!0,placeholder:"",value:this.state.catalog,onChange:function(t){return e.setState({catalog:t})}},"\u5206\u7c7b"),o.a.createElement(u.i,{data:this.state.models,title:"\u9009\u62e9\u5b63\u8282",cols:1,extra:"\u8bf7\u9009\u62e9(\u53ef\u9009)",value:this.state.model,onChange:function(t){return e.setState({model:t})},onOk:this.onSelectModel},o.a.createElement(u.g.Item,{arrow:"horizontal"},"\u8d26\u672c\u7c7b\u578b")),o.a.createElement(u.g.Item,{arrow:"horizontal",onClick:function(){return e.setState({show:!0})}},"\u65e5\u671f",o.a.createElement("div",{style:{float:"right"}},this.state.createTime.format("YYYY-MM-DD"))),o.a.createElement(u.b,{visible:this.state.show,onConfirm:this.onConfirm,onCancel:function(){return e.setState({show:!1})},minDate:new Date(_),defaultValue:new Date(b),initalMonths:24,type:"one"}),o.a.createElement(u.m,{size:"xl"}),o.a.createElement(u.g.Item,null,o.a.createElement(u.a,{type:"primary",onClick:this.onSubmit},"\u4fdd\u5b58"))),o.a.createElement(u.m,{size:"xl"}),o.a.createElement(u.m,{size:"xl"}),o.a.createElement(u.g,null,t&&t.map((function(t){return o.a.createElement(u.g.Item,null,o.a.createElement("div",null,o.a.createElement("span",{style:{float:"left"}},t.name,"\xa0 \xa0 \xa0",o.a.createElement("span",null,o.a.createElement("span",{className:M.a.dateTag},t.create_time," \xa0 \xa0 \xa0"),o.a.createElement(u.e,{type:"cross",style:{position:"absolute",right:5,top:10},onClick:function(){e.deleteIncome(t.id)}}))),o.a.createElement("span",{style:{float:"right",marginRight:20}},o.a.createElement("span",{className:M.a.amount},"+\uffe5",t.amount," \u5143"))))}))))}}]),a}(o.a.Component),N=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={selectedTab:"dashboard",hidden:!1,fullScreen:!0},e}return Object(s.a)(a,[{key:"renderContent",value:function(e){var t=this;return o.a.createElement("div",{style:{backgroundColor:"white",height:"100%",textAlign:"center"}},o.a.createElement("div",{style:{paddingTop:60}},"Clicked \u201c",e,"\u201d tab\uff0c show \u201c",e,"\u201d information"),o.a.createElement("a",{style:{display:"block",marginTop:40,marginBottom:20,color:"#108ee9"},onClick:function(e){e.preventDefault(),t.setState({hidden:!t.state.hidden})}},"Click to show/hide tab-bar"),o.a.createElement("a",{style:{display:"block",marginBottom:600,color:"#108ee9"},onClick:function(e){e.preventDefault(),t.setState({fullScreen:!t.state.fullScreen})}},"Click to switch fullscreen"))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{style:this.state.fullScreen?{position:"fixed",height:"100%",width:"100%",top:0}:{height:400}},o.a.createElement(u.k,{unselectedTintColor:"#949494",tintColor:"#33A3F4",barTintColor:"white",hidden:this.state.hidden},o.a.createElement(u.k.Item,{title:"\u5206\u6790",key:"Dashboard",icon:o.a.createElement(h,{color:k}),selectedIcon:o.a.createElement(h,{color:w}),selected:"dashboard"===this.state.selectedTab,onPress:function(){e.setState({selectedTab:"dashboard"})},"data-seed":"logId"},o.a.createElement(x,null)),o.a.createElement(u.k.Item,{icon:{uri:"https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg"},selectedIcon:{uri:"https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg"},title:"\u660e\u7ec6",key:"Money",selected:"money"===this.state.selectedTab,onPress:function(){e.setState({selectedTab:"money"})}},o.a.createElement(z,{history:this.props.history}))))}}]),a}(o.a.Component),A=a(340),L=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onSubmit=function(){e.props.form.validateFields((function(e,t){if(null===e){var a={username:t.username,password:t.password};C.a.post("/login",a).then((function(e){console.log(e.data),u.l.success("\u767b\u5f55\u6210\u529f"),localStorage.setItem("token","username"),window.location.href="/"})).catch((function(e){u.l.fail(e.toString())}))}}))},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props.form.getFieldProps;return o.a.createElement("div",null,o.a.createElement(u.m,null),o.a.createElement(u.m,null),o.a.createElement(u.m,null),o.a.createElement(u.m,null),o.a.createElement(u.j,{img:o.a.createElement("div",{style:{backgroundImage:"url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)",backgroundSize:"cover",height:"60px",width:"60px"}}),title:"\u77e5\u884c\u4f18\u5b66"}),o.a.createElement(u.m,null),o.a.createElement(u.m,null),o.a.createElement(u.g,null,o.a.createElement(u.f,e("username"),"\u8d26\u53f7:"),o.a.createElement(u.m,null),o.a.createElement(u.f,Object.assign({},e("password"),{type:"password"}),"\u5bc6\u7801:"),o.a.createElement(u.m,null),o.a.createElement(u.m,null),o.a.createElement(u.m,null),o.a.createElement(u.m,null),o.a.createElement(u.m,null),o.a.createElement(u.n,null,o.a.createElement(u.a,{type:"primary",onClick:this.onSubmit},"\u767b\u5f55"),o.a.createElement(u.m,null))))}}]),a}(o.a.Component),P=Object(A.a)()(L),B=a(342),R=a(25),F=function(e){var t=e.component,a=Object(B.a)(e,["component"]),n=!!localStorage.getItem("token");return o.a.createElement(R.b,Object.assign({},a,{render:function(e){return n?o.a.createElement(t,e):o.a.createElement(R.a,{to:"/login"})}}))},V=a(213),H=(a(812),function(){return o.a.createElement(V.a,null,o.a.createElement(R.d,null,o.a.createElement(F,{path:"/",exact:!0,component:N}),o.a.createElement(R.b,{path:"/login",exact:!0,component:P})))}),J=a(339);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(J.AppContainer,null,o.a.createElement(H,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[343,1,2]]]);
//# sourceMappingURL=main.b0833985.chunk.js.map