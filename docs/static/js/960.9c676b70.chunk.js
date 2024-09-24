(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[960],{4298:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var n=s(5043),r=s(3003),a=s(9439),c=s(9751),l=s(6213),o=s(3753),i=s(579);const d=()=>{const e=(0,r.d4)((e=>e.user.userSymbol)),t=(0,r.d4)((e=>e.watchlist.symbols)),[s,d]=(0,n.useState)([]),[h,u]=(0,n.useState)(""),[m,p]=(0,n.useState)(null),g=(0,r.d4)((e=>e.theme)),x=(0,r.wA)(),y="oRw9ebHARHpYDonYIt4VNoYoOPhplFBV";(0,n.useEffect)((()=>{e&&(async()=>{try{const t=await l.A.get(`https://api.polygon.io/v3/reference/dividends?ticker=${e}&apiKey=${y}`);d(t.data.results||[])}catch(t){console.error("Error fetching dividend data:",t)}})()}),[e]);const j=e=>{x((0,c.Km)(e)),f(e)},f=async e=>{try{const t=await l.A.get(`https://api.polygon.io/v3/reference/dividends?ticker=${e}&apiKey=${y}`);d(t.data.results||[]),p(null)}catch(t){console.error("Error fetching dividend data:",t)}};return(0,i.jsxs)("div",{className:"card dividend-info",children:[(0,i.jsx)("div",{className:"card-header",children:(0,i.jsx)("h5",{className:"card-title mb-0",children:"Stock Dividend Information"})}),(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsxs)("form",{className:"form-inline my-2 my-lg-0",children:[(0,i.jsxs)("div",{className:"form-group me-2",children:[(0,i.jsx)("label",{htmlFor:"symbol",children:"Stock Symbol: "}),(0,i.jsx)(o.A,{onSymbolSelect:j})]}),(0,i.jsxs)("div",{className:"form-group me-2",children:[(0,i.jsx)("label",{htmlFor:"watchlist",children:"Watchlist: "}),(0,i.jsxs)("select",{className:"form-control",value:e||"",onChange:async e=>{const t=e.target.value;(0,c.Km)(t),j(t)},children:[(0,i.jsx)("option",{value:"",disabled:!0,children:"Select a Stock from Watchlist"}),t.map((e=>(0,i.jsx)("option",{value:e,children:e},e)))]})]}),(0,i.jsxs)("div",{className:"form-group me-2",children:[(0,i.jsx)("label",{htmlFor:"numberOfShares",children:"Number of Shares: "}),(0,i.jsx)("input",{type:"text",className:"form-control mx-2",placeholder:"Number of Shares",value:h,onChange:e=>{const t=e.target.value.replace(/,/g,"");u((0,a.HY)(t))}}),(0,i.jsx)("button",{type:"button",className:"btn btn-primary my-2 my-sm-0 ml-2",onClick:()=>{const t=s.find((t=>t.ticker===e.toUpperCase()));if(t&&h){const e=parseFloat(t.cash_amount)*(0,a.vu)(h);p(e.toFixed(2))}},children:"Calculate"})]}),(0,i.jsx)("button",{type:"button",className:"btn btn-danger my-2 my-sm-0 ml-2",onClick:()=>{u(""),p(null),d([])},children:"Reset"})]}),(0,i.jsx)("div",{className:"mt-3",children:(0,i.jsxs)("h5",{children:[(0,i.jsx)("strong",{children:"Total Dividend:"})," $",(0,a.HY)(m)||"0.00"]})}),(0,i.jsxs)("table",{className:"table table-striped mt-3 "+("dark"===g?"table-dark":""),children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"Ticker"}),(0,i.jsx)("th",{children:"Cash Amount"}),(0,i.jsx)("th",{children:"Declaration Date"}),(0,i.jsx)("th",{children:"Dividend Type"}),(0,i.jsx)("th",{children:"Ex-Dividend Date"}),(0,i.jsx)("th",{children:"Frequency"}),(0,i.jsx)("th",{children:"Pay Date"}),(0,i.jsx)("th",{children:"Record Date"})]})}),(0,i.jsx)("tbody",{children:s.map(((e,t)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:e.ticker}),(0,i.jsx)("td",{children:e.cash_amount}),(0,i.jsx)("td",{children:e.declaration_date}),(0,i.jsx)("td",{children:e.dividend_type}),(0,i.jsx)("td",{children:e.ex_dividend_date}),(0,i.jsx)("td",{children:e.frequency}),(0,i.jsx)("td",{children:e.pay_date}),(0,i.jsx)("td",{children:e.record_date})]},t)))})]})]})]})}},3753:(e,t,s)=>{"use strict";s.d(t,{A:()=>h});var n=s(5043),r=s(7474),a=s.n(r),c=s(3003),l=s(8168),o=s(247),i=s(158),d=s(579);const h=()=>{const e=(0,c.wA)(),t=(0,c.d4)((e=>e.user.userSymbol)),s=(0,c.d4)((e=>e.stocks.suggestions||[])),[r,h]=(0,n.useState)("");(0,n.useEffect)((()=>{const s=localStorage.getItem("selectedStockSymbol");s&&!t&&e((0,l.c)(s)),t&&h(t)}),[t,e]);const u={placeholder:"Search for a stock",value:r,onChange:(e,t)=>{let{newValue:s}=t;h(s)}};return(0,d.jsx)("div",{className:"symbol-auto-suggest",children:(0,d.jsx)(a(),{suggestions:s,onSuggestionsFetchRequested:t=>{let{value:s}=t;s.length<1?e(o.A9.fulfilled([])):e((0,o.A9)(s))},onSuggestionsClearRequested:()=>{e((0,i.h1)())},getSuggestionValue:e=>e.ticker,renderSuggestion:e=>(0,d.jsxs)("div",{className:"suggestion-item",children:[(0,d.jsx)("span",{className:"suggestion-ticker",children:e.ticker}),(0,d.jsx)("span",{className:"suggestion-name",children:e.name})]}),inputProps:u,onSuggestionSelected:(t,s)=>{let{suggestion:n}=s;const r=n.ticker;h(r),e((0,l.c)(r)),localStorage.setItem("selectedStockSymbol",r),console.log("Selected symbol:",r)}})})}},9439:(e,t,s)=>{"use strict";s.d(t,{HY:()=>a,vu:()=>r,vv:()=>n});const n=e=>{if(!e)return"";const t=(e=e.toString().replace(/[^0-9.]/g,"")).split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),`$${t.join(".")}`},r=e=>e&&parseFloat(e.replace(/[^0-9.]/g,""))||0,a=e=>e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},1497:(e,t,s)=>{"use strict";var n=s(3218);function r(){}function a(){}a.resetWarningCache=r,e.exports=function(){function e(e,t,s,r,a,c){if(c!==n){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var s={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:r};return s.PropTypes=s,s}},5173:(e,t,s)=>{e.exports=s(1497)()},3218:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=960.9c676b70.chunk.js.map