// pages/weather/weather.js
var util = require('../../utils/util.js');
Page({
  data: {
    weather:{
    //     wendu:18,
    //     ganmao:'昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。',
    //     yesterday: {
    //         date: '17日星期四',
    //         type: '阴',
    //         fx: '南风',
    //         fl: '微风级',
    //         low: '低温 8℃',
    //         high: '高温 16 ℃',
    //     },
    //     forecast: [{
    //         date: '18日星期五',
    //         type: '阴',
    //         fx: '南风',
    //         fl: '微风级',
    //         low: '低温 8℃',
    //         high: '高温 16 ℃',
    //     },{
    //         date: '19日星期五',
    //         type: '阴',
    //         fx: '南风',
    //         fl: '微风级',
    //         low: '低温 8℃',
    //         high: '高温 16 ℃',
    //     }, {
    //         date: '20日星期五',
    //         type: '阴',
    //         fx: '南风',
    //         fl: '微风级',
    //         low: '低温 8℃',
    //         high: '高温 16 ℃',
    //     }, {
    //         date: '21日星期五',
    //         type: '阴',
    //         fx: '南风',
    //         fl: '微风级',
    //         low: '低温 8℃',
    //         high: '高温 16 ℃',
    //     }, {
    //         date: '22日星期五',
    //         type: '阴',
    //         fx: '南风',
    //         fl: '微风级',
    //         low: '低温 8℃',
    //         high: '高温 16 ℃',
    //     }]
      },
      today: '2017-05-11',
      city: '北京',
      inputCity: ''
  },

  onLoad: function (options) {
    this.setData({
        today: util.formatTime(new Date()).split(' ')[0]   //更新当前日期
    });
    var self = this;
    wx.getLocation({
        type: 'wgs84',
        success: function(res){
            // console.log(res);
            wx.request({
                url: 'http://api.map.baidu.com/geocoder/v2/' +'?ak=ASAT5N3tnHIa4APW0SNPeXN5&location='+res.latitude+','+res.longitude+'&output=json&pois=0',
                data:{},
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res){
                    console.log(res);
                    var city = res.data.result.addressComponent.city.replace('市','');  //城市名称
                    self.searchWeather(city);   //查询指定城市的天气信息
                }
            })
        }
    })
    console.log(this.data.today)
  },
    searchWeather:function(cityName){
        var self = this;
        wx.request({
            url: 'http://wthrcdn.etouch.cn/weather_mini?city='+cityName,
            data:{},
            header: {
                'Content-Type': 'application/json'
            },
            success:function(res){
                if(res.data.status == 1002){
                    // 显示错误信息
                    wx.showModal({
                        title: '提示',
                        content: '输入的城市名称有误，请重新输入',
                        showCancel: false,
                        success:function(res){
                            self.setData({inputCity:''});
                        }
                    })
                }else{
                    var weather = res.data.data;  //获取天气数据
                    for(var i=0;i<weather.forecast.length;i++){
                        var d = weather.forecast[i].date;
                        //处理日期信息，添加空格
                        weather.forecast[i].date = ' '+d.replace('星期',  '  星期');
                    }
                    self.setData({
                        city: cityName,
                        weather: weather,
                        inputCity: '',
                    });
                }
            }
        })
    },
    inputing:function(e){
        this.setData({inputCity: e.detail.value});
    },
    bindSearch:function(e){
        this.searchWeather(this.data.inputCity);
    }
  
})