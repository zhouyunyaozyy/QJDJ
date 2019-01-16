// pages/mine/person/person.js
var model = require('../../../componets/model/model.js')
var show = false;
var item = {};

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    form: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    })
    // console.log(app)
  },
  goPhone: () => {
    wx.navigateTo({
      url: '/pages/mine/person/phone/phone',
    })
  },
  inputBlur: function (e) {
    let dataset = e.currentTarget.dataset
    this.setData({
      ["form." + dataset.key]: e.detail.value
    })
  },
  save: function () {
    console.log("qwer", this.data.province)
    if (!this.data.province) {
      // let _form = JSON.parse(JSON.stringify(this.data.form))
      // delete _form.address
      // this.setData({
      //   form: _form
      // })
      delete this.data.form.address
      console.log(this.data)
    }
    app.put("/mp-user", this.data.form, (data) => {
      wx.showToast({
        title: data,
        icon: "successful",
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
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    // this.setData({
    //   "item.value": [3,1,1]
    // })
    // console.log(this, this.data.item)
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    console.log("id = " + e.target.dataset.id)
    model.animationEvents(this, 200, false, 400);
    //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
    if (e.target.dataset.id == 666) {
      this.updateShowData()
    }
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    //如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
    // this.updateShowData()
  },
  //更新顶部展示的数据
  updateShowData: function (e) {
    item = this.data.item;
    console.log("item", item)
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name,
      "form.address": item.citys[item.value[1]].code
    });
    console.log(this.data)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.get("/mp-user", {}, (data) => {
      this.setData({
        form: data
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

  }
})