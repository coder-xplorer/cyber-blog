import SwitchTabs from "../../src/components/SwitchTabs";

# 切换 Tab 的实现

由于业务需要，封装一个 Tab 组件，实现切换 Tab 的功能。

组件如下：

<SwitchTabs
defaultVal={'Tab1'}
dataOptions={[{label: 'Tab1',name: 'tab1'},{label: 'Tab2',name: 'tab2'},{label: 'Tab3',name: 'tab3'} ]}>
</SwitchTabs>

### 踩坑记录

**虽然是一个简单的组件，但是实现的时候还是遇到了一些问题**

- 给每个 tab item 设置边框的时候，会导致中间边框重叠；

具体解决思路是设置 tab-item 的 border-left 设置为 none；
第一个 tab 添加 border-left: 1px; 最后一个 tab 设置 border-left: none; **同时给除了第一个 tab 设置一个定位的宽度 1px(相当于把 borer-left 的宽度， 使用定位 width: 1px；去实现了，同时要设置 background-color: transparent)**

```css
&:first-child {
  border-left: 1px solid #eaeaea;
}

&:last-child {
  border-left: none;
  border-right: 1px solid #eaeaea;
  border-start-end-radius: 4px;
  border-end-end-radius: 4px;
}

&:not(:first-child)::before {
  content: '';
  position: absolute;
  width: 1px;
  height: calc(100% + 2px);
  left: -1px;
  top: -1px;
  background-color: transparent;
  z-index: 1;
}
```

### 全部代码

以下是使用 vue3 实现的

```ts
interface Option {
  name: string;
  label: string;
}
const props = defineProps<{
  dataOptions: Option[];
}>();
const currentData = defineModel();

const handleChange = (label: string) => {
  currentData.value = label;
};
```

```html
<div class="switch-data">
  <div
    v-for="item in props.dataOptions"
    :key="item.label"
    :class="{
        'item-date': true,
        'only-one': props.dataOptions.length === 1,
        'is-active': currentData === item.label,
      }"
    @click="handleChange(item.label)"
  >
    {{ item.name }}
  </div>
</div>
```

```css
.switch-data {
  display: inline-flex;
  .item-date {
    border: 1px solid #eaeaea;
    border-left: none;
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    padding: 6px 30px;
    cursor: pointer;
    position: relative;

    &:first-child {
      border-left: 1px solid #eaeaea;
      border-start-start-radius: 4px;
      border-end-start-radius: 4px;
    }
    &:last-child {
      border-left: none;
      border-right: 1px solid #eaeaea;
      border-start-end-radius: 4px;
      border-end-end-radius: 4px;
    }
    &:not(:first-child)::before {
      content: '';
      position: absolute;
      width: 1px;
      height: calc(100% + 2px);
      left: -1px;
      top: -1px;
      background-color: #eaeaea;
      z-index: 1;
    }
  }

  /** 只有一个tabs时的处理 */
  .only-one {
    &:last-child {
      border-left: 1px solid #eaeaea;
    }
  }

  .is-active {
    border-color: #2076ff;
    color: #2076ff;
    z-index: 1;
    &:first-child {
      border-left-color: #2076ff;
      border-right-color: #2076ff;
    }
    &:not(:first-child)::before {
      background-color: #2076ff;
    }
    &:last-child {
      border-right: 1px solid #2076ff;
    }
  }
}
```
