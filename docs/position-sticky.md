import Sticky from "../src/components/Sticky"

# position：sticky 案例实现

**设置了<code>position:sticky</code>的元素并不会脱离文档流。**

- 当元素在区域内，元素不受定位的影响（<code>top</code>、<code>left</code>等设置无效）
- 当发生滚动，元素就要移出区域时，定位又会变成<code>fixed</code>，根据设置的<code>left</code>、<code>top</code>的值进行定位，像是<code>fixed</code>效果

## 案例

<Sticky></Sticky>

## 代码

```jsx
import styles from './index.module.css';

export default () => {
  return (
    <div className={styles.stickyContainer}>
      <div className={styles.header}>Header</div>
      <main>
        <div className={styles.tabs}>
          <div className={styles.btn}>Tab1</div>
          <div className={styles.btn}>Tab2</div>
        </div>
        <div style={{ padding: '12px' }}>
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return <div className={styles.cardBox}>请向下滑动</div>;
          })}
        </div>
      </main>
    </div>
  );
};
```

```css
.stickyContainer {
  width: 380px;
  height: 580px;
  background: #f5f6f7;
  border-radius: 15px;
  overflow: hidden;
  overflow-y: scroll;
}

.header {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
}

.tabs {
  position: sticky;
  top: 0;
  box-shadow: 0 -1px #fff;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-radius: 3px;
  padding: 0px 12px;
}

.btn {
  display: inline-block;
  color: var(--ifm-color-primary-light);
  margin-right: 12px;
  font-size: 14px;
  font-weight: 500;
}

.cardBox {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: #fff;
  margin-bottom: 12px;
  border-radius: 6px;
  font-weight: 500;
}
```
