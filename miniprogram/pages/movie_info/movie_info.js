// miniprogram/pages/movie_info/movie_info.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:[],
    name:[],
    rating:[],
    stars:[],
    comment_num:[],
    summary:[],
    casts:[],
    popular_comments:[],
    trailer_urls:[],
    id:[],
  },
  get_movie_link:function(e){
    let name = e.currentTarget.dataset.name;
    wx.request({
      url: 'http://127.0.0.1:8000/get_movie_link/',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        name:name
      },
      success(res) {
        wx.showModal({
          title: '提示',
          content: res.data.data,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    });
  },
  go_comment: function (e) {
    let a = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../comment/comment?id=' + a + "&name=" + name,
      success: function (res) {
        return
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.get_movie_info(id);
  },

  get_movie_info:function(id) {
    var base_url = "https://douban.uieee.com/v2/movie/subject/";
    let that = this;
    wx.request({
      url: base_url+id,
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data;
        var popular_comments = data.popular_comments;
        for(var i = 0;i<popular_comments.length;i++){
          popular_comments[i].rating.value = util.convertToStarsArray(popular_comments[i].rating.value * 2)
        }
        var trailer_urls = data.trailer_urls;
        for(i = 0;i<trailer_urls.length;i++){
          trailer_urls[i] = trailer_urls[i].replace(/vt1.doubanio.com/, 'movie.ohmylove.ooo')
        }
        that.setData({
          poster: data.images.small,
          name:data.title,
          rating: data.rating.average,
          stars:util.convertToStarsArray(data.rating.average),
          comment_num: data.ratings_count,
          summary: data.summary,
          casts: data.casts,
          popular_comments: popular_comments,
          trailer_urls: trailer_urls,
          id: data.id
        })
      }
    })
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