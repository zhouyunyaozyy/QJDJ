// pages/orderAll/orderAll.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numData: {
      allCount: 0,
      appointmentCount: 0,
      appointmentFlag: 0,
      chargebackCount: 0,
      checkedCount: 0,
      notAppointmentCount: 0,
      workFinishedCount: 0,
      workStartedCount: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    app.get("/mp-order/count", {}, (res) => {
      console.log(res)
      this.setData({
        numData: res
      })
    })
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

  },
  goOrderList: function (event) {
    // console.log(1, event, event.currentTarget.id)
    wx.navigateTo({
      url: "/pages/orderAll/orderList/orderList?type=" + event.currentTarget.id
    })
  }
})