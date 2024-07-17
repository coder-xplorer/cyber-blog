# JavaScript 篇

:::tip
高频面试题
:::

## 1、数组去重

### 基本类型的数组去重

```javascript
const list = [1, 2, 2, 3, 3, 4];

//Set 是 JavaScript 中的一种数据结构，它只存储唯一的值。你可以将数组转换为 Set，然后再将 Set 转换回数组，这样就可以去除重复的元素。
console.log(Array.from(new Set(list))); // 输出： [1, 2, 3, 4]
```

### 复杂类型的数组去重
