<template>
    <el-container style="min-height: 100vh; min-width: 100vw; overflow: hidden;">
      <Aside :collapse="asideSettings.isCollapse" :width="asideSettings.width"></Aside>
  
      <el-container style="height: 100vh; width: 100%; display: flex; flex-direction: column;">
        <Header :isCollapse="asideSettings.isCollapse" @changeAside="changeAside" />
  
        <el-main style="flex: 1; overflow-y: auto;">
          <router-view></router-view>
          <Footer />

        </el-main>
        
      </el-container>
    </el-container>
  </template>
  
  
  <script setup>
  import { ref } from 'vue'
  import Aside from '@/components/Aside.vue'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  const asideSettings = ref({
    isCollapse: false,
    width: '220px'
  })
  const handleClose = ()=>{

  }
  const changeAside = () => {
    asideSettings.value.isCollapse = !asideSettings.value.isCollapse
    asideSettings.value.width = asideSettings.value.isCollapse ? "64px" : "220px"
  }
  </script>
  
  <style scoped>
  body {
    background-color: #eee;
    max-width: 100vw;
    overflow: hidden;
  }
  
  .el-main {
    width: 100%;
    padding: 0;
    height: 100vh;
    overflow-x: hidden;
    
  }

  .el-container, .el-main, .el-aside {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 确保这些元素不引起横向滚动 */
}

  </style>
  