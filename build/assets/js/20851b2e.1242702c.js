"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[181],{2465:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var s=t(3251),r=t(9024);const a={sidebar_position:1},i="Iframe \u901a\u4fe1",o={id:"iframe-communication",title:"Iframe \u901a\u4fe1",description:"\u9700\u6c42\u80cc\u666f",source:"@site/docs/iframe-communication.md",sourceDirName:".",slug:"/iframe-communication",permalink:"/docs/iframe-communication",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"\u6848\u4f8b\u5b9e\u73b0",permalink:"/docs/case/"}},c={},l=[{value:"\u9700\u6c42\u80cc\u666f",id:"\u9700\u6c42\u80cc\u666f",level:3},{value:"\u89e3\u51b3\u65b9\u6848",id:"\u89e3\u51b3\u65b9\u6848",level:3},{value:"1\u3001\u901a\u8fc7 URl \u4f20\u9012\u53c2\u6570",id:"1\u901a\u8fc7-url-\u4f20\u9012\u53c2\u6570",level:4},{value:"2\u3001\u901a\u8fc7 postMessage \u65b9\u6cd5",id:"2\u901a\u8fc7-postmessage-\u65b9\u6cd5",level:4},{value:"3\u3001\u4f7f\u7528\u7b2c\u4e09\u65b9\u5305 Postmate",id:"3\u4f7f\u7528\u7b2c\u4e09\u65b9\u5305-postmate",level:4}];function d(e){const n={code:"code",h1:"h1",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"iframe-\u901a\u4fe1",children:"Iframe \u901a\u4fe1"}),"\n",(0,s.jsx)(n.h3,{id:"\u9700\u6c42\u80cc\u666f",children:"\u9700\u6c42\u80cc\u666f"}),"\n",(0,s.jsx)(n.p,{children:"\u5728\u5de5\u4f5c\u4e2d\uff0c\u6211\u4eec\u4f1a\u9047\u5230\u4e00\u4e9b\u9700\u6c42\uff0c\u4f7f\u7528 iframe \u5d4c\u5957\u53e6\u4e00\u4e2a\u9875\u9762\uff0c\u8fd9\u4e2a\u9875\u9762\u5927\u90e8\u5206\u60c5\u51b5\u4e0b\u4e0d\u4f1a\u90e8\u7f72\u5728\u7236\u9875\u9762\u76f8\u540c\u7684\u57df\u540d\u4e0b\uff0c\u4f46\u662f\u53c8\u9700\u8981\u7236\u5b50\u9875\u9762\u8fdb\u884c\u6570\u636e\u4ea4\u4e92\uff0c\u90a3\u4e48\u6211\u4eec\u8be5\u600e\u4e48\u5904\u7406\u5462\uff1f"}),"\n",(0,s.jsx)(n.h3,{id:"\u89e3\u51b3\u65b9\u6848",children:"\u89e3\u51b3\u65b9\u6848"}),"\n",(0,s.jsx)(n.h4,{id:"1\u901a\u8fc7-url-\u4f20\u9012\u53c2\u6570",children:"1\u3001\u901a\u8fc7 URl \u4f20\u9012\u53c2\u6570"}),"\n",(0,s.jsxs)(n.p,{children:["\u53ea\u9700\u5c06\u53c2\u6570\u62fc\u63a5\u5230 url \u4e0a\u5373\u53ef\uff0c",(0,s.jsx)(n.strong,{children:"\u9002\u7528\u4e8e\u53c2\u6570\u56fa\u5b9a\u4e14\u4e0d\u9700\u8981\u590d\u6742\u901a\u8baf\u7684\u573a\u666f"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-javascript",children:"// \u83b7\u53d6 url \u53c2\u6570\nconst urlParams = new URLSearchParams(location.search);\nconst val = urlParams.get('key');\n"})}),"\n",(0,s.jsx)(n.h4,{id:"2\u901a\u8fc7-postmessage-\u65b9\u6cd5",children:"2\u3001\u901a\u8fc7 postMessage \u65b9\u6cd5"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",metastring:'title="\u5b50\u9875\u9762\u5411\u7236\u9875\u9762\u4f20\u9012"',children:"/**\n * message \u53d1\u9001\u7684\u6d88\u606f\u5185\u5bb9 \u53ef\u4ee5\u662f\u4efb\u610f\u7c7b\u578b\u7684\u6570\u636e\uff0c\u5982\u5b57\u7b26\u4e32\u3001\u5bf9\u8c61\u7b49\u3002\n * targetOrigin \u76ee\u6807\u7a97\u53e3\u7684\u6e90\uff0c\u7528\u4e8e\u9650\u5236\u63a5\u6536\u6d88\u606f\u7684\u7a97\u53e3\u3002\u53ef\u4ee5\u662f\u5177\u4f53\u7684URL\u6216\u901a\u914d\u7b26(*)\n */\n\nwindow.parent.postMessage(message, targetOrigin);\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",metastring:'title="\u7236\u9875\u9762\u5411\u5b50\u9875\u9762\u4f20\u9012"',children:"let send = document.getElementById('iframeContainer').contentWindow;\nsend.postMessage('\u6211\u662f\u7236\u9875\u9762\u53d1\u7684\u6570\u636e', '*');\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",metastring:'title="\u76d1\u542c\u4f20\u9012\u7684\u6d88\u606f"',children:"useEffect(() => {\n  const fn = () => {\n    // \u68c0\u67e5\u6d88\u606f\u6e90\uff0c\u786e\u4fdd\u53ea\u63a5\u6536\u6765\u81ea\u7279\u5b9a\u6e90\u7684\u6d88\u606f\n    if (event.origin === allowedOrigin) {\n      // \u5904\u7406\u63a5\u6536\u5230\u7684\u6d88\u606f\n      const message = event.data;\n    }\n  };\n  window.addEventListener('message', fn);\n  return () => {\n    window.removeEventListener('message', fn);\n  };\n}, []);\n"})}),"\n",(0,s.jsx)(n.h4,{id:"3\u4f7f\u7528\u7b2c\u4e09\u65b9\u5305-postmate",children:"3\u3001\u4f7f\u7528\u7b2c\u4e09\u65b9\u5305 Postmate"})]})}function m(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},9024:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>i});var s=t(8658);const r={},a=s.createContext(r);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);