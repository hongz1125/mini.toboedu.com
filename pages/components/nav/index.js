import { to_link } from '../../../utils/util';

const app = getApp();

Component({
  attached: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  properties: {
    page_name: {
      type: String,
      value: '',
    }
  },
  data: {
    userInfo: null,
  },
  methods: {
    go_rank() {
      to_link(null,'/pages/rank/index');
    },
    go_user(){
      to_link(null,'/pages/user/index');
    },
    go_home() {
      wx.navigateBack({
        delta: 100
      })
    },
    on_userinfo: function (e) {
      if(!e.detail.userInfo) return;
      app.put_logintime(e.detail.userInfo).then(res => {
        this.setData({
          userInfo: app.globalData.userInfo
        })
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }).catch(err => {
        console.log(err);
      });
    },
  }
})
