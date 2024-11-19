<template>
    <PageHeader
            title="机器清单管理"
        />
    <el-row :gutter="20" class="el-row">
      <!-- 左侧卡片 -->
      <el-col :span="8">
        <el-card class="box-card machine-card">
          <div class="card-header">机器</div>
          <div class="card-content">
            <p class="main-title"> <el-icon><Setting /></el-icon><strong style="font-weight:bold">Evolve 500 display demo for exibition</strong></p>
            <p class="sub-title">EVOLVE 500</p>
            <p><strong class="bold">机器序列号:</strong> ACXA23BFB01685</p>
            <p><strong class="bold">地点:</strong> 没有</p>
            <el-divider />

            <p ><strong class="bold">Torch Used:</strong> Unknown</p>
          </div>
        </el-card>
      </el-col>
  
      <!-- 中间卡片 -->
      <el-col :span="8">
        <el-card class="box-card welding-card">
          <div class="card-header">焊接</div>
          <div class="card-content">
            <h3 class="welding-title"><i class="el-icon-data-line"></i> MIG - Double Pulse</h3>
            <el-divider />

            <div class="welding-info">
              <el-button type="primary" plain class="info-button">6.0 mm</el-button>
              <el-button type="primary" plain class="info-button">9.4 m/min</el-button>
              <el-button type="primary" plain class="info-button">155 A</el-button>
              <el-button type="primary" plain class="info-button">-18</el-button>
            </div>
            <p><strong>焊接编号:</strong> 4060396</p>
            <p><strong>期间:</strong> 5.374 sec</p>
            <p><strong>开始时间:</strong> 2024-11-08 16:33:07</p>
            <p><strong>供应:</strong> 189 V</p>
          </div>
        </el-card>
      </el-col>
  
      <!-- 右侧卡片 -->
      <el-col :span="8">
        <el-card class="box-card result-card">
          <div class="card-header">结果</div>
          <div class="card-content">
            <div class="quality-container">
                <h4 class="quality-text">焊接质量:</h4>
                <el-tag type="success" size="large" color="#1f8616" class="quality-tag">87.5%</el-tag>
            </div>
            <el-divider />

            <el-alert title="在焊接过程中未检测到报警。" type="success" class="darkgreen" show-icon effect="dark" :closable="false"></el-alert>
            <el-divider />

            <div class="result-info">
              <p class="voltage-result">V<sub>2</sub> 平均电压: 18.04 V</p>
              <p class="current-result">I<sub>2</sub> 平均电流: 150.62 A</p>
            </div>
          </div>

        </el-card>
      </el-col>
      
    </el-row>
    <el-divider class="el-divider"/>

    <Echarts/>


    <div class="average-container">
    <div class="average-item current">
      <div class="value">150.62 A</div>
      <div class="label">平均电流 <i class="el-icon-info"></i></div>
    </div>
    <div class="average-item voltage">
      <div class="value">18.04 V</div>
      <div class="label">平均电压 <i class="el-icon-info"></i></div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import PageHeader from '@/components/PageHeader.vue'
  import Echarts from '@/views/EventCloud/Echarts.vue'

  </script>
  
  <style scoped>
  .el-divider{
    width:98%;
    margin:20px auto;
    
  }
  .quality-container {
  display: flex;
  align-items: center; /* 保持子元素在水平线上对齐 */
  justify-content: center;
}

  .machine-card{
    margin-left:20px
  }
  .result-card{
    margin-right:20px
  }
  :deep(.el-card__body) {
  padding: 0; /* 去掉内边距 */
}
  .box-card {
    border: 1px solid #1b5fa7;
    border-radius: 8px;
    background-color: #ffffff;
    height:350px;

    
  }
  
  .card-header {
    background-color: #1b5fa7;
    color: #ffffff;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    border-radius: 8px 8px 0 0;
  }
  
  .card-content {
    padding: 15px;
  }
  
  .main-title {
    font-size: 18px;
    font-weight: bold;
    color: #4e73df;
    margin-bottom: 10px;
  }
  
  .sub-title {
    font-size: 16px;
    color: #606266;
    margin-bottom: 15px;
  }
  
  .bold {
    font-size: 14px;
    color: #111111;
    margin-top: 10px;
    font-weight:bold
  }
  
  .welding-title {
    font-size: 20px;
    font-weight: bold;
    color: #2a4b7c;
    margin-bottom: 10px;
    text-align:center
  }
  
  .welding-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .info-button {
    width: 22%;
    background-color: #2a4b7c;
    color: #ffffff;
  }
  
  .quality-result {
    font-size: 18px;
    margin-bottom: 10px;
    color: #111;
    text-align:center
  }
  .quality-text{
    font-size:26px
  }
  .quality-tag {
    font-size:26px;
    font-weight:bold;
    color:#fff;
    padding: 5px 15px;

  }
  .darkgreen{
    background-color:#00801166;
    border: 2px solid #008011;
    color:#008011;
  }
  .result-info p {
    font-size: 16px;
    margin-bottom: 5px;
    color: #2a4b7c;
  }
  .average-container {
  display: flex;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  overflow: hidden;
  width:50%;
  margin:0px auto;
}

.average-item {
  flex: 1;
  text-align: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.current {
  background-color: #ff9d4a;
  color: #fff;
}

.voltage {
  background-color: #4ab4f4;
  color: #fff;
}

.value {
  font-size: 20px;
  font-weight: bold;
  padding: 5px 0;
  background-color: rgba(255, 255, 255, 0.3); /* 透明的背景色用于区分 */
  border-radius: 3px;
}

.label {
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.2); /* 半透明背景 */
  padding: 5px;
  border-radius: 3px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
  </style>
  