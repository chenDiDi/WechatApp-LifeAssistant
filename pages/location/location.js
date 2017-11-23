Page({
  data: {
    latitude: 22.933542,
    longitude: 113.89537,
    speed: -1,
    startLocation: {
      latitude: 23.099994,
      longitude: 113.324520,
    },
    markers: [{
      iconPath: "/images/location/anchor.png",
      id: 1,
      title: '1',
      latitude: 22.933542,
      longitude: 113.89537,
      width: 30,
      height: 30
    }, {
        iconPath: "/images/location/anchor.png",
      id: 2,
      title: '2',
      latitude: 22.932742,
      longitude: 113.89837,
      width: 30,
      height: 30
    }, {
        iconPath: "/images/location/anchor.png",
      id: 3,
      title: '3',
      latitude: 22.934742,
      longitude: 113.90737,
      width: 30,
      height: 30
    }, {
        iconPath: "/images/location/anchor.png",
      id: 4,
      title: '4',
      latitude: 22.944742,
      longitude: 113.90737,
      width: 30,
      height: 30
    }],
    polyline: [{
      points: [{
        latitude: 22.933542,
        longitude: 113.89537,
      }, {
        latitude: 22.932742,
        longitude: 113.89837,
      }, {
        latitude: 22.934742,
        longitude: 113.90737,
      }, {
        latitude: 22.944742,
        longitude: 113.90737,
      }],
      color: "#FF0000DD",
      width: 4,
      borderWidth: 4,
    }],
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map');
  },
  onLoad: function() {
    // this._currentLocation();
  },
  regionchange(e) {
    console.log(e.type, '视野发生变化时触发')
  },
  markertap(e) {
    console.log(e.markerId, '点击标记点时触发')
  },
  controltap(e) {
    console.log(e.controlId,'3333')
  },
  // 获取当前定位
  _currentLocation: function() {
    let _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        const {markers} = _this.data;
        console.log(markers, markers);
        markers.push({
          iconPath: "/images/location/anchor.png",
          id: 0,
          title: '0',
          latitude: res.latitude,
          longitude: res.longitude,
          width: 30,
          height: 30
        });
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          speed: res.speed,
          startLocation: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
          markers,
        })
        console.log(res, 'res00-----');                  
      }
    })
  },
  // 移动到当前位置
  _getCurrentLocation: function() {
    this.mapCtx.moveToLocation();
  },
  // 打开腾讯内置应用地图
  _openMapGuide: function() {
    this._currentLocation();
    wx.openLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      speed: this.data.speed,
      name: '实验室',
      address: '我工作的地方哦',
    })
  },
  // 缩放地图
  _scaleMap: function(scale) {
    console.log(scale, 'scale00----');
    let _this = this;    
    this.mapCtx.includePoints({
      padding: [scale],
      points: [{
        latitude: _this.data.latitude,
        longitude: _this.data.longitude,
      }]
    })
  },
  // 缩小地图
  _magnifyHandle: function () {
    this._scaleMap(1);
  },
  _shrinkHandle: function() {
    this._scaleMap(2);
  }
})