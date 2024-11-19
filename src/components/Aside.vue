<script setup>
import { ref ,shallowRef,computed } from 'vue'

// 接收 `collapse` 和 `width` 作为 `props`
const settings = defineProps({
  collapse: Boolean,
  width: String
})

// 定义菜单项数据
import { 
  House, 
  Menu, 
  Download, 
  DataLine, 
  DocumentChecked, 
  TrendCharts, 
  Cloudy, 
  Folder 
} from '@element-plus/icons-vue'

const menuItems = shallowRef([
  {
    index: '1',
    title: '首页管理',
    icon: House,
    groups: [
      {
        title: '操作组',
        items: [
          { index: '/cloud-setting/create-cloud-setting', title: '创建新应用', tooltip: '创建新应用' },
          { index: '/machine/view', title: '查看机器 2', tooltip: '查看机器 2' },
          { index: '/machine/list', title: '机器列表', tooltip: '查看机器列表' }
        ]
      }
    ]
  },
  {
    index: '2',
    title: '机器管理',
    icon: Menu,
    groups: [
      {
        title: '管理组',
        items: [
          { index: '/machine/geolocalization', title: '地理位置', tooltip: '地理位置 1' },
          { index: '/location/index', title: '地点', tooltip: '地点' },
          { index: '/machine/machine-inventory-location', title: '位置视图', tooltip: '位置视图' }

        ]
      }
    ]
  },
  {
    index: '3',
    title: '数据下载',
    icon: Download,
    groups: [
      {
        title: '数据组',
        items: [
          { index: '/data/download-1', title: '下载文件 1', tooltip: '下载文件 1 数据' },
          { index: '/data/download-2', title: '下载文件 2', tooltip: '下载文件 2 数据' },
          { index: '/data/download-3', title: '下载文件 3', tooltip: '下载文件 3 数据' }
        ]
      }
    ]
  },
  {
    index: '4',
    title: '统计数据',
    icon: DataLine,
    groups: [
      {
        title: '统计组',
        items: [
          { index: '/event-cloud/list-event-data', title: '统计概览', tooltip: '查看统计数据概览' },
          { index: '/stats/analysis', title: '数据分析', tooltip: '进行数据分析' }
        ]
      }
    ]
  },
  {
    index: '5',
    title: '成本分析',
    icon: TrendCharts,
    groups: [
      {
        title: '分析组',
        items: [
          { index: '/cost/overview', title: '成本总览', tooltip: '查看成本总览' },
          { index: '/cost/analysis', title: '成本明细', tooltip: '查看成本明细分析' }
        ]
      }
    ]
  },
  {
    index: '6',
    title: '系统管理',
    icon: DocumentChecked,
    groups: [
      {
        title: '管理功能',
        items: [
          { index: '/system/settings', title: '系统设置', tooltip: '管理系统设置' },
          { index: '/system/users', title: '用户管理', tooltip: '管理系统用户' }
        ]
      }
    ]
  },
  {
    index: '7',
    title: '云管理',
    icon: Cloudy,
    groups: [
      {
        title: '云功能',
        items: [
          { index: '/documents/upload', title: '上传文件', tooltip: '上传文件' },
          { index: '/cloud/backups', title: '备份管理', tooltip: '管理云备份' }
        ]
      }
    ]
  },
  {
    index: '8',
    title: '历史记录',
    icon: Folder,
    groups: [
      {
        title: '历史数据',
        items: [
          { index: '/history/logs', title: '日志记录', tooltip: '查看日志记录' },
          { index: '/history/archive', title: '存档数据', tooltip: '查看存档数据' }
        ]
      }
    ]
  }
])
// 计算样式类，用于在折叠时移除背景色
const menuGroupClass = computed(() => {
  return settings.collapse ? 'menu_item_group_collapsed' : 'menu_item_group'
})
</script>

<template>
  <el-aside :width="settings.width" class="container">
    <!-- Logo 图片 -->
    <div class="logo-container" style="text-align: center; padding-top: 30px;">
      <img src="@/assets/jte.svg" alt="Logo" class="logo" width="85%" />
    </div>

    <el-link type="info" :underline="false" class="divider">
      <el-icon><House /></el-icon>主页
    </el-link>

    <el-scrollbar>
      <el-menu :collapse="settings.collapse" active-text-color="#FFF" background-color="#154a81" text-color="#FFF" :router="true">
        <!-- 动态渲染菜单 -->
        <el-sub-menu v-for="menu in menuItems" :key="menu.index" :index="menu.index">
          <template #title>
            <el-icon>
              <component :is="menu.icon" />
            </el-icon>
            <span class="top-menu-title">{{ menu.title }}</span>
          </template>
          
          <!-- 动态渲染菜单组 -->
          <template v-for="group in menu.groups || []" :key="group.title">
            <el-menu-item-group :class="menuGroupClass">
              <el-menu-item v-for="item in group.items" :key="item.index" :index="item.index" class="submenu-item">
                <span>{{ item.title }}</span>

                <!-- 右侧图标，带有 Tooltip 提示 -->
                <el-tooltip :content="item.tooltip" placement="top">
                  <el-icon class="submenu-icon">
                    <InfoFilled />
                  </el-icon>
                </el-tooltip>
              </el-menu-item>
            </el-menu-item-group>
          </template>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped>
.el-aside {
  height: 100vh;
  overflow: hidden;
  box-shadow: var(--el-box-shadow-lighter);
  font-size: 18px;

}

.el-scrollbar {
  height: 100vh;
  overflow: hidden;
  background-color: #154a81;
}

.container {
  background-color: #154a81;
}

.el-menu {
  border-right: none;

}
.top-menu-title{
  font-size: 16px;
}
.divider {
  width: 90%;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  display: block;
  text-align: center;
  margin-top: 30px;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
}

.divider a:hover {
  background-color: #154a81;
}

/* 子菜单背景和分组样式 */
.el-sub-menu .el-menu--inline {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px 0;
}

/* 子菜单项样式 */
.menu_item_group .submenu-item {
 
  color:#333

}
.submenu-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
  transition: background-color 0.3s;
  padding-left: 30px !important;
  border-radius: 8px;
  font-size: 14px;
}
.menu_item_group .submenu-item:hover {
  background-color: #f2f2f2;

}

.submenu-icon {
  margin-left: 8px;
  color: #666666;
}
.menu_item_group_collapsed .submenu-icon {
  margin-left: 8px;
  color: #f8f2f2;
}
.menu_item_group{
    background-color: #FFF;
    width: 85%;
    margin: 0px auto;
    border-radius: 8px;

}
.menu_item_group_collapsed {
  background-color: transparent; /* 去掉背景色 */
}

:deep(.el-menu-item-group__title) {
  display: none;
}

:deep(.el-sub-menu__title):hover{
  background:none
}



</style>
