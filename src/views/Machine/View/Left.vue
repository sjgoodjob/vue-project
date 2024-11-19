<template>
    <el-col :span="10">
      <el-card class="device-info-card" shadow="hover">
        <div class="device-info-header">
            EVOLVE
        </div>
        <div class="device-info-container">
          <!-- 左侧图片 -->
          <div class="device-image-container">
            <img src="https://cloud.jasic.com.cn/images/Machines/AB/display.svg" alt="Device Image" class="device-image" />
          </div>
  
          <!-- 右侧信息 -->
          <div class="device-details">
            <div class="device-title">
                <el-icon  color="#2a4b7c" v-if="!isEditing" @click="isEditing = true" class="icon" :size="32">
              <Edit/>
            </el-icon>
            <el-icon  color="#2a4b7c" v-if="isEditing" @click="isEditing = false" class="icon" :size="32">
              <Check/>
            </el-icon>

                <span v-if="!isEditing" class="editable-text" style="font-weight: bold;">{{ serialNumber }}</span>
                
                <el-input
                v-if="isEditing"
                v-model="serialNumber"
                size="large"
                @keyup.enter="saveSerialNumber"
                class="editable-input"
                />
            </div>
  
            <el-descriptions :column="1">
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">序列号</div>
                  <div class="description-content">RBXA21BIB01702</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">型号</div>
                  <div class="description-content">EVOLVE 200 PLUS</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">变体</div>
                  <div class="description-content">Default</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">地点</div>
                  <div class="description-content">没有</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">自动升级</div>
                  <el-switch v-model="autoUpgrade" active-text="启用" inactive-text="禁用" />
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">当前机器固件版本</div>
                  <div class="description-content">1.2.3.0</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">所选机器固件版本</div>
                  <div class="description-content">无更新固件</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">当前 UI 固件版本</div>
                  <div class="description-content">1.0.3.0</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">所选 UI 固件版本</div>
                  <div class="description-content">无更新固件</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">注册者</div>
                  <div class="description-content">Destiney27</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">注册日期</div>
                  <div class="description-content">2024-09-30</div>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <div class="description-item">
                  <div class="description-label">最后使用</div>
                  <div class="description-content">2022-05-20 05:05:18</div>
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </el-card>
    </el-col>
  </template>
  
  <script setup>
  import { ref } from 'vue';


  const isEditing = ref(false)

  const serialNumber = ref("RBXA21BIB01702")

  const autoUpgrade = ref(true)

  const saveSerialNumber = () =>{

    isEditing.value = false

  }
  </script>
  
  <style scoped>
  .device-info-card {
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    margin-right: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 可选，增加阴影 */

  }
  
  :deep(.el-card__body) {
  padding: 0; /* 去掉内边距 */
  background: none;
}
  .device-info-header {
    background-color: #2a4b7c; /* 深蓝色背景 */
    color: #ffffff; /* 白色文字 */
    font-size: 24px; /* 标题文字大小 */
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    margin-bottom: 15px;
}
  .device-info-container {
    display: flex;
    align-items: flex-start;
  }
  
  .device-image-container {
    flex: 2;
    display: flex;
    justify-content: center;
  }
  
  .device-image {
    width: 80%;
    height: auto;
  }
  
  .device-details {
    flex: 2;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
  }
  
  .device-title {
    font-size: 20px;
    font-weight: bold !important;
    color: #2a4b7c;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  .editable-input{
    border: 2px solid #2a4b7c;
    font-weight: bold;

  }



  .description-label {
    background-color: #c5deed; /* 浅蓝色背景 */
    color: #333;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 4px 4px 0 0; /* 上边圆角 */
    font-size: 14px;
  }
  
  .description-content {
    background-color: #f5f5f5; /* 浅灰色背景 */
    padding: 5px 10px;
    font-size: 14px;
    color: #606266;
    border-top: none; /* 去除与标题之间的边框 */
  }
  </style>
  