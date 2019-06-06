//index.js
//获取应用实例
import Util from '../../utils/util';


const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    list:null,
    userInfo:null,
  },
  onLoad: function () {
    app.get_main_list().then(res => {
      this.setData({
        list:res,
        userInfo:app.globalData.userInfo
      })
    })
  },
  go_list:function(dom){
    wx.navigateTo({
      url:`/pages/list/index?id=${Util.get_data(dom).id}`
    })
  },
  onGotUserInfo: function(e) {
    app.put_logintime(e.detail.userInfo).then(res => {
      this.setData({
        userInfo:app.globalData.userInfo
      });
    }).catch(err => {
      console.log(err,'put_logintime then catch');
    });
  },
})
