<template>
    <div class="machine-container">
      <el-card shadow="always" class="machine-card">
        <div class="header">
          <h3>我的机器</h3>
        </div>
        <el-row :gutter="20" justify="space-around" class="el-row">
          <el-col :xs="24" :sm="12" :md="8" v-for="(machine, index) in machines" :key="index">
            <div class="machine-item">
              <img :src="machine.image" alt="Machine Image" class="machine-image" />
              <p class="machine-title">机器序列号: {{ machine.serial }}</p>
              <p class="machine-model">{{ machine.model }}</p>
            </div>
          </el-col>
        </el-row>
        <div class="footer">
          <el-button type="primary" size="large">查看所有机器</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 示例数据
  const machines = ref([
    {
      serial: 'ACXA23BFB01685',
      model: 'EVOLVE 500',
      image: 'https://cloud.jasic.com.cn/images/Machines/AB/display.svg' // 替换为实际图片路径
    },
    {
      serial: 'ACXA22ATB03699',
      model: 'EVOLVE 500',
      image: 'https://cloud.jasic.com.cn/images/Machines/AB/display.svg' // 替换为实际图片路径
    },
    {
      serial: 'RBAA22BEB03678',
      model: 'EVOLVE 200 PLUS',
      image: 'https://cloud.jasic.com.cn/images/Machines/AB/display.svg' // 替换为实际图片路径
    }
  ])
  </script>
  
  <style scoped>
  .machine-container {
    padding: 20px;
    width: 100%;

  }
  
  .machine-card {
    border: 1px solid #d1d9e6;
    border-radius: 10px;
    padding: 20px;
  }
  
  .el-row{
    padding-top: 20px;
  }
  .header {
    background-color: #154a81;
    color: #ffffff;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px 8px 0 0;
  }
  
  .machine-item {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .machine-image {
    width: 100%;
    max-width: 150px;
    margin-bottom: 10px;
  }
  
  .machine-title {
    font-size: 14px;
    font-weight: bold;
    color: #154a81;
  }
  
  .machine-model {
    font-size: 12px;
    color: #777;
  }
  
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .el-button {
    background-color: #154a81;
    color: #ffffff;
    border-radius: 5px;
  }
  </style>
  