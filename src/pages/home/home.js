const requestUrl = require('../../utils/get-request-url');

Page({
  data: {
    contents: [{
      image: '../../images/course_icon.png',
      text: '课表',
      url: '../course/course',
      needLogin: true,
    }, {
      image: '../../images/grade_icon.png',
      text: '成绩',
      url: '../grade/grade',
      needLogin: true,
    }, {
      image: '../../images/exam_icon.png',
      text: '考试',
      needLogin: true,
      disable: true,
    }, {
      image: '../../images/news_icon.png',
      text: '教务公告',
      url: '../news/news',
    }, {
      image: '../../images/cet4_icon.png',
      text: '四六级成绩',
      url: '../cet4/cet4',
      needLogin: true,
    }, {
      image: '../../images/job_icon.png',
      text: '校招信息',
      url: '../job/job',
    }, {
      image: '../../images/course_icon.png',
      text: '课表',
      disable: true,
    }, {
      image: '../../images/course_icon.png',
      text: '课表',
      disable: true,
    }, {
      image: '../../images/course_icon.png',
      text: '课表',
      disable: true,
    }],
  },
  jumpPage(event) {
    const item = event.currentTarget.dataset.item;
    if (item.needLogin && !this.data.isLogin) {
      return;
    }
    wx.navigateTo({
      url: item.url,
    });
  },
  getUserName(username, password, cookie, callback) {
    wx.request({
      url: `${requestUrl}/api/education/getUserName`,
      data: {
        username,
        password,
        cookie,
      },
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        if (res.error) {
          console.error('getname error');
        } else {
          callback(res.data.name);
        }
      },
    });
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    const selectUsername = wx.getStorageSync('selectUsername');
    if (!selectUsername) {
      // 没有任何登陆信息
      this.setData({
        isLogin: false,
      });
      return;
    }

    this.setData({
      isLogin: true,
    });

    const password = userInfo[selectUsername].password;
    const cookie = userInfo[selectUsername].cookie;
    const that = this;

    // 获取用户名字
    if (userInfo[selectUsername].name) {
      that.setData({
        username: userInfo[selectUsername].name,
      });
    } else {
      that.setData({
        username: selectUsername,
      });
      that.getUserName(selectUsername, password, cookie, (name) => {
        that.setData({
          username: name,
        });
        userInfo[selectUsername].name = name;
        wx.setStorage({
          key: 'userInfo',
          data: userInfo,
        });
      });
    }
  },
});
