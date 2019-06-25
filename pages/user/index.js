//logs.js

const app = getApp();

Page({
  data: {
    userInfo:null,
  },
  on_pay(){
    app.on_pay();
  },
  onLoad(options) {
    app.on_ready().then(res => {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    }).catch(err => {
      console.log(err);
    });
  }
})
