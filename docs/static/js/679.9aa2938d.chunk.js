"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[679,60],{4679:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var a=t(5043),l=t(3003),r=t(247),c=t(9874),o=t(9751),n=t(9439),i=t(3910),d=t(7929),u=t(3753),g=t(579);const m=()=>{const e=(0,l.wA)(),s=(0,l.d4)((e=>e.user.userSymbol)),t=(0,l.d4)((e=>(0,c.yf)(e,s))),[m,v]=(0,a.useState)(""),[h,p]=(0,a.useState)(""),[f,x]=(0,a.useState)("0.00"),[b,S]=(0,a.useState)(!1);(0,a.useEffect)((()=>{s&&e((0,r.Li)(s))}),[s,e]),(0,a.useEffect)((()=>{if(t){const e=(0,n.vv)(t.toFixed(2));p(e)}}),[t]),(0,a.useEffect)((()=>{j()}),[m,h]);const j=()=>{if(!h||!m)return void x("0.00");const e=((0,n.vu)(m)-(0,n.vu)(h))/(0,n.vu)(h)*100;x(isNaN(e)?"0.00":e.toFixed(2))},N=()=>{v(""),x("0.00"),p(t?(0,n.vv)(t.toFixed(2)):"$0.00")};return(0,g.jsx)("div",{className:"percentage-difference-calculator",children:(0,g.jsxs)("div",{className:"card",children:[(0,g.jsxs)("div",{className:"card-header",children:[(0,g.jsx)("h5",{className:"card-title mb-0",children:"Stock Price % Change"}),(0,g.jsx)(i.g,{icon:d.$3Z,className:"card-refresh "+(b?"rotating":""),onClick:()=>{s?e((0,r.Li)(s)).unwrap().then((e=>{var s;if(null!==e&&void 0!==e&&null!==(s=e.prevDay)&&void 0!==s&&s.c){const s=e.prevDay.c;p((0,n.vv)(s.toFixed(2)))}else console.warn("Stock snapshot did not contain expected data.",e),p(t?(0,n.vv)(t.toFixed(2)):"$0.00")})).catch((e=>{console.error("Error refreshing stock price:",e),p(t?(0,n.vv)(t.toFixed(2)):"$0.00")})).finally((()=>{S(!0),setTimeout((()=>S(!1)),500)})):console.warn("No symbol selected for refresh")}})]}),(0,g.jsxs)("div",{className:"card-body",children:[(0,g.jsxs)("form",{onSubmit:e=>e.preventDefault(),children:[(0,g.jsxs)("div",{className:"form-group",children:[(0,g.jsx)("label",{className:"form-label",htmlFor:"stockName",children:"Stock Name:"}),(0,g.jsx)(u.A,{onSuggestionSelected:s=>{e((0,o.Km)(s)),N()}})]}),(0,g.jsxs)("div",{className:"form-group",children:[(0,g.jsx)("label",{className:"form-label",htmlFor:"currentPrice",children:"Current Price:"}),(0,g.jsx)("input",{type:"text",id:"currentPrice",className:"form-control",value:h,readOnly:!0,placeholder:"$0.00"})]}),(0,g.jsxs)("div",{className:"form-group",children:[(0,g.jsx)("label",{className:"form-label",htmlFor:"targetPrice",children:"Target Price:"}),(0,g.jsx)("input",{type:"text",id:"targetPrice",className:"form-control",value:m,onChange:e=>{const s=e.target.value.replace(/[^0-9.]/g,"");v((0,n.vv)(s))},placeholder:"$0.00"})]}),(0,g.jsxs)("div",{className:"button-group",children:[(0,g.jsx)("button",{type:"button",className:"btn btn-primary",onClick:j,children:"Calculate"}),(0,g.jsx)("button",{type:"button",className:"btn btn-danger",onClick:N,children:"Reset"})]})]}),(0,g.jsx)("div",{className:"result mt-3",children:(0,g.jsxs)("h6",{children:[(0,g.jsx)("strong",{children:"Percent Change:"})," ",f,"%"]})})]})]})})}},3753:(e,s,t)=>{t.d(s,{A:()=>u});var a=t(5043),l=t(7474),r=t.n(l),c=t(3003),o=t(8168),n=t(247),i=t(158),d=t(579);const u=()=>{const e=(0,c.wA)(),s=(0,c.d4)((e=>e.user.userSymbol)),t=(0,c.d4)((e=>e.stocks.suggestions||[])),[l,u]=(0,a.useState)("");(0,a.useEffect)((()=>{const t=localStorage.getItem("selectedStockSymbol");t&&!s&&e((0,o.c)(t)),s&&u(s)}),[s,e]);const g={placeholder:"Search for a stock",value:l,onChange:(e,s)=>{let{newValue:t}=s;u(t)}};return(0,d.jsx)("div",{className:"symbol-auto-suggest",children:(0,d.jsx)(r(),{suggestions:t,onSuggestionsFetchRequested:s=>{let{value:t}=s;t.length<1?e(n.A9.fulfilled([])):e((0,n.A9)(t))},onSuggestionsClearRequested:()=>{e((0,i.h1)())},getSuggestionValue:e=>e.ticker,renderSuggestion:e=>(0,d.jsxs)("div",{className:"suggestion-item",children:[(0,d.jsx)("span",{className:"suggestion-ticker",children:e.ticker}),(0,d.jsx)("span",{className:"suggestion-name",children:e.name})]}),inputProps:g,onSuggestionSelected:(s,t)=>{let{suggestion:a}=t;const l=a.ticker;u(l),e((0,o.c)(l)),localStorage.setItem("selectedStockSymbol",l),console.log("Selected symbol:",l)}})})}},9874:(e,s,t)=>{t.d(s,{SI:()=>c,V6:()=>u,Vz:()=>r,be:()=>o,tw:()=>n,yf:()=>d});var a=t(2099);const l=e=>e.stocks,r=(0,a.Mz)([l],(e=>e.stockTickerData||{})),c=(0,a.Mz)([l],(e=>e.trendingToolbarSymbols||[])),o=(0,a.Mz)([l],(e=>e.indexToolbarSymbols||[])),n=(0,a.Mz)([l,(e,s)=>s],((e,s)=>e.stockDetails[s]||{})),i=(0,a.Mz)([l,(e,s)=>s],((e,s)=>e.stockTickerData[s]||{})),d=(0,a.Mz)([i],(e=>{var s,t;return null!==(s=null===e||void 0===e||null===(t=e.prevDay)||void 0===t?void 0:t.c)&&void 0!==s?s:0})),u=((0,a.Mz)([i],(e=>{var s,t;return null!==(s=null===e||void 0===e||null===(t=e.prevDay)||void 0===t?void 0:t.c)&&void 0!==s?s:null})),(0,a.Mz)([i,(e,s)=>s],((e,s)=>e?e[s]:null)),(0,a.Mz)([l],(e=>e.error)))},8168:(e,s,t)=>{t.d(s,{c:()=>n});var a=t(6756),l=t(9751),r=t(247),c=t(700),o=t(2172);const n=(0,a.zD)("user/setSymbolAndFetchData",(async(e,s)=>{let{dispatch:t}=s;t((0,l.Km)(e)),await t((0,r.Li)(e)),await t((0,c.Y)(e)),await t((0,o.o)([e]))}))},9439:(e,s,t)=>{t.d(s,{HY:()=>r,vu:()=>l,vv:()=>a});const a=e=>{if(!e)return"";const s=(e=e.toString().replace(/[^0-9.]/g,"")).split(".");return s[0]=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),`$${s.join(".")}`},l=e=>e&&parseFloat(e.replace(/[^0-9.]/g,""))||0,r=e=>e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""}}]);
//# sourceMappingURL=679.9aa2938d.chunk.js.map