// miniprogram/pages/recommendation/recommendation.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
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

  recommend:function() {
    let that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          wx.request({
            url: 'http://114.116.105.255:8000/get_recommendation/',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              wx_id: code,
            },
            success(res) {
              let item = {};
              let data = res.data.data;
              let d = that.data.data;
              for (var i = 0; i < data.length; i++) {
                item = {};
                item.img = data[i].img;
                item.title = data[i].title;
                item.rating = data[i].rating;
                item.stars = util.convertToStarsArray(data[i].rating);
                item.id = data[i].movie_id;
                d.push(item);
              }
              that.setData({ data: d });
            }
          });
        } else {
          wx.showToast({
            title: '获取用户登录态失败：\n' + res.errMsg,
            duration: 1000,
            icon: 'none',
            mask: true
          });
        }
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recommend();
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.setData({ data: [] });
    this.recommend();
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