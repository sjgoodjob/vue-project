<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Expand, Fold, Setting, ShoppingCart, Document, Plus, Message, Clock, ArrowDown } from '@element-plus/icons-vue'
import a11Img from '@/assets/logo.svg' // 导入头像图片
import ChinaFlag from '@/assets/zh-CN.png' // 导入中国国旗SVG
import { useLanguageStore } from '@/stores/language';

import {  useRouter } from 'vue-router'

// 控制侧边栏的折叠状态
const cartCount = ref(0) // 购物车商品数量
const language = ref('中文 (中国)')
const timezone = ref('亚洲/北京 (GMT+8)')
const languageClick = ref(false)
import { useI18n } from 'vue-i18n';

const router =  useRouter()
const { t } = useI18n();
// 接收父组件传递的属性
const showIcon = defineProps({
  isCollapse: Boolean
})

// 定义用于触发父组件事件的函数
const emit = defineEmits(['changeAside'])

// 控制侧边栏折叠的事件函数
const collapseAside = () => {
  emit('changeAside')
}

const gotoProfile = () =>{

  router.push('/user/profile'); // 跳转到 /home 路径

}
// 登出函数
const LogOut = () => {
  ElMessage({
    message: '您已退出登录',
    type: 'warning'
  })
  localStorage.removeItem("authToken")

  router.push('/login'); // 跳转到 /home 路径

}

const openGuide = () => {
  ElMessage.info('打开指南和文件')
}

const sendFeedback = () => {
  ElMessage.success('已发送反馈')
}

// 控制弹窗的显示和隐藏
const feedbackDialogVisible = ref(false)
const feedbackContent = ref('')
const feedbackImage = ref(null)

// 打开反馈弹窗
const openFeedbackDialog = () => {
  feedbackDialogVisible.value = true
}

// 关闭反馈弹窗并重置内容
const closeFeedbackDialog = () => {
  feedbackDialogVisible.value = false
  feedbackContent.value = ''
  feedbackImage.value = null
}

// 提交反馈
const submitFeedback = () => {
  if (feedbackContent.value) {
    ElMessage.success('反馈提交成功！')
    closeFeedbackDialog()
  } else {
    ElMessage.warning('请填写反馈内容')
  }
}

// 图片上传处理函数
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    feedbackImage.value = file
    ElMessage.info(`图片已选择：${file.name}`)
  }
}



const handleDropdownToggle = (visible) => {
  if (visible) {
    languageClick.value=true

  } else {
    languageClick.value=false
  }
}



const { changeLanguage } = useLanguageStore();
</script>

<template>
  <div>
    <el-header class="el-header">
      <!-- 左侧的折叠/展开按钮 -->
      <div class="left-section">
        <el-icon v-if="!showIcon.isCollapse" @click="collapseAside" class="icon-color">
          <Fold />
        </el-icon>
        <el-icon v-else @click="collapseAside" class="icon-color">
          <Expand />
        </el-icon>
      </div>

      <!-- 中间菜单栏 -->
      <div class="menu-bar">
        <el-button type=""  text class="guide" icon="Document"   @click="openGuide">指南和文件</el-button>
        
        <!-- 机器注册下拉菜单 -->
        <el-dropdown trigger="click">
          <el-button type="" text icon="Plus" class="machine">
            机器注册<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
       
          <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>注册设备1</el-dropdown-item>
            <el-dropdown-item>注册设备2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        
        <el-button type="" text icon="Message" @click="openFeedbackDialog" style="color: #e6a23c;">{{t('Send Feedback')}}</el-button>
      </div>

      <!-- 右侧工具栏 -->
      <div class="toolbar" style="margin-left: 10px;">
        <!-- 语言选择 -->
        <el-dropdown trigger="click" @visible-change="handleDropdownToggle" @command="changeLanguage">
          <el-button type="" text> 
            <img :src="ChinaFlag" alt="语言"  />
            {{ language }}
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="en">英文</el-dropdown-item>
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-icon v-if="!languageClick"><ArrowRight /></el-icon>
        <el-icon v-if="languageClick"><ArrowDown /></el-icon>

        <!-- 时区显示 -->
        <el-button type=""  text icon="Clock">{{ timezone }}</el-button>

        <!-- 购物车图标 -->
        <el-badge :value="cartCount" class="cart-icon">
          <el-button type=""  text icon="ShoppingCart" />
        </el-badge>

        <!-- 用户头像和设置 -->
        <el-avatar :size="40" :src="a11Img" style="margin-right: 10px;" />
        <span>管理员</span>
        <el-dropdown trigger="click" class="settings-dropdown">
          <el-icon style="margin-left: 18px; color: #303133;">
            <Setting />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="gotoProfile">查看</el-dropdown-item>
              <el-dropdown-item>添加</el-dropdown-item>
              <el-dropdown-item @click="LogOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </div>
   <!-- 反馈弹窗 -->
   <el-dialog
    v-model="feedbackDialogVisible"
    title="反馈"
    width="400px"
    @close="closeFeedbackDialog"
  >
    <el-form label-width="80px">
      <!-- 反馈内容输入框 -->
      <el-form-item label="反馈内容">
        <el-input
          type="textarea"
          v-model="feedbackContent"
          placeholder="请输入反馈内容"
          :rows="4"
        />
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="上传图片">
        <input type="file" @change="handleImageUpload" />
      </el-form-item>
      
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="success" @click="submitFeedback">提交反馈</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.machine{
  color:#4e73df!important
}

.guide{
  color: #0C845D !important;
}
.el-header {
  width: 100%;
  background-color: #fff;
  color: var(--el-text-color-primary);
  box-shadow: var(--el-box-shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.left-section {
  display: inline-flex;
  flex: 1;
  align-items: center;
}

.menu-bar {
  display: inline-flex;
  align-items: center;
  gap: 15px;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  text-align: right;
}

.flag-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.icon-color {
  color: #303133;
  cursor: pointer;
}

.cart-icon {
  position: relative;
}

.settings-dropdown .el-icon {
  cursor: pointer;
}

.el-button{
    padding: 5px;
}
</style>
