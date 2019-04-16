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
      //url: 'https://douban.uieee.com/v2/movie/in_theaters?city=%E5%8C%97%E4%BA%AC&start=0&count=8', 
      url:"https://frodo.douban.com/api/v2/subject_collection/movie_showing/items?start=0&count=8&apiKey=054022eaeae0b00e0fc068c0c0a2102a",     
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data.subject_collection_items;
        let item = {};
        let d = [];
        for(var i = 0;i<data.length;i++){
          item = {};
          item.img = data[i].cover.url;
          item.title = data[i].title;
          if (data[i].rating == null) {
            item.rating = 0;
            item.stars = util.convertToStarsArray(0)
          } else {
            item.rating = data[i].rating.value;
            item.stars = util.convertToStarsArray(data[i].rating.value);
          }
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
      //url: 'https://douban.uieee.com/v2/movie/weekly',
      url:"https://frodo.douban.com/api/v2/subject_collection/movie_weekly_best/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a",
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data.subject_collection_items;
        let item = {};
        let d = [];
        for (var i = 0; i < data.length; i++) {
          item = {};
          item.img = data[i].cover.url;
          item.title = data[i].title;
          if (data[i].rating == null) {
            item.rating = 0;
            item.stars = util.convertToStarsArray(0)
          } else {
            item.rating = data[i].rating.value;
            item.stars = util.convertToStarsArray(data[i].rating.value);
          }
          item.id = data[i].id;
          d.push(item);
        }
        that.setData({ hot: d });
      }
    })
  },
  get_top_movies: function () {
    let that = this;
    wx.request({
      //url: 'https://douban.uieee.com/v2/movie/top250',
      url:"https://frodo.douban.com/api/v2/subject_collection/movie_top250/items?start=0&count=20&apiKey=054022eaeae0b00e0fc068c0c0a2102a",
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data.subject_collection_items;
        let item = {};
        let d = [];
        for (var i = 0; i < data.length; i++) {
          item = {};
          item.img = data[i].cover.url;
          item.title = data[i].title;
          if (data[i].rating == null) {
            item.rating = 0;
            item.stars = util.convertToStarsArray(0)
          } else {
            item.rating = data[i].rating.value;
            item.stars = util.convertToStarsArray(data[i].rating.value);
          }
          item.id = data[i].id;
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
  },
/**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.setData({ data: [],
                   hot:[],
                   top:[] });
    this.get_hot_movies();
    this.get_weekly_movies();
    this.get_top_movies();
  },

  
})
