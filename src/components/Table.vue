<template>
  <el-table
    :data="tableData"
    :row-key="getRowKey"
    :expand-row-keys="expandedRowKeys"
    :default-expand-all="false"
    border
    stripe
    style="width: 99%; max-width: 99%; margin: 0px auto;"
    v-loading="loading"
    :header-cell-style="headerCellStyle"
  >
    <!-- 动态生成表格列 -->
    <el-table-column
      v-if="enableExpand"
      type="expand"
      label="展开"
    >
      <template #header>
        <span @click="$emit('toggle-expand-all')" style="cursor: pointer; color: #409eff;">
          <!-- 展开全部/折叠全部的按钮文字 -->
          <el-icon v-if="isAllExpanded"><ArrowDown /></el-icon>
          <el-icon v-else><ArrowRight /></el-icon>
        </span>
      </template>
      <template #default="scope">
        <!-- 动态渲染展开内容 -->
        <div v-for="(value, key) in expandedContent[getRowKey(scope.row, scope.$index)]" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </div>
      </template>
    </el-table-column>

    <el-table-column
      v-for="column in columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :sortable="column.sortable || false"
    ></el-table-column>

    <!-- 操作列 -->
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" link @click="viewDetails(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义组件 Props
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Array,
    default: () => []
  },
  expandedRowKeys: {
    type: Array,
    default: () => []
  },
  isAllExpanded: {
    type: Boolean,
    default: false
  },
  enableExpand: {
    type: Boolean,
    default: false // 是否启用展开功能
  },
  expandedContent: {
    type: Object, // 展开内容，键为唯一标识字段的值
    default: () => ({})
  },
  uniqueKey: {
    type: String, // 唯一标识字段的名称
    default: '' // 如果不传，则使用索引作为标识
  }
});

// 定义组件事件
const emit = defineEmits(['view-details', 'toggle-expand-all']);

// 获取行的唯一标识符
const getRowKey = (row, index) => {
  return props.uniqueKey ? row[props.uniqueKey] : index;
};

// 查看详情触发事件
const viewDetails = (row) => {
  emit('view-details', row);
};

const headerCellStyle = () => {
  return {
    fontSize: '14px', // 设置字体大小
    textAlign: 'center', // 居中对齐
    background: 'linear-gradient(to bottom, #fff 0%, #eee 100%)' // 设置渐变背景
  };
};
</script>

<style scoped>
:deep(.el-table .cell) {
  white-space: normal; /* 允许正常换行 */
  word-wrap: break-word; /* 强制长单词换行 */
}
</style>
