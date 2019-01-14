// model.js
// var area = require('../../utils/area.js')

var areaInfo = [];//所有省市区县数据

var provinces = [];//省

var citys = [];//城市

var countys = [];//区县

var value = [0,0,0];//数据位置下标

var info = {};
const app = getApp()

function updateAreaData(that, status, e){
    //获取省份数据
    // let value = onceData
    var getProvinceData = function (){
      // var s;
      provinces = [];

      app.get("/site/provinces", {}, (data) => {
        provinces = data
        console.log("provinces", provinces)
        //初始化调一次
        //获取地级市数据
        getCityArr();
      })
      // var num = 0;
      // for (var i = 0; i < areaInfo.length; i++) {
      //   s = areaInfo[i];
      //   if (s.di == "00" && s.xian == "00") {
      //     provinces[num] = s;
      //     num++;
      //   }
      // }

      //模型赋值
      info = {
        item: {
          provinces: provinces,
          citys: citys,
          countys: countys,
          value: value
        }
      }
      animationEvents(that, 200, false, 0);
    }

    // 获取地级市数据
  var getCityArr = function (count = 0, column1 = 0) {
      // var c;
    citys = [];
    // console.log("count", count, provinces)
    app.get("/site/cities/" + provinces[count].code, {}, (data) => {
      citys = data
      console.log("citys", citys)
      if (citys.length == 0) {
        citys[0] = { name: '' };
      }
      //获取区县数据
      getCountyInfo(count, column1);
    })
      // var num = 0;
      // for (var i = 0; i < areaInfo.length; i++) {
      //   c = areaInfo[i];
      //   if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
      //     citys[num] = c;
      //     num++;
      //   }
      // }

    }

    // 获取区县数据
    var getCountyInfo = function (column0 = 0, column1 = 0) {
      var c;
      countys = [];
      app.get("/site/areas/" + citys[column1].code, {}, (data) => {
        countys = data
        console.log("countys", countys)
        if (countys.length == 0) {
          countys[0] = { name: '' };
        }
        value = [column0, column1, 0];
      })
      // var num = 0;
      // for (var i = 0; i < areaInfo.length; i++) {
      //   c = areaInfo[i];
      //   if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
      //     countys[num] = c;
      //     num++;
      //   }
      // }
    }
    
    //滑动事件
    var valueChange = function(e,that){
      var val = e.detail.value
       console.log("e", e)
      //判断滑动的是第几个column
      //若省份column做了滑动则定位到地级市和区县第一位
      if (value[0] != val[0]) {
        val[1] = 0;
        val[2] = 0;
        console.log(1234)
        app.get("/site/cities/" + provinces[val[0]].code, {}, (data) => {
          citys = data
          console.log("citys", citys, val)
          app.get("/site/areas/" + citys[val[1]].code, {}, (data) => {
            countys = data
            value = val;

            assignmentData(that, that.data.item.show)
          })
          //获取区县数据
          // getCountyInfo(count, column1);
        })
        // getCityArr(val[0], val[1]);//获取地级市数据
        // getCountyInfo(val[0], val[1]);//获取区县数据
      } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
        if (value[1] != val[1]) {
          val[2] = 0;
          // getCountyInfo(val[0], val[1]);//获取区县数据
          app.get("/site/areas/" + citys[val[1]].code, {}, (data) => {
            countys = data
            value = val;

            assignmentData(that, that.data.item.show)
          })
        } else {
          value = val;

          assignmentData(that, that.data.item.show)
        }
      }

      // console.log(val);
      
      //回调
      //callBack(val);

    }
   
    if (status == 0){

      //获取省份数据
      getProvinceData();
      // area.getAreaInfo(function (arr) {
      //   areaInfo = arr;
      //   //获取省份数据
      //   getProvinceData();

      // });  
    }
    //滑动事件
    else{
      valueChange(e,that);
    }
    
}

//动画事件
function animationEvents(that, moveY, show, duration) {
  console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: duration,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  //赋值
  console.log(124, that.data)
  if (that.data.item) {
    // value = that.data.item.value
    // app.get("/site/cities/" + provinces[value[0]].code, {}, (data) => {
    //   citys = data
    //   console.log("citys2", citys, value)
    //   app.get("/site/areas/" + citys[value[1]].code, {}, (data) => {
    //     countys = data
    //     // value = val;

    //     assignmentData(that, that.data.item.show)
    //   })
    //   //获取区县数据
    //   // getCountyInfo(count, column1);
    // })
  } else {
    console.log("that", that.data)
    // assignmentData(that, show)
  }
  assignmentData(that, show)
  

}

//赋值
function assignmentData(that, show) {
  that.setData({
    item: {
      animation: that.animation.export(),
      show: show,
      provinces: provinces,
      citys: citys,
      countys: countys,
      value: value
    }
  })
}

module.exports = {
  updateAreaData: updateAreaData,
  animationEvents: animationEvents
}
