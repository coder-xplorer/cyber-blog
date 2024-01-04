# WebComponent

**webComponent 原生组件 具有天然的隔离性、兼容性，同时可以使用 react、vue 组件接入到原生组件中**

## WebComponent 用法

- [查看 MDN 的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)
- [关于 customElements 的文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/customElements)

### 最基础的 WebComponent

```javaScript
class Webcomp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div>hello wrold</div>`
  }
}

if(!customElements.get("ele-xxx") {
  customElements.define("ele-xxx", Webcomp);
}
```

### 监听属性变化

```javaScript
class WebComp extends HTMLElement {
  // 设置监听 val 属性
  static observedAttributes = ["val"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div>hello wrold</div>`
  }

  attributeChangedCallback(name, oldVlue, newValue) {
    console.log(`属性 ${name} 已由 ${oldVlue} 变更为 ${newValue}`);
  }
}

if(!customElements.get("ele-xxx") {
  customElements.define("ele-xxx", Webcomp);
}
```

### 简单的 React 组件转换为 WebComponent

```javaScript
import React from "react";
import ReactDOM from "react-dom";
import ReactComp from "./ReactComp.js";

class WebComp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div class="root">hello wrold</div>`;
    ReactDOM.render(<ReactComp />, this.querySelector(".root"));
  }
}

if(!customElements.get("ele-xxx") {
  customElements.define("ele-xxx", Webcomp);
}
```

### 向 React 组件传递参数

```javaScript
import React from "react";
import ReactDOM from "react-dom";
import ReactComp from "./ReactComp.js";

class WebComp extends HTMLElement {
  static get observedAttributes() {
    return ["data"];
  }

  constructor() {
    super();
  }

  get data() {
    return this.getAttribute("data");
  }

  connectedCallback() {
    this.innerHTML = `<div class="root">hello wrold</div>`;
    this.render();
  }

  attributeChangedCallback(name, oldVlue, newValue) {
    console.log(`属性 ${name} 已由 ${oldVlue} 变更为 ${newValue}`);
    this.render();
  }

  render() {
    ReactDOM.render(<ReactComp data={this.data} />, this);
  }
}

if(!customElements.get("ele-xxx") {
  customElements.define("ele-xxx", Webcomp);
}
```
