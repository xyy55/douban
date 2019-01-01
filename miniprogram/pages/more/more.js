// miniprogram/pages/more/more.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    pageIndex:0,
    load:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_hot_movies(0)
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
    let that = this;
    if(that.data.load){
      that.setData({
        pageIndex: that.data.pageIndex + 20
      });
      this.get_hot_movies(that.data.pageIndex)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  get_hot_movies: function (start) {
    let that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters?city=%E5%8C%97%E4%BA%AC&start='+start+'&count=20',
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data.subjects;
        let item = {};
        let d = that.data.data;
        if(data.length == 0){
          that.setData({ load: false });
          return
        }
        for (var i = 0; i < data.length; i++) {
          item = {};
          item.img = data[i].images.small;
          item.title = data[i].title;
          item.rating = data[i].rating.average;
          item.stars = util.convertToStarsArray(data[i].rating.average);
          item.id = data[i].id;
          d.push(item);
        }
        that.setData({ data: d });
      }
    })
  },
  go_info: function (e) {
    let a = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie_info/movie_info?id=' + a,
      success: function (res) {
        return
      },
    })
  },
})