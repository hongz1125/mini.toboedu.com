import { to_link } from '../../../utils/util';

const app = getApp();

Component({
  attached: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  properties: {
    page_name: {
      type: String,
      value: '',
    },
  },
  data: {
    userInfo: null,
  },
  methods: {
    go_rank() {
      to_link(null, '/pages/rank/index');
    },
    go_famous() {
      to_link(null, '/pages/famous/index');
    },
    go_user() {
      to_link(null, '/pages/user/index');
    },
    go_home() {
      wx.navigateBack({
        delta: 100,
      });
    },
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: res => {
          console.log(res);
          this.on_userinfo(res.userInfo);
        },
      });
    },
    on_userinfo(userInfo) {
      app
        .put_logintime(userInfo)
        .then(res => {
          this.setData({
            userInfo: app.globalData.userInfo,
          });
          wx.reLaunch({
            url: '/pages/index/index',
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
});
