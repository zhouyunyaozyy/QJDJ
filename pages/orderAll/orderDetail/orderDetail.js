// pages/orderAll/orderDetail/orderDetail.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    numData: "",

    // 时间选择器
    dateTimeArray1: null,
    dateTime1: null,

    // 上传安装确认书
    imgBool: false
  },

    // 时间选择器

  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  }, 
  changeDateTimeColumn1(e) {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: "订单详情"//页面标题为路由参数
    })

    // 时间选择器
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
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
    app.get("/mp-order/" + this.data.id, {}, (res) => {
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
    [
      {type: button, data: {prop}}
    ]



  },

  receiveOrder: function () {
    wx.showModal({
      title: '温馨提示',
      confirmText: '接单',
      cancelText: '考虑考虑',
      cancelColor: '#e12a46',

      content: '＊ 接单后请在2小时内完成预约，请务必按照服务规则操作。',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          app.post("/mp-order/take/" + this.data.id, {}, (data) => {
            console.log(data)
            wx.showToast({
              title: data,
              icon: "successful",
              duration: 2000
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
            
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  meet () {
    console.log(this.data)
    let dateTime1 = this.data.dateTime1
    let dateTimeArray1 = this.data.dateTimeArray1
    let mTime = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]] + ':' + '00'
    app.post("/mp-order/appointment", { appointmentTime: mTime, orderId: this.data.id}, (res) => {
      wx.showToast({
        title: data,
        icon: "successful",
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    })
  },
  kaigong () {
    app.post("/mp-order/start/" + this.data.id, {}, (data) => {
      wx.showToast({
        title: data,
        icon: "successful",
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    })
  },
  updateBook () {

    var that = this
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFiles = res.tempFiles;
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (let i = 0, h = tempFiles.length; i < h; i++) {
          wx.uploadFile({
            url: app.config.host + '/mp-order/upload-confirmation',
            filePath: tempFilePaths[i],
            name: 'pictures',
            formData: {
              // img: tempFiles[i],
              orderId: that.data.id
            },
            header: {
              "Content-Type": "multipart/form-data",
              "Authorization": wx.getStorageSync('Authorization') ? ("Bearer " + wx.getStorageSync('Authorization')) : ""
            },
            success: function (res) {
              uploadImgCount++;
              // var data = JSON.parse(res.data);
              // //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
              var productInfo = that.data.productInfo;
              // if (productInfo.bannerInfo == null) {
              //   productInfo.bannerInfo = [];
              // }
              // productInfo.bannerInfo.push({
              //   "catalog": data.Catalog,
              //   "fileName": data.FileName,
              //   "url": data.Url
              // });
              that.setData({
                imgBool: true
              });
              // productInfo[parseInt(event.currentTarget.dataset.type)].url = tempFilePaths[i]
              // productInfo[parseInt(event.currentTarget.dataset.type)].name = res.data
              // console.log(that)
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFiles.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              that.setData({
                imgBool: false
              });
              // console.log('fail:', res)
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) {
                }
              })
            }
          });
        }
      }
    })
  },
  commitAll () {
    app.post("/mp-order/finish/" + this.data.id, {}, (data) => {
      wx.showToast({
        title: data,
        icon: "successful",
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    })
  }
})