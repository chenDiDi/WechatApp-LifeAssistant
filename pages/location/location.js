Page({
  data: {
    latitude: 0,
    longitude: 0,
    startLocation: {
      latitude: 23.099994,
      longitude: 113.324520,
    },
    markers: [{
      iconPath: "/resources/anchor.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 30,
      height: 30
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
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
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
  }
})