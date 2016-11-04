//index.js
//获取应用实例
Page({
  gotoCourse: function(e) {
    wx.navigateTo({
      url: '../course/course'
    })
  },
  login: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  getUserName: function(username, password, cookie, callback) {
    wx.request({
      url: 'http://test.gebilaowu.cn/api/education/getUserName?',
      data: {
        username,
        password,
        cookie
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res.error) {
          console.log("getname error");
        } else {
          console.log(res.data.name);
          callback(res.data.name);
        }
      }
    });
  },
  onLoad: function() {
    var userInfo = wx.getStorageSync('userInfo');
    var selectUsername = wx.getStorageSync('selectUsername');
    var password = userInfo[selectUsername].password;
    var cookie = userInfo[selectUsername].cookie;
    var that = this;
    // this.setData({
    //   username: userInfo[selectUsername].name
    // });
    // 获取用户名字
    if (userInfo[selectUsername].name) {
      that.setData({
        username: userInfo[selectUsername].name
      });
    } else {
      that.getUserName(selectUsername, password, cookie, function(name) {
        console.log(name);
        that.setData({
          username: name
        });
        userInfo[selectUsername].name = name;
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        });
      });
    }
  }
})
