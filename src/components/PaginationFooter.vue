<template>
    <div class="pagination-container">
      <span class="total-count">总共 {{ totalItems }} 条</span>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
    </div>
  </template>
  
  <script lang="ts" setup>
  
  // 定义组件 Props
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true,
      default: 0
    },
    pageSize: {
      type: Number,
      required: true,
      default: 10
    }
  })
  
  // 定义组件事件
  const emit = defineEmits(['current-change'])
  
  // 页码变化处理函数
  const handlePageChange = (page) => {
    emit('current-change', page)
  }
  </script>
  
  <style scoped>
  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 10px 0;
    border-top: 1px solid #ebeef5;
    margin-left: 20px;
  }
  
  .total-count {
    font-weight: bold;
    font-size: 14px;
    color: #666;
  }
  
  .pagination-container .el-pagination {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  </style>
  