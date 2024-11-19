<template>
  <el-collapse v-model="isExpanded" class="search-collapse">
    <el-collapse-item name="1">
      <!-- 折叠标题 -->
      <template #title>
        <el-icon>
          <component :is="isExpanded.includes('1') ? ArrowDown : ArrowRight" />
        </el-icon>
        {{ $t("Search") }}
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="formData" class="search-form" label-width="100px">
        <!-- 动态生成表单项 -->
        <el-form-item
          v-for="field in fields"
          :key="field.prop"
          :label="field.label"
          class="form-item"
        >
          <!-- 根据类型渲染不同的输入控件 -->
          <component
            :is="getComponentType(field.type)"
            v-model="formData[field.prop]"
            v-bind="field.attrs"
            :placeholder="field.placeholder || '请输入' + field.label"
            style="width: 100%;"
          >
            <!-- 如果是 select 类型，则渲染选项 -->
            <el-option
              v-for="option in field.options || []"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </component>
        </el-form-item>
    
        <!-- 搜索和重置按钮 -->
        <el-form-item class="form-buttons">
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 定义组件 Props
const props = defineProps({
  fields: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {
    type: Object,
    required: true
  }
});

// 定义组件事件
const emit = defineEmits(['update:modelValue', 'search', 'reset']);

// 折叠状态
const isExpanded = ref(['1']); // 默认展开

// 响应式表单数据
const formData = reactive({ ...props.modelValue });

// 获取组件类型函数
const getComponentType = (type) => {
  if (type === 'select') return 'el-select';
  if (type === 'date') return 'el-date-picker';
  return 'el-input';
};

// 处理搜索事件
const onSearch = () => {
  emit('search', formData);
};

// 处理重置事件
const onReset = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
  emit('reset', formData);
};
</script>

<style scoped>
.search-collapse {
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;

  border: 1px solid #e4e4e4;
  border-radius: 5px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
}

.form-item {
  width: calc(25% - 16px); /* 四列布局 */
  min-width: 200px; /* 确保输入框不会过窄 */
}

.el-form-item__label {
  font-weight: 500;
}

.form-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.el-button {
  min-width: 80px;
}

:deep(.el-select) {
  width: 100% !important; /* 确保 select 宽度适应容器 */
}

.el-collapse-item__header {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.el-collapse-item__header:hover {
  color: #409eff;
}
</style>
