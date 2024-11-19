<template>
  <PageHeader title="机器清单管理" />
  <ButtonNav /> <!-- 使用新创建的 ButtonNav 组件 -->
  
  <div class="view-container">
    <el-row class="el-row">
      <Left />
      <Right />
      <Footer />
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import Left from '@/views/Machine/View/Left.vue';
import Right from '@/views/Machine/View/Right.vue';
import Footer from '@/views/Machine/View/Footer.vue';
import ButtonNav from '@/views/Machine/ButtonNav.vue'; // 引入新组件
</script>
