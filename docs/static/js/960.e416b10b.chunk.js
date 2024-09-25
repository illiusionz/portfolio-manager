(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[960],{74298:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u});var n=s(86213),r=s(65043),a=s(83003),c=s(19439),l=s(9751),o=s(20043),i=s(40615),d=s(83753),h=s(70579);const u=()=>{const e=(0,a.wA)(),t=(0,a.d4)(o.o),s=(0,a.d4)((e=>e.watchlist.symbols)),[u,m]=(0,r.useState)([]),[p,g]=(0,r.useState)(""),[x,j]=(0,r.useState)(null),y=(0,a.d4)(i.S),f="oRw9ebHARHpYDonYIt4VNoYoOPhplFBV";(0,r.useEffect)((()=>{t&&(async()=>{try{const e=await n.A.get(`https://api.polygon.io/v3/reference/dividends?ticker=${t}&apiKey=${f}`);m(e.data.results||[])}catch(e){console.error("Error fetching dividend data:",e)}})()}),[t]);const b=t=>{e((0,l.Km)(t)),v(t)},v=async e=>{try{const t=await n.A.get(`https://api.polygon.io/v3/reference/dividends?ticker=${e}&apiKey=${f}`);m(t.data.results||[]),j(null)}catch(t){console.error("Error fetching dividend data:",t)}};return(0,h.jsxs)("div",{className:"card dividend-info",children:[(0,h.jsx)("div",{className:"card-header",children:(0,h.jsx)("h5",{className:"card-title mb-0",children:"Stock Dividend Information"})}),(0,h.jsxs)("div",{className:"card-body",children:[(0,h.jsxs)("form",{className:"form-inline my-2 my-lg-0",children:[(0,h.jsxs)("div",{className:"form-group me-2",children:[(0,h.jsx)("label",{htmlFor:"symbol",children:"Stock Symbol: "}),(0,h.jsx)(d.A,{onSymbolSelect:b})]}),(0,h.jsxs)("div",{className:"form-group me-2",children:[(0,h.jsx)("label",{htmlFor:"watchlist",children:"Watchlist: "}),(0,h.jsxs)("select",{className:"form-control",value:t||"",onChange:async e=>{const t=e.target.value;(0,l.Km)(t),b(t)},children:[(0,h.jsx)("option",{value:"",disabled:!0,children:"Select a Stock from Watchlist"}),s.map((e=>(0,h.jsx)("option",{value:e,children:e},e)))]})]}),(0,h.jsxs)("div",{className:"form-group me-2",children:[(0,h.jsx)("label",{htmlFor:"numberOfShares",children:"Number of Shares: "}),(0,h.jsx)("input",{type:"text",className:"form-control mx-2",placeholder:"Number of Shares",value:p,onChange:e=>{const t=e.target.value.replace(/,/g,"");g((0,c.HY)(t))}}),(0,h.jsx)("button",{type:"button",className:"btn btn-primary my-2 my-sm-0 ml-2",onClick:()=>{const e=u.find((e=>e.ticker===t.toUpperCase()));if(e&&p){const t=parseFloat(e.cash_amount)*(0,c.vu)(p);j(t.toFixed(2))}},children:"Calculate"})]}),(0,h.jsx)("button",{type:"button",className:"btn btn-danger my-2 my-sm-0 ml-2",onClick:()=>{g(""),j(null),m([])},children:"Reset"})]}),(0,h.jsx)("div",{className:"mt-3",children:(0,h.jsxs)("h5",{children:[(0,h.jsx)("strong",{children:"Total Dividend:"})," $",(0,c.HY)(x)||"0.00"]})}),(0,h.jsxs)("table",{className:"table table-striped mt-3 "+("theme-dark"===y?"table-dark":""),children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:"Ticker"}),(0,h.jsx)("th",{children:"Cash Amount"}),(0,h.jsx)("th",{children:"Declaration Date"}),(0,h.jsx)("th",{children:"Dividend Type"}),(0,h.jsx)("th",{children:"Ex-Dividend Date"}),(0,h.jsx)("th",{children:"Frequency"}),(0,h.jsx)("th",{children:"Pay Date"}),(0,h.jsx)("th",{children:"Record Date"})]})}),(0,h.jsx)("tbody",{children:u.map(((e,t)=>(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:e.ticker}),(0,h.jsx)("td",{children:e.cash_amount}),(0,h.jsx)("td",{children:e.declaration_date}),(0,h.jsx)("td",{children:e.dividend_type}),(0,h.jsx)("td",{children:e.ex_dividend_date}),(0,h.jsx)("td",{children:e.frequency}),(0,h.jsx)("td",{children:e.pay_date}),(0,h.jsx)("td",{children:e.record_date})]},t)))})]})]})]})}},83753:(e,t,s)=>{"use strict";s.d(t,{A:()=>u});var n=s(65043),r=s(7474),a=s.n(r),c=s(83003),l=s(18168),o=s(30247),i=s(20158),d=s(20043),h=s(70579);const u=()=>{const e=(0,c.wA)(),t=(0,c.d4)(d.o),s=(0,c.d4)((e=>e.stocks.suggestions||[])),[r,u]=(0,n.useState)("");(0,n.useEffect)((()=>{const s=localStorage.getItem("selectedStockSymbol");s&&!t&&e((0,l.c)(s)),t&&u(t)}),[t,e]);const m={placeholder:"Search for a stock",value:r,onChange:(e,t)=>{let{newValue:s}=t;u(s)}};return(0,h.jsx)("div",{className:"symbol-auto-suggest",children:(0,h.jsx)(a(),{suggestions:s,onSuggestionsFetchRequested:t=>{let{value:s}=t;s.length<1?e(o.A9.fulfilled([])):e((0,o.A9)(s))},onSuggestionsClearRequested:()=>{e((0,i.h1)())},getSuggestionValue:e=>e.ticker,renderSuggestion:e=>(0,h.jsxs)("div",{className:"suggestion-item",children:[(0,h.jsx)("span",{className:"suggestion-ticker",children:e.ticker}),(0,h.jsx)("span",{className:"suggestion-name",children:e.name})]}),inputProps:m,onSuggestionSelected:(t,s)=>{let{suggestion:n}=s;const r=n.ticker;u(r),e((0,l.c)(r)),localStorage.setItem("selectedStockSymbol",r),console.log("Selected symbol:",r)}})})}},19439:(e,t,s)=>{"use strict";s.d(t,{HY:()=>a,vu:()=>r,vv:()=>n});const n=e=>{if(!e)return"";const t=(e=e.toString().replace(/[^0-9.]/g,"")).split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),`$${t.join(".")}`},r=e=>e&&parseFloat(e.replace(/[^0-9.]/g,""))||0,a=e=>e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},41497:(e,t,s)=>{"use strict";var n=s(13218);function r(){}function a(){}a.resetWarningCache=r,e.exports=function(){function e(e,t,s,r,a,c){if(c!==n){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var s={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:r};return s.PropTypes=s,s}},65173:(e,t,s)=>{e.exports=s(41497)()},13218:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=960.e416b10b.chunk.js.map