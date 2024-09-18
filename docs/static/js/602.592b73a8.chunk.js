"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[602],{8168:(e,s,i)=>{i.d(s,{c:()=>r});var a=i(6756),n=i(9751),l=i(247),t=i(700),d=i(2172);const r=(0,a.zD)("user/setSymbolAndFetchData",(async(e,s)=>{let{dispatch:i}=s;i((0,n.Km)(e)),await i((0,l.EN)(e)),await i((0,t.Y)(e)),await i((0,d.o)([e]))}))},6602:(e,s,i)=>{i.r(s),i.d(s,{default:()=>N});var a=i(5043),n=i(3003),l=i(8168),t=i(247);const d=e=>e.stocks.error,r=e=>e.news.error;var c=i(579);function o(e){let{symbol:s}=e;const i=(0,a.useRef)(),l=(0,n.d4)((e=>e.theme||"light")),t=(0,a.useRef)(!1);return(0,a.useEffect)((()=>(setTimeout((()=>{(()=>{if(!s)return void console.error("Invalid or missing symbol for TradingView widget");if(!i.current)return void console.error("Container for TradingView widget is not available");if(t.current)return void console.log("Widget already initialized");i.current.innerHTML="";const e=document.createElement("script");e.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",e.type="text/javascript",e.async=!0,e.innerHTML=JSON.stringify({autosize:!0,symbol:s,interval:"D",timezone:"exchange",theme:l,style:"1",locale:"en",toolbar_bg:"#f1f3f6",enable_publishing:!1,withdateranges:!0,hide_side_toolbar:!1,allow_symbol_change:!0,show_popup_button:!0,popup_width:"1000",popup_height:"650"}),i.current.appendChild(e),t.current=!0,console.log("Widget initialized successfully")})()}),100),()=>{i.current&&(i.current.innerHTML="",t.current=!1,console.log("Cleaning up widget"))})),[s,l]),(0,c.jsx)("div",{className:"tradingview-widget-container",ref:i,style:{height:"500px",width:"100%"},children:(0,c.jsx)("div",{className:"tradingview-widget-container__widget",style:{height:"100%",width:"100%"}})})}const h=a.memo(o),m=(0,a.lazy)((()=>i.e(822).then(i.bind(i,1822)))),u=(0,a.lazy)((()=>Promise.all([i.e(446),i.e(474),i.e(328)]).then(i.bind(i,2947)))),g=(0,a.lazy)((()=>i.e(275).then(i.bind(i,6275)))),x=(0,a.lazy)((()=>Promise.all([i.e(446),i.e(474),i.e(728)]).then(i.bind(i,728)))),j=(0,a.lazy)((()=>Promise.all([i.e(446),i.e(826)]).then(i.bind(i,5826)))),v=(0,a.lazy)((()=>i.e(388).then(i.bind(i,7388)))),b=(0,a.lazy)((()=>i.e(476).then(i.bind(i,3476)))),y=(0,a.lazy)((()=>Promise.all([i.e(474),i.e(892)]).then(i.bind(i,9766)))),f=(0,a.lazy)((()=>Promise.all([i.e(662),i.e(106),i.e(342)]).then(i.bind(i,6342)))),w=(0,a.lazy)((()=>i.e(560).then(i.bind(i,5560)))),p=(0,a.lazy)((()=>i.e(429).then(i.bind(i,429)))),N=()=>{const e=(0,n.d4)((e=>e.user.symbol)),s=(0,n.d4)(r),i=(0,n.d4)(d),o=(0,n.wA)(),[N,z]=(0,a.useState)(!1),[_,k]=(0,a.useState)(!1);return(0,a.useEffect)((()=>{o((0,t.AZ)())}),[o]),(0,a.useEffect)((()=>{e?(console.log("Dispatching setSymbolAndFetchData for symbol:",e),o((0,l.c)(e)),k(!0)):k(!1)}),[o,e]),(0,a.useEffect)((()=>{z(!!_)}),[_]),(0,c.jsxs)("div",{className:"container-fluid",children:[(0,c.jsxs)("div",{className:"hero-section",children:[i&&(0,c.jsx)("div",{className:"alert alert-danger",children:i.message}),(0,c.jsx)("div",{className:"stock-data",style:{height:"600px"},children:_?(0,c.jsx)(a.Suspense,{fallback:(0,c.jsx)("div",{children:"Loading..."}),children:N?(0,c.jsx)(h,{symbol:e}):(0,c.jsx)("div",{children:"Loading widget..."})}):(0,c.jsx)("div",{children:"Please select a valid stock symbol."})})]}),(0,c.jsxs)(a.Suspense,{fallback:(0,c.jsx)("div",{children:"Loading..."}),children:[(0,c.jsxs)("div",{className:"row my-2",children:[(0,c.jsxs)("div",{className:"col-md-3",children:[(0,c.jsx)(p,{totalValue:123456.78}),(0,c.jsx)(b,{})]}),(0,c.jsxs)("div",{className:"col-md-3",children:[(0,c.jsx)(v,{}),(0,c.jsx)(j,{}),(0,c.jsx)(f,{})]}),(0,c.jsx)("div",{className:"col-md-3",children:(0,c.jsx)(x,{})}),(0,c.jsxs)("div",{className:"col-md-3",children:[(0,c.jsx)(u,{}),(0,c.jsx)(w,{})]})]}),(0,c.jsx)("div",{className:"row my-3",children:(0,c.jsxs)("div",{className:"col-md-9",children:[(0,c.jsx)(y,{}),(0,c.jsx)(m,{})]})}),(0,c.jsx)("div",{className:"row my-3",children:(0,c.jsxs)("div",{className:"col-md-12",children:[(0,c.jsx)("h3",{className:"text-center news-headline",children:"Related News"}),s&&(0,c.jsx)("div",{className:"alert alert-danger",children:s.message}),(0,c.jsx)(g,{})]})})]})]})}}}]);
//# sourceMappingURL=602.592b73a8.chunk.js.map