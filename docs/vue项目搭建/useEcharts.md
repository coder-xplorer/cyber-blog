# 如何在 vue3 中封装 useEcharts

以下是代码：
首先需要按需加载 echarts
通过 use() 使用需要的组件

:::warning

- 在使用的时候，div 的宽度设置为 width: 100%，如果设置固定宽度，Echarts.resize() 方法会失效；
- 在 useEcharts 中定义 Echarts 的实例要使用 shallowRef，而不是 ref，如果使用 ref，会报 type 类型错误。不要使用 ref 或 reactive 包装 echarts 实例。 使用公共变量或 shallowRef 以避免对 echarts 实例进行深度监视。
  :::

### useEcharts 封装

```ts title="@/hooks/useEcharts"
import * as echarts from 'echarts/core';
import { onUnmounted, type Ref, shallowRef, ref, unref } from 'vue';
import type { ECharts, EChartsCoreOption } from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
  PictorialBarChart,
  GaugeChart,
  RadarChart,
} from 'echarts/charts';
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

export type EChartsOption = EChartsCoreOption;
export default function useEcharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  const { use, init } = echarts;
  let chartInstance = shallowRef<ECharts | null>(null);
  let cacheOptions: Ref<EChartsCoreOption> = ref({});

  use([
    BarChart,
    LineChart,
    PieChart,
    GaugeChart,
    RadarChart,
    PictorialBarChart,
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

  const resize = () => {
    if (chartInstance.value) {
      chartInstance.value.resize();
    }
  };

  const initChart = (t = theme) => {
    const el = unref(elRef);
    if (!el) return;
    chartInstance.value = init(el, t);
    window.addEventListener('resize', resize);
  };

  const setChartOption = (options: EChartsCoreOption, clear = true) => {
    cacheOptions.value = options;
    if (!chartInstance?.value) initChart();
    clear && chartInstance.value?.clear();
    if (chartInstance.value) {
      chartInstance.value?.setOption(options);
    }
  };

  const clearChart = () => {
    if (chartInstance.value) {
      chartInstance.value?.dispose();
      chartInstance.value = null;
    }
  };

  onUnmounted(() => {
    clearChart();
    window.removeEventListener('resize', resize);
  });

  return {
    chartInstance,
    initChart,
    setChartOption,
  };
}
```

### 公共 ChartComp 组件封装

```ts
<script setup lang="ts">
import useEcharts, { type EChartsOption } from '@/hooks/useEcharts';
import { nextTick } from 'vue';
import { ref, watch, type Ref } from 'vue';

interface Props {
  chartOptions: EChartsOption; // echarts options
}

const chartRef: Ref<HTMLDivElement | null> = ref(null);
const { setChartOption } = useEcharts(chartRef as Ref<HTMLDivElement>);
const props = defineProps<Props>();

watch(
  () => props.chartOptions,
  (newVal) => {
    nextTick(() => {
      setChartOption(newVal);
    });
  },
  { immediate: true }
);
</script>
<template>
  <div ref="chartRef"></div>
</template>

<style></style>
```

### 使用的代码事例

```ts title="vue"
import useEcharts from '@/hooks/useEcharts';
import { ref, onMounted, type Ref } from 'vue';

const chartRef: Ref<HTMLElement | null> = ref(null);
const { setChartOption } = useEcharts(chartRef as Ref<HTMLDivElement>);
onMounted(() => {
  setChartOption({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      show: true,
    },
    grid: {
      left: '30',
      right: '30',
      bottom: '30',
      top: '30',
    },
    toolbox: {
      show: false,
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: [2021, 2022, 2023, 2024, 2025],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
      {
        type: 'value',
        interval: 5,
        min: 0,
        max: 10,
      },
    ],
    series: [
      {
        name: '发电量',
        type: 'bar',
        data: [12, 23, 32, 43, 13],
        yAxisIndex: 0,
      },
      {
        name: '上网电量',
        type: 'bar',
        yAxisIndex: 0,
        data: [13, 22, 33, 43, 89],
      },
      {
        name: '风速',
        type: 'bar',
        yAxisIndex: 1,
        data: [32, 32, 11, 22, 56],
      },
    ],
  });
});
```

```html title="html"
<template>
  <div class="wrapper">
    <div ref="chartRef" style="height: 300px"></div>
  </div>
</template>
```
