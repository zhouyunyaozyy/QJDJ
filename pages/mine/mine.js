// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: [
    ],
    areas: [],
    productList: [
    ],
    products: [],
    multiple: true
  },
  choose(e) {
    this.setData({
      areas: e.detail.chooseArray
    })
    app.put("/mp-user", {areas: this.data.areas.join(',')}, (res) => {
      wx.showToast({
        title: '修改成功',
        icon: "successful"
      })
    })
  },
  chooseProduct(e) {
    this.setData({
      products: e.detail.chooseArray
    })
    app.put("/mp-user", { products: this.data.products.join(',') }, (res) => {
      wx.showToast({
        title: '修改成功',
        icon: "successful"
      })
    })
  },
  showPickerArea: function () {
    this.selectComponent("#showPickerArea").showPicker()
  },
  showPickerProduct: function () {
    this.selectComponent("#showPickerProduct").showPicker()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this)
    app.get("/mp-user/areas", {}, (data) => {
      let arr = [], arrlist = []
      for (let val of data) {
        if (val.selected) {
          arr.push(val.code)
        }
        arrlist.push({value: val.code, name: val.name})
      }
      this.setData({
        areaList: arrlist,
        areas: arr
      })
      console.log(this.data)
    })
    app.get("/mp-user/products", {}, (data) => {
      let arr = [], arrlist = []
      for (let val of data) {
        if (val.selected) {
          arr.push(val.id)
        }
        arrlist.push({ value: val.id, name: val.name })
      }
      this.setData({
        productList: arrlist,
        products: arr
      })
      console.log(this.data)
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

  goPerson: function () {
    wx.navigateTo({
      url: "/pages/mine/person/person",
    })
  },
  goShiming () {
    wx.navigateTo({
      url: "/pages/mine/certification/certification",
    })
  }
})