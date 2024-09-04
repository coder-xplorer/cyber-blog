# Echart 实现圆形柱状图

[Echarts Demo 集](https://www.isqqw.com/)

如何要实现不同形状的或者样式的图形，大概思路就是，series 中设置多个值，每个值负责不同的展示，需要注意的是需要设置他们的层级。

```js
{
    animation: false,
    grid: {
      top: '15%',
      right: 0,
      left: 0,
      bottom: 20,
    },
    xAxis: [
      {
        data: [xData],
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        show: false,
        max: 100,
      },
    ],
    series: [
      {
        // 真实数据
        barMinHeight: 10,
        silent: true,
        data: item.rate > 100 ? [100] : [item.rate],
        name: '数据顶部圆片',
        type: 'pictorialBar', //指定类型
        symbol:
          'path://M0 6.14035a26.4706 6.14035 0 1 0 52.9412 0a26.4706 6.14035 0 1 0 -52.9412 0z',
        symbolSize: ['130%', 5], //指定大小，[宽,高]
        symbolOffset: [0, -2], //位置偏移 [右，下] 负数反方向
        z: 12, // 层级（优先级展示）
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#56A4FF',
            },
            {
              offset: 1,
              color: '#2D79D1',
            },
          ]),
        },
        symbolPosition: 'end',
      },
      {
        name: '底部圆',
        silent: true,
        type: 'pictorialBar',
        symbol:
          'path://M0 6.85965a26.4706 6.14035 0 1 0 52.9412 0a26.4706 6.14035 0 1 0 -52.9412 0z',
        symbolSize: ['130%', 5],
        barMinHeight: 10,
        symbolOffset: [0, 3],
        z: 12,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#1180F9',
            },
            {
              offset: 1,
              color: '#1D88FE',
            },
          ]),
        },
        // 真实数据
        data: [item.rate],
      },
      {
        name: '数据图层',
        type: 'bar',
        z: 3,
        silent: true,
        barWidth: 54,
        barMinHeight: 10,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#0075FA',
            },
            {
              offset: 1,
              color: '#70B6FB',
            },
          ]),
        },
        showBackground: true,
        backgroundStyle: {
          color: '#C9E4FF',
        },
        // 真实数据
        data: [item.rate],
      },
      {
        name: '最顶部圆片(背部阴影最顶部圆片)',
        silent: true,
        type: 'pictorialBar',
        symbol:
          'path://M0 6.14035a26.4706 6.14035 0 1 0 52.9412 0a26.4706 6.14035 0 1 0 -52.9412 0z',
        symbolSize: ['130%', 5],
        symbolOffset: [0, -3],
        z: 3,
        symbolPosition: 'end',
        itemStyle: {
          color: '#B5D9FF',
        },
        // 设置最大数据
        data: [100],
        label: {
          show: true,
          position: 'outside',
          formatter: (params: any) => {
            return '{r|' + item.rate + '%' + '}';
          },
          rich: {
            r: {
              color: '#000',
              fontSize: 14,
              fontWeight: 500,
            },
          },
        },
      },
    ],
  };
```
