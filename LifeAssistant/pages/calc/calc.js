// pages/calc/calc.js
Page({
  data:{
    result: "0",
    id1:'history',
    id2:'clear',
    id3:'back',
    id4:'div',
    id5:'num_1',
    id6:'num_2',
    id7:'num_3',
    id8:'mul',
    id9:'num_4',
    id10:'num_5',
    id11:'num_6',
    id12:'add',
    id13:'num_7',
    id14:'num_8',
    id15:'num_9',
    id16:'sub',
    id17:'negative',
    id18:'num_0',
    id19:'dot',
    id20:'equ',
    lastoper:"+",
    temp:"0",
    record: true,  //计算过程记录到历史记录中
    expr: '',   //表达式
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
  clickButton:function(e){
    var data = this.data.result;  //获取上一个结果值
    var tmp = this.data.temp;  //获取上次的临时结果
    var lastoper1 = this.data.lastoper;   //上一次的运算符
    var noNumFlag = this.data.flag;   //上一次非数字按钮标志 
    var expr1 = this.data.expr;    //获取前面的表达式

    if(e.target.id>="num_0" && e.target.id<="num_9"){
      data +=e.target.id.split("_")[1];
      if(this.data.result == '0' || noNumFlag){   //原值为0或者上一次为非数字按钮
        data = e.target.id.split("_")[1];
      }
      noNumFlag = false;
    }else{
      noNumFlag = true;
      console.log(e.target.id);
      if(e.target.id == 'dot'){   //小数点
        data += '.';
        noNumFlag = false;
      }else if(e.target.id == 'clear'){  //清除
        expr1 = expr1.substr(0,expr1.length-1) + "=" + tmp;  //删除最后的运算符
        console.log(expr1);
        // if(this.data.record){
        //     wx.setStorageSync("expr",expr1);
        // }
        saveExprs(expr1);
        expr1 = "";
        data = 0;
        tmp = 0;
        lastoper1 = "+";
      }else if(e.target.id == 'negative'){   //数字取负
        data = (-1)*data;
      }else if(e.target.id == 'back'){  //回退一个字符
        if(data.toString().length>1){
          data = data.substr(0,data.toString().length - 1); //去掉最后一位
        }else{
          data =0;
        }
        noNumFlag = false;
      }else if(e.target.id == 'div'){   //除
        expr1 += data.toString() + "÷";
        data = calculate(tmp,lastoper1,data);
        tmp = data;
        lastoper1 = '/';
      }else if(e.target.id == 'mul'){   //乘
        expr1 += data.toString() + "×";
        data = calculate(tmp,lastoper1,data);
        tmp = data;
        lastoper1 = '*';
      }else if(e.target.id == 'add'){   //加
          expr1 += data.toString() + "＋";
        data = calculate(tmp,lastoper1,data);
        tmp = data;
        lastoper1 = "+";
      }else if(e.target.id == 'sub'){   //减
        expr1 += data.toString() + "-";
        data = calculate(tmp,lastoper1,data);
        tmp = data;  
        lastoper1 = '-';
      }else if(e.target.id == 'equ'){   //等
        expr1 += data.toString();
        data = calculate(tmp,lastoper1,data);
        expr1 += "=" +data;   //生成表达式
        // if(this.data.record){
        //     wx.setStorageSync("expr", expr1);
        // }
        saveExprs(expr1);
        expr1 = "";
        tmp = 0;
        lastoper1 = '+';
      }else if(e.target.id == "history"){
          wx.navigateTo({
              url: '../history/history',
          })
      }
    }
    this.setData({
      result:data,
      lastoper:lastoper1,
      temp:tmp,
      flag:noNumFlag,
      expr: expr1
    })
  },
  RecordHistory:function(e){
      console.log(e);
      this.setData({
          record: e.detail.value
      })
  }
})
//算法操作函数
var calculate = function(data1,oper,data2){
  var data;
  data1=parseFloat(data1);
  data2=parseFloat(data2);
  switch(oper){
    case "+":
      data = data1 + data2;
      break;
    case "-":
      data = data1 - data2;
      break;
    case "/":
      if(data2 !== 0){
        data = data1 / data2;
      }else{
        data =0;
      }
      break;
    case "*":
      data = data1 * data2;
      break;
  }
  return data;
}
//保存数据到本地缓存的数组中
var saveExprs = function(expr){
    var exprs = wx.getStorageSync('exprs') || []; //获取本地缓存,如果不存在该key，则生成一个空数组
    exprs.unshift(expr);   //在数组开头增加一个元素
    wx.setStorageSync('exprs', exprs); //保存到本地缓存
}
