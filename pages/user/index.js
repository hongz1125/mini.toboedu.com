//logs.js
import Util from '../../utils/util';

const app = getApp();

Page({
  data: {
    userInfo:null,
  },
  on_pay() {
    wx.request({
      url: `${app.globalData.api_base}/pay`,
      method: "post",
      data: {
        openid: app.globalData.openid,
      },
      success: res => {
        let data = res.data.data;
        wx.requestPayment({
          appId: data.appId,
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success: res => {
            this.on_pay_success();
          },
          fail: res => {
          },
          complete: res => {
          }
        })

      },
      fail: res => {
        console.log(res);
      }
    })

  },
  on_pay_success() {
    wx.showToast({
        title: '恭喜您成为会员',
        icon: 'success',
        duration: 3000
    });
    app.globalData.main_list = null;
    app.globalData.userInfo = null;
    this.onLoad();
  },

  onLoad(options) {
    app.on_ready().then(res => {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    }).catch(err => {
      console.log(err);
    });
  },
  onGotUserInfo: function (e) {
    if(!e.detail.userInfo) return;
    app.put_logintime(e.detail.userInfo).then(res => {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }).catch(err => {
      console.log(err);
    });
  },
})
