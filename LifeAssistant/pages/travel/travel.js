Page({
  data: {
    regions:[
        { name: 'CHN', value: '中国', checked: 'true'},
        { name: 'USA', value: '美国' },
        { name: 'BRA', value: '巴西' },
        { name: 'ENG', value: '英国' },
        { name: 'TUR', value: '法国' }
    ],
    time: '8:00',
    date: '2017-05-18',
    suggest: '',
    hidden: true,   //提交数据
  },
  formSubmit: function (e) {
      console.log("tijiao")
      this.setData({
          hidden: false
      })

      var self = this; 
      setTimeout(function () {
          self.setData({
              hidden: true
          })
      }, 1000)
      console.log(e.detail.value);
  },
  formReset:function(e){
      console.log(e.detail.value);
  },
  bindDateChange:function(e){
      console.log(e.detail.value);
  },
  bindTimeChange: function (e) {
      console.log(e.detail.value);
  }
})