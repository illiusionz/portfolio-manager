(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[960],{4298:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var r=s(5043),n=s(3003),a=s(9439),c=s(9751),i=(s(247),s(6213)),l=s(4909),o=s(579);const d=()=>{const e=(0,n.d4)((e=>e.user.symbol)),t=(0,n.d4)((e=>e.watchlist.symbols)),[s,d]=(0,r.useState)([]),[h,u]=(0,r.useState)(""),[m,p]=(0,r.useState)(null),g=(0,n.d4)((e=>e.theme)),x=(0,n.wA)(),y="oRw9ebHARHpYDonYIt4VNoYoOPhplFBV";(0,r.useEffect)((()=>{e&&(async()=>{try{const t=await i.A.get(`https://api.polygon.io/v3/reference/dividends?ticker=${e}&apiKey=${y}`);d(t.data.results||[])}catch(t){console.error("Error fetching dividend data:",t)}})()}),[e]);const j=e=>{x((0,c.Km)(e)),f(e)},f=async e=>{try{const t=await i.A.get(`https://api.polygon.io/v3/reference/dividends?ticker=${e}&apiKey=${y}`);d(t.data.results||[]),p(null)}catch(t){console.error("Error fetching dividend data:",t)}};return(0,o.jsxs)("div",{className:"card dividend-info",children:[(0,o.jsx)("div",{className:"card-header",children:(0,o.jsx)("h5",{className:"card-title mb-0",children:"Stock Dividend Information"})}),(0,o.jsxs)("div",{className:"card-body",children:[(0,o.jsxs)("form",{className:"form-inline my-2 my-lg-0",children:[(0,o.jsxs)("div",{className:"form-group me-2",children:[(0,o.jsx)("label",{htmlFor:"symbol",children:"Stock Symbol: "}),(0,o.jsx)(l.A,{onSymbolSelect:j})]}),(0,o.jsxs)("div",{className:"form-group me-2",children:[(0,o.jsx)("label",{htmlFor:"watchlist",children:"Watchlist: "}),(0,o.jsxs)("select",{className:"form-control",value:e||"",onChange:async e=>{const t=e.target.value;(0,c.Km)(t),j(t)},children:[(0,o.jsx)("option",{value:"",disabled:!0,children:"Select a Stock from Watchlist"}),t.map((e=>(0,o.jsx)("option",{value:e,children:e},e)))]})]}),(0,o.jsxs)("div",{className:"form-group me-2",children:[(0,o.jsx)("label",{htmlFor:"numberOfShares",children:"Number of Shares: "}),(0,o.jsx)("input",{type:"text",className:"form-control mx-2",placeholder:"Number of Shares",value:h,onChange:e=>{const t=e.target.value.replace(/,/g,"");u((0,a.HY)(t))}}),(0,o.jsx)("button",{type:"button",className:"btn btn-primary my-2 my-sm-0 ml-2",onClick:()=>{const t=s.find((t=>t.ticker===e.toUpperCase()));if(t&&h){const e=parseFloat(t.cash_amount)*(0,a.vu)(h);p(e.toFixed(2))}},children:"Calculate"})]}),(0,o.jsx)("button",{type:"button",className:"btn btn-danger my-2 my-sm-0 ml-2",onClick:()=>{u(""),p(null),d([])},children:"Reset"})]}),(0,o.jsx)("div",{className:"mt-3",children:(0,o.jsxs)("h5",{children:[(0,o.jsx)("strong",{children:"Total Dividend:"})," $",(0,a.HY)(m)||"0.00"]})}),(0,o.jsxs)("table",{className:"table table-striped mt-3 "+("dark"===g?"table-dark":""),children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Ticker"}),(0,o.jsx)("th",{children:"Cash Amount"}),(0,o.jsx)("th",{children:"Declaration Date"}),(0,o.jsx)("th",{children:"Dividend Type"}),(0,o.jsx)("th",{children:"Ex-Dividend Date"}),(0,o.jsx)("th",{children:"Frequency"}),(0,o.jsx)("th",{children:"Pay Date"}),(0,o.jsx)("th",{children:"Record Date"})]})}),(0,o.jsx)("tbody",{children:s.map(((e,t)=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:e.ticker}),(0,o.jsx)("td",{children:e.cash_amount}),(0,o.jsx)("td",{children:e.declaration_date}),(0,o.jsx)("td",{children:e.dividend_type}),(0,o.jsx)("td",{children:e.ex_dividend_date}),(0,o.jsx)("td",{children:e.frequency}),(0,o.jsx)("td",{children:e.pay_date}),(0,o.jsx)("td",{children:e.record_date})]},t)))})]})]})]})}},4909:(e,t,s)=>{"use strict";s.d(t,{A:()=>d});var r=s(5043),n=s(7474),a=s.n(n),c=s(3003),i=s(6213),l=s(8168),o=s(579);const d=()=>{const e=(0,c.wA)(),t=(0,c.d4)((e=>e.user.symbol)),[s,n]=(0,r.useState)(""),[d,h]=(0,r.useState)([]);(0,r.useEffect)((()=>{const s=localStorage.getItem("selectedStockSymbol");s&&!t&&e((0,l.c)(s)),t&&n(t)}),[t,e]);const u={placeholder:"Search for a stock",value:s,onChange:(e,t)=>{let{newValue:s}=t;n(s)}};return(0,o.jsx)("div",{className:"symbol-auto-suggest",children:(0,o.jsx)(a(),{suggestions:d,onSuggestionsFetchRequested:async e=>{let{value:t}=e;if(t.length<1)h([]);else try{const e=await i.A.get(`https://api.polygon.io/v3/reference/tickers?search=${t}&active=true&sort=ticker&order=asc&limit=10&apiKey=oRw9ebHARHpYDonYIt4VNoYoOPhplFBV`);h(e.data.results||[])}catch(s){console.error("Error fetching suggestions:",s),h([])}},onSuggestionsClearRequested:()=>h([]),getSuggestionValue:e=>e.ticker,renderSuggestion:e=>(0,o.jsxs)("div",{className:"suggestion-item",children:[(0,o.jsx)("span",{className:"suggestion-ticker",children:e.ticker}),(0,o.jsx)("span",{className:"suggestion-name",children:e.name})]}),inputProps:u,onSuggestionSelected:(t,s)=>{let{suggestion:r}=s;const a=r.ticker;n(a),e((0,l.c)(a)),localStorage.setItem("selectedStockSymbol",a)}})})}},9439:(e,t,s)=>{"use strict";s.d(t,{HY:()=>a,vu:()=>n,vv:()=>r});const r=e=>{if(!e)return"";const t=(e=e.toString().replace(/[^0-9.]/g,"")).split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),`$${t.join(".")}`},n=e=>e&&parseFloat(e.replace(/[^0-9.]/g,""))||0,a=e=>e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},1497:(e,t,s)=>{"use strict";var r=s(3218);function n(){}function a(){}a.resetWarningCache=n,e.exports=function(){function e(e,t,s,n,a,c){if(c!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var s={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:n};return s.PropTypes=s,s}},5173:(e,t,s)=>{e.exports=s(1497)()},3218:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=960.54e2fd18.chunk.js.map