<template>
    <div id="chart" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script setup>
  import * as echarts from 'echarts'
  import { onMounted } from 'vue'
  
  onMounted(() => {
    const chartDom = document.getElementById('chart')
    const myChart = echarts.init(chartDom)
  
    const option = {
     
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['当前的', '设定电流', '当前误差', '电压', '设定电压', '电压设定值', '温度', '能量', '送丝速度', '设定送丝速度'],
        orient: 'vertical',
        right: 10,
        top: 'middle'
      },
      toolbox: {
      feature: {
        saveAsImage: { title: '下载图表为PNG格式' },
        dataZoom: {
          yAxisIndex: 'none',
          title: '缩放'
        },
        restore: { title: '重置' },
        dataView: { title: '数据视图', readOnly: false },
        magicType: {
          type: ['line', 'bar'],
          title: {
            line: '折线图',
            bar: '柱状图'
          }
        },
        brush: {
          type: ['rect', 'polygon', 'lineX', 'lineY'],
          title: {
            rect: '矩形框选',
            polygon: '多边形选择',
            lineX: '横向选择',
            lineY: '纵向选择'
          }
        }
      },
      right: 20,
      top: 20
    },
      grid: {
        left: '15%',
        right: '8%',
        top: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0s', '1s', '2s', '3s', '4s', '5s']
      },
      yAxis: [
        {
          type: 'value',
          name: '[A]',
          min: 0,
          max: 450,
          position: 'left',
          axisLine: {
            lineStyle: {
              color: 'orange'
            }
          }
        },
        {
          type: 'value',
          name: '[V]',
          min: 0,
          max: 70,
          position: 'left',
          offset: 60,
          axisLine: {
            lineStyle: {
              color: 'blue'
            }
          }
        },
        {
          type: 'value',
          name: '[W]',
          min: 0,
          max: 6000,
          position: 'left',
          offset: 120,
          axisLine: {
            lineStyle: {
              color: 'purple'
            }
          }
        },
        {
          type: 'value',
          name: '[m/min]',
          min: 0,
          max: 10,
          position: 'left',
          offset: 180,
          axisLine: {
            lineStyle: {
              color: 'green'
            }
          }
        }
      ],
      series: [
        {
          name: '当前的',
          type: 'line',
          data: [50, 150, 200, 180, 210, 100],
          lineStyle: {
            color: 'orange'
          },
          yAxisIndex: 0
        },
        {
          name: '设定电流',
          type: 'line',
          data: [40, 140, 190, 170, 200, 90],
          lineStyle: {
            type: 'dotted',
            color: 'orange'
          },
          yAxisIndex: 0
        },
        {
          name: '当前误差',
          type: 'line',
          data: [10, 10, 10, 10, 10, 10],
          symbol: 'circle',
          lineStyle: {
            color: 'red'
          },
          yAxisIndex: 0
        },
        {
          name: '电压',
          type: 'line',
          data: [20, 30, 40, 50, 60, 70],
          lineStyle: {
            color: 'blue'
          },
          yAxisIndex: 1
        },
        {
          name: '设定电压',
          type: 'line',
          data: [15, 25, 35, 45, 55, 65],
          lineStyle: {
            type: 'dashed',
            color: 'blue'
          },
          yAxisIndex: 1
        },
        {
          name: '电压设定值',
          type: 'line',
          data: [18, 28, 38, 48, 58, 68],
          lineStyle: {
            type: 'dashed',
            color: 'lightblue'
          },
          yAxisIndex: 1
        },
        {
          name: '温度',
          type: 'line',
          data: [30, 32, 35, 37, 33, 34],
          lineStyle: {
            color: 'pink'
          },
          yAxisIndex: 0
        },
        {
          name: '能量',
          type: 'line',
          data: [1000, 2000, 3000, 4000, 5000, 6000],
          lineStyle: {
            color: 'purple'
          },
          yAxisIndex: 2
        },
        {
          name: '送丝速度',
          type: 'line',
          data: [5, 5.5, 6, 6.5, 7, 7.5],
          lineStyle: {
            type: 'dotted',
            color: 'green'
          },
          yAxisIndex: 3
        },
        {
          name: '设定送丝速度',
          type: 'line',
          data: [5.2, 5.7, 6.2, 6.7, 7.2, 7.7],
          lineStyle: {
            type: 'dashed',
            color: 'darkgreen'
          },
          yAxisIndex: 3
        }
      ],
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: 0,
          start: 0,
          end: 100,
          height: 20
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          start: 0,
          end: 100
        }
      ],
      graphic: [
        {
          type: 'line',
          left: '15%', // 对应 [A] 轴位置
          top: '10%',
          shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 400
          },
          style: {
            stroke: 'orange',
            lineWidth: 2
          }
        },
        {
          type: 'line',
          left: '11%', // 对应 [V] 轴位置
          top: '10%',
          shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 400
          },
          style: {
            stroke: 'blue',
            lineWidth: 2
          }
        },
        {
          type: 'line',
          left: '7%', // 对应 [W] 轴位置
          top: '10%',
          shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 400
          },
          style: {
            stroke: 'purple',
            lineWidth: 2
          }
        },
        {
          type: 'line',
          left: '3%', // 对应 [m/min] 轴位置
          top: '10%',
          shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 400
          },
          style: {
            stroke: 'green',
            lineWidth: 2
          }
        }
      ]
    }
  
    myChart.setOption(option)
  })
  </script>
  
  <style scoped>
  #chart {
    width: 100%; /* 控制整个图表的宽度 */
    height: 500px; /* 控制整个图表的高度 */
  }
  </style>
  