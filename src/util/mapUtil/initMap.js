/**
 * 初始化球
 * @param {String} container:球加载容器
 */
/* global Cesium */
export default function initViewer(container) {
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(73, 13, 135, 53);
    let viewer = new Cesium.Viewer(container, {
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        animation: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        creditContainer: document.createElement('div'),
        imageryProvider: false,
        contextOptions: {
            webgl: {
                alpha: true,
                depth: false,
                stencil: true,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: true,
                failIfMajorPerformanceCaveat: true,
            },
            allowTextureFilterAnisotropic: true,
        },
    });

    let labelEntity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(0, 0),
        label: {
            text: '提示',
            font: '15px sans-serif',
            pixelOffset: new Cesium.Cartesian2(8, 8), // y大小根据行数和字体大小改变
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            showBackground: true,
            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 1.0),
        },
    });
    labelEntity.show = false;

    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    viewer.scene.fog.enabled = false;
    viewer.scene.globe.showGroundAtmosphere = false;
    window.viewer = viewer;
    window.cesium = Cesium;
}
