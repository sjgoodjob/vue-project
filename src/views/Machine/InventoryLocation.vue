<template>
  <PageHeader
            title="位置视图"
        />
  <div class="layout-container">
    <!-- 标题栏 -->
    <div class="header">
      <el-button type="primary" color="#1b5fa7" class="header-btn">机器清单</el-button>
      <el-button type="primary"  color="#1b5fa7" class="header-btn">位置视图</el-button>
    </div>

    <!-- 主布局 -->
    <div class="content">
      <!-- 左边的工厂 -->
      <div class="column"   v-for="location in locationsData"
          :key="location.id">
        <!-- 动态生成工厂卡片 -->
        <div
          class="card factory-card"
        
          @dragenter="highlightDropZone"
          @dragleave="removeHighlight"
        >
          <div class="card-header">
            {{ location.name }}
            <div class="button-group">
              <el-icon><Plus /></el-icon>
              <el-icon><Edit /></el-icon>
            </div>
          </div>

          <!-- 可拖拽的按钮区域使用 vuedraggable -->
          <draggable
            v-model="location.buttons"
            group="buttons"
            @change="onDragChange"
            item-key="id"
            class="button-list"
          >
            <template #item="{ element: button }">
              <div class="button-item">
                <el-button
                 
                  draggable="true"
                >
                <el-icon><Menu /></el-icon>
                  {{ button.name }}
                </el-button>
              </div>
            </template>
          </draggable>

          <!-- 递归渲染子卡片 -->
          <div v-show="location.expanded" class="nested-content">
            <NestedCard
              v-for="child in location.children"
              :key="child.id"
              :location="child"
            />
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NestedCard from './NestedCard.vue';
import draggable from 'vuedraggable';
import PageHeader from '@/components/PageHeader.vue'

const locationsData = ref([
  {
    id: 1,
    name: 'Factory A',
    color: '#1D3557',
    expanded: true,
    buttons: [{ id: 'add-laurel', name: 'Laurel' }],
    children: [
      {
        id: 2,
        name: 'Room 000',
        color: '#FFD166',
        expanded: true,
        buttons: [],
        children: [
          {
            id: 3,
            name: 'Table B',
            color: '#06D6A0',
            expanded: true,
            buttons: [],
            children: [
              {
                id: 4,
                name: 'Table C',
                color: '#06DDDD',
                expanded: true,
                buttons: [{ id: '-laurel', name: 'Laurfffel' }],
                children: [],
              },
              {
                id: 6,
                name: 'DFFE',
                color: '#FFD166',
                expanded: true,
                buttons: [],
                children: [],
              },
            ],
          },
          {
            id: 7,
            name: 'FDGRFRFG',
            color: '#FDDDF6',
            expanded: true,
            buttons: [],
            children: [],
          },
        ],
      },
      {
        id: 5,
        name: '测试位置',
        color: '#FFD166',
        expanded: true,
        buttons: [],
        children: [],
      },
    ],
  },
  {
    id: 11,
    name: 'Factory B',
    color: '#1D3557',
    expanded: true,
    buttons: [],
    children:[
      {
        id: 20,
        name: 'Room 0222200',
        color: '#FFD166',
        expanded: true,
        buttons: [],
        children: []
      }
    ]
  },
  {
    id: 12,
    name: 'Factory C',
    color: '#1D3557',
    expanded: true,
    buttons: [],
    children:[

    ]
  },
]);

const onDragChange = (event) => {
  console.log("Button order changed:", event);
};

// 高亮和移除高亮
const highlightDropZone = (event) => {
  event.currentTarget.classList.add('highlight-dropzone');
};

const removeHighlight = (event) => {
  event.currentTarget.classList.remove('highlight-dropzone');
};
</script>

<style scoped>

.layout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.header {
  display: flex;
  gap: 2px;
  width: 100%;
  margin-bottom: 10px;
}

.header-btn {
  flex: 1;
  padding: 20px 0;
  font-size: 16px;
  text-align: center;

}

.content {
  display: flex;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
    align-items: stretch;
    align-content: stretch;
    justify-content: space-between;
}

.column {
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  flex: 0 0 49.5%; /* 每个元素占父容器的 50% 宽度 */

}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #AAA;
}

.factory-card {
  color: #FFF;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background-color: #1b5fa7;
  padding: 5px;
  border-top-left-radius: 8px;
    border-top-right-radius: 8px
}

.card-content {
  margin-top: 10px;
}

.nested-content {
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  margin-top: 10px;

}

.highlight-dropzone {
  border: 2px dashed #d11a32;
  background-color: rgba(0, 123, 255, 0.1);
}

.button-item {
  margin-top: 10px;
}

.button-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 10px;
}
</style>
