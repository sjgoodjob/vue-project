<template>
    
    <PageHeader title="机器历史记录" />
  <ButtonNav /> <!-- 使用新创建的 ButtonNav 组件 -->
    <div class="history-page">
      <!-- 时间轴内容 -->
      <div class="card-header with-border">
				<h4 style="margin-top: 0.5em;"> 机器历史记录 </h4>
		</div>
      <div class="filters-container">
        
      <div class="filter">
        <label>按日期搜索：</label>
        <el-select v-model="selectedDate" placeholder="所有" class="el-select">
          <el-option label="所有" value="all"></el-option>
          <el-option label="2024" value="2024"></el-option>
          <el-option label="2023" value="2023"></el-option>
          <!-- 可以添加更多年份选项 -->
        </el-select>
      </div>

      <div class="filter">
        <label>按类型搜索：</label>
        <div class="multi-checkbox-dropdown">
    <el-dropdown
      trigger="click"
      :hide-on-click="false"
      @command="handleCommand"
      popper-class="custom-dropdown-popper" :teleported="false"
    >
      <el-button type="primary" class="dropdown-button" style="width: 100%;" color="#e9e9ed">
        选择类型
        <el-icon><CaretBottom /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu class="checkbox-dropdown">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="selectAll"
            @change="handleSelectAll"
          >
            所有
          </el-checkbox>
          <el-divider />
          <el-checkbox-group v-model="selectedItems">
            <el-checkbox
              v-for="option in options"
              :key="option.value"
              :label="option.value"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
      </div>

      <!-- 类型选择面板 -->
      <el-card class="type-panel">
        <h4>选定的类型：</h4>
        <el-checkbox-group v-model="selectedTypes">
          <el-checkbox label="机器固件">机器固件</el-checkbox>
          <el-checkbox label="机器硬件">机器硬件</el-checkbox>
          <el-checkbox label="机器配件">机器配件</el-checkbox>
          <el-checkbox label="用户界面固件">用户界面固件</el-checkbox>
          <el-checkbox label="模组">模组</el-checkbox>
          <el-checkbox label="标签">标签</el-checkbox>
        </el-checkbox-group>
      </el-card>
    </div>

      <div class="timeline">
        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="timeline-item"
          :class="{ left: index % 2 === 0, right: index % 2 !== 0 }"
        >
          <!-- 内容框 -->
          <div class="content">
            <div class="description">{{ event.description }}</div>
          </div>
          
          <!-- 时间点圆圈 -->
          <div class="timeline-circle"></div>
          <p class="date">
                {{ formatDatePart(event.date) }}
                <small class="time-text">{{ formatTimePart(event.date) }}</small>
            </p>
        </div>
        
        <!-- 中心虚线 -->
        <div class="timeline-line"></div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue';
  const selectedDate = ref('all');
    const selectedType = ref('all');
    const selectedTypes = ref(['机器固件']);
  const filteredEvents = ref([
    { id: 1, date: '2024-10-10 10:22:00', type: 'machine_event', description: 'Machine registered by unknown user' },
    { id: 2, date: '2021-06-04 09:59:59', type: 'update_event', description: '自定义计算固件更新为：N_V_1_1_r5_p74' },
    { id: 3, date: '2021-06-04 09:48:43', type: 'machine_event', description: '机器发出了新的接连信号。（识别码:1430）' },
    { id: 4, date: '2021-06-04 09:59:59', type: 'update_event', description: '自定义计算固件更新为：N_V_1_1_r5_p74' },
    { id: 5, date: '2021-06-04 09:48:43', type: 'machine_event', description: '机器发出了新的接连信号。（识别码:1430）' },
    // 更多事件数据
  ]);

  // 选项数据
const options = [
  { value: 'machine_firmware', label: '机器固件' },
  { value: 'machine_hardware', label: '机器硬件' },
  { value: 'machine_accessories', label: '机器配件' },
  { value: 'user_interface_firmware', label: '用户界面固件' },
  { value: 'module', label: '模组' },
  { value: 'tag', label: '标签' },
];

const selectedItems = ref<string[]>([]); // 存储选择的选项
const selectAll = ref(false); // 全选状态

// 计算是否为部分选中
const isIndeterminate = computed(() => selectedItems.value.length > 0 && selectedItems.value.length < options.length);

// 处理全选切换
function handleSelectAll() {
  if (selectAll.value) {
    selectedItems.value = options.map(option => option.value);
  } else {
    selectedItems.value = [];
  }
}

// 监听 command 事件 (可扩展用法)
function handleCommand(command: string) {
  console.log('Command:', command);
}
  
  function formatDatePart(dateString: string) {
    return dateString.split(' ')[0]; // 仅提取日期部分
    }

function formatTimePart(dateString: string) {
  return dateString.split(' ')[1] + ' CST'; // 仅提取时间部分并加上 CST
}
  import PageHeader from '@/components/PageHeader.vue';
  import ButtonNav from '@/views/Machine/ButtonNav.vue'; // 引入新组
  </script>
  
  <style scoped>
  .card-header{
    text-align: center;
    border-bottom: 1px solid #DDD;
    padding-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
  }
  small{
    display: block;
    font-size: .7rem;
    color: #8796af;
    text-align: left;
  }
  .el-select{
    width: 65%;
  }
  .history-page {
    padding: 20px;
    display: flex;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    margin: 0 auto;
    max-width: 100%;
    margin:0px 20px;
    flex-direction: column;
  }
  .filters-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px;
    align-items: flex-start;
}

.filter {
  display: flex;
  align-items: center;
  flex: 1;
}

.filter label {
  margin-right: 10px;
  font-weight: bold;
}

.type-panel {
  width: 200px;
  padding: 15px;
  background-color: #f0f2f5;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
}

.type-panel h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}
  .timeline {
    position: relative;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    top: -80px 
  }
  
  .timeline-item {
    position: relative;
    width: 45%;
    margin-bottom: 40px;
  }
  
  .timeline-item.left {
    align-self: flex-start;
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    right:-42px
  }
  .timeline-item.left p{
    position: absolute;
    right: -170px;
    top: 10px;
  }

  .timeline-item.right p{
    position: absolute;
    left: -170px;
    top: 10px;
  }
  .timeline-item.right {
    align-self: flex-end;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    left:-42px

  }
  
  .timeline-item .content {
    background-color: #1e5aa9;
    color: #fff;
    padding: 25px;
    border-radius: 8px;
    position: relative;
    font-size: 14px;
    width: 600px;
  }
  
  .timeline-item.left .content::after,
  .timeline-item.right .content::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 10px solid transparent;
  }
  
  .timeline-item.left .content::after {
    right: -20px;
    border-left-color: #1e5aa9; /* 箭头颜色 */
  }
  
  .timeline-item.right .content::after {
    left: -20px;
    border-right-color: #1e5aa9; /* 箭头颜色 */
  }
  
  .date {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 20px;
  }
  
  .timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: transparent;
    border-right: 2px dashed #000;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  
  .timeline-circle {
    position: absolute;
    top: 20px;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: 2px dashed #000000;
    border-radius: 50%;
    z-index: 100;
  }
  
  .timeline-item.left .timeline-circle {
    right: -49px; /* 圆圈相对于左侧内容的偏移 */
  }
  
  .timeline-item.right .timeline-circle {
    left: -49px; /* 圆圈相对于右侧内容的偏移 */
  }
  .multi-checkbox-dropdown {
  width: 350px;
}

.dropdown-button {
  display: flex;
  align-items: center;
}

:deep(.custom-dropdown-popper) {
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 350px;
}

.checkbox-dropdown {
  display: flex;
  flex-direction: column;
}

.el-checkbox {
  margin: 5px 0;
}

.el-checkbox-group {
  display: flex;
  flex-direction: column;
}

.el-divider {
  margin: 5px 0;
}
  </style>
  