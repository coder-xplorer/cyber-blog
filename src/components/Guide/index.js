import React, { useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Styles from './index.module.css';

/**
 * @param {蒙层} cover
 * @param {目标元素} target
 * @param {占位元素} template
 * @param {宽度} width
 * @param {离顶部的距离} offset
 */
// const coverGuide = (cover, target, template, width = 0, offset = 0) => {
//   const body = document.body;
//   const doc = document.documentElement;

//   if (cover && target && template) {
//     const targetWidth = target.clientWidth + width;
//     const targetHeight = target.clientHeight + width;

//     const pageHeight = doc.scrollHeight;
//     const pageWidth = doc.scrollWidth;

//     const elementRect = target.getBoundingClientRect();
//     const offsetTop = elementRect.top + (body.scrollTop || doc.scrollTop);
//     const offsetLeft = elementRect.left + (body.scrollLeft || doc.scrollLeft);

//     //滚动到指定位置
//     doc.scrollTop = offsetTop - 50;

//     template.style.width = targetWidth + 'px';
//     template.style.height = targetHeight + 'px';

//     cover.style.width = targetWidth + 'px';
//     cover.style.height = targetHeight + 'px';

//     const top = offsetTop - offset;
//     const bottom = pageHeight - targetHeight - offsetTop;

//     cover.style.borderWidth =
//       top +
//       'px ' +
//       (pageWidth - targetWidth - offsetLeft) +
//       'px ' +
//       bottom +
//       'px ' +
//       offsetLeft +
//       'px';

//     cover.style.display = 'block';
//     // 禁止页面滚动
//     body.style.overflow = 'hidden';
//   }
// };

export default () => {
  return (
    <BrowserOnly>
      <div>敬请期待</div>
    </BrowserOnly>
  );
};
