"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[811],{2811:(e,a,s)=>{s.r(a),s.d(a,{default:()=>o});var t=s(5043),i=s(6213);s(9661);var l=s(7417),c=s(4505),r=s(8155),n=s(579);const o=()=>{const[e,a]=(0,t.useState)([]),[s,o]=(0,t.useState)(null),[d,p]=(0,t.useState)(!1),[h,u]=(0,t.useState)(!0),[m,v]=(0,t.useState)(null);(0,t.useEffect)((()=>{(async()=>{try{const e=await(async()=>{try{const e=await i.A.get("https://www.googleapis.com/youtube/v3/search",{params:{part:"snippet",channelId:"UC44-XCDTGmDYOX75XL0cpbQ",maxResults:10,key:"AIzaSyDYkeU_15eMwSNkLDgtnupPfAE14Vc-ZrI"}});return console.log("API Response:",e.data),e.data.items}catch(m){throw console.error("Error fetching YouTube videos:",m),m}})();a(e)}catch(m){v("Failed to fetch videos. Please try again later."),console.error("Error fetching videos:",m)}finally{u(!1)}})()}),[]);const w=()=>{p(!1),o(null)};return(0,n.jsxs)("div",{className:"container mt-4",children:[(0,n.jsx)("h1",{className:"education-title page-title",children:"Education Page"}),h?(0,n.jsx)(l.A,{animation:"border",variant:"primary"}):m?(0,n.jsx)("div",{className:"alert alert-danger",children:m}):(0,n.jsx)("div",{className:"videos-container",children:e.map(((e,a)=>(0,n.jsxs)("div",{className:"video-card",onClick:()=>(e=>{o(e),p(!0)})(e),children:[(0,n.jsx)("img",{src:e.snippet.thumbnails.high.url,alt:e.snippet.title,className:"video-thumbnail"}),(0,n.jsxs)("div",{className:"video-info",children:[(0,n.jsx)("h3",{className:"video-title",children:e.snippet.title}),(0,n.jsx)("p",{className:"video-channel",children:e.snippet.channelTitle}),(0,n.jsx)("p",{className:"video-date",children:new Date(e.snippet.publishedAt).toLocaleDateString()})]})]},e.id.videoId||a)))}),(0,n.jsxs)(c.A,{show:d,onHide:w,centered:!0,size:"xl",dialogClassName:"custom-modal",children:[(0,n.jsx)(c.A.Header,{className:"border-0 p-0",children:(0,n.jsx)(r.A,{variant:"close",onClick:w,"aria-label":"Close",className:"modal-close-button"})}),(0,n.jsx)(c.A.Body,{className:"p-0",children:s&&(0,n.jsx)("div",{className:"video-wrapper",children:(0,n.jsx)("iframe",{width:"100%",height:"500",src:`https://www.youtube.com/embed/${s.id.videoId}?autoplay=1`,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:s.snippet.title})})})]})]})}}}]);
//# sourceMappingURL=811.cef0739a.chunk.js.map