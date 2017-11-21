Page({
  data: {
    markers: [{
      iconPath: "/resources/anchor.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 30,
      height: 30
    }],
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  getCurrentLocation: function() {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res, 'res0---');
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var markers = [];
        markers.push({
          iconPath: "/resources/anchor.png",
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          width: 30,
          height: 30
        })
        that.setData({
          markers,
        })
      }
    })
  }
})