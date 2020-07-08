<template>
    <div id="map_contain"></div>
</template>

<script>
import 'cesium/Widgets/widgets.css';
import layerCtrl from 'U/mapUtil/layerCtrl';
import initViewer from 'U/mapUtil/initMap';
import MapTool from 'U/mapUtil/mapTool';
import layerAddEle from 'U/mapUtil/layerAddEle';
export default {
    name: 'mapPage',
    components: {},
    data() {
        return {};
    },
    mounted() {
        initViewer('map_contain');
        this.getLayerArr();
        this.addPoint();
    },
    methods: {
        // 获取配置文件中图层的所有信息
        getLayerArr() {
            let mapServiceConf = layerCtrl.mapServiceConf;
            Object.keys(mapServiceConf).forEach(item => {
                mapServiceConf[item].forEach(itemTwo => {
                    let ele = {
                        name: itemTwo.label, // 图层名称
                        methodName: itemTwo.methodName, // 加载图层的方法名
                        item: itemTwo,
                        isClicked: itemTwo.preloading, // 是否初始化的时候就已经加载了
                    };
                    if (itemTwo.preloading) {
                        this.addLayerToMap(ele);
                    }
                });
            });
        },
        // 初始化加载图层
        addLayerToMap(ele) {
            console.log(MapTool.Fun().layerManager);
            MapTool.Fun().layerManager[ele.methodName](ele.item, ele.isClicked, ele.item.index);
        },

        // 添加点位
        addPoint() {
            const obj = [
                {
                    id: '123',
                    lon: 116.401969,
                    lat: 39.916042,
                    pointType: 'listBase',
                },
                {
                    id: '124',
                    lon: 120.804152,
                    lat: 23.927171,
                    pointType: 'listBase',
                },
                {
                    id: '125',
                    lon: 121.241088,
                    lat: 24.389294,
                    pointType: 'listBase',
                },
                {
                    id: '126',
                    lon: 121.064014,
                    lat: 23.312648,
                    pointType: 'listBase',
                },
            ];
            obj.forEach(item => {
                layerAddEle.addPointFun(item, 'listBase', true);
            });
        },
    },
};
</script>
<style lang="scss">
.map_contain {
    width: 100%;
    height: 100%;
}
</style>
