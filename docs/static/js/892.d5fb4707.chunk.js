"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[892],{32327:(e,s,i)=>{i.d(s,{Rw:()=>l,W0:()=>a,m3:()=>n});const l=e=>e.news.articles,n=e=>e.news.loading,a=e=>e.news.error},29874:(e,s,i)=>{i.d(s,{SI:()=>t,V6:()=>h,Vz:()=>a,be:()=>r,tw:()=>d,yf:()=>o});var l=i(32099);const n=e=>e.stocks,a=(0,l.Mz)([n],(e=>e.stockTickerData||{})),t=(0,l.Mz)([n],(e=>e.trendingToolbarSymbols||[])),r=(0,l.Mz)([n],(e=>e.indexToolbarSymbols||[])),d=(0,l.Mz)([n,(e,s)=>s],((e,s)=>e.stockDetails[s]||{})),c=(0,l.Mz)([n,(e,s)=>s],((e,s)=>e.stockTickerData[s]||{})),o=(0,l.Mz)([c],(e=>{var s,i;return null!==(s=null===e||void 0===e||null===(i=e.prevDay)||void 0===i?void 0:i.c)&&void 0!==s?s:0})),h=((0,l.Mz)([c],(e=>{var s,i;return null!==(s=null===e||void 0===e||null===(i=e.prevDay)||void 0===i?void 0:i.c)&&void 0!==s?s:null})),(0,l.Mz)([c,(e,s)=>s],((e,s)=>e?e[s]:null)),(0,l.Mz)([n],(e=>e.error)))},18168:(e,s,i)=>{i.d(s,{c:()=>d});var l=i(86756),n=i(9751),a=i(30247),t=i(70700),r=i(22172);const d=(0,l.zD)("user/setSymbolAndFetchData",(async(e,s)=>{let{dispatch:i}=s;i((0,n.Km)(e)),await i((0,a.Li)(e)),await i((0,t.Y)(e)),await i((0,r.o)([e]))}))},66892:(e,s,i)=>{i.r(s),i.d(s,{default:()=>z});var l=i(65043),n=i(83003),a=i(18168),t=i(30247),r=i(29874),d=i(32327),c=i(70579);function o(e){let{symbol:s}=e;const i=(0,l.useRef)(),a=(0,n.d4)((e=>e.theme||"light")),t=(0,l.useRef)(!1);return(0,l.useEffect)((()=>(setTimeout((()=>{(()=>{if(!s)return void console.error("Invalid or missing symbol for TradingView widget");if(!i.current)return void console.error("Container for TradingView widget is not available");if(t.current)return void console.log("Widget already initialized");i.current.innerHTML="";const e=document.createElement("script");e.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",e.type="text/javascript",e.async=!0,e.innerHTML=JSON.stringify({autosize:!0,symbol:s,interval:"D",timezone:"exchange",theme:a,style:"1",locale:"en",toolbar_bg:"#f1f3f6",enable_publishing:!1,withdateranges:!0,hide_side_toolbar:!1,allow_symbol_change:!0,show_popup_button:!0,popup_width:"1000",popup_height:"650"}),i.current.appendChild(e),t.current=!0,console.log("Widget initialized successfully")})()}),100),()=>{i.current&&(i.current.innerHTML="",t.current=!1,console.log("Cleaning up widget"))})),[s,a]),(0,c.jsx)("div",{className:"tradingview-widget-container",ref:i,style:{height:"500px",width:"100%"},children:(0,c.jsx)("div",{className:"tradingview-widget-container__widget",style:{height:"100%",width:"100%"}})})}const h=l.memo(o),m=(0,l.lazy)((()=>i.e(822).then(i.bind(i,71822)))),u=(0,l.lazy)((()=>Promise.all([i.e(446),i.e(474),i.e(60)]).then(i.bind(i,84679)))),v=(0,l.lazy)((()=>i.e(519).then(i.bind(i,76900)))),x=(0,l.lazy)((()=>Promise.all([i.e(446),i.e(474),i.e(865)]).then(i.bind(i,46865)))),g=(0,l.lazy)((()=>Promise.all([i.e(446),i.e(938)]).then(i.bind(i,17938)))),b=(0,l.lazy)((()=>i.e(918).then(i.bind(i,23918)))),y=(0,l.lazy)((()=>i.e(436).then(i.bind(i,40436)))),j=(0,l.lazy)((()=>Promise.all([i.e(474),i.e(960)]).then(i.bind(i,74298)))),p=(0,l.lazy)((()=>Promise.all([i.e(692),i.e(235),i.e(298)]).then(i.bind(i,38060)))),w=(0,l.lazy)((()=>i.e(560).then(i.bind(i,5560)))),f=(0,l.lazy)((()=>i.e(429).then(i.bind(i,90429)))),z=()=>{const e=(0,n.d4)((e=>e.user.userSymbol)),s=(0,n.d4)(d.W0),i=(0,n.d4)(r.V6),o=(0,n.wA)(),[z,N]=(0,l.useState)(!1),[k,_]=(0,l.useState)(!1);return(0,l.useEffect)((()=>{o((0,t.AZ)()),e?(console.log("Dispatching setSymbolAndFetchData for symbol:",e),o((0,a.c)(e)),N(!0),_(!0)):(_(!1),N(!1))}),[]),(0,c.jsxs)("div",{className:"container-fluid",children:[(0,c.jsxs)("div",{className:"hero-section",children:[i&&(0,c.jsx)("div",{className:"alert alert-danger",children:i.message}),(0,c.jsx)("div",{className:"stock-data",style:{height:"600px"},children:k?(0,c.jsx)(l.Suspense,{fallback:(0,c.jsx)("div",{children:"Loading..."}),children:z?(0,c.jsx)(h,{symbol:e}):(0,c.jsx)("div",{className:"spinner-border",role:"status",children:(0,c.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}):(0,c.jsx)("div",{children:"Please select a valid stock symbol."})})]}),(0,c.jsxs)(l.Suspense,{fallback:(0,c.jsx)("div",{children:"Loading..."}),children:[(0,c.jsxs)("div",{className:"row my-2",children:[(0,c.jsxs)("div",{className:"col-md-3",children:[(0,c.jsx)(f,{totalValue:123456.78}),(0,c.jsx)(y,{})]}),(0,c.jsxs)("div",{className:"col-md-3",children:[(0,c.jsx)(b,{}),(0,c.jsx)(g,{}),(0,c.jsx)(p,{})]}),(0,c.jsx)("div",{className:"col-md-3",children:(0,c.jsx)(x,{})}),(0,c.jsxs)("div",{className:"col-md-3",children:[(0,c.jsx)(u,{}),(0,c.jsx)(w,{})]})]}),(0,c.jsx)("div",{className:"row my-3",children:(0,c.jsxs)("div",{className:"col-md-9",children:[(0,c.jsx)(j,{}),(0,c.jsx)(m,{})]})}),(0,c.jsx)("div",{className:"row my-3",children:(0,c.jsxs)("div",{className:"col-md-12",children:[(0,c.jsx)("h3",{className:"text-center news-headline",children:"Related News"}),s&&(0,c.jsx)("div",{className:"alert alert-danger",children:s.message}),(0,c.jsx)(v,{})]})})]})]})}}}]);
//# sourceMappingURL=892.d5fb4707.chunk.js.map