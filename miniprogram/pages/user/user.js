const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    name: [],
    intro: [],
    code: [],
    inputValue: [],
    show: "block",
    show1: "none"
  },
  idInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  get_personal_info: function(code, wx_id) {
    let that = this;
    wx.request({
      url: 'http://114.116.105.255:8000/get_personal_info/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: code,
        wx_id: wx_id,
      },
      success(res) {
        if (res.data.code == "403") {
          wx.showToast({
            title: res.data.msg,
            duration: 1000,
            icon: 'none',
            mask: true
          })
        } else {
          that.setData({
            avatarUrl: res.data.img,
            name: res.data.name,
            intro: res.data.intro,
            show: "none",
            show1: "block"
          });
          wx.setStorage({
            key: 'db_id',
            data: code,
          })
        }
      }
    })
  },
  login: function() {
    let that = this;
    let db_id = that.data.inputValue;
    if (db_id == "") {
      wx.showToast({
        title: '请输入豆瓣唯一标识',
        duration: 1000,
        icon: 'none',
        mask: true
      })
    } else {
      wx.login({
        success: function(res) {
          var code = res.code;
          if (code) {
            console.log('获取用户登录凭证：' + code);
            that.get_personal_info(db_id, code);
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
    }
  },
  update: function() {
    let that = this;
    wx.getStorage({
      key: 'db_id',
      success(res) {
        let id = res.data
        let code = ""
        wx.login({
          success: function(res) {
            code = res.code;
            if (code) {
              console.log('获取用户登录凭证：' + code);
              wx.request({
                url: 'http://114.116.105.255:8000/get_movie_data/',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  id: id,
                  wx_id: code,
                },
                success(res) {
                  if (res.data.code == "200") {
                    wx.showToast({
                      title: "同步成功！",
                      duration: 1000,
                      icon: 'none',
                      mask: true
                    });
                  }
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
      }
    })
  },
  recommend: function() {
    let that = this;
    let code = ""
    wx.login({
      success: function(res) {
        code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          wx.request({
            url: 'http://114.116.105.255:8000/make_recommendation/',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              wx_id: code,
            },
            success(res) {
              if (res.data.code == "200") {
                wx.showToast({
                  title: "推荐成功！",
                  duration: 1000,
                  icon: 'none',
                  mask: true
                });
              }
            }
          });
        }
      }
    });
  },
  onLoad: function() {
    let that = this
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    };
    wx.getStorage({
      key: 'db_id',
      success(res) {
        that.get_personal_info(res.data, "0")
      }
    })

  },

})