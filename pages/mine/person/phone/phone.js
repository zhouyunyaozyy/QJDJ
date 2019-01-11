// pages/mine/person/phone/phone.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    secCode: '',
    image: "",
    md5SecCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this)
    this.getImage()
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
      console.log(data)
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