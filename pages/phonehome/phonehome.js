// pages/phonehome/phonehome.js
Page({
  data: {
    phone:'',
    city:'',
    prefix:'',    //手机号段
    province:'', 
    suit:'',      // 套餐
    supplier:'',    //运营商
    errMsg:'',    //错误信息
    errNum: -2    //错误码
  },
   //文本框输入事件处理函数，输入手机号码，保存到data中
  bindInput:function(e){
      this.setData({
          phone:e.detail.value,
          errMsg: '',    //清空错误信息
          errNum: -2    //错误码
      })
  },
  //查询按钮事件处理函数
  phoneTab:function(e){
      var phone = this.data.phone;
      if(phone!=null && phone!=''){   //手机号不能为空
          var self = this;
          //显示toast提示信息
          wx.showToast({
              title: '正在查询，请稍等……',
              icon:'loading',
              duration:1000
          });
          //调用接口进行查询
          wx.request({
              url: 'http://apis.baidu.com/apistore/mobilenumber/mobilenumber',
              data: {
                  'phone':phone,
              },
              header:{
                  'apikey':''
              },
              success:function(res){
                  wx.hideToast();
                  if(res.data.errNum == 0){
                      self.setData({
                          errMsg:'',
                          errNum: res.data.retData.errNum,
                          city: res.data.retData.city,
                          prefix: res.data.retData.prefix,
                          province: res.data.retData.province,
                          suit: res.data.retData.suit,
                          supplier: res.data.retData.supplier
                      })
                  }else{
                      self.setData({
                          errMsg: res.data.retMsg,
                          errNum: res.data.errNum
                      })
                  }
              }
          })
      }
  }
})