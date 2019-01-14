// pages/mine/certification/certification.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authPictures: '',
    productInfo: [{ url: "", name: '' }, { url: "", name: '' }, { url: "", name: '' }]
  },
  bindChooiceProduct: function (event) {
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
            url: app.config.host + '/mp-user-auth/upload',
            filePath: tempFilePaths[i],
            name: 'img',
            formData: {
              // img: tempFiles[i],
              imgSort: event.currentTarget.dataset.type == 0 ? "本人持证件" : (event.currentTarget.dataset.type == 1 ? "正面" : "背面")
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
              // that.setData({
              //   productInfo: productInfo
              // });
              productInfo[parseInt(event.currentTarget.dataset.type)].url = tempFilePaths[i]
              productInfo[parseInt(event.currentTarget.dataset.type)].name = res.data
              console.log(that.data)
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFiles.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
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
    });  
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