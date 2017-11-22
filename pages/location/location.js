Page({
  data: {
    latitude: 0,
    longitude: 0,
    speed: 0,
    startLocation: {
      latitude: 23.099994,
      longitude: 113.324520,
    },
    markers: [{
      callout: {
        bgColor: '#ccc',
        content: '实验室',
      },
      iconPath: "/resources/anchor.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 30,
      height: 30
    }],
    polyline: [{
      points: [{
        longitude: 113.751765,
        latitude: 23.020536
      }, {
        longitude: 113.761765,
        latitude: 23.020536
      }, {
        longitude: 113.762343,
        latitude: 23.035536
      }, {
        longitude: 113.763434,
        latitude: 23.040536
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
    this._currentLocation();
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
        console.log(res, 'res00-----');
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          speed: res.speed,
          markers: [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            speed: res.speed,
            accuracy: res.accuracy,
            width: 30,
            height: 30,
            title: "当前位置"
          }],
          startLocation: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
        })
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