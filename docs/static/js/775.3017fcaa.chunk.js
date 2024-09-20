"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[775],{9874:(s,e,r)=>{r.d(e,{V6:()=>c,tw:()=>l});const c=s=>s.stocks.error,l=(s,e)=>s.stocks.stockDetails[e]},5775:(s,e,r)=>{r.r(e),r.d(e,{default:()=>x});var c=r(5043),l=r(3003),i=r(3783),o=r(247),t=r(579);const d=s=>{let{userId:e}=s;const r=(0,l.wA)(),d=(0,l.d4)((s=>s.portfolio.portfolio)),n=(0,l.d4)((s=>s.portfolio.status)),a=(0,l.d4)((s=>s.portfolio.error)),h=(0,l.d4)((s=>s.stocks.stockDetails));return(0,c.useEffect)((()=>{"idle"===n&&r((0,i.BO)(e))}),[n,r,e]),(0,c.useEffect)((()=>{null!==d&&void 0!==d&&d.stocks&&d.stocks.forEach((s=>{r((0,o.Rh)(s.symbol))}))}),[r,d]),"loading"===n?(0,t.jsx)("div",{children:"Loading..."}):"failed"===n?(0,t.jsxs)("div",{children:["Error: ",a]}):d&&d.stocks?(0,t.jsxs)("div",{className:"container mt-4",children:[(0,t.jsx)("h2",{className:"mb-4",children:"Stock Portfolio"}),(0,t.jsxs)("table",{className:"table table-striped table-hover",children:[(0,t.jsx)("thead",{className:"thead-dark",children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{scope:"col",children:"Holding"}),(0,t.jsx)("th",{scope:"col",children:"Shares"}),(0,t.jsx)("th",{scope:"col",children:"Cost per share"}),(0,t.jsx)("th",{scope:"col",children:"Cost basis"}),(0,t.jsx)("th",{scope:"col",children:"Current value"}),(0,t.jsx)("th",{scope:"col",children:"Dividends"}),(0,t.jsx)("th",{scope:"col",children:"Dividend yield"}),(0,t.jsx)("th",{scope:"col",children:"Total profit"}),(0,t.jsx)("th",{scope:"col",children:"Daily"}),(0,t.jsx)("th",{scope:"col",children:"Logo"})," "]})}),(0,t.jsx)("tbody",{children:d.stocks.map(((s,e)=>{var r;const c=h[s.symbol];return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:s.symbol}),(0,t.jsx)("td",{children:s.shares}),(0,t.jsxs)("td",{children:["$",s.buyPrice]}),(0,t.jsxs)("td",{children:["$",(s.shares*s.buyPrice).toFixed(2)]}),(0,t.jsxs)("td",{children:["$",(s.shares*s.currentPrice).toFixed(2)]}),(0,t.jsx)("td",{children:"$0.00"}),(0,t.jsx)("td",{children:"0%"}),(0,t.jsxs)("td",{className:s.currentPrice>s.buyPrice?"text-success":"text-danger",children:["$",(s.shares*(s.currentPrice-s.buyPrice)).toFixed(2)]}),(0,t.jsxs)("td",{className:s.currentPrice>s.buyPrice?"text-success":"text-danger",children:["$",(s.currentPrice-s.buyPrice).toFixed(2)]}),(0,t.jsx)("td",{children:(null===c||void 0===c||null===(r=c.branding)||void 0===r?void 0:r.logo_url)&&(0,t.jsx)("img",{src:c.branding.logo_url,alt:`${c.name} logo`,style:{width:"50px"}})})]},e)}))})]}),(0,t.jsxs)("p",{className:"mt-4 fw-bold",children:["Total Value: $",d.totalValue]})]}):(0,t.jsx)("div",{children:"No portfolio data available"})};var n=r(9874),a=r(9439);const h=s=>{let{symbol:e}=s;const r=(0,l.wA)(),i=(0,l.d4)((s=>(0,n.tw)(s,e))),d=(0,l.d4)((s=>s.stocks.loading)),h=(0,l.d4)((s=>s.stocks.error));if((0,c.useEffect)((()=>{r((0,o.Rh)(e))}),[r,e]),d)return(0,t.jsx)("div",{className:"stock-details",children:"Loading..."});if(h)return(0,t.jsx)("div",{className:"stock-details",children:"Error fetching stock details"});if(!i)return(0,t.jsx)("div",{className:"stock-details",children:"No stock details available"});const{name:x,description:j,branding:{icon_url:p,logo_url:u}={},market_cap:m,phone_number:g,total_employees:f,locale:v,primary_exchange:k,ticker:b,sic_description:y,address1:N,city:P,postal_code:_,state:E}=i;return(0,t.jsxs)("div",{className:"stock-details-card",children:[(0,t.jsxs)("div",{className:"stock-header",children:[(0,t.jsx)("img",{src:u,alt:`${x} logo`,className:"stock-logo"}),(0,t.jsx)("h2",{children:x})]}),(0,t.jsxs)("div",{className:"stock-body",children:[(0,t.jsxs)("div",{className:"stock-info",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Description:"})," ",j]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Market Cap:"})," ",(0,a.vv)(m)]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Phone:"})," ",g]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Employees:"})," ",f]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Locale:"})," ",v]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Primary Exchange:"})," ",k]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Ticker:"})," ",b]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"SIC Description:"})," ",y]})]}),(0,t.jsxs)("div",{className:"stock-address",children:[(0,t.jsx)("h4",{children:"Address"}),(0,t.jsx)("p",{children:N}),(0,t.jsxs)("p",{children:[P,", ",E," ",_]})]})]})]})},x=()=>{const s=(0,l.wA)(),e="testUserId123",r=(0,l.d4)((s=>s.portfolio.portfolio)),o=(0,l.d4)((s=>s.portfolio.status)),n=(0,l.d4)((s=>s.portfolio.error));return(0,c.useEffect)((()=>{"idle"===o&&s((0,i.BO)(e))}),[o,s,e]),"loading"===o?(0,t.jsx)("div",{children:"Loading..."}):"failed"===o?(0,t.jsxs)("div",{children:["Error: ",n]}):r&&r.stocks?(0,t.jsxs)("div",{className:"container mt-4",children:[(0,t.jsx)("h2",{className:"mb-4",children:"Stock Portfolio"}),(0,t.jsx)(d,{portfolio:r}),(0,t.jsxs)("div",{className:"mt-4",children:[(0,t.jsx)("h3",{children:"Stock Details"}),(0,t.jsx)(h,{symbol:r.stocks[0].symbol})," "]}),(0,t.jsx)("p",{children:"Built with Express.js, MongoDB, GraphQL, Apollo Server"})]}):(0,t.jsx)("div",{children:"No portfolio data available"})}},9439:(s,e,r)=>{r.d(e,{HY:()=>i,vu:()=>l,vv:()=>c});const c=s=>{if(!s)return"";const e=(s=s.toString().replace(/[^0-9.]/g,"")).split(".");return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),`$${e.join(".")}`},l=s=>s&&parseFloat(s.replace(/[^0-9.]/g,""))||0,i=s=>s?s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""}}]);
//# sourceMappingURL=775.3017fcaa.chunk.js.map