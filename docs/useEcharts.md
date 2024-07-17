# 如何在 vue3 中封装 useEcharts

以下是代码：
首先需要按需加载 echarts
通过 use() 使用需要的组件

```ts
import * as echarts from 'echarts/core';
import {
  onMounted,
  onUnmounted,
  onUpdated,
  watchEffect,
  shallowRef,
  type Ref,
  watch,
  onBeforeMount,
} from 'vue';
import type { ECharts, EChartsCoreOption } from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent, // 数据集组件
  TransformComponent, // 内置数据转换器组件 (filter, sort)
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

export default function useEcharts(
  elRef: Ref<HTMLElement | null>,
  options: EChartsCoreOption
): any {
  const { use, init } = echarts;
  const chartInstance = shallowRef<ECharts | null>(null);
  use([
    BarChart,
    LineChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DatasetComponent,
    TransformComponent,
    CanvasRenderer,
    LabelLayout,
    UniversalTransition,
  ]);

  const setOption = (options: EChartsCoreOption) => {
    chartInstance.value && chartInstance.value.setOption(options);
  };
  const initChart = () => {
    if (elRef.value && options) {
      chartInstance.value = init(elRef.value);
      setOption(options);
      window.addEventListener('resize', resize);
    }
  };

  const resize = () => {
    if (chartInstance.value) {
      chartInstance.value.resize();
    }
  };

  onMounted(() => {
    initChart();
  });

  onUnmounted(() => {
    chartInstance.value = null;
    window.removeEventListener('resize', resize);
  });

  return {
    chartInstance,
  };
}
```

使用的代码事例

```ts
import useEcharts from '@/hooks/useEcharts';
import { ref, onMounted, nextTick, type Ref } from 'vue';

const chartRef: Ref<HTMLElement | null> = ref(null);
const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
};
useEcharts(chartRef, options);
```

```html
<template>
  <div class="wrapper">
    <div ref="chartRef" style="height: 300px"></div>
  </div>
</template>
```

:::warning

在使用的时候 div 的宽度设置为 width: 100% 或者不设置，如果设置固定宽度，Echarts.resize() 方法会失效

:::
