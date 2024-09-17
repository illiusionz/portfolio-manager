"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[14],{14:(e,s,c)=>{c.r(s),c.d(s,{default:()=>p});var t=c(5043),n=c(3910),a=c(7929),i=c(3003),o=c(3051),l=c(579);const r=e=>{let{stock:s,position:c}=e;const t=(0,i.wA)();if(!s)return null;const r=s.todaysChangePerc.toFixed(2),p=r>=0?"positive":"negative",d=r>=0?a.INu:a.B0C;return console.log("Displaying popup for stock:",s),(0,l.jsxs)("div",{className:"stock-hover-popup",style:{top:c.top+10,left:c.left+10},onMouseEnter:()=>console.log("Mouse enter popup"),onMouseLeave:()=>console.log("Mouse leave popup"),children:[(0,l.jsxs)("div",{className:"popup-header",children:[(0,l.jsxs)("div",{className:"popup-ticker",children:[(0,l.jsx)("span",{className:"stock-symbol",children:s.ticker}),(0,l.jsx)("span",{className:"stock-name",children:s.name})]}),(0,l.jsx)("button",{className:"watch-button",onClick:()=>{t((0,o.w7)(s.ticker)),console.log(`Added ${s.ticker} to watchlist`)},children:"Watch"})]}),(0,l.jsxs)("div",{className:"popup-price",children:[(0,l.jsxs)("span",{className:"stock-price",children:["$",s.price]}),(0,l.jsxs)("span",{className:`price-change ${p}`,children:[(0,l.jsx)(n.g,{icon:d})," ",s.priceChange," (",r,"%)"]})]}),(0,l.jsx)("div",{className:"popup-chart",children:(0,l.jsx)("div",{className:"line-chart"})}),(0,l.jsx)("div",{className:"popup-description",children:s.description||"No description available."})]})},p=()=>{(0,i.wA)();const[e,s]=(0,t.useState)({}),[c,o]=(0,t.useState)([]),[p,d]=(0,t.useState)(null),[h,u]=(0,t.useState)({top:0,left:0}),[m,x]=(0,t.useState)(!0),N=["AAPL","AMZN","GOOG","SHOP","AFRM","GME","ADBE","TSLA","MSFT","NVDA","AMD","PYPL","NFLX","SNAP","SPOT","PINS","TSM","UBER","LYFT","SQ","ROKU","CRWD","DOCU","META","PLTR","AVGO","OKTA","RIVN","PDD","DDOG","AMC","BA","BABA","BAC","C","DIS","F","GE","GME","GS","HD","IBM","INTC","JNJ","JPM","KO","MCD","SMCI","HOOD","OXY","NKE","PFE","PG","MRVL","UNH","V","VZ","WBA","ARM","XOM"],k=["SPY","QQQ","IWM","DIA"],j="oRw9ebHARHpYDonYIt4VNoYoOPhplFBV";(0,t.useEffect)((()=>{const e=async function(e){let c=arguments.length>1&&void 0!==arguments[1]&&arguments[1];try{const t=await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${e}?apiKey=${j}`),n=await t.json();if(!c)return n.ticker;s((s=>({...s,[e]:n.ticker})))}catch(t){return console.error(`Error fetching data for ${e}:`,t),null}};k.forEach((s=>e(s,!0))),(async()=>{const s=N.map((s=>e(s))),c=await Promise.all(s);o(c.filter((e=>null!==e)))})()}),[j]);return(0,l.jsxs)("div",{className:"trending-toolbar",children:[(0,l.jsx)("div",{className:"form-check form-switch",children:(0,l.jsx)("input",{className:"form-check-input",type:"checkbox",id:"toggleSwitch",checked:m,onChange:()=>x(!m)})}),(0,l.jsxs)("div",{className:"index-data",children:[k.map((s=>(s=>{const c=e[s];if(!c)return null;const t=c.todaysChangePerc.toFixed(2),i=t>=0?"positive":"negative",o=t>=0?a.INu:a.B0C;return(0,l.jsxs)("div",{className:`index-item ${i}`,children:[(0,l.jsx)("span",{className:"stock-symbol",children:c.ticker}),m?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.g,{icon:o}),(0,l.jsxs)("span",{className:"stock-percent",children:[t,"%"]})]}):(0,l.jsxs)("span",{className:"stock-price",children:["$",c.day.c.toFixed(2)]})]},s)})(s))),(0,l.jsxs)("span",{className:"trending-label text-secondary",children:["Trending ",(0,l.jsx)(n.g,{icon:a.mEO})]})]}),(0,l.jsx)("div",{className:"trending-stocks",children:(0,l.jsx)("div",{className:"scroll-container",children:[...c,...c].map(((e,s)=>{if(!e)return null;const c=e.todaysChangePerc.toFixed(2),t=c>=0?"positive":"negative",i=c>=0?a.INu:a.B0C;return(0,l.jsxs)("div",{className:`stock-item ${t}`,onMouseEnter:s=>{d(e),u({top:s.clientY,left:s.clientX})},onMouseLeave:()=>d(null),children:[(0,l.jsx)("span",{className:"stock-symbol",children:e.ticker}),m?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.g,{icon:i}),(0,l.jsxs)("span",{className:"stock-percent",children:[c,"%"]})]}):(0,l.jsxs)("span",{className:"stock-price",children:["$",e.day.c.toFixed(2)]})]},`${e.ticker}-${s}`)}))})}),p&&(0,l.jsx)(r,{stock:p,position:h})]})}}}]);
//# sourceMappingURL=14.1e2bb7fe.chunk.js.map