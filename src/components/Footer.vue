<template>
    <el-footer class="footer bg-white">
      <!-- 公司信息 -->
      <div>
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span><strong>佳士科技 - </strong>深圳市坪山新区青兰一路3号 电子邮件：
              <a href="mailto:jasicmarket@jasic.com.cn">jasicmarket@jasic.com.cn</a>
            </span>
          </div>
        </div>
      </div>
  
      <br />
  
      <!-- 下载应用标题 -->
      <div class="justify-content-center align-items-center">
        <h4><b>下载远程控制应用程序</b></h4>
      </div>
      <br />
  
      <!-- 下载按钮 -->
      <div class="container-apple d-flex justify-content-center align-items-center">
            <el-button class="app-button" type="info" plain @click="openAppleStore">
            <span class="button-content">
                <el-icon class="app-icon">
                <Apple />
                </el-icon>
                <div class="text-container">
                <h6>下载从</h6>
                <h4>苹果应用商店</h4>
                </div>
            </span>
            </el-button>

            <el-button class="app-button" type="info" plain @click="openGooglePlay">
            <span class="button-content">
                <el-icon class="app-icon">
                <Platform />
                </el-icon>
                <div class="text-container">
                    <h6 class="wrap-text">下载应用，请手机扫描二维码</h6>
                </div>
                <canvas ref="qrcodeCanvas" width="70" height="70"></canvas>
            </span>
            </el-button>
        </div>
    </el-footer>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import QRCode from 'qrcode'
  
  const appleStoreUrl = 'https://apps.apple.com/cn/app/jte-cloud/id1533921050?ign-itscg=30200&ign-itsct=apps_box_link'
  const googlePlayUrl = '/site/download-apk'
  
  const qrcodeCanvas = ref(null)
  
  const openAppleStore = () => {
    window.open(appleStoreUrl, '_blank')
  }
  
  const openGooglePlay = () => {
    window.open(googlePlayUrl, '_blank')
  }
  
  // 在组件挂载后生成二维码
  onMounted(() => {
    generateQRCode(googlePlayUrl)
  })
  
  // 使用 qrcode 库生成二维码
  const generateQRCode = (url) => {
    if (qrcodeCanvas.value) {
      QRCode.toCanvas(qrcodeCanvas.value, url, { width: 50, margin: 1 }, (error) => {
        if (error) console.error(error)
      })
    }
  }
  </script>
  
  <style scoped>
  .footer {
    --el-footer-padding: 0; /* 通过CSS变量移除padding */

    padding-top: 20px;
    text-align: center;
    height: 200px;
    margin-top: 10px;

  }
  
  .copyright span {
    color: #333;
    font-size: 14px;
  }
  
  .container-apple {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.app-button {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  padding: 15px 15px;
  border: 1px solid #333;
  color: #333;
  height: 70px;
  border-radius: 10px;
}

.button-content {
  display: flex;
  align-items: center;
}

.app-icon {
  font-size: 2.5rem;
  margin-right: 8px;
}

.text-container h6,
.text-container h4 {
  margin: 0;
  text-align: left;
}

.text-container h6 {
  font-size: 0.9rem;
}

.text-container h4 {
  font-size: 1.1rem;
}

canvas {
  margin-left: 10px;
}

.wrap-text {
  white-space: pre-wrap; /* 保持换行 */
  word-break: break-word; /* 长行自动换行 */
  max-width: 80px; /* 限制最大宽度，确保换行 */

}
  </style>
  