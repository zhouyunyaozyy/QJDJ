// pages/orderAll/orderList/orderList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = "全部订单"
    console.log(options)
    let type = options.type
    if (options.type === "-1") {
      title = "全部订单"
    } else if (options.type === "2") {
      title = "未预约订单"
    } else if (options.type === "3") {
      title = "已预约订单"
    } else if (options.type === "4") {
      title = "已开工订单"
    } else if (options.type === "5") {
      title = "已完工订单"
    } else if (options.type === "6") {
      title = "未审核退单"
    } else if (options.type === "7") {
      title = "已审核退单"
    } else if (options.type === "8") {
      title = "日程安排"
      type = 4
    }
    wx.setNavigationBarTitle({
      title: title//页面标题为路由参数
    })
    app.post("/mp-order/list/" + type, {}, (res) => {
      this.setData({
        tableData: res.records
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

  },
  goOrderDetail: function (event) {
    console.log(event)
    wx.navigateTo({
      url: "/pages/orderAll/orderDetail/orderDetail?id=" + event.currentTarget.id
    })
  }
})