// pages/images/images.js
Page({
  data: {
    imgUrl: '../../images/location/shrink.png',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  chooseImages: function (e) {
    let _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res, 'res00-----');
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://help.aliyun.com/document_detail/31849.html?spm=5176.doc31848.6.589.Zt0BZ4', //接口地址
          filePath: tempFilePaths[0],
          name: 'imagesFile',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data;
            console.log(res, 'res00-----');
          },
          fail: function () {
            console.log('falis');
          }
        })
        _this.setData({
          imgUrl: 'tempFilePaths[0]',
        })
      }
    })
  }
})