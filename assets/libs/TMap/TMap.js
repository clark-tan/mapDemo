// promise ie兼容
// 在引进该js之前先引进<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>


//插件功能介绍
// new TMap后先异步加载地图再生成api功能
// 1、支持多种地图（可挑选）
// 2、支持基于原参数进行多功能扩展
// 3、


(function (window, factory) {

    window.TMap = factory();

})(this, function () {

    'use strict'

    if (typeof (Promise) === "function") {
        var mapPromise = {};
        mapPromise.promise = new Promise(function (resolve, reject) {
            mapPromise.resolve = resolve;
            mapPromise.reject = reject;
        });
    } else {
        console.log('在引进该js之前先引进<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>');
    };

    function cityModule() {
        // var cityTemplate = 
    }

    var mapToolUrls = {
        EventWrapper: {
            js: 'https://api.map.baidu.com/library/EventWrapper/1.2/src/EventWrapper.min.js'
        },
        SearchInRectangle: {
            js: 'https://api.map.baidu.com/library/SearchInRectangle/1.2/src/SearchInRectangle_min.js'
        },
        DrawingManager: {
            css: 'https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css',
            js: 'https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js'
        },
        GeoUtils: {
            js: 'https://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js'
        },
        DistanceTool: {
            js: 'https://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js'
        },
        TextIconOverlay: {
            js: 'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js'
        },
        MarkerClusterer: {
            js: 'https://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js'
        },
        CityList: {
            js: 'https://api.map.baidu.com/library/CityList/1.4/src/CityList_min.js'
        },
        TrafficControl: {
            css: 'https://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css',
            js: 'https://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js'
        },
        SearchInfoWindow: {
            css: 'https://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css',
            js: 'https://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js'
        },
        InfoBox: {
            js: 'https://api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js'
        },
        MarkerManager: {
            js: 'https://api.map.baidu.com/library/MarkerManager/1.2/src/MarkerManager_min.js'
        }
    }

    //插入css及js方法
    function insertCssOrJs(options) {

        if (options.js) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = options.js;
            document.body.appendChild(script);
        }
        if (options.css) {
            var link = document.createElement('link');
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = options.css;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }

    //调用插入方法
    function loadCssOrJs(options) {

        if (options.searchRec) {
            insertCssOrJs(mapToolUrls.SearchInRectangle);
        }

        if (options.drawingManager) {
            insertCssOrJs(mapToolUrls.DrawingManager);
        }

        if (options.geoUtils) {
            insertCssOrJs(mapToolUrls.GeoUtils);
        }

        if (options.disTool) {
            insertCssOrJs(mapToolUrls.DistanceTool);
        }

        if (options.infoBoxShow) {
            insertCssOrJs(mapToolUrls.InfoBox);
        }

        if (options.drawingManager) {
            insertCssOrJs(mapToolUrls.DrawingManager);
        }

        if (options.traffic) {
            insertCssOrJs(mapToolUrls.TrafficControl);
        }

        if (options.mkManager) {
            insertCssOrJs(mapToolUrls.MarkerManager);
        }

        if (options.mkClusterer) {
            insertCssOrJs(mapToolUrls.TextIconOverlay);
            insertCssOrJs(mapToolUrls.MarkerClusterer);
        }
    }

    var TMap = function (options) {

        var _this = this;

        _this.drawingManager = null;

        _this.isTraffic = true;

        var DEFAULTS = {
            mapType: 1,
            dragging: true,
            wheel: true,
            dbClick: true,
        };

        _this.config = _this.extend({}, DEFAULTS, options);

        if (!window.isMap) {
            if (_this.config.mapType == 1) {
                // window.BMap_loadScriptTime = (new Date).getTime();

                // window.BMap = window.BMap || {};

                // window.BMap.apiLoad = function () {
                //     delete window.BMap.apiLoad;

                //     insertCssOrJs(mapToolUrls.EventWrapper);

                //     loadCssOrJs(_this.config.insertUrls);

                //     _this.initBMap(_this);
                // };

                // var script = document.createElement('script');

                // script.src = 'https://api.map.baidu.com/getscript?v=3.0&ak=' + _this.config.ak + '&services=&t=' + window.BMap_loadScriptTime + '&s=1';

                // document.body.appendChild(script);

                var script = document.createElement("script");

                script.type = "text/javascript";

                script.src = "https://api.map.baidu.com/api?v=3.0&ak=" + _this.config.ak + "&callback=init&s=1";

                document.body.appendChild(script);

                function init() {
                    alert(1);

                    insertCssOrJs(mapToolUrls.EventWrapper);

                    loadCssOrJs(_this.config.insertUrls);

                    _this.initBMap(_this);
                }

                // window.onload = loadJScript; //异步加载地图

            } else if (_this.config.mapType == 2) {
                var script = document.createElement('script');
                script.src = 'https://webapi.amap.com/maps?v=1.4.1&key=' + _this.config.ak + '';
                script.onload = function () {
                    _this.initAMap(_this);
                }
                document.body.appendChild(script);
            }

            window.isMap = _this;

        } else {

            console.log('地图js已加载!');

            loadCssOrJs(window.isMap.config.insertUrls);

            window.isMap.initBMap(window.isMap);

        }
    };

    TMap.prototype = {
        extend: function () {
            var _this = this;
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            //如果第一个值为bool值，那么就将第二个参数作为目标参数，同时目标参数从2开始计数
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }
            // 当目标参数不是object 或者不是函数的时候，设置成object类型的
            if (typeof target !== "object" && !(Object.prototype.toString.call(target) === '[object Function]')) {
                target = {};
            }
            //如果extend只有一个函数的时候，那么将跳出后面的操作
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                // 仅处理不是 null/undefined values
                if ((options = arguments[i]) != null) {
                    // 扩展options对象
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        // 如果目标对象和要拷贝的对象是恒相等的话，那就执行下一个循环。
                        if (target === copy) {
                            continue;
                        }
                        // 如果我们拷贝的对象是一个对象或者数组的话
                        if (deep && copy && (('isPrototypeOf' in obj && Object.prototype.toString.call(copy) === '[object Object]') || (copyIsArray = (copy instanceof Array)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && (src instanceof Array) ? src : [];
                            } else {
                                clone = src && ('isPrototypeOf' in obj && Object.prototype.toString.call(copy) === '[object Object]') ? src : {};
                            }
                            //不删除目标对象，将目标对象和原对象重新拷贝一份出来。 
                            target[name] = _this.extend(deep, clone, copy);
                            // 如果options[name]的不为空，那么将拷贝到目标对象上去。
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            // 返回修改的目标对象
            return target;
        },
        initBMap: function (_this) {
            var map = new BMap.Map("allmap"); // 创建Map实例
            var point = new BMap.Point(116.404, 39.915); // 创建点坐标
            map.centerAndZoom(_this.config.initCity || point, _this.config.zoom || 15);
            _this.setBaseStyle([{
                    "featureType": "land",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#fcf9f2"
                    }
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                        "color": "#cfe2f3"
                    }
                },
                {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                        "color": "#d4f0ff"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#ffffff"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "geometry.stroke",
                    "stylers": {
                        "color": "#cccccc"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#ffffff"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry.stroke",
                    "stylers": {
                        "color": "#cccccc"
                    }
                },
                {
                    "featureType": "local",
                    "elementType": "labels.text.fill",
                    "stylers": {
                        "color": "#7a959a"
                    }
                },
                {
                    "featureType": "local",
                    "elementType": "labels.text.stroke",
                    "stylers": {
                        "color": "#d6e4e5"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "labels.text.fill",
                    "stylers": {
                        "color": "#374a46"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "labels.text.fill",
                    "stylers": {
                        "color": "#ffffff"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "labels.text.stroke",
                    "stylers": {
                        "color": "#e9eeed"
                    }
                }
            ]);
            _this.config.dragging ? map.enableDragging() : map.disableDragging();
            _this.config.wheel ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom();
            _this.config.dbClick ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom();

            if (_this.config.navigation) {
                //添加缩放平移控件
                map.addControl(new BMap.NavigationControl({
                    anchor: _this.config.navigation.anchor ? _this.config.navigation.anchor : BMAP_ANCHOR_TOP_LEFT,
                    offset: new BMap.Size(_this.config.navigation.offset ? _this.config.navigation.offset.x : 10, _this.config.navigation.offset ? _this.config.navigation.offset.y : 30)
                }));
            }
            if (_this.config.scale) {
                //添加比例尺
                map.addControl(new BMap.ScaleControl({
                    anchor: _this.config.scale.anchor ? _this.config.scale.anchor : BMAP_ANCHOR_TOP_LEFT,
                    offset: new BMap.Size(_this.config.scale.offset ? _this.config.scale.offset.x : 80, _this.config.scale.offset ? _this.config.scale.offset.y : 20)
                }));
            }
            if (_this.config.cityList) {
                //添加城市列表
                map.addControl(new BMap.CityListControl({
                    anchor: _this.config.cityList.anchor ? _this.config.cityList.anchor : BMAP_ANCHOR_TOP_LEFT,
                    offset: new BMap.Size(_this.config.cityList.offset ? _this.config.cityList.offset.x : 80, _this.config.cityList.offset ? _this.config.cityList.offset.y : 60),
                    // 切换城市之间事件
                    onChangeBefore: _this.config.cityList.addBefore ? _this.config.cityList.addBefore : null,
                    // 切换城市之后事件
                    onChangeAfter: _this.config.cityList.addAfter ? _this.config.cityList.addAfter : null
                }));
            }
            _this.map = map;

            _this.map.addEventListener('tilesloaded', function () {
                mapPromise.resolve(_this);
            })
        },
        initAMap: function (_this) {
            var map = new AMap.Map('allmap', {
                center: [117.00, 36.68],
                zoom: 6
            });
            map.plugin(["AMap.ToolBar"], function () {
                map.addControl(new AMap.ToolBar());
            });
            mapPromise.resolve(this);
            _this.map = map;
        },
        setBaseType: function (view) { //设置地图类型
            var _this = this;
            mapPromise.promise.then(function () {
                if (view == 'normal') {
                    _this.map.setMapType(BMAP_NORMAL_MAP); // BMAP_NORMAL_MAP 此地图类型展示普通街道视图
                }
                if (view == 'satellite') {
                    _this.map.setMapType(BMAP_SATELLITE_MAP); // BMAP_SATELLITE_MAP 此地图类型展示卫星视图
                }
                if (view == 'hybrid') {
                    _this.map.setMapType(BMAP_HYBRID_MAP); // BMAP_HYBRID_MAP 此地图类型展示卫星和路网的混合视图
                }
            });
        },
        setBaseStyle: function (json) { //设置地图底图（启用后街道以下的层级可能无法显示）
            var _this = this;
            mapPromise.promise.then(function () {
                _this.map.setMapStyle({
                    styleJson: json
                });
            });
        },
        mapOverlay: function (options) { //添加覆盖物
            /*
            1 -> marker
            2 -> polyline
            3 -> polygon
            4 -> circle 
            5 -> label
            */
            var config = {
                type: null,
                attribute: {
                    imgUrl: null,
                    color: '#a6e50f',
                    weight: 3,
                    opacity: 1,
                    imgSize: {
                        x: 0,
                        y: 0
                    },
                    imgAnchor: {
                        x: 0,
                        y: 0
                    },
                    isAdd: true,
                    isDragging: false,
                    isEditing: false,
                    isCenter: false,
                    index: null
                },
                styleOptions: {
                    strokeColor: '#a6e50f', //边线颜色
                    fillColor: '#a6e50f', //填充颜色。当参数为空时，折线覆盖物将没有填充效果
                    strokeWeight: 3, //边线的宽度，以像素为单位
                    strokeOpacity: 1, //边线透明度，取值范围0 - 1
                    fillOpacity: 0.1, //填充的透明度，取值范围0 - 1
                    strokeStyle: 'solid', //边线的样式，solid或dashed
                    enableMassClear: true, //是否在调用map.clearOverlays清除此覆盖物，默认为true
                    enableEditing: false, //是否启用线编辑，默认为false
                    enableClicking: true, //是否响应点击事件，默认为true
                },
                pointList: null,
                othersObj: null,
                callback: null
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                var overlay, points = [];
                var attribute = config.attribute;
                var pointList = config.pointList ? config.pointList : [];
                if (pointList.length > 0 && pointList.length <= 1) {
                    var point = new BMap.Point(pointList[0].lng, pointList[0].lat);
                } else if (pointList.length > 1) {
                    for (var i in pointList) {
                        var point = new BMap.Point(pointList[i].lng, pointList[i].lat);
                        points.push(point);
                    }
                } else {
                    return
                }
                if (config.type == 1) {
                    if (attribute.imgUrl) {
                        var Icon = new BMap.Icon(attribute.imgUrl, new BMap.Size(attribute.imgSize.x, attribute.imgSize.y), {
                            anchor: new BMap.Size(attribute.imgAnchor.x, attribute.imgAnchor.y)
                        });
                        overlay = new BMap.Marker(point, {
                            icon: Icon
                        });
                    } else {
                        overlay = new BMap.Marker(point);
                    }
                };
                if (config.type == 2) {
                    overlay = new BMap.Polyline(points, config.styleOptions);
                };
                if (config.type == 3) {
                    overlay = new BMap.Polygon(points, config.styleOptions);
                };
                if (config.type == 4) {
                    overlay = new BMap.Circle(point, config.radius);
                };
                if (config.type == 5) {
                    overlay = new BMap.Label(config.content, config.radius);
                };

                attribute.isCenter ? _this.map.setCenter(point) : null;
                attribute.isDragging ? overlay.enableDragging() : null;
                attribute.isEditing ? overlay.enableEditing() : null;
                attribute.index ? overlay.setZIndex(attribute.index) : null;

                config.othersObj ? _this.extend(overlay, config.othersObj) : null;
                config.callback ? config.callback(overlay) : null;
                attribute.isAdd ? _this.map.addOverlay(overlay) : null;
            });
        },
        setTraffic: function (options) { //交通实时路况
            var config = {
                isShowBtn: false
            }
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                if (_this.isTraffic) {
                    _this.map.trafficCtrl = new BMapLib.TrafficControl();
                    _this.map.addControl(_this.map.trafficCtrl);
                    if (config.isShowBtn) {
                        // var Size = new BMap.Size(80, 30);
                        // trafficCtrl.setPopOffset(Size);
                    } else {
                        _this.map.trafficCtrl.btn.hidden = true;
                    }
                    _this.map.trafficCtrl.showTraffic();
                } else {
                    if (_this.map.trafficCtrl) {
                        _this.map.trafficCtrl.remove();
                        _this.map.trafficCtrl = {};
                    }
                }
                _this.isTraffic = !_this.isTraffic;
            });
        },
        setMapType: function (options) { //切换地图类型
            /*
            0 ->  BMAP_NORMAL_MAP	         此地图类型展示普通街道视图
            1 ->  BMAP_HYBRID_MAP	         此地图类型展示卫星和路网的混合视图
            2 ->  BMAP_SATELLITE_MAP	     此地图类型展示卫星视图
            3 ->  BMAP_PERSPECTIVE_MAP	     此地图类型展示透视图像视图
            */
            var config = {
                type: 0
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                var typeName = BMAP_NORMAL_MAP;
                if (config.type == 0) {
                    typeName = BMAP_NORMAL_MAP;
                } else if (config.type == 1) {
                    typeName = BMAP_HYBRID_MAP;
                } else if (config.type == 2) {
                    typeName = BMAP_SATELLITE_MAP;
                } else if (config.type == 3) {
                    typeName = BMAP_PERSPECTIVE_MAP;
                }
                _this.map.setMapType(typeName);
            });
        },
        geoUtils: function (options) { //几何计算
            var config = {
                point: null,
                rectangle: null,
                circle: null,
                polyline: null,
                polygon: null,
                twoPoints: null,
                line: null,
                area: null,
                callback: null
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                var result = null;
                if (config.rectangle) { //点是否在矩形内
                    result = BMapLib.GeoUtils.isPointInRect(config.point, config.rectangle.getBounds());
                }
                if (config.circle) { //点是否在圆内
                    result = BMapLib.GeoUtils.isPointInCircle(config.point, config.circle);
                }
                if (config.polyline) { //点是否在折线上
                    result = BMapLib.GeoUtils.isPointOnPolyline(config.point, config.polyline);
                }
                if (config.polygon) { //点是否在多边形内
                    result = BMapLib.GeoUtils.isPointInPolygon(config.point, config.polygon);
                }
                if (config.twoPoints) { //计算长度，参数为点数组
                    result = BMapLib.GeoUtils.getDistance(config.point1, config.point2);
                }
                if (config.line) { //计算长度，参数为点数组
                    result = BMapLib.GeoUtils.getPolylineDistance(config.line);
                }
                if (config.area) { //计算面积，参数为数组
                    result = BMapLib.GeoUtils.getPolygonArea(config.area);
                }
                if (config.callback) {
                    config.callback(result);
                }
            });
        },
        showInfoBox: function (options) { //显示窗口
            var config = {
                isOpen: true,
                isClose: false,
                isAutopan: true,
                marker: null,
                sContent: null,
                boxStyle: null,
                boxOffset: {
                    x: 0,
                    y: 0
                },
                closeImgUrl: null,
                closeFn: null,
                openFn: null,
                callback: null
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                if (config.name) {
                    config.name.close();
                }
                if (config.isClose) {
                    config.name.open(config.marker);
                } else {
                    var infoBoxPanel = new BMapLib.InfoBox(_this.map, config.sContent.join(""), {
                        boxStyle: config.boxStyle,
                        closeIconMargin: '1px 1px 0 0',
                        closeIconUrl: config.closeImgUrl,
                        enableAutoPan: config.isAutopan,
                        offset: new BMap.Size(config.boxOffset.x, config.boxOffset.y)
                    });
                    infoBoxPanel.addEventListener("close", function (e) {
                        if (config.closeFn) {
                            config.closeFn();
                        }
                    });
                    infoBoxPanel.addEventListener("open", function (e) {
                        if (config.openFn) {
                            config.openFn();
                        }
                    });
                    if (config.isOpen) {
                        infoBoxPanel.open(config.marker);
                    }
                }
                if (config.callback) {
                    config.callback(infoBoxPanel);
                }
            });
        },
        changeAttribute: function (options) { //改变overlay属性
            var config = {
                type: null,
                icon: null,
                position: null,
                overlay: null,
                label: null,
                rotation: null,
                infoWindow: null,
                center: false,
                zoom: null,
                callback: null
            }
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                if (config.position) {
                    if (config.type == 'marker') {
                        config.overlay.setPosition(new BMap.Point(config.position.lng, config.position.lat));
                    }
                    if (config.type == 'polygon') {
                        config.overlay.setPositionAt(config.position.num, new BMap.Point(config.position.lng, config.position.lat));
                    }
                }
                if (config.center) {
                    _this.map.setCenter(new BMap.Point(config.position.lng, config.position.lat));
                }
                if (config.zoom) {
                    _this.map.setZoom(config.zoom);
                }
                if (config.rotation) {
                    config.overlay.setRotation(config.rotation);
                }
                if (config.icon) {
                    config.overlay.setIcon(new BMap.Icon(config.icon.url, new BMap.Size(config.icon.size.x, config.icon.size.y), {
                        anchor: new BMap.Size(config.icon.anchor.x, config.icon.anchor.y)
                    }))
                }
                if (config.label) {
                    if (config.label.set == true) {
                        var Label = new BMap.Label();
                        Label.setContent(config.label.content);
                        Label.setOffset(new BMap.Size(config.label.size.x, config.label.size.y));
                        config.overlay.setLabel(Label);
                    } else {
                        _this.map.removeOverlay(config.overlay.getLabel());
                    }
                }
                if (config.infoWindow) {
                    config.infoWindow.infoBox.setContent(config.infoWindow.text);
                }
                if (config.callback) {
                    config.callback();
                }
            });
        },
        eventWrapper: function (options) { //事件包装器
            var config = {
                name: null,
                type: null,
                id: null,
                bind: null,
                args: null,
                callback: null
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                if (config.type == 'dom') { //添加DOM事件监听函数
                    BMapLib.EventWrapper.addDomListener(document.getElementById(config.id), config.bind, function (e) {
                        config.callback(e);
                    });
                }
                if (config.type == 'domOnce') { //添加DOM事件监听函数，函数仅执行一次
                    BMapLib.EventWrapper.addDomListenerOnce(document.getElementById(config.id), config.bind, function (e) {
                        config.callback(e);
                    });
                }
                if (config.type == 'nomal') { //添加地图事件监听函数                
                    BMapLib.EventWrapper.addListener(config.id, config.bind, function (e) {
                        config.callback(e);
                    });
                }
                if (config.type == 'nomalOnce') { //添加地图事件监听函数，函数仅执行一次
                    BMapLib.EventWrapper.addListenerOnce(config.id, config.bind, function (e) {
                        config.callback(e);
                    });
                }
                if (config.type == 'clearAll') { //移除特定实例的所有事件的所有监听函数
                    BMapLib.EventWrapper.clearInstanceListeners(config.id);
                }
                if (config.type == 'clear') { //移除特定实例特定事件的所有监听函数
                    BMapLib.EventWrapper.clearListeners(config.id, config.bind);
                }
                if (config.type == 'remove') { //移除特定的事件监听函数
                    BMapLib.EventWrapper.removeListener(config.name);
                }
                if (config.type == 'trigger') { //触发特定事件
                    BMapLib.EventWrapper.trigger(config.id, config.bind, config.args);
                }
            });
        },
        addOverlays: function (overlay) { //添加覆盖物
            var _this = this;
            if (overlay instanceof Array) {
                if (overlay.length > 0) {
                    for (var i in overlay) {
                        _this.map.addOverlay(overlay[i]);
                        if (i == overlay.length - 1) {
                            overlay = [];
                        }
                    }
                }
            } else {
                _this.map.addOverlay(overlay);
            }
        },
        removeOverlays: function (overlay) { //移除覆盖物
            var _this = this;
            if (overlay instanceof Array) {
                if (overlay.length > 0) {
                    for (var i in overlay) {
                        _this.map.removeOverlay(overlay[i]);
                        if (i == overlay.length - 1) {
                            overlay = [];
                        }
                    }
                }
            } else {
                _this.map.removeOverlay(overlay);
            }
        },
        drawOverlays: function (options) { //画覆盖物方法 ？？？
            var config = {
                bind: 'overlaycomplete',
                styleOptions: {
                    strokeColor: "red", //边线颜色。
                    // fillColor: "red", //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 3, //边线的宽度，以像素为单位。
                    strokeOpacity: 0.6, //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.01, //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'dashed' //边线的样式，solid或dashed。
                }
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                if (!_this.drawingManager) { //实例化鼠标绘制工具
                    _this.drawingManager = new BMapLib.DrawingManager(_this.map, {
                        isOpen: false, //是否开启绘制模式
                        enableDrawingTool: false, //是否显示工具栏
                        enableCalculate: false, //打开距离或面积计算
                        drawingToolOptions: {
                            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                            offset: new BMap.Size(5, 5), //偏离值
                        },
                        circleOptions: config.styleOptions, //圆的样式
                        polylineOptions: config.styleOptions, //线的样式
                        polygonOptions: config.styleOptions, //多边形的样式
                        rectangleOptions: config.styleOptions //矩形的样式
                    });
                }
                var drawType;
                if (config.type == 'marker') {
                    drawType = BMAP_DRAWING_MARKER;
                }
                if (config.type == 'circle') {
                    drawType = BMAP_DRAWING_CIRCLE;
                }
                if (config.type == 'polyline') {
                    drawType = BMAP_DRAWING_POLYLINE;
                }
                if (config.type == 'polygon') {
                    drawType = BMAP_DRAWING_POLYGON;
                }
                if (config.type == 'rectangle') {
                    drawType = BMAP_DRAWING_RECTANGLE;
                }
                _this.drawingManager.open();
                _this.drawingManager.setDrawingMode(drawType);
                BMapLib.EventWrapper.addListenerOnce(_this.drawingManager, "overlaycomplete", function (e) {
                    _this.drawingManager.close();
                    config.callback(e.overlay);
                });
            });
        },
        addRightMenu: function (options) { //添加右键菜单栏
            var config = {
                overlay: null,
                menuList: null,
                width: 100
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                var menu = new BMap.ContextMenu();
                var txtMenuItem = config.menuList;
                for (var i = 0; i < txtMenuItem.length; i++) {
                    menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, {
                        width: config.width
                    }));
                }
                config.overlay.addContextMenu(menu);
            });
        },
        pullBox: function (options) { //拉框搜索
            /*
                renderOptions: {
                    // map: {Map} 搜索结果显示设置
                    // followText: {String} 开启拉框搜索状态后，鼠标跟随的文字
                    // strokeWeight: {Number} 遮盖层外框的线宽
                    // strokeColor: {String} 遮盖层外框的颜色
                    // style: {String} 遮盖层外框的样式
                    // opacity: {Number} 遮盖层的透明度
                    // cursor: {String} 鼠标样式
                    // autoClose: {Boolean} 拉框完成后是否自动关闭 
                    // alwaysShowOverlay: {Boolean} 是否一直显示拉框的覆盖物 
                    // panel: {String|HTMLElement} 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。 
                    // selectFirstResult: {Boolean} 是否选择第一个检索结果。
                }
             */
            var config = {
                name: null,
                keyword: null,
                callback: null
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                if (!config.name) {
                    var pullBox = new BMapLib.SearchInRectangle(_this.map, config.keyword, {
                        renderOptions: {
                            map: _this.map,
                            followText: "拖拽鼠标搜索" + config.keyword + "",
                            strokeWeight: 3,
                            strokeColor: "red",
                            opacity: 0.3,
                            autoClose: true,

                        },
                        onSearchComplete: function (e) {
                            console.log(e);
                        },
                    });
                    pullBox.setFillColor("white");
                    pullBox.setLineStyle("dashed");
                }
                if (config.callback) {
                    config.callback(pullBox);
                }
            });
        },
        markerClusterer: function (options) { //点聚合
            /*
                // markers {Array} 要聚合的标记数组
                // girdSize {Number} 聚合计算时网格的像素大小，默认60
                // maxZoom {Number} 最大的聚合级别，大于该级别就不进行相应的聚合
                // minClusterSize {Number} 最小的聚合数量，小于该数量的不能成为一个聚合，默认为2
                // isAverangeCenter {Boolean} 聚合点的落脚位置是否是所有聚合在内点的平均值，默认为否，落脚在聚合内的第一个点
                // styles {Array} 自定义聚合后的图标风格，请参考TextIconOverlay类
            */
            var config = {
                markers: null,
                maxZoom: 17,
                callback: null
            };
            this.extend(config, options);
            var _this = this;
            mapPromise.promise.then(function () {
                var markerClusterer = new BMapLib.MarkerClusterer(_this.map, {
                    markers: config.markers,
                    maxZoom: config.maxZoom
                });
                if (config.callback) {
                    config.callback(markerClusterer);
                }
            });
        },
        drivingRoute: function (options) { //路径生成
            var config = {
                pointList: null,
                polylineColor: "#a6e50f", //#a6e50f #FF7800 #FF3030 红  #00FF7F 绿 #292929 黑 #1C86EE 蓝 #0000FF 纯蓝
                polylineOpacity: 1,
                polylineWeight: 5,
                callback: null
            };
            var _this = this;
            _this.extend(config, options);
            mapPromise.promise.then(function () {
                var drivingPoints = [],
                    routeDistance = 0,
                    dravingPolylines = [];
                for (var i in config.pointList) {
                    drivingPoints.push(new BMap.Point(config.pointList[i].lng, config.pointList[i].lat));
                }
                var group = Math.floor(drivingPoints.length / 11);
                var mode = drivingPoints.length % 11;
                var viewNum = 0;
                var driving = new BMap.DrivingRoute(_this.map, {
                    onSearchComplete: function (results) {
                        if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                            var plan = driving.getResults().getPlan(0);
                            routeDistance += Number((driving.getResults().getPlan(0).getDistance()).toString().replace("公里", ""));
                            var num = plan.getNumRoutes();
                            for (var j = 0; j < num; j++) {
                                var pts = plan.getRoute(j).getPath();
                                var polyline = new BMap.Polyline(pts);
                                polyline.setStrokeColor(config.polylineColor);
                                polyline.setStrokeOpacity(config.polylineOpacity);
                                polyline.setStrokeWeight(config.polylineWeight);
                                _this.map.addOverlay(polyline);
                                dravingPolylines.push(polyline);
                            }
                            viewNum++;
                            if (mode != 0) {
                                if (viewNum > group) {
                                    _this.map.setViewport(drivingPoints);
                                    if (config.callback) {
                                        config.callback(routeDistance, dravingPolylines);
                                    }
                                }
                            } else {
                                if (viewNum == group) {
                                    _this.map.setViewport(drivingPoints);
                                    if (config.callback) {
                                        config.callback(routeDistance, dravingPolylines);
                                    }
                                }
                            }
                        }
                    }
                });
                for (var i = 0; i < group; i++) {
                    var waypoints = drivingPoints.slice(i * 11 + 1, (i + 1) * 11);
                    driving.search(drivingPoints[i * 11], drivingPoints[(i + 1) * 11], {
                        waypoints: waypoints
                    });
                }
                if (mode != 0) {
                    var waypoints = drivingPoints.slice(group * 11, drivingPoints.length - 1);
                    driving.search(drivingPoints[group * 11], drivingPoints[drivingPoints.length - 1], {
                        waypoints: waypoints
                    });
                }
            });
        },
        searchAddr: function (options) { //地址搜索
            /*
            type:
                1 -> 输入地址地图标记
                2 -> 点击地图标记并返回地址和经纬度
            */
            var config = {
                type: 1,
                text: null,
                initCity: null,
                delMarker: true,
                position: null,
                marker: null,
                callback: null
            };
            var _this = this;
            _this.extend(config, options);
            mapPromise.promise.then(function () {
                var pt = {};
                var marker = {};
                var error = "";
                var geoc = new BMap.Geocoder();

                if (config.marker) {
                    _this.map.removeOverlay(config.marker);
                }
                if (config.type == 1) {
                    geoc.getPoint(config.text, function (point) {
                        if (point) {
                            pt = point;
                            nextDo(pt);
                        } else {
                            error = "您选择地址没有解析到结果!"
                        }
                    }, config.initCity);
                } else {
                    _this.map.addEventListener("click", function (e) {
                        pt = e.point;
                        nextDo(pt);
                    });
                    if (config.position) {
                        config.marker = new BMap.Marker(new BMap.Point(config.position.lng, config.position.lat));
                        _this.map.addOverlay(config.marker);
                        _this.map.setCenter(config.marker.point);
                    }
                }

                function nextDo(pt) {
                    _this.map.setCenter(pt);
                    if (config.marker) {
                        config.marker.setPosition(pt);
                    } else {
                        config.marker = new BMap.Marker(pt);
                    }
                    _this.map.addOverlay(config.marker);
                    geoc.getLocation(pt, function (e) {
                        var addComp = e.addressComponents;
                        if (config.delMarker) {
                            var addressInfoWindow = new BMap.InfoWindow("<div>地址：" + addComp.province + addComp.city + addComp.district + "<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + addComp.street + addComp.streetNumber + "</div>" + "<div style='float:right;'><a id='delAdsP'>删除</a></div>", {
                                offset: new BMap.Size(-3, 25)
                            });
                            addressInfoWindow.addEventListener('open', function () {
                                var delInforWidow = document.getElementById('delAdsP');
                                delInforWidow.addEventListener("click", function () {
                                    _this.map.removeOverlay(config.marker);
                                });
                            })
                            config.marker.infoBox = addressInfoWindow;
                            config.marker.openInfoWindow(addressInfoWindow);
                            config.marker.addEventListener("click", function () {
                                config.marker.openInfoWindow(addressInfoWindow);
                            })
                        }
                        var msg = {
                            addMsg: e,
                            marker: config.marker,
                            error: error
                        }
                        if (config.callback) {
                            config.callback(msg);
                        }
                    });
                }
            })
        }
    }

    return TMap;

});


// window.BMap_loadScriptTime = (new Date).getTime(); 
// window.BMap=window.BMap||{};
// window.BMap.apiLoad=function(){
//   delete window.BMap.apiLoad;
//   if(typeof setMap=="function"){ setMap(); }
// };
// var s=document.createElement('script');
// s.src='http://api.map.baidu.com/getscript?v=2.0&ak=&services=&t=20130716024057';
// document.body.appendChild(s);


// setTimeout(function() { //删除版权
//     $('#'+mapId).find('.anchorBL').remove();
// }, 1000);