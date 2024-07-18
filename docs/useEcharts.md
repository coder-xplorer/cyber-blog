# 如何在 vue3 中封装 useEcharts

以下是代码：
首先需要按需加载 echarts
通过 use() 使用需要的组件

:::warning

- 在使用的时候，div 的宽度设置为 width: 100%，如果设置固定宽度，Echarts.resize() 方法会失效；
- 在 useEcharts 中定义 Echarts 的实例要使用 shallowRef，而不是 ref，如果使用 ref，会报 type 类型错误。不要使用 ref 或 reactive 包装 echarts 实例。 使用公共变量或 shallowRef 以避免对 echarts 实例进行深度监视。
  :::

```ts title="@/hooks/useEcharts"
import * as echarts from 'echarts/core';
import { onMounted, onUnmounted, shallowRef, type Ref } from 'vue';
import type { ECharts, EChartsCoreOption } from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent, // 数据集组件
  TransformComponent, // 内置数据转换器组件 (filter, sort)
  ToolboxComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

export default function useEcharts(
  elRef: Ref<HTMLElement | null>,
  options: EChartsCoreOption
): {
  chartInstance: ECharts | null;
  updateChart: (options: EChartsCoreOption) => void;
} {
  const { use, init } = echarts;
  let chartInstance: ECharts | null = null;
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
    ToolboxComponent,
  ]);

  const handleSetOption = (options: EChartsCoreOption) => {
    chartInstance && chartInstance?.setOption(options);
  };
  const initChart = () => {
    if (elRef.value && options) {
      if (!chartInstance) {
        chartInstance = init(elRef.value);
      }
      handleSetOption(options);
      window.addEventListener('resize', resize);
    }
  };

  const updateChart = (options: EChartsCoreOption) => {
    if (!chartInstance) initChart();
    chartInstance?.clear();
    chartInstance?.setOption(options);
  };

  const resize = () => {
    if (chartInstance) {
      chartInstance.resize();
    }
  };

  const clearChart = () => {
    chartInstance?.dispose();
    chartInstance = null;
  };

  onMounted(() => {
    initChart();
  });

  onUnmounted(() => {
    clearChart();
    window.removeEventListener('resize', resize);
  });

  return {
    chartInstance,
    updateChart,
  };
}
```

使用的代码事例

```ts title="vue"
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

```html title="html"
<template>
  <div class="wrapper">
    <div ref="chartRef" style="height: 300px"></div>
  </div>
</template>
```
