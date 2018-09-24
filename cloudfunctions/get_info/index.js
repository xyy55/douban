// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var superagent = require('superagent'); 
  var cheerio = require('cheerio');
  var url = 'https://movie.douban.com/people/78559574/collect';
  var rep = '';
  async function foo(url) {
    let result = await superagent.get(url)
    return result   //返回的是一个promise对象
  }
  return foo(url).then(function (value) {
    var $ = cheerio.load(value.text)
    var title = [];
    var rate = [];
    var comment = [];
    $('.grid-view').find('.info').each(function (i, elem) {
      title.push($(this).find(".title em").text())
      rate.push($(this).find("li:nth-child(3) span:first-child").attr("class"))
      comment.push($(this).find('.comment').text())
    })
    return [title, rate, comment]
  })
  
}