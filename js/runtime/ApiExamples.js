//进行Api测试
export class ApiExamples{
  getUserInfo(){
    const params = {
      success: function(res){
        console.log(res)
      }
    };
    wx.getUserInfo(params);
  }
  //实践一下登录
  login(){
    wx.login({
      success:function(res){
         console.log(res);
      }
    })
  }
  
  //实践一下获取用户的当前设置的api
  getSettings(){
    wx.getSetting({
      success:function(res){
      console.log(JSON.stringify(res))
      }
    })
  }

  socketExample(){
    wx.connectSocket({
      url: 'ws://127.0.0.1:8282',
      success:function(){
        console.log("客户端链接成功")
      }
    })
    //注意,我们发送数据必须在websoketOpen中进行
    wx.onSocketOpen(function(){
      wx.sendSocketMessage({
        data:"这个是来自客户端的实时消息"
      })
      //监听一下来自服务器的消息
      wx.onSocketMessage(function(message){
        console.log(message)
      })
    })
  }

  //下载文件的api的使用
  download(){
    wx.downloadFile({
      url: 'https://example.com/audio/123', //仅为示例，并非真实的资源
      success (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.playVoice({
            filePath: res.tempFilePath
          })
        }
      }
    })
  }

}
//添加一个获取用户信息的UserInfoButton按钮
// let button = wx.createUserInfoButton({
//   type: 'text',
//   text: '获取用户信息',
//   style: {
//     left: 10,
//     top: 76,
//     width: 200,
//     height: 40,
//     lineHeight: 40,
//     backgroundColor: '#ff0000',
//     color: '#ffffff',
//     textAlign: 'center',
//     fontSize: 16,
//     borderRadius: 4
//   }
// })
// button.onTap((res) => {
//   console.log(res)
// })