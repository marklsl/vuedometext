/**
 * 图层管理的配置文件
 */
/* global ICENTER_URL CESIUM_NAME TERRAIN_URL PLACE_NAMES */
class LayerArr {
    constructor() {
        this.mapServiceConf = {
            imageryLayer: [
                {
                    methodName: 'setBaseLayer',
                    label: '地名图层',
                    type: 'WMTS',
                    preloading: true,
                    id: 'index2',
                    index: 0,
                    provider: {
                        url: ICENTER_URL + '/tilecache/service/wmts',
                        layer: PLACE_NAMES,
                        format: 'image/png',
                        style: 'default',
                        maximumLevel: 19,
                        tileMatrixSetID: 'EPSG:4326',
                        projection: 'WGS84',
                    },
                },
                {
                    methodName: 'setBaseLayer',
                    label: '矢量图层',
                    type: 'WMTS',
                    preloading: true,
                    id: 'index1',
                    index: 0,
                    provider: {
                        url: ICENTER_URL + '/tilecache/service/wmts',
                        layer: CESIUM_NAME,
                        format: 'image/jpeg',
                        style: 'default',
                        maximumLevel: 19,
                        tileMatrixSetID: 'EPSG:4326',
                        projection: 'WGS84',
                    },
                },
            ],
            DEM: [
                {
                    methodName: 'setTerrainLayer',
                    label: '地形图层',
                    preloading: true,
                    url: ICENTER_URL + TERRAIN_URL,
                },
            ],
        };
    }
}
export default new LayerArr();
