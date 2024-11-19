<template>
  
<PageHeader
            title="地理位置管理"
        />
  <div class="card shadow embed-responsive card-content">
        <div class="card-body no-padding">
            <!-- Map will be created here --> 
            <div id="map" ref="mapContainer" class="map-container"></div>
        </div>
    </div> 
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, h, createApp } from 'vue';
import mapboxgl from 'mapbox-gl';
import { ElScrollbar } from 'element-plus'; // 引入 Element Plus 的 ElScrollbar 组件
import 'element-plus/theme-chalk/el-scrollbar.css'; // 引入 ElScrollbar 的样式import mapboxgl from 'mapbox-gl';
import PageHeader from '@/components/PageHeader.vue'

// 在 main.js 或组件顶部
import 'mapbox-gl/dist/mapbox-gl.css';

// 替换为您的 Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoiamFzaWMyMDI0IiwiYSI6ImNtMWl1aWR2djBzbGkycXNia3BqM243MmoifQ.x4g_aCz9ePN9gcgdVX68zg';

// 地图容器的 ref
const mapContainer = ref(null);
let map;

// 位置数据（与原始 JavaScript 代码中的 locations 数据一致）
const locations = [
  ["RAXA21BIB18709","34.7732","113.722"],
  ["RAXA19BRB05721","-33.8672","151.1997"],
  ["RAYA19BRB03720","45.4722","10.8564"],
  ["RAAA21ACB01671","59.8983","30.2618"],
  ["RAAA21ACB14675","34.7732","113.722"],["RBXA21BBB01695","34.7732","113.722"],["RBXA21BBB01695","34.7732","113.722"],["RAXA21BIB38711","34.7732","113.722"],["RAXA21BIB41705","34.7732","113.722"],["RAXA21BIB27709","34.7732","113.722"],["RAXA21BIB26708","34.7732","113.722"],["RAXA21BIB23705","34.7732","113.722"],["RAXA21BIB46710","34.7732","113.722"],["RBXA21AWB05719","22.5318","114.1374"],["RAXA19BRB04720","-36.8506","174.7679"],["RBYA21AZB04722","45.6779","11.3248"],["RAXA21BIB43707","40.4617","17.2436"],["RAAA21ACB24676","22.5318","114.1374"],["RBAA22AKC124736","22.5318","114.1374"],["RBAA22AKB76693","22.5318","114.1374"],["RBAA22AKC104734","22.5318","114.1374"],["RBAA22AKC119740","22.5318","114.1374"],["RBAA22ALB72690","22.5318","114.1374"],["RBAA22ALB66693","22.5318","114.1374"],["RBAA22ALB41686","22.5318","114.1374"],["RBAA22ALB33687","22.5318","114.1374"],["RBXA21BIB01702","22.5318","114.1374"],["RBAA22ALB62689","22.5318","114.1374"],["RBAA22AKB12683","22.5318","114.1374"],["RBAA22AKB64690","22.5318","114.1374"],["RBAA22AKB91690","22.5318","114.1374"],["RBAA22AKB62688","22.5318","114.1374"],["RBAA22AKB38691","22.5318","114.1374"],["RBAA22ALB61688","22.5318","114.1374"],["RBAA22ALB59695","22.5318","114.1374"],["RBAA22ALB34688","22.5318","114.1374"],["RBAA22ALB51687","22.5318","114.1374"],["RBXA21BIB05706","22.5318","114.1374"],["RBAA22AKB37690","22.5318","114.1374"],["RBAA22AKB54689","22.5318","114.1374"],["RBAA22ALB30684","22.5318","114.1374"],["RBAA22ALB18690","22.5318","114.1374"],["RBAA22ALB38692","22.5318","114.1374"],["RBAA22ALB32686","22.5318","114.1374"],["RBAA22ALB45690","22.5318","114.1374"],["RBAA22AKB44688","22.5318","114.1374"],["RBAA22ALB74692","22.5318","114.1374"],["RBAA22AKB92691","22.5318","114.1374"],["RBAA22AKB36689","22.5318","114.1374"],["RBAA22AKB23685","22.5318","114.1374"],["RBAA22AKB15686","22.5318","114.1374"],["RBAA22AKB80688","22.5318","114.1374"],["RBAA22ALB65692","22.5318","114.1374"],["RBAA22AKB35688","22.5318","114.1374"],["RBXA21AWB07721","22.5318","114.1374"],["RBAA22ALB16688","22.5318","114.1374"],["RBAA22AKB33686","22.5318","114.1374"],["RBAA22AKB07687","22.5318","114.1374"],["RBAA22AKB34687","22.5318","114.1374"],["RBAA22AKB85693","22.5318","114.1374"],["RBAA22AKB77694","22.5318","114.1374"],["RBAA22ALB08689","22.5318","114.1374"],["RBAA22ALB07688","22.5318","114.1374"],["RBAA22ALB02683","22.5318","114.1374"],["RBAA22ALB31685","22.5318","114.1374"],["RBAA22AKB68694","22.5318","114.1374"],["RBAA22AKB60686","22.5318","114.1374"],["RBAA22ALB10682","22.5318","114.1374"],["RBAA22AKB02682","22.5318","114.1374"],["RBAA22AKB51686","22.5318","114.1374"],["RBAA22ALB14686","22.5318","114.1374"],["RBAA22AKB32685","22.5318","114.1374"],["RBAA22AKB45689","22.5318","114.1374"],["RBAA22AKB08688","22.5318","114.1374"],["RBAA22AKB72689","22.5318","114.1374"],["RBAA22AKB93692","22.5318","114.1374"],["RBAA22AKB13684","22.5318","114.1374"],["RBAA22AOB02686","22.5318","114.1374"],["RBAA22AOB26692","22.5318","114.1374"],["RBAA22AKC113734","22.5318","114.1374"],["RBAA22ASC221742","45.6779","11.3248"],["RBAA22AKB78695","-33.9472","151.2226"],["RBAA22AKB14685","-33.9472","151.2226"],["RBAA22AKB22684","-33.9472","151.2226"],["RBAA22AKB46690","-33.9472","151.2226"],["RBAA22AKB59694","-33.9472","151.2226"],["RBAA22ALB26689","-33.9472","151.2226"],["RBAA22AKB83691","-33.9472","151.2226"],["RBAA22ALB24687","-33.9472","151.2226"],["RBAA22AKB71688","-33.9472","151.2226"],["RBAA22AKB82690","-33.9472","151.2226"],["RBAA22ALB43688","-33.9472","151.2226"],["RBAA22AKB05685","-33.9472","151.2226"],["RBAA22AKB88696","-33.9472","151.2226"],["RBAA22AKB50685","-33.9472","151.2226"],["RBAA22ALB70688","-33.9472","151.2226"],["RBAA22AKB49693","-33.9472","151.2226"],["RBAA22ALB54690","-33.9472","151.2226"],["RBAA22ALB36690","-33.9472","151.2226"],["RBAA22AOB18693","-33.9472","151.2226"],["RBAA22ALB75693","-27.8703","153.3596"],["RBAA22AKB84692","-33.9472","151.2226"],["RBAA22AKB74691","-33.9472","151.2226"],["RBAA22ALB68695","-33.9472","151.2226"],["RBAA22ASC176751","34.7732","113.722"],["RBAA22ASC224745","45.6779","11.3248"],["RBAA22ALB19691","-33.9472","151.2226"],["RBAA22AKB52687","-33.9472","151.2226"],["RBAA22AKB94693","-33.9472","151.2226"],["RBAA22AKB21683","-33.9472","151.2226"],["RBAA22AKB24686","-33.9472","151.2226"],["RBAA22AKB69695","-33.9472","151.2226"],["RBAA22AUB01691","45.6779","11.3248"],["RBAA22AUB07697","22.5318","114.1374"],["RBAA22ASC413745","-33.9472","151.2226"],["RBAA22ASB21691","-33.9472","151.2226"],["RBAA22ASC208747","-33.9472","151.2226"],["RBAA22ASC217747","-33.9472","151.2226"],["RBAA22ASC166750","-33.9472","151.2226"],["RBAA22ASC327749","-33.9472","151.2226"],["RBAA22ASC219749","-33.9472","151.2226"],["RBAA22ASC392751","-33.9472","151.2226"],["RBAA22ASC340744","-33.9472","151.2226"],["RBAA22ASC467754","-33.9472","151.2226"],["RBAA22ASC284751","-33.9472","151.2226"],["RBAA22ASC358753","-33.9472","151.2226"],["RBAA22ASB18697","-33.9472","151.2226"],["RBAA22ASC395754","-33.9472","151.2226"],["RBAA22ASC214744","-33.9472","151.2226"],["RBAA22ASC247750","-33.9472","151.2226"],["RBAA22ASC475753","-33.9472","151.2226"],["RBAA22ASB68702","-33.9472","151.2226"],["RBAA22ASC472750","-33.9472","151.2226"],["RBAA22ASC136747","-33.9472","151.2226"],["RBAA22ASB01689","-33.9472","151.2226"],["RBAA22ASC131742","-33.9472","151.2226"],["RBAA22ASB42694","-33.9472","151.2226"],["RBAA22ASB51694","-33.9472","151.2226"],["RBAA22ASC289756","-33.9472","151.2226"],["RBAA22ASC194751","-33.9472","151.2226"],["RBAA22ASB57700","-33.9472","151.2226"]
  // 更多数据...
];

// 转换位置数据为 GeoJSON 结构
const geojson = {
  type: 'FeatureCollection',
  features: locations.map(location => ({
    type: 'Feature',
    properties: {
      title: location[0],
      description: `<b>Machine Serial:</b> ${location[0]} <br><a href="machine-information?machineSerial=${location[0]}&active=information">Open Machine Detail</a>`
    },
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(location[2]), parseFloat(location[1])]
    }
  }))
};

// 地图初始化
onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/jasic2024/clzi29xx7002601peawbvbxu7', // 地图样式
    center: [116.404, 39.915], // 地图中心
    zoom: 1, // 初始缩放级别
    projection: 'mercator'
  });

  map.on('load', function () {
    // 添加 GeoJSON 数据源并启用聚类
    map.addSource('locations', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });

    // 添加聚类图层
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'locations',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6', 100,
          '#f1f075', 750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20, 100,
          30, 750,
          40
        ]
      }
    });

    // 添加聚类点计数的文本图层
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'locations',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    // 非聚类点图层
    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'locations',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 8,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });

    // 为单个点添加弹出层
    map.on('click', 'unclustered-point', function (e) {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // 确保弹出层在地图边界内
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup({ offset: 25, anchor: 'top' })
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    // 为聚类点添加弹出层
    map.on('click', 'clusters', function (e) {
      const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
      const clusterId = features[0].properties.cluster_id;

      // 获取聚类内的所有点
      map.getSource('locations').getClusterLeaves(clusterId, 100, 0, function (err, clusterFeatures) {
        if (err) {
          console.error("Error fetching cluster leaves:", err);
          return;
        }
        const popupContainer = document.createElement('div');

          // 使用 Vue 创建一个包含 Element Plus 组件的弹出内容
          const app = createApp({
          render() {
            return h(ElScrollbar, { height: '200px' }, {
              default: () => clusterFeatures.map(feature =>
                h('div', { class: 'popup-item' }, [
                  h('p', { innerHTML: feature.properties.description })
                ])
              )
            });
          }
        });

        app.mount(popupContainer);

        new mapboxgl.Popup({ offset: 25, anchor: 'top' })
          .setLngLat(features[0].geometry.coordinates)
          .setDOMContent(popupContainer)
          .addTo(map);
      });
    });

    // 鼠标悬停聚类时改变样式
    map.on('mouseenter', 'clusters', function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
      map.getCanvas().style.cursor = '';
    });
  });
});

// 在组件卸载时清理地图
onUnmounted(() => {
  if (map) map.remove();
});
</script>

<style scoped>
.map-container {
  height: 600px;
  margin: 20px;
  width: auto;

}

:deep(.scrollbar-demo-item) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
:deep(.popup-content) {
        max-height: 200px; /* Set the max height */
        overflow-y: auto;  /* Enable vertical scrolling */
 }
 .embed-responsive {
    position: relative;
    display: block;
    width: 96%;
    padding: 0;
    margin: 0px auto;
    overflow: hidden;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.35rem;
}
</style>
