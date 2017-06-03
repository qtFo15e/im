/**
 * Created by ThinkPad on 2017/5/13.
 */
var request = require( "request" )
const HTTPStatus = require("httpstatus")

let options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.22 Safari/537.36 SE 2.X MetaSr 1.0'
  },
  url: "http://localhost:3000",
  timeout: 10000
}

var index = 0
var startTotal = new Date()
var fakeFor = setInterval( function () {
  let start = new Date()
  request( options, function (err, res, body) {
    if ( res ) {
      var resTime =  new Date() - start
      if ( resTime >　1500 ) {
        console.warn( "访问次数：", index++, "返回时间：", resTime + "ms" )
      } else {
        console.log( "访问次数：", index++, "返回时间：", resTime + "ms" )
      }
    } else {
      if ( fakeFor ) {
        var totolTime =  new Date() - startTotal
        setTimeout( function () {
          console.log( "总访问次数：", index, "测试时间：", totolTime / 1000 + "秒", "平均：", index / totolTime * 1000  + "次/秒" )
        } , 5000 )
        clearInterval( fakeFor )
        fakeFor = null
      }
    }
  })
} ,0)

