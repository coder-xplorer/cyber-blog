(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{372:function(t,s,a){"use strict";a.r(s);var n=a(44),p=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"grid-网格布局"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#grid-网格布局"}},[t._v("#")]),t._v(" Grid 网格布局")]),t._v(" "),a("blockquote",[a("p",[t._v("网格布局（Grid）是最强大的 CSS 布局方案。IE10+支持, 它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。")])]),t._v(" "),a("p",[t._v('Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。')]),t._v(" "),a("p",[t._v('Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。')]),t._v(" "),a("p",[t._v("指定一个容器采用网格布局。注意，设为网格布局以后，容器子元素（项目）的 float、display: inline-block、display: table-cell、vertical-align 和 column-*等设置都将失效。")]),t._v(" "),a("h2",{attrs:{id:"容器属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#容器属性"}},[t._v("#")]),t._v(" 容器属性")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".box")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 容器指定了网格布局以后，接着就要划分行和列。\n     grid-template-columns属性定义每一列的列宽。\n     grid-template-rows属性定义每一行的行高。\n  */")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" grid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-columns")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px 100px 100px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-rows")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100px 100px 100px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 也可以使用% */")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-columns")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 33.33% 33.33% 33.33%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-rows")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 33.33% 33.33% 33.33%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 可以使用repeat()函数，简化重复的值 */")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-columns")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("repeat")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 33.33%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-rows")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("repeat")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 33.33%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 或者使用fr */")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-columns")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1fr 1fr 1fr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("grid-template-rows")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1fr 1fr 1fr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*设置列间距*/")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("column-gap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 24px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*设置行间距*/")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("row-gap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 24px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*统一设置间距*/")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("gap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 24px 24px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*水平方向对齐*/")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("align-items")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" conter || end"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*垂直方向对齐*/")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("justify-item")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" center || end || space-between"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=p.exports}}]);