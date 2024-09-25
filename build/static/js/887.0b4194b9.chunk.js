"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[887],{83753:(e,s,A)=>{A.d(s,{A:()=>r});var t=A(65043),a=A(7474),l=A.n(a),n=A(83003),c=A(18168),i=A(30247),o=A(20158),g=A(70579);const r=()=>{const e=(0,n.wA)(),s=(0,n.d4)((e=>e.user.userSymbol)),A=(0,n.d4)((e=>e.stocks.suggestions||[])),[a,r]=(0,t.useState)("");(0,t.useEffect)((()=>{const A=localStorage.getItem("selectedStockSymbol");A&&!s&&e((0,c.c)(A)),s&&r(s)}),[s,e]);const m={placeholder:"Search for a stock",value:a,onChange:(e,s)=>{let{newValue:A}=s;r(A)}};return(0,g.jsx)("div",{className:"symbol-auto-suggest",children:(0,g.jsx)(l(),{suggestions:A,onSuggestionsFetchRequested:s=>{let{value:A}=s;A.length<1?e(i.A9.fulfilled([])):e((0,i.A9)(A))},onSuggestionsClearRequested:()=>{e((0,o.h1)())},getSuggestionValue:e=>e.ticker,renderSuggestion:e=>(0,g.jsxs)("div",{className:"suggestion-item",children:[(0,g.jsx)("span",{className:"suggestion-ticker",children:e.ticker}),(0,g.jsx)("span",{className:"suggestion-name",children:e.name})]}),inputProps:m,onSuggestionSelected:(s,A)=>{let{suggestion:t}=A;const a=t.ticker;r(a),e((0,c.c)(a)),localStorage.setItem("selectedStockSymbol",a),console.log("Selected symbol:",a)}})})}},18168:(e,s,A)=>{A.d(s,{c:()=>i});var t=A(86756),a=A(9751),l=A(30247),n=A(70700),c=A(22172);const i=(0,t.zD)("user/setSymbolAndFetchData",(async(e,s)=>{let{dispatch:A}=s;A((0,a.Km)(e)),await A((0,l.Li)(e)),await A((0,n.Y)(e)),await A((0,c.o)([e]))}))},91887:(e,s,A)=>{A.r(s),A.d(s,{default:()=>m});var t=A(65043),a=A(83003),l=A(83910),n=A(97929),c=A(71083);var i=A(83753),o=A(18168),g=A(73051),r=A(70579);const m=e=>{let{toggleSidebar:s,handleSymbolSearch:A}=e;const m=(0,a.d4)((e=>e.user.userSymbol)),d=(0,a.d4)((e=>e.theme)),u=(0,a.d4)((e=>e.watchlist.symbols)),b=(0,a.wA)();(0,t.useEffect)((()=>{const e=localStorage.getItem("theme");e&&b((0,c.Y)(e))}),[b]);(0,t.useEffect)((()=>{document.body.className="dark"===d?"theme-dark":"theme-light"}),[d]);return(0,r.jsxs)("nav",{className:"navbar navbar-expand-lg",children:[(0,r.jsx)("button",{className:"btn btn-primary",onClick:s,children:(0,r.jsx)(l.g,{icon:n.ckx})}),(0,r.jsxs)("form",{className:"form-inline my-2 my-lg-0",onSubmit:e=>{e.preventDefault(),m&&b((0,o.c)(m))},children:[(0,r.jsxs)("div",{className:"input-group",children:[(0,r.jsx)(i.A,{})," "]}),(0,r.jsx)("button",{className:"btn btn-primary ms-1 my-2 my-sm-0",type:"submit",children:(0,r.jsx)(l.g,{icon:n.MjD})}),(0,r.jsx)("button",{className:"btn btn-primary ms-1  my-2 my-sm-0",type:"button",onClick:()=>{m&&!u.includes(m)&&b((0,g.w7)(m))},children:"Add to Watch List"})]}),(0,r.jsx)("button",{className:"btn btn-light ms-auto my-2 my-sm-0 theme-toggle",type:"button",onClick:()=>{const e="light"===d?"dark":"light";b((0,c.Y)(e)),localStorage.setItem("theme",e)},children:(0,r.jsx)(l.g,{icon:"dark"===d?n.oMq:n.PJS})}),(0,r.jsx)("ul",{className:"navbar-nav navbar-align",children:(0,r.jsx)("li",{className:"nav-item dropdown",children:(0,r.jsxs)("div",{className:"nav-link dropdown-toggle",children:[(0,r.jsx)("img",{src:"data:image/jpeg;base64,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",alt:"User",className:"user-image"}),(0,r.jsx)("span",{className:"user-name",children:"Jeff Liu"})]})})})]})}}}]);
//# sourceMappingURL=887.0b4194b9.chunk.js.map