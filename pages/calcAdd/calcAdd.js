// pages/calcAdd/calcAdd.js
Page({
  data:{
    num1:'',    //保存被加数
    num2:'',    //保存加数
    result1:'',    //保存计算结果
    num3:'',    //保存被加数
    num4:'',    //保存加数
    result2:''    //保存计算结果
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //“计算”按钮点击触发加法事件处理函数
  bindAdd:function(e){
    var r = this.data.num1*1 + this.data.num2*1; 
    var r2 = this.data.num3*1 + this.data.num4*1; 
    //*1操作：将字符串变量转换为数值
    this.setData({
      result1:r,   //更新结果到result变量中
      result2:r2, 
    })
  },
  //输入事件处理函数
  bindInput1:function(e){
    var n = e.detail.value;
    if(!isNaN(n)){
      this.setData({
        num1:n
      })
    }
  },
  bindInput2:function(e){
    var n = e.detail.value;
    if(!isNaN(n)){
      this.setData({
        num2:n
      })
    }
  },
  //输入事件处理函数
  bindInput3:function(e){
    var n = e.detail.value;
    if(!isNaN(n)){
      this.setData({
        num3:n
      })
    }
  },
  bindInput4:function(e){
    var n = e.detail.value;
    if(!isNaN(n)){
      this.setData({
        num4:n
      })
    }
  }
})