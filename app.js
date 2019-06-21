import { formatTime, get_data, loading_show, loading_hide, ajax } from 'utils/util';

App({
  onLaunch() {console.log(`on launch！`);},
  onShow(){console.log('App onShow');},
  onHide(){console.log('App onHide');},
  //每个页面onload的时候需要执行
  on_ready(){
    return new Promise((resolve,reject) => {
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
          reject(new Error('wx.login'))
        }
      })
    })
  },
  //获取openid 与 用户信息
  get_login(code) {
    return new Promise((resolve,reject) => {
      if(this.globalData.openid && this.globalData.userInfo){
        resolve();
      }
      ajax({
          url: `/wxlogin`,
          data: {
            code: code
          }
        }).then(res => {
          this.globalData.openid = res.wx_openid;
          this.globalData.userInfo = res;
          resolve();
        }).catch(err => {
          reject(err)
        });
    }) 
  },
  //写入用户信息
  put_logintime(userInfo) {
    let self = this;
    return new Promise((resolve, reject) => {
      ajax({
        url: `/user_login`,
        data: {
          ...userInfo,
          wx_openid: self.globalData.openid,
        }
      }).then(res => {
        self.globalData.userInfo = res.data.data;
        resolve();
      }).catch(reject);
    })
  },

  //获取主要列表
  get_main_list() {
    return new Promise((resolve, reject) => {
      if (this.globalData.main_list) {
        resolve();
        return;
      }
      //获取数据
      let url = `${this.globalData.api_base}/all`;
      wx.request({
        url: url,
        method: "post",
        success: res => {
          this.globalData.main_list = res.data.data;
          resolve();
        },
        fail: res => {
          reject(new Error(res));
        }
      })
    })
  },
  globalData: {
    api_base: 'https://www.toboedu.com/api/english_mini',
    openid: null,
    userInfo: null,
    main_list: null,
  }
})

