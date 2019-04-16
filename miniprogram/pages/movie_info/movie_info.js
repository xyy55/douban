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
      url: 'http://114.116.105.255:8000/get_movie_link/',
      //url:'http://127.0.0.1:8000/get_movie_link/',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        name:name
      },
      success(res) {
        let title = '';
        if(res.data.code == '404'){
          title = '获取失败'
        }else{
          title = '链接已经复制到剪切板';
          wx.setClipboardData({ data: res.data.data})
        };
        wx.showModal({
          title: title,
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
    this.get_movie_trailer(id);
    this.get_movie_comment(id);
  },

  get_movie_info:function(id) {
    //var base_url = "https://douban.uieee.com/v2/movie/subject/";
    var base_url = "https://frodo.douban.com/api/v2/movie/"
    let that = this;
    wx.request({
      url: base_url + id +"?apiKey=054022eaeae0b00e0fc068c0c0a2102a",
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data;
        let item = {};
        item.poster = data.cover.image.small.url;
        item.name = data.title;
        if (data.rating == null) {
          item.rating = 0;
          item.stars = util.convertToStarsArray(0)
        } else {
          item.rating = data.rating.value;
          item.stars = util.convertToStarsArray(data.rating.value);
        }
        item.comment_num = data.rating.count;
        item.summary = data.intro;
        item.casts = data.actors;
        item.id = data.id
        // var popular_comments = data.popular_comments;
        // for(var i = 0;i<popular_comments.length;i++){
        //   popular_comments[i].rating.value = util.convertToStarsArray(popular_comments[i].rating.value * 2)
        // }
        // var trailer_urls = data.trailer_urls;
        // for(i = 0;i<trailer_urls.length;i++){
        //   trailer_urls[i] = trailer_urls[i].replace(/vt1.doubanio.com/, 'movie.ohmylove.ooo')
        // }
        that.setData({
          poster: item.poster,
          name: item.name,
          rating: item.rating,
          stars: item.stars,
          comment_num: item.comment_num,
          summary: item.summary,
          casts: item.casts,
          
          
          id: item.id
        })
      }
    })
  },
  get_movie_trailer: function (id) {
    var base_url = "https://frodo.douban.com/api/v2/movie/"
    let that = this;
    wx.request({
      url: base_url + id + "/trailers?apiKey=054022eaeae0b00e0fc068c0c0a2102a",
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data.trailers;
        var trailer_urls = [];
        var length = 0;
        if (data.length>4){
          length = 4;
        }else{
          length = data.length;
        }
        for(var i = 0;i<length;i++){
          trailer_urls.push(data[i].video_url.replace(/vt1.doubanio.com/, 'movie.ohmylove.ooo'))
        };
        that.setData({ trailer_urls: trailer_urls});
      }
    })
  },
  get_movie_comment: function (id) {
    var base_url = "https://frodo.douban.com/api/v2/movie/"
    let that = this;
    wx.request({
      url: base_url + id + "/interests?start=0&count=4&status=done&apiKey=054022eaeae0b00e0fc068c0c0a2102a",
      header: {
        "content-type": "json"
      },
      success(res) {
        let data = res.data.interests;
        var popular_comments = data;
        for(var i = 0;i<popular_comments.length;i++){
          if (popular_comments[i].rating == null){
            popular_comments[i].rating = { value: util.convertToStarsArray(0)}
          }else{
            popular_comments[i].rating.value = util.convertToStarsArray(popular_comments[i].rating.value * 2)
          }
        }
        that.setData({ popular_comments: popular_comments });
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