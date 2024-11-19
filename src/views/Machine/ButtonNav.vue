<template>
    <div class="button-nav">
      <router-link to="/machine/history" class="history">
        <el-button type="primary" class="nav-button history">
          <i class="icon"><RefreshLeft /></i>机器历史记录
        </el-button>
      </router-link>
      
      <router-link to="/machine/location" class="location">
        <el-button type="primary" class="nav-button location">
          <Location class="icon" /> 地理定位
        </el-button>
      </router-link>
  
      <el-dropdown
        trigger="click"
        ref="dropdownRef"
        :teleported="false"
        popper-class="custom-dropdown-popper"
        @visible-change="setDropdownWidth"
      >
        <!-- 主按钮 -->
        <el-button type="primary" class="dropdown-button welding">
          <el-icon><DataAnalysis /></el-icon> 焊接报告
          <el-icon><CaretBottom /></el-icon>
        </el-button>
        <!-- 下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><List /></el-icon> 焊接清单
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><TrendCharts /></el-icon> 焊接统计
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  
      <el-dropdown
        trigger="click"
        ref="dropdownRef"
        :teleported="false"
        popper-class="custom-dropdown-popper"
        @visible-change="setDropdownWidth"
      >
        <!-- 主按钮 -->
        <el-button type="primary" class="dropdown-button alarm">
          <el-icon><DataAnalysis /></el-icon> 警报
          <el-icon><CaretBottom /></el-icon>
        </el-button>
        <!-- 下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><List /></el-icon> 报警清单
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><TrendCharts /></el-icon> 报警统计
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  
      <el-button type="primary" class="nav-button service">
        <DataAnalysis class="icon" /> 服务数据
      </el-button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { RefreshLeft, Location, DataAnalysis, CaretBottom, List, TrendCharts } from '@element-plus/icons-vue';
  
  // 获取按钮的引用
  const dropdownRef = ref(null);
  
  // 当下拉菜单显示时设置浮动层的宽度
  const setDropdownWidth = (visible) => {
    if (visible && dropdownRef.value) {
      // 获取按钮宽度
      const buttonWidth = dropdownRef.value.$el.offsetWidth;
      // 通过 popper-class 自定义类名设置浮动层宽度
      const popperElements = document.querySelectorAll('.custom-dropdown-popper');
  
      // 遍历每个浮动层并设置相同的宽度
      popperElements.forEach((popperElement) => {
        if (popperElement) {
          popperElement.style.width = `${buttonWidth}px`;
        }
      });
    }
  };
  </script>
  
  <style scoped>
  .button-nav {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    margin: 0px 10px;
  }
  
  .nav-button {
    flex: 1;
    color: #ffffff;
    font-weight: bold;
    background-color: #3a6fb0;
    border-radius: 0;
    position: relative;
    border-bottom: 4px solid transparent;
    display: inline-flex; /* 确保图标和文字水平对齐 */
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    border-radius: 5px; /* 设置圆角 */
    width: 100%;
  }
  
  .el-dropdown {
    flex: 1;
    height: 100%;
    padding-bottom: 15px;
    margin: 0px 5px;
  }
  
  .dropdown-button {
    flex: 1;
    height: 45px;
  }
  
  .nav-button:hover {
    filter: brightness(1.1);
  }
  
  .icon {
    height: 17px;
    width: 17px;
    font-size: 1.2em; /* 调整图标大小，使其更清晰 */
  }
  
  .history {
    border-bottom-color: #4a6bf0; /* 蓝色边框 */
    flex: 1;
    margin-right: 5px;
  }
  
  .welding {
    border-bottom: 0.25rem solid #cc00cc;
  }
  
  .welding:hover {
    border-bottom: 0.45rem solid #cc00cc;
  }
  
  .location {
    border-bottom-color: #3bb273; /* 绿色边框 */
    flex: 1;
  }
  
  .report {
    border-bottom-color: #e64aa0; /* 粉色边框 */
  }
  
  .alarm {
    border-bottom: 4px solid #e76d2b; /* 橙色边框 */
  }
  
  .alarm:hover {
    border-bottom: 8px solid #e76d2b; /* 橙色边框 */
  }
  
  .service {
    border-bottom-color: #e6b500; /* 黄色边框 */
  }
  
  .dropdown-button {
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    background-color: #3a6fb0;
    color: #ffffff;
    border-radius: 5px;
  }
  
  .dropdown-button:hover {
    filter: brightness(1.1);
  }
  
  .icon-right {
    margin-left: 5px;
  }
  
  /* 下拉菜单项图标样式 */
  .item-icon {
    margin-right: 8px;
    font-size: 16px;
    color: #333;
  }
  
  .el-dropdown-menu {
    border-radius: 8px; /* 下拉菜单圆角 */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15); /* 阴影效果 */
    min-width: 100%; /* 设置为父级按钮的宽度 */
    width: auto; /* 自动调整宽度 */
    width: inherit !important;
    min-width: inherit !important;
    max-width: inherit !important;
  }
  </style>
  