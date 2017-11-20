Page({
  data: {
    // expr:"历史记录",
    exprs: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        // expr: wx.getStorageSync("expr")
        exprs: wx.getStorageSync("exprs") || []
    })
  },
})
