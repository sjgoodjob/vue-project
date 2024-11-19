<template>
    <el-page-header @back="onBack" class="page-header">
      
      <template #content>
        <div class="flex items-center">
          <span class="text-large font-600 mr-3">{{ title }}</span>
        </div>
      </template>
      <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: './page-header.html' }">
          homepage
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="./page-header.html">route 1</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>route 2</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
      <template #extra v-if="exportButtonText">
        <div class="flex items-center">
          <el-dropdown @command="handleExport">
            <el-button type="primary" class="ml-2">
              {{ exportButtonText }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="csv">导出 CSV</el-dropdown-item>
                <el-dropdown-item command="excel">导出 Excel</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </el-page-header>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import * as XLSX from 'xlsx'
  import { saveAs } from 'file-saver'
  
  // 定义组件的 Props
  const props = defineProps({
    title: {
      type: String,
    },
    exportButtonText: {
      type: String,
    },
  })
  
  // 定义组件的事件
  const emit = defineEmits(['back', 'print'])
  
  // 处理返回按钮事件
  const onBack = () => {
    emit('back')
  }
  
  // 处理打印按钮事件
  const onPrint = () => {
    emit('print')
  }
  
  // 处理导出操作
  const handleExport = (format: string) => {
    if (format === 'csv') {
      exportCSV()
    } else if (format === 'excel') {
      exportExcel()
    }
  }
  
  // 导出 CSV 格式
  const exportCSV = () => {
    const data = [/* 示例数据 */]
    const ws = XLSX.utils.json_to_sheet(data)
    const csv = XLSX.utils.sheet_to_csv(ws)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'exported_data.csv')
  }
  
  // 导出 Excel 格式
  const exportExcel = () => {
    const data = [/* 示例数据 */]
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'exported_data.xlsx')
  }
  </script>
  
  <style scoped>
  .page-header {
    padding: 20px;
  }
  
  .flex {
    display: flex;
    align-items: center;
  }
  
  .text-large {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  
  .ml-2 {
    margin-left: 8px;
  }
  </style>
  