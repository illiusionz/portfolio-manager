"use strict";(self.webpackChunkfinance_app=self.webpackChunkfinance_app||[]).push([[99],{32099:(e,t,n)=>{n.d(t,{Mz:()=>u});function o(e){if("function"!==typeof e)throw new TypeError(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected a function, instead received "+typeof e)}var r=e=>Array.isArray(e)?e:[e];function c(e){const t=Array.isArray(e[0])?e[0]:e;return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected all items to be functions, instead received the following types: ";if(!e.every((e=>"function"===typeof e))){const n=e.map((e=>"function"===typeof e?`function ${e.name||"unnamed"}()`:typeof e)).join(", ");throw new TypeError(`${t}[${n}]`)}}(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}Symbol(),Object.getPrototypeOf({});var s="undefined"!==typeof WeakRef?WeakRef:class{constructor(e){this.value=e}deref(){return this.value}};function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={s:0,v:void 0,o:null,p:null};const{resultEqualityCheck:o}=t;let r,c=0;function i(){let t=n;const{length:i}=arguments;for(let e=0,n=i;e<n;e++){const n=arguments[e];if("function"===typeof n||"object"===typeof n&&null!==n){let e=t.o;null===e&&(t.o=e=new WeakMap);const o=e.get(n);void 0===o?(t={s:0,v:void 0,o:null,p:null},e.set(n,t)):t=o}else{let e=t.p;null===e&&(t.p=e=new Map);const o=e.get(n);void 0===o?(t={s:0,v:void 0,o:null,p:null},e.set(n,t)):t=o}}const l=t;let u;if(1===t.s)u=t.v;else if(u=e.apply(null,arguments),c++,o){const e=r?.deref?.()??r;null!=e&&o(e,u)&&(u=e,0!==c&&c--);r="object"===typeof u&&null!==u||"function"===typeof u?new s(u):u}return l.s=1,l.v=u,u}return i.clearCache=()=>{n={s:0,v:void 0,o:null,p:null},i.resetResultsCount()},i.resultsCount=()=>c,i.resetResultsCount=()=>{c=0},i}function l(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];const l="function"===typeof e?{memoize:e,memoizeOptions:n}:e,u=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];let s,u=0,p=0,a={},f=t.pop();"object"===typeof f&&(a=f,f=t.pop()),o(f,`createSelector expects an output function after the inputs, but received: [${typeof f}]`);const y={...l,...a},{memoize:d,memoizeOptions:v=[],argsMemoize:h=i,argsMemoizeOptions:m=[],devModeChecks:g={}}=y,b=r(v),w=r(m),j=c(t),k=d((function(){return u++,f.apply(null,arguments)}),...b);const z=h((function(){p++;const e=function(e,t){const n=[],{length:o}=e;for(let r=0;r<o;r++)n.push(e[r].apply(null,t));return n}(j,arguments);return s=k.apply(null,e),s}),...w);return Object.assign(z,{resultFunc:f,memoizedResultFunc:k,dependencies:j,dependencyRecomputations:()=>p,resetDependencyRecomputations:()=>{p=0},lastResult:()=>s,recomputations:()=>u,resetRecomputations:()=>{u=0},memoize:d,argsMemoize:h})};return Object.assign(u,{withTypes:()=>u}),u}var u=l(i),p=Object.assign((function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u;!function(e){if("object"!==typeof e)throw new TypeError(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected an object, instead received "+typeof e)}(e,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);const n=Object.keys(e),o=t(n.map((t=>e[t])),(function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return t.reduce(((e,t,o)=>(e[n[o]]=t,e)),{})}));return o}),{withTypes:()=>p})}}]);
//# sourceMappingURL=99.47871d13.chunk.js.map