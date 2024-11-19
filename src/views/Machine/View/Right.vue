<template>
  <el-col :span="14">
    <el-card class="control-panel-card">
      <div class="control-panel-header">
        <div class="header-title"><img :src="headericon" style="width: 130px;
    vertical-align: middle;"/></div>
      </div> 
      <!-- 标题部分 --> <el-tabs v-model="activeName" type="border-card" class="demo-tabs">
        <el-tab-pane label="附加组件" name="first">

          <el-collapse v-model="activeNames" class="collapsible-list">
            <el-collapse-item v-for="(item, index) in options" :key="index" :title="item.label" :name="index.toString()">
              <div class="list-header">
                <span class="header-activation">激活</span>
                <span class="header-component">组件</span>
                <span class="header-expiry">截止日期</span>
                <span class="header-action">操作</span>
              </div>
              <el-divider />
              <div v-for="(component, i) in item.components" :key="i" class="list-item">
                <el-switch v-model="component.active" class="switch" size="large"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                <div class="component-info">
                  <img :src="component.icon" alt="" class="icon-image" />
                  <span class="component-name">{{ component.label }}</span>
                </div>

                <span class="expiry-date">{{ component.expiry }}</span>


                <el-button type="info" plain size="large" class="detail-button">
                  详情<el-icon class="el-icon--right">
                    <InfoFilled />
                  </el-icon>
                </el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="icon-bar">
            <div v-for="(icon, index) in icons" :key="index" class="icon-item">
              <img :src="icon.src" :alt="icon.label" class="icon-image" />
              <span class="icon-label">{{ icon.label }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      </el-tabs>

     <!-- -->

      <!-- 可折叠内容区域 -->


      <!-- 底部图标区域 -->

    </el-card>
  </el-col>
</template>
  
<script setup>
import { ref } from 'vue';
const activeName = ref('first')
const headericon = ref(new URL('@/assets/CP.svg', import.meta.url).href)
// 当前激活的折叠项
const activeNames = ref(['0']); // 默认展开第一个

// 折叠内容数据
const options = ref([
  {
    label: "气保护",
    components: [
      { active: true, icon: new URL('@/assets/icons/app_free.png', import.meta.url).href, label: '协同集程序先进', expiry: '无限' },
      { active: true, icon: new URL('@/assets/icons/app_free.png', import.meta.url).href, label: '手动气保护机协同气保护', expiry: '无限' },
    ]
  },
  {
    label: "氩焊",
    components: [
      { active: true, icon: new URL('@/assets/icons/app_free.png', import.meta.url).href, label: '氩焊组件1', expiry: '无限' },
      { active: false, icon: new URL('@/assets/icons/app_free.png', import.meta.url).href, label: '氩焊组件2', expiry: '无限' },
    ]
  },
  {
    label: "手工焊",
    components: [
      { active: true, icon: new URL('@/assets/icons/app_free.png', import.meta.url).href, label: '手工焊组件1', expiry: '无限' },
    ]
  },
  {
    label: "全部",
    components: [
      { active: true, icon: new URL('@/assets/icons/app_free.png', import.meta.url).href, label: '全部功能1', expiry: '无限' },
      { active: true, icon: new URL('@/assets/icons/app_free.png', import.meta.url).href, label: '全部功能2', expiry: '无限' },
    ]
  },
]);

// 底部图标数据



const icons = ref([
  { src: new URL('@/assets/icons/app_free.png', import.meta.url).href, label: "应用程序" },
  { src: new URL('@/assets/icons/app_pay.png', import.meta.url).href, label: "高级应用" },
  { src: new URL('@/assets/icons/function_free.png', import.meta.url).href, label: "功能" },
  { src: new URL('@/assets/icons/function_pay.png', import.meta.url).href, label: "高级功能" },
  { src: new URL('@/assets/icons/services_free.png', import.meta.url).href, label: "服务" },
  { src: new URL('@/assets/icons/services_pay.png', import.meta.url).href, label: "高级服务" },
]);

</script>
  
<style scoped>
.control-panel-card {
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 可选，增加阴影 */

}

:deep(.el-card__body) {
  padding: 0;
  background: none;
}

.control-panel-header {
  background-color: #2a4b7c;
  color: #ffffff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.header-title {
  font-size: 20px;
  font-weight: bold;

}

.collapsible-list {
  padding: 0 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  font-weight: bold;
  color: #333;
}

.list-header span {
  flex-basis: 25%;
  /* 设置每列的基础宽度 */
  text-align: left;
  /* 左对齐标题 */
  font-size: 14px;
  ;
  font-weight: bold;
}

.list-header span.header-activation {
  flex-basis: 10%;
  /* 激活列宽度 10% */
  text-align: left;
}

.list-header span.header-component {
  flex-basis: 40%;
  /* 组件列宽度 40% */
  text-align: left;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.switch {
  flex-basis: 10%;
  /* 与标题对齐 */
  flex-shrink: 0;
}

.component-info {
  display: flex;
  align-items: center;
  flex-basis: 40%;
}



.component-name {
  color: #333;
}

.expiry-date {
  flex-basis: 25%;
  /* 与标题对齐 */
  color: #606266;
  text-align: left;
  /* 右对齐日期 */
}


.switch {
  flex-shrink: 0;
}

.icon-image {
  width: 45px;
  height: 45px;
  margin: 0 10px;
}

.component-name {
  flex-grow: 1;
  color: #333;
}

:deep(.el-tabs__nav) {
  width: 100%;
}
:deep(.el-tabs__item){
  flex: 1;
}
.icon-bar {
  display: flex;
  padding: 10px 0px;
  background-color: #f5f5f5;
  justify-content:center;
}

.icon-item {
  display: flex;
  align-items: center;
}



.icon-label {
  font-size: 12px;
  color: #000
}

.collapsible-list {
  padding: 0;
}

:deep(.el-collapse-item__header) {
  background-color: #1b5fa7;
  /* 深蓝色背景 */
  color: #ffffff;
  /* 白色文字 */
  padding: 10px 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 16px;

}

.el-collapse-item__header.is-active {
  border-bottom: 1px solid #dcdfe6;
}

.list-header {
  background-color: #e3f2fd;
  /* 浅蓝色背景 */
  padding: 10px 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  color: #333;
}


.switch {
  flex-shrink: 0;
}



.component-name {
  flex-grow: 1;
  color: #333;
  margin-left: 10px;
}

.detail-button {
  color: #00bcd4;
  /* 浅蓝色字体 */
  border-color: #00bcd4;
  /* 浅蓝色边框 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  /* 浅蓝色背景悬停效果 */

}

.detail-button .el-icon-info {
  font-size: 16px;
  /* 调整图标大小 */
  margin-left: 4px;
  /* 图标与文字间距 */
}

.detail-button:hover {
  color: #ffffff;
  background-color: #00bcd4;
  /* 浅蓝色背景悬停效果 */
  border-color: #00bcd4;
}
:deep(.el-tabs__content){
  padding: 0px;
}

:deep(.el-tabs__header){
  border-top: 4px solid #2277d0;
  border-radius: calc(0.35rem - 1px) calc(.35rem - 1px) 0 0;
}
</style>
  
