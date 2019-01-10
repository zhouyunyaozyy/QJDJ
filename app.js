//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.get("/mp-user/login", {code: res.code},
          (data) => {
            // console.log(data)
            wx.setStorageSync('Authorization', data)
          }
        )
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  config: {
    host: 'http://118.24.119.203',           // 本地 
  },

  get: function (url, data, successs, error) {
    this.request({
      url,
      data,
      method: 'GET',
      success: (data) => {
        successs && successs(data);
      },
      error: (e) => {
        error && error(data);
      }
    })
  },

  post: function (url, data, successs, error) {
    this.request({
      url,
      data,
      method: 'POST',
      success: (res) => {
        successs && successs(res);

      },
      error: (e) => {
        error && error(e);
      }
    })
  },

  /**
   * 请求数据
   * json.url       接口地址
   * json.data      数据
   * json.method    请求方式
   * json.success   成功回调
   * json.error     失败
   */
  request: function (json) {
    wx.showLoading();
    let { url, data, method, success, error } = json;
    let token = wx.getStorageSync('token');
    token && (data.token = token);

    // data.token = 'will';
    // !data.source && (data.source = 'client');
    let _this = this;
    console.log(url, data, json)
    console.log(`${this.config.host}/${url}`)
    wx.request({
      url: `${this.config.host}/${url}`,
      data: data,
      header: {
        "Authorization": wx.getStorageSync('Authorization') || ""
      },
      method: method,
      success: function (res) {
        // 有token就保存token
        let { token, category_logo_url, code } = res.data;
        // if (code == 1001) { // 没有登录
        //   wx.switchTab({
        //     url: '/pages/mine/mine',
        //   })
        // }
        token && _this.setStorageSync({ token });
        success && success(res.data);
      },
      // 失败
      fail: function (e) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  }
})