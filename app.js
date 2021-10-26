import { ajax, to_link } from 'utils/util';

App({
  onLaunch() {
    console.log(`on launch！`);
    this.get_system();
    this.analyse('times_login');
    console.log(wx.getUserProfile, 999);
  },
  //每个页面onload的时候需要执行
  on_ready() {
    return new Promise((resolve, reject) => {
      this.get_code().then(this.get_login).then(this.get_main_list).then(resolve).catch(reject);
    });
  },
  //获取code
  get_code() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          resolve(res.code);
        },
        fail(err) {
          reject(new Error('wx.login'));
        },
      });
    });
  },
  //获取openid 与 用户信息
  get_login(code) {
    return new Promise((resolve, reject) => {
      if (this.globalData.openid && this.globalData.userInfo) {
        resolve();
      }
      ajax({
        url: `/wxlogin`,
        data: {
          code: code,
        },
      })
        .then(res => {
          this.globalData.openid = res.wx_openid;
          this.globalData.is_free = res.is_free;
          this.globalData.money = res.money;
          this.globalData.userInfo = res.user_info;

          console.log(`是否免费：`, this.globalData.is_free);
          console.log(`产品定价：`, this.globalData.money);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  //写入用户信息
  put_logintime(userInfo) {
    return new Promise((resolve, reject) => {
      ajax({
        url: `/user_login`,
        data: {
          ...userInfo,
          wx_openid: this.globalData.openid,
        },
      })
        .then(res => {
          // res.is_vip = res.is_vip || this.globalData.is_ios;
          this.globalData.userInfo = res;
          resolve();
        })
        .catch(reject);
    });
  },
  // 计算是否是免费
  comp_free(free) {
    if (free || this.globalData.is_free) {
      return true;
    }
    if (this.globalData.userInfo && this.globalData.userInfo.is_vip) {
      return true;
    }
    return false;
  },
  //获取主要列表
  get_main_list() {
    return new Promise((resolve, reject) => {
      if (this.globalData.main_list) {
        return resolve();
      }
      //获取数据
      ajax({
        url: `/all`,
      })
        .then(res => {
          this.globalData.main_list = res.reduce((sam, item) => {
            item.is_free = this.comp_free(!item.is_vip);
            return sam.concat(item);
          }, []);
          resolve();
        })
        .then(res => {
          reject(new Error(res));
        });
    });
  },
  //全站支付页面
  on_pay() {
    ajax({
      url: `/pay`,
      data: {
        openid: this.globalData.openid,
      },
    })
      .then(res => {
        let data = res;
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
            wx.showToast({
              title: JSON.stringify(res),
              icon: 'success',
              duration: 3000,
            });
          },
          complete: res => {},
        });
      })
      .then(res => {
        console.log(res);
      });
  },
  //支付成功的回调
  on_pay_success() {
    wx.showToast({
      title: '恭喜您成为会员',
      icon: 'success',
      duration: 3000,
    });
    this.globalData.main_list = null;
    this.globalData.userInfo = null;
    //支付完成 重新呼起小程序 关闭圈闭页面
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },
  //统计
  analyse(action) {
    if (!this.globalData.userInfo) return;
    ajax({
      no_loading: 1,
      method: 'get',
      url: '/analyse',
      data: {
        id: this.globalData.userInfo.id,
        action: action,
      },
    });
  },
  //获取系统信息
  get_system() {
    try {
      const res = wx.getSystemInfoSync();
      this.globalData.is_ios = res.system.toLowerCase().indexOf('ios') > -1 ? 1 : 0;
    } catch (e) {
      // Do something when catch error
    }
  },

  globalData: {
    money: 1,
    is_free: 1,
    is_ios: true,
    api_base: 'https://www.toboedu.com/api/english_mini',
    openid: null,
    userInfo: null,
    main_list: null,
    loading: 0,
  },
});
