//index.js
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    data:[]
  },

  get_hot_movies:function(){
    let that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters?city=%E5%8C%97%E4%BA%AC&start=0&count=8', 
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data.subjects;
        let item = {};
        let d = [];
        for(var i = 0;i<data.length;i++){
          item = {};
          item.img = data[i].images.small;
          item.title = data[i].title;
          item.rating = data[i].rating.average;
          item.stars = util.convertToStarsArray(data[i].rating.average);
          d.push(item);
        }
        console.log(d)
        that.setData({data:d});
      }
    })
  },
  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    };
    this.get_hot_movies();
  },

  
})
