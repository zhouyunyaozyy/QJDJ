// pages/mine/person/phone/phone.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnDisabled: false,
    btnVal: "获取",
    phone: "",
    secCode: '',
    image: "",
    md5SecCode: "",
    md5SmsCode: "",
    smsCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this)
    this.getImage()
  },
  inputBlur: function (e) {
    let dataset = e.currentTarget.dataset
    this.setData({
      [dataset.key]: e.detail.value
    })
  },

  getImage: function () {
    app.get("/mp-user/sec-code/150/100/E6E6E6/420252/40", {}, (data) => {
      this.setData({
        image: "data:image/jpeg;base64," + data.imageBase64Code,
        md5SecCode: data.md5SecCode
      })
    })
  },
  getNum: function () {
    app.post("/mp-user/sms", { md5SecCode: this.data.md5SecCode, phone: this.data.phone, secCode: this.data.secCode}, (data) => {
      this.setData({
        md5SmsCode: data.smsCode
      })
      let num = 60
      this.setData({
        btnDisabled: true,
        btnVal: num + "s"
      })
      let interval = setInterval(() => {
        num--
        if (num <= 0) {
          clearInterval(interval)
          this.setData({
            btnDisabled: false,
            btnVal: "获取"
          })
        }
        this.setData({
          btnVal: num + "s"
        })
      }, 1000)
    })
  },
  save: function () {
    app.post("/mp-user/bind", { md5SmsCode: this.data.md5SmsCode, phone: this.data.phone, smsCode: this.data.smsCode }, (data) => {
      wx.showToast({
        title: data,
        icon: 'successful',
        duration: 2000
      })
      wx.navigateBack({
        delta: 1
      })
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