"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[331],{2331:(e,o,a)=>{a.r(o),a.d(o,{default:()=>c});var t=a(65043),n=a(83910),s=a(97929);const r="http://localhost:5003/api";var l=a(70579);const i=()=>{const[e,o]=(0,t.useState)(""),[a,i]=(0,t.useState)(""),[c,p]=(0,t.useState)(!1),[g,d]=(0,t.useState)(0),[u,h]=(0,t.useState)(null),[f,m]=(0,t.useState)(""),[w,y]=(0,t.useState)([]),j=(0,t.useRef)(null);(0,t.useEffect)((()=>{j.current&&(j.current.style.height="auto",j.current.style.height=`${j.current.scrollHeight}px`)}),[e]);const I=async()=>{const a=(new Date).getTime();if(a-g<1e3)alert("Please wait a moment before making another request.");else{p(!0),y([...w,{role:"user",content:e}]);try{let o;u?(console.log("Uploading file:",u),o="image"===f?await(async e=>{const o=new FormData;o.append("file",e);try{console.log("Uploading file to OpenAI API:",e);const a=await fetch(`${r}/upload-image`,{method:"POST",body:o});if(!a.ok){const e=await a.json();throw console.error("Error response from OpenAI API:",e),new Error(`Network response was not ok: ${e.error}`)}const t=await a.json();return console.log("Received response from OpenAI API:",t),t}catch(a){throw console.error("Error uploading image:",a),a}})(u):await(async e=>{const o=new FormData;o.append("file",e);try{console.log("Uploading file to OpenAI API:",e);const a=await fetch(`${r}/upload-chart`,{method:"POST",body:o});if(!a.ok){const e=await a.json();throw console.error("Error response from OpenAI API:",e),new Error(`Network response was not ok: ${e.error}`)}const t=await a.json();return console.log("Received response from OpenAI API:",t),t}catch(a){throw console.error("Error uploading chart:",a),a}})(u)):(console.log("Sending message:",e),o=await(async e=>{try{console.log("Sending message to OpenAI API:",e);const o=await fetch(`${r}/test-openai`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:e})});if(!o.ok){const e=await o.json();throw console.error("Error response from OpenAI API:",e),new Error(`Network response was not ok: ${e.error}`)}const a=await o.json();return console.log("Received response from OpenAI API:",a),a}catch(o){throw console.error("Error fetching OpenAI test data:",o),o}})(e)),console.log("Received response:",o),y((e=>[...e,{role:"assistant",content:o.content}])),i(o.content),d(a)}catch(t){console.error("Error sending message:",t),alert("Failed to send message. Please try again.")}finally{p(!1),h(null),o("")}}};return(0,l.jsxs)("div",{className:"chat-agent",onDrop:e=>{e.preventDefault(),e.stopPropagation();const o=e.dataTransfer.files[0];o&&!["text/csv","application/json","image/png","image/jpeg"].includes(o.type)?(alert("Please upload a CSV, JSON, PNG, or JPEG file."),h(null),m("")):(h(o),m(o.type.startsWith("image")?"image":"chart"))},onDragOver:e=>{e.preventDefault()},children:[(0,l.jsx)("div",{className:"messages",children:w.map(((e,o)=>(0,l.jsx)("div",{className:`message ${e.role}`,children:e.content},o)))}),(0,l.jsxs)("div",{className:"input-container",children:[(0,l.jsxs)("label",{className:"file-label",htmlFor:"file-upload",children:[(0,l.jsx)(n.g,{icon:s.WMI,className:"file-upload-icon"}),(0,l.jsx)("input",{type:"file",id:"file-upload",onChange:e=>{const o=e.target.files[0];o&&!["text/csv","application/json","image/png","image/jpeg"].includes(o.type)?(alert("Please upload a CSV, JSON, PNG, or JPEG file."),h(null),m("")):(h(o),m(o.type.startsWith("image")?"image":"chart"))},"aria-label":"File upload"})]}),(0,l.jsx)("textarea",{ref:j,value:e,onChange:e=>{o(e.target.value)},onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),I())},placeholder:"Type your message here...","aria-label":"Chat input",rows:"1"}),(0,l.jsx)("button",{onClick:I,disabled:c,"aria-label":"Send message",children:(0,l.jsx)(n.g,{icon:s.isI})})]})]})},c=()=>(0,l.jsx)("div",{className:"chart-analysis-page",children:(0,l.jsx)(i,{})})}}]);
//# sourceMappingURL=331.a468c099.chunk.js.map