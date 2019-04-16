// miniprogram/pages/search/search.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    inputValue:[]
  },

  searchInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  
  getSearch: function(e){
    let that = this;
    wx.request({
      //url: 'http://api.ohmylove.ooo/v2/movie/search?q='+this.data.inputValue,
      url: 'https://m.douban.com/rexxar/api/v2/search?type=movie&q=' + this.data.inputValue,
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data.subjects;
        console.log(data)
        let item = {};
        let d = [];
        for (var i = 0; i < data.length; i++) {
          item = {};
          //item.img = data[i].images.small;
          item.img = data[i].pic.normal;
          item.title = data[i].title;
          //item.rating = data[i].rating.average;
          item.rating = data[i].rating.value;
          //item.stars = util.convertToStarsArray(data[i].rating.average);
          item.stars = util.convertToStarsArray(data[i].rating.value);
          item.id = data[i].id;
          d.push(item);
        }
        that.setData({ data: d });
      },
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})