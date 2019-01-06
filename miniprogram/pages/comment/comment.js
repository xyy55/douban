// miniprogram/pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    w_num:0,
    n_num:5,
    name:[],
    id:[],
    inputValue: [],
  },

  idInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  tap:function(e) {
    var in_xin = e.currentTarget.dataset.in;
    var w_num;
    if (in_xin == 'star') {
      w_num = Number(e.currentTarget.id)
    } else {
      w_num = Number(e.currentTarget.id) + this.data.w_num
    }
    this.setData({
      w_num: w_num,
      n_num: 5 - w_num
    })
  },
  confirm:function(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: "确定要提交吗？",
      success(res) {
        if (res.confirm) {
          that.submit(that.data.inputValue)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submit:function(comment){
    let that = this;
    let rate = this.data.w_num;
    let movie_id = this.data.id;
    wx.login({
      success: function (res) {
        let code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          wx.request({
            url: 'http://127.0.0.1:8000/make_comment/',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              movie_id: movie_id,
              wx_id: code,
              rate:rate,
              comment:comment,
            },
            success(res) {
              wx.showToast({
                title: res.data.msg,
                duration: 1000,
                icon: 'none',
                mask: true
              })
            }
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var name = options.name;              
    this.setData({
      name:name,
      id:id,
    });
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