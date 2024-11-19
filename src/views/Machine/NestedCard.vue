<template>
  <div 
    :data-id="location.id"
    class="location-card"
  >
    <div class="card-header"     :style="{ backgroundColor: location.color }">
      <el-icon @click.stop="toggleNode">
        <component :is="location.expanded ? ArrowDown : ArrowRight" />
      </el-icon>
      <span>{{ location.name }}</span>
      <div class="button-group">
        <el-icon><Plus /></el-icon>
        <el-icon><Edit /></el-icon>
      </div>
    </div>

    <!-- 使用 vuedraggable 管理按钮拖拽 -->
    <draggable
      v-model="location.buttons"
      group="buttons"
      @change="onDragChange"
      item-key="id"
      class="button-list"
    >
      <template #item="{ element: button }">
        <div class="button-item" v-show="location.expanded">
          <el-button>
            <el-icon><Menu /></el-icon>

            {{ button.name }}
          </el-button>
        </div>
      </template>
    </draggable>

    <!-- 递归渲染子组件 -->
    <div v-show="location.expanded" class="nested-content">
      <NestedCard
        v-for="child in location.children"
        :key="child.id"
        :location="child"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue';
import NestedCard from './NestedCard.vue';
import draggable from 'vuedraggable';

interface Location {
  id: number;
  name: string;
  color: string;
  expanded: boolean;
  buttons: { id: string, name: string }[];
  children: Location[];
}

const props = defineProps<{ location: Location }>();

// 节点展开和折叠
const toggleNode = () => {
  props.location.expanded = !props.location.expanded;

};

// 拖拽顺序变更的处理
const onDragChange = (event) => {
  console.log("Button order changed:", event);
};
</script>

<style scoped>
.location-card {
  border-radius: 8px;
  margin: 10px 0;
  color: #fff;
  border: 1px solid #AAA;

}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  padding: 5px;
  border-top-left-radius: 8px;
    border-top-right-radius: 8px

}

.button-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 10px;
}

.nested-content {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding: 0px 10px;
  margin-top: 10px;

}

.button-item {
  margin-top: 10px;
}
</style>
