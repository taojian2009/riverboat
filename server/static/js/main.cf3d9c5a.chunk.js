(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{135:function(e,t,a){e.exports=a(298)},142:function(e,t,a){},18:function(e,t,a){e.exports={page:"dashboard__page__2PV41",header:"dashboard__header__P7vRe",headerTitle:"dashboard__headerTitle__UrNko",tagContainer:"dashboard__tagContainer__2DUkl",dateContainer:"dashboard__dateContainer__7Xc17",calendar:"dashboard__calendar__PAP_v",left:"dashboard__left__kz3Yl",right:"dashboard__right__3GdX-",contentCard:"dashboard__contentCard__3dWIu",headerLine:"dashboard__headerLine__V1Ala",tag:"dashboard__tag__1MBhv",cardTitle:"dashboard__cardTitle__3yJVe",cardAmount:"dashboard__cardAmount__8LkdZ"}},296:function(e,t,a){},298:function(e,t,a){"use strict";a.r(t);var n,r=a(0),l=a.n(r),c=a(9),o=a.n(c),i=(a(140),a(141),a(142),a(31)),s=a(32),m=a(34),d=a(35),u=a(10),h=function(e){var t=e.color;return l.a.createElement("svg",{class:"icon",viewBox:"0 0 1024 1024",width:"22",fill:t,height:"22"},l.a.createElement("path",{d:"M553.984 128l342.016 0 0 256-342.016 0 0-256zM553.984 896l0-425.984 342.016 0 0 425.984-342.016 0zM128 896l0-256 342.016 0 0 256-342.016 0zM128 553.984l0-425.984 342.016 0 0 425.984-342.016 0z"}))},f=function(e){return l.a.createElement("svg",{viewBox:"64 64 896 896",focusable:"false",className:"","data-icon":"calendar",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",x:"50%",y:"50%"},l.a.createElement("path",{d:"M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"}))},p=a(69),g=a(17),E=a.n(g),v=E()().startOf("week").add(1,"days").format("YYYY-MM-DD"),b=E()().endOf("week").add(1,"days").format("YYYY-MM-DD"),y=[{name:"\u65e5",key:"day",startTime:E()().startOf("day").format("YYYY-MM-DD"),endTime:E()().endOf("day").format("YYYY-MM-DD")},{name:"\u5468",key:"week",startTime:v,endTime:b},{name:"\u6708",key:"month",startTime:E()().startOf("month").format("YYYY-MM-DD"),endTime:E()().endOf("month").format("YYYY-MM-DD")}],k="#33A3F4",_="#949494",T=a(26),C=a.n(T),w=a(18),D=a.n(w),M=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={income:0,outcome:0,asset:0,catalogs:["\u5168\u90e8","\u6dd8\u5b9d\u5e97","\u6d41\u5229\u8bf4","\u5fae\u4fe1"],catalog:"\u6dd8\u5b9d\u5e97",dateType:"day",startTime:y[0].startTime,endTime:y[1].endTime,cardData:{change:"120",changeRate:"+45%",items:[{title:"\u4eca\u65e5\u6536\u5165",amount:1e3},{title:"\u6628\u65e5\u6536\u5165",amount:1e3}]}},e.fetch_data=function(){C.a.get("/summary",{}).then((function(t){e.setState(Object(p.a)({},t.data))})).catch((function(e){console.log(e)}))},e.onSelectTag=function(t){e.setState({catalog:t}),e.getCardData({catalog:t})},e.onSelectDateType=function(t){e.setState({dateType:t});var a=y.filter((function(e){return e.key===t}))[0],n={dateType:t,startTime:a.startTime,endTime:a.endTime};console.log(n),e.setState(Object(p.a)({},n)),e.getCardData(n)},e.getCardData=function(t){var a=e.state,n=a.startTime,r=a.endTime,l=a.catalog,c=a.dateType,o=Object(p.a)({startTime:n,endTime:r,catalog:l,dateType:c},t);C.a.get("/card_data",{params:o}).then((function(t){var a=t.data.data.items,n=a[0].amount.toFixed(2),r=a[1].amount.toFixed(2),l=n-r,c=(l/r*100).toFixed(2)+"%",o={change:l.toFixed(2),changeRate:c,items:[{title:"\u4eca\u65e5\u6536\u5165",amount:n},{title:"\u6628\u65e5\u6536\u5165",amount:r}]};e.setState({cardData:o})}))},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.fetch_data(),this.getCardData({})}},{key:"render",value:function(){var e=this,t=this.state,a=t.catalogs,n=t.catalog,r=t.dateType,c=t.startTime,o=t.endTime,i=t.cardData;return l.a.createElement("div",{className:D.a.page},l.a.createElement("div",{className:D.a.header},l.a.createElement("div",{className:D.a.headerTitle},"\u6536\u5165\u5206\u6790"),l.a.createElement("div",{className:D.a.tagContainer},a.map((function(t){return l.a.createElement(u.a,{type:t===n?"default":"primary",onClick:function(){return e.onSelectTag(t)}},t)}))),l.a.createElement("div",{className:D.a.dateContainer},y.map((function(t){var a=t.name,n=t.key;t.startTime,t.endTime;return l.a.createElement(u.a,{type:n===r?"default":"primary",onClick:function(){return e.onSelectDateType(n)}},a)})),l.a.createElement("div",{className:D.a.calendar},l.a.createElement("div",{className:D.a.left},l.a.createElement("span",null,E()(c).format("MM/DD")),l.a.createElement("span",null,"~"),l.a.createElement("span",null,E()(o).format("MM/DD"))),l.a.createElement("div",{className:D.a.right},l.a.createElement(f,null))))),l.a.createElement(u.b,{className:D.a.contentCard},l.a.createElement("div",{className:D.a.headerLine},l.a.createElement("span",null,E()().format("YYYY-MM-DD")),l.a.createElement("span",{className:D.a.tag},"\uffe5",i.change,"\xa0\xa0",i.changeRate)),l.a.createElement("div",null,l.a.createElement(u.c,null,i.items&&i.items.map((function(e){var t=e.title,a=e.amount;return l.a.createElement(u.c.Item,null,l.a.createElement("span",{className:D.a.cardTitle},t),l.a.createElement("br",null),l.a.createElement("span",{className:D.a.cardAmount},"\uffe5",a),l.a.createElement("br",null))}))))))}}]),a}(l.a.PureComponent),j=a(133);u.f.Item;new RegExp("\\biPhone\\b|\\biPod\\b","i").test(window.navigator.userAgent)&&(n={onTouchStart:function(e){return e.preventDefault()}});var S=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={amount:0,name:"\u77e5\u884c\u4f18\u5b66",catalog:"\u6dd8\u5b9d\u5e97",incomes:[]},e.componentDidMount=function(){e.getIncomeList()},e.onSubmit=function(){var t=e.state,a=t.amount,n=t.name,r=t.catalog,l=t.incomes,c={amount:a,name:n,catalog:r};C.a.post("/add_record",c).then((function(t){e.setState({incomes:[t.data.data].concat(Object(j.a)(l))})})).catch((function(e){u.j.fail(e.message)}))},e.getIncomeList=function(){C.a.get("/income").then((function(t){e.setState({incomes:t.data.data})})).catch((function(e){u.j.fail(e.message)}))},e.deleteIncome=function(t){var a=e.state.incomes,n={id:t};e.setState({incomes:a.filter((function(e){return e.id!==t}))}),C.a.delete("/income",{params:n}).then((function(e){console.log("ok")})).catch((function(e){u.j.fail(e.message)}))},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.state.incomes;return l.a.createElement("div",null,l.a.createElement(u.g,{mode:"light",icon:l.a.createElement(u.d,{type:"left"}),onLeftClick:function(){return console.log("onLeftClick")},rightContent:[l.a.createElement(u.d,{key:"0",type:"search",style:{marginRight:"16px"}}),l.a.createElement(u.d,{key:"1",type:"ellipsis"})]},"\u8bb0\u8d26"),l.a.createElement(u.k,{size:"xl"}),l.a.createElement(u.f,null,l.a.createElement(u.e,{placeholder:"",clear:!0,value:this.state.amount,onChange:function(t){return e.setState({amount:t})},moneyKeyboardWrapProps:n},"Amount"),l.a.createElement(u.e,{clear:!0,placeholder:"",value:this.state.name},"Name"),l.a.createElement(u.e,{clear:!0,placeholder:"",value:this.state.catalog},"Catalog"),l.a.createElement(u.k,{size:"xl"}),l.a.createElement(u.f.Item,null,l.a.createElement(u.a,{type:"primary",onClick:this.onSubmit},"\u4fdd\u5b58"))),l.a.createElement(u.k,{size:"xl"}),l.a.createElement(u.k,{size:"xl"}),t&&t.map((function(t){return l.a.createElement(u.b,null,l.a.createElement(u.b.Header,{title:t.name,extra:l.a.createElement("span",null,"\u65e5\u671f: ",t.create_time," \xa0 \xa0 \xa0",l.a.createElement(u.d,{type:"cross",style:{position:"absolute",right:5,top:5},onClick:function(){e.deleteIncome(t.id)}}))}),l.a.createElement(u.b.Body,null,l.a.createElement("div",null,l.a.createElement("span",{style:{float:"left"}},"\u5e97\u94fa\uff1a",t.catalog),l.a.createElement("span",{style:{float:"right"}},"\u91d1\u989d\uff1a\uffe5",t.amount," \u5143"))))})))}}]),a}(l.a.Component),O=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={selectedTab:"dashboard",hidden:!1,fullScreen:!0},e}return Object(s.a)(a,[{key:"renderContent",value:function(e){var t=this;return l.a.createElement("div",{style:{backgroundColor:"white",height:"100%",textAlign:"center"}},l.a.createElement("div",{style:{paddingTop:60}},"Clicked \u201c",e,"\u201d tab\uff0c show \u201c",e,"\u201d information"),l.a.createElement("a",{style:{display:"block",marginTop:40,marginBottom:20,color:"#108ee9"},onClick:function(e){e.preventDefault(),t.setState({hidden:!t.state.hidden})}},"Click to show/hide tab-bar"),l.a.createElement("a",{style:{display:"block",marginBottom:600,color:"#108ee9"},onClick:function(e){e.preventDefault(),t.setState({fullScreen:!t.state.fullScreen})}},"Click to switch fullscreen"))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{style:this.state.fullScreen?{position:"fixed",height:"100%",width:"100%",top:0}:{height:400}},l.a.createElement(u.i,{unselectedTintColor:"#949494",tintColor:"#33A3F4",barTintColor:"white",hidden:this.state.hidden},l.a.createElement(u.i.Item,{title:"\u5206\u6790",key:"Dashboard",icon:l.a.createElement(h,{color:_}),selectedIcon:l.a.createElement(h,{color:k}),selected:"dashboard"===this.state.selectedTab,onPress:function(){e.setState({selectedTab:"dashboard"})},"data-seed":"logId"},l.a.createElement(M,null)),l.a.createElement(u.i.Item,{icon:{uri:"https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg"},selectedIcon:{uri:"https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg"},title:"\u660e\u7ec6",key:"Money",selected:"money"===this.state.selectedTab,onPress:function(){e.setState({selectedTab:"money"})}},l.a.createElement(S,{history:this.props.history}))))}}]),a}(l.a.Component),Y=a(132),x=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).onSubmit=function(){e.props.form.validateFields((function(e,t){if(null===e){var a={username:t.username,password:t.password};C.a.post("/login",a).then((function(e){console.log(e.data),u.j.success("\u767b\u5f55\u6210\u529f"),localStorage.setItem("token","username"),window.location.href="/"})).catch((function(e){u.j.fail(e.toString())}))}}))},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props.form.getFieldProps;return l.a.createElement("div",null,l.a.createElement(u.k,null),l.a.createElement(u.k,null),l.a.createElement(u.k,null),l.a.createElement(u.k,null),l.a.createElement(u.h,{img:l.a.createElement("div",{style:{backgroundImage:"url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)",backgroundSize:"cover",height:"60px",width:"60px"}}),title:"\u77e5\u884c\u4f18\u5b66"}),l.a.createElement(u.k,null),l.a.createElement(u.k,null),l.a.createElement(u.f,null,l.a.createElement(u.e,e("username"),"\u8d26\u53f7:"),l.a.createElement(u.k,null),l.a.createElement(u.e,Object.assign({},e("password"),{type:"password"}),"\u5bc6\u7801:"),l.a.createElement(u.k,null),l.a.createElement(u.k,null),l.a.createElement(u.k,null),l.a.createElement(u.k,null),l.a.createElement(u.k,null),l.a.createElement(u.l,null,l.a.createElement(u.a,{type:"primary",onClick:this.onSubmit},"\u767b\u5f55"),l.a.createElement(u.k,null))))}}]),a}(l.a.Component),N=Object(Y.a)()(x),z=a(134),I=a(12),A=function(e){var t=e.component,a=Object(z.a)(e,["component"]),n=!!localStorage.getItem("token");return l.a.createElement(I.b,Object.assign({},a,{render:function(e){return n?l.a.createElement(t,e):l.a.createElement(I.a,{to:"/login"})}}))},P=a(93),B=(a(296),function(){return l.a.createElement(P.a,null,l.a.createElement(I.d,null,l.a.createElement(A,{path:"/",exact:!0,component:O}),l.a.createElement(I.b,{path:"/login",exact:!0,component:N})))}),F=a(131);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(F.AppContainer,null,l.a.createElement(B,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[135,1,2]]]);
//# sourceMappingURL=main.cf3d9c5a.chunk.js.map