//index.js
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    data:[],
    hot:[],
    top:[],
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
          item.id = data[i].id;
          d.push(item);
        }
        that.setData({data:d});
      }
    })
  },
  get_weekly_movies: function () {
    let that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/weekly',
      header: {
        "content-type": "json"
      },
      success(res) {
        let hot = res.data.subjects;
        let data = [];
        let item = {};
        let d = [];
        for (var i = 0; i < hot.length; i++) {
          data = hot[i].subject;
          item = {};
          item.img = data.images.small;
          item.title = data.title;
          item.rating = data.rating.average;
          item.stars = util.convertToStarsArray(data.rating.average);
          item.id = data.id;
          d.push(item);
        }
        that.setData({ hot: d });
      }
    })
  },
  get_top_movies: function () {
    let that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      header: {
        "content-type": "json"
      },
      success(res) {
        let top = res.data.subjects;
        let item = {};
        let d = [];
        for (var i = 0; i < top.length; i++) {
          item = {};
          item.img = top[i].images.small;
          item.title = top[i].title;
          item.rating = top[i].rating.average;
          item.stars = util.convertToStarsArray(top[i].rating.average);
          item.id = top[i].id;
          d.push(item);
        }
        that.setData({ top: d });
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
    this.get_weekly_movies();
    this.get_top_movies();
  },
  go_info:function(e){
    let a = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie_info/movie_info?id='+a,
      success: function (res) {
        return
      },
    })
  },
  more:function(){
    wx.navigateTo({
      url: '../more/more?type=more',
      success: function (res) {
        return
      },
    })
  },
  top: function () {
    wx.navigateTo({
      url: '../more/more?type=top',
      success: function (res) {
        return
      },
    })
  },
  search:function(){
    wx.navigateTo({
      url: '../search/search',
      success: function (res) {
        return
      },
    })
  }

  
})
