//index.js
const app = getApp()

Page({
  data: {
    images:[]
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
        let img = [];
        for(var i = 0;i<data.length;i++){
          img.push(data[i].images.small);
        }
        console.log(img);
        that.setData({images:img});
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
    get_hot_movies();
  },

  
})
