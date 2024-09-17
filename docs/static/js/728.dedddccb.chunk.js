"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[728],{728:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var a=t(5043),r=t(3003),l=t(8168),c=t(9439),o=t(3910),n=t(7929),i=t(6480),u=t(579);const m=()=>{const e=(0,r.d4)((e=>e.user.symbol)),s=(0,r.d4)((e=>e.stocks.data)),t=(0,r.wA)(),[m,d]=(0,a.useState)(""),[g,h]=(0,a.useState)(""),[p,x]=(0,a.useState)(1),[v,f]=(0,a.useState)(1),[N,j]=(0,a.useState)(0),[b,S]=(0,a.useState)(0),[k,C]=(0,a.useState)(0),[y,F]=(0,a.useState)(!1);(0,a.useEffect)((()=>{e&&t((0,l.c)(e))}),[e,t]),(0,a.useEffect)((()=>{s&&d((0,c.vv)(s.toFixed(2)))}),[s]);(0,a.useEffect)((()=>{A()}),[m,g,p,v]);const A=()=>{const e=(0,c.vu)(m),s=100*(0,c.vu)(g),t=p*s*v;j(isNaN(t)?0:t);const a=p*e*100;S(isNaN(a)?0:a);const r=t/a*100;C(isNaN(r)?0:r)};return(0,u.jsx)("div",{className:"option-premium-calculator",children:(0,u.jsxs)("div",{className:"card",children:[(0,u.jsxs)("div",{className:"card-header",children:[(0,u.jsx)("h5",{className:"card-title mb-0",children:"Option Premium Calculator"}),(0,u.jsx)(o.g,{icon:n.$3Z,className:"card-refresh "+(y?"rotating":""),onClick:()=>{e&&(t((0,l.c)(e)),F(!0),setTimeout((()=>F(!1)),500))}})]}),(0,u.jsx)("div",{className:"card-body",children:(0,u.jsxs)("form",{className:"",onSubmit:e=>e.preventDefault(),children:[(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{className:"form-label",htmlFor:"stockName",children:"Stock Name:"}),(0,u.jsx)(i.A,{onSuggestionSelected:e=>{t((0,l.c)(e))}})]}),(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{className:"form-label",htmlFor:"strikePrice",children:"Stock Strike Price:"}),(0,u.jsx)("input",{type:"text",id:"strikePrice",className:"form-control",value:m,onChange:e=>{const s=e.target.value.replace(/[^0-9.]/g,"");d((0,c.vv)(s))},placeholder:"$0.00"})]}),(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{className:"form-label",htmlFor:"premiumAmount",children:"Premium Amount:"}),(0,u.jsx)("input",{type:"text",id:"premiumAmount",className:"form-control",value:g,onChange:e=>{const s=e.target.value.replace(/[^0-9.]/g,"");h((0,c.vv)(s))},placeholder:"$0.00"})]}),(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{className:"form-label",htmlFor:"numberOfContracts",children:"Number of Contracts:"}),(0,u.jsx)("input",{type:"number",id:"numberOfContracts",className:"form-control",value:p,onChange:e=>{x(e.target.value)}})]}),(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{className:"form-label",htmlFor:"amountOfWeeks",children:"Amount of Weeks:"}),(0,u.jsx)("input",{type:"number",id:"amountOfWeeks",className:"form-control",value:v,onChange:e=>{f(e.target.value)}})]}),(0,u.jsxs)("div",{className:"button-group",children:[(0,u.jsx)("button",{type:"button",className:"btn btn-primary",onClick:A,children:"Calculate"}),(0,u.jsx)("button",{type:"button",className:"btn btn-danger",onClick:()=>{d((0,c.vv)(s.toFixed(2))),h(""),x(1),f(1),j(0),S(0),C(0)},children:"Reset"})]}),(0,u.jsxs)("div",{className:"result",children:[(0,u.jsxs)("h6",{children:[(0,u.jsx)("strong",{children:"Total Premium Collected:"}),"+$",(0,c.HY)(N.toFixed(2))]}),(0,u.jsxs)("h6",{children:[(0,u.jsx)("strong",{children:"Total Capital Used:"}),"$",(0,c.HY)(b.toFixed(2))]}),(0,u.jsxs)("h6",{children:[(0,u.jsx)("strong",{children:"Average Return:"}),"+",(0,c.HY)(k.toFixed(2)),"%"]})]})]})})]})})}},6480:(e,s,t)=>{t.d(s,{A:()=>u});var a=t(5043),r=t(7474),l=t.n(r),c=t(3003),o=t(6213),n=t(8168),i=t(579);const u=()=>{const e=(0,c.wA)(),s=(0,c.d4)((e=>e.user.symbol)),[t,r]=(0,a.useState)(""),[u,m]=(0,a.useState)([]);(0,a.useEffect)((()=>{const t=localStorage.getItem("selectedStockSymbol");t&&!s&&e((0,n.c)(t)),s&&r(s)}),[s,e]);const d={placeholder:"Search for a stock",value:t,onChange:(e,s)=>{let{newValue:t}=s;r(t)}};return(0,i.jsx)("div",{className:"symbol-auto-suggest",children:(0,i.jsx)(l(),{suggestions:u,onSuggestionsFetchRequested:async e=>{let{value:s}=e;if(s.length<1)m([]);else try{const e=await o.A.get(`https://api.polygon.io/v3/reference/tickers?search=${s}&active=true&sort=ticker&order=asc&limit=10&apiKey=oRw9ebHARHpYDonYIt4VNoYoOPhplFBV`);m(e.data.results||[])}catch(t){console.error("Error fetching suggestions:",t),m([])}},onSuggestionsClearRequested:()=>m([]),getSuggestionValue:e=>e.ticker,renderSuggestion:e=>(0,i.jsxs)("div",{className:"suggestion-item",children:[(0,i.jsx)("span",{className:"suggestion-ticker",children:e.ticker}),(0,i.jsx)("span",{className:"suggestion-name",children:e.name})]}),inputProps:d,onSuggestionSelected:(s,t)=>{let{suggestion:a}=t;const l=a.ticker;r(l),e((0,n.c)(l)),localStorage.setItem("selectedStockSymbol",l)}})})}},9439:(e,s,t)=>{t.d(s,{HY:()=>l,vu:()=>r,vv:()=>a});const a=e=>{if(!e)return"";const s=(e=e.toString().replace(/[^0-9.]/g,"")).split(".");return s[0]=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),`$${s.join(".")}`},r=e=>e&&parseFloat(e.replace(/[^0-9.]/g,""))||0,l=e=>e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""}}]);
//# sourceMappingURL=728.dedddccb.chunk.js.map