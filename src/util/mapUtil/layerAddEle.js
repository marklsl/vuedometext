/* global Cesium viewer */
const dataSources = {
    listBase: new Cesium.CustomDataSource('listBaseHover'),
};
const imgEnum = {
    listBase: require('../../assets/listPoint.png'),
};
const obg = Object.create(null);
/**
 * 实体类里添加点，删除点
 * @param {Object}   item   点目标
 * @param {String}   type    po类型
 * @param {String}   isAdd    添加还是删除（true添加，false删除）
 * @param {String}   item.id    目标id
 * @param {Number}   item.lon   经度坐标
 * @param {Number}   item.lat   纬度坐标
 * @param {String}   item.pointType  目标类型: new || public || private
 */
obg.addPointFun = function(item, type, isAdd) {
    if (!viewer.dataSources.contains(dataSources[type])) {
        viewer.dataSources.add(dataSources[type]);
    }
    if (isAdd) {
        let poMarker = {
            id: item.id,
            item: item,
            position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat, 0),
            billboard: {
                image: imgEnum[item.pointType],
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                zIndex: 100,
            },
            leftClick: item.callBackFun,
        };
        dataSources[type].entities.add(poMarker);
    } else {
        if (item) {
            dataSources[type].entities.removeById(item.id);
        } else {
            dataSources[type].entities.removeAll();
        }
    }
};

export default obg;
