//app.js
App({
  onLaunch: function (option) {
    console.log(`on launch！`,option);
    this.get_login();
  },
  get_login(){
    let self = this;
    wx.login({
      success (res) {
        if (res.code) {
          self.get_openid(res.code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  get_openid(code){
    wx.request({
      url: `${this.globalData.api_base}/wxlogin`,
      method:'post',
      data:{
        code:code
      },
      success: res => {
        let data = res.data && res.data.data
        if(data){
          this.globalData.openid = data.openid;
          this.get_userinfo();
        }
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  // 自动获取用户信息
  get_userinfo(){
    let self = this;
    wx.request({
      url: `${self.globalData.api_base}/userinfo`,
      method:'post',
      data:{
        openid:this.globalData.openid,
      },
      success: res => {
        let data = res.data && res.data.data;
        if(data){
          self.globalData.userInfo = {
            avatar:data.avatar,
            nickname:data.nickname
          }
        }
      },
      fail: res => {
        console.log(res);
      }
    })
  },



  //写入登陆用户 与 登陆次数
  put_logintime(userInfo){
    let self = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${self.globalData.api_base}/user_login`,
        method:"post",
        data:{
          ...userInfo,
          openid:self.globalData.openid,
        },
        success: res => {
          self.globalData.userInfo = res.data.data;
          resolve();
        },
        fail: res => {
          console.log(res);
          reject(res);
        }
      })
    })
  },

  //获取主要列表
  get_main_list(){
    return new Promise((resolve, reject) => {
      let main_list = this.globalData.main_list;
      if (main_list) {
        resolve(main_list);
      } else {
        //获取数据
        let url = `${this.globalData.api_base}/all`;
        console.log(`请求数据：`, url);
        wx.request({
          url: url,
          method:"post",
          success: res => {
            this.globalData.main_list = res.data.data;
            resolve(res.data.data);
          },
          fail: res => {
            console.log(res);
            reject();
          }
        })
      }
    })
  },
  globalData: {
    api_base:'https://www.toboedu.com/api/english_mini',
    openid:null,
    userInfo: null,
    main_list:null,
  }
})

