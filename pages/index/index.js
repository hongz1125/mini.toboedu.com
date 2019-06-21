import Util from '../../utils/util';


const app = getApp()

Page({
  data: {
    list: null,
    userInfo: null
  },
  onLoad: function () {
    app.on_ready().then(res => {
      this.setData({
        userInfo: app.globalData.userInfo,
        list: app.globalData.main_list,
      });
    }).catch(err => {
      console.log(err);
    });
  },
  onShow () {
    console.log(app)
    },
  go_list: function (dom) {
    wx.navigateTo({
      url: `/pages/list/index?id=${Util.get_data(dom).id}`
    })
  },

})
