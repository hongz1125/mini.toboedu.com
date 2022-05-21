<script>
import { ajax } from "@/utils";

export default {
  loading: 0,
  is_ready: false,
  videoAd: null,
  onLaunch: function () {
    this.get_system();
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  computed: {
    wx_openid() {
      return this.$store.state.app.userInfo.wx_openid;
    },
    userInfo() {
      return this.$store.state.app.userInfo;
    },
    main_list() {
      return this.$store.state.app.main_list;
    },
    uid() {
      return this.$store.getters.uid;
    },
  },
  methods: {
    //每个页面onload的时候需要执行
    on_ready() {
      return new Promise((resolve, reject) => {
        this.get_setting()
          .then(this.get_code)
          .then(this.get_login)
          .then(this.get_main_list)
          .then(() => {
            console.log("App isReady");
            this.is_ready = true;
            this.initAd();
            resolve();
          })
          .catch(reject);
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
            reject(new Error("wx.login"));
          },
        });
      });
    },
    // 获取应用配置
    get_setting() {
      return this.$store.dispatch(`app/GET_SETTING`);
    },
    //获取openid 与 用户信息
    get_login(code) {
      return new Promise((resolve, reject) => {
        if (this.userInfo) {
          resolve();
        }
        ajax({
          url: `/wxlogin`,
          data: {
            code: code,
          },
        })
          .then((res) => {
            this.$store.commit("app/SET_USERINFO", res);
            resolve();
          })
          .catch((err) => {
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
            wx_openid: this.wx_openid,
          },
        })
          .then((res) => {
            this.$store.commit(`app/SET_USERINFO`, res);
            resolve();
          })
          .catch(reject);
      });
    },

    //获取主要列表
    get_main_list() {
      return new Promise((resolve, reject) => {
        if (this.main_list) {
          return resolve();
        }
        //获取数据
        ajax({
          url: `/all`,
        })
          .then((res) => {
            this.$store.commit("app/SET_MAIN_LIST", res);
            resolve();
          })
          .then((res) => {
            reject(new Error(res));
          });
      });
    },
    //全站支付页面
    on_pay() {
      ajax({
        url: `/pay`,
        data: {
          openid: this.wx_openid,
        },
      })
        .then((res) => {
          let data = res;
          wx.requestPayment({
            appId: data.appId,
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: (res) => {
              this.on_pay_success();
            },
            fail: (res) => {
              wx.showToast({
                title: JSON.stringify(res),
                icon: "success",
                duration: 3000,
              });
            },
            complete: (res) => {},
          });
        })
        .then((res) => {
          console.log(res);
        });
    },
    //支付成功的回调
    on_pay_success() {
      wx.showToast({
        title: "恭喜您成为会员",
        icon: "success",
        duration: 3000,
      });
      this.$store.commit("app/SET_MAINLIST", null);
      this.$store.commit("app/SET_USERINFO", null);
      //支付完成 重新呼起小程序 关闭圈闭页面
      wx.reLaunch({
        url: "/pages/index/index",
      });
    },
    //统计
    analyse() {
      if (!this.uid) return;
      ajax({
        no_loading: 1,
        method: "get",
        url: "/analyse",
        data: {
          uid: this.uid,
        },
      });
    },
    //获取系统信息
    get_system() {
      try {
        const res = wx.getSystemInfoSync();
        let is_ios = res.system.toLowerCase().indexOf("ios") > -1 ? 1 : 0;
        this.$store.commit(`app/SET_ISIOS`, is_ios);
      } catch (e) {
        // Do something when catch error
      }
    },
    // 获取系统配置
    getSetting() {
      ajax({
        method: "get",
        url: "/setting",
        data: {},
      }).then((res) => {});
    },
    // 看广告升级成会员
    onPayAd() {
      ajax({
        method: "post",
        url: "/payAd",
        data: {
          uid: this.uid,
        },
      }).then((res) => {
        wx.showToast({
          title: "恭喜您成为会员",
          icon: "success",
          duration: 3000,
        });
        this.$store
          .dispatch(`app/GET_USERINFO`, { id: this.uid })
          .then((res) => {
            wx.reLaunch();
          });
      });
    },

    // 初始化激励广告
    initAd() {
      if (wx.createRewardedVideoAd) {
        this.videoAd = wx.createRewardedVideoAd({
          adUnitId: "adunit-413fbef94a31f32d",
        });
        this.videoAd.onLoad(() => {});
        this.videoAd.onError((err) => {
          console.log(`onError`, err);
        });
        this.videoAd.onClose((res) => {
          if (res && res.isEnded) {
            this.onPayAd();
            console.log(`正常播放结束，可以下发游戏奖励`);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import url("@/common/iconfont.css");
@import url("@/common/weui.wxss");
.main_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 10px;
  &__li {
    width: 345upx;
    height: 420upx;
    text-align: center;
  }
  &__bg {
    position: relative;
    width: 345upx;
    height: 345upx;
    background: url("https://static.toboedu.com/mini_english/main_bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  &__img {
    margin-top: 27upx;
    width: 291upx;
    height: 291upx;
  }
  &__text {
    color: #fff;
  }
  &__lock {
    color: #fff;
    font-size: 60upx;
    position: absolute;
    line-height: 120upx;
    width: 120upx;
    height: 120upx;
    left: 50%;
    top: 50%;
    margin-left: -60upx;
    margin-top: -60upx;
    background: #000;
    border: 1upx solid #fff;
    border-radius: 100%;
    opacity: 0.4;
  }
}

.headerBox {
  text-align: right;
  width: 100%;
  height: 72rpx;
  .nav__ico {
    font-size: 7vw;
    line-height: 10vw;
    height: 10vw;
    width: 10vw;
    display: inline-block;
    color: #fff;
    text-align: center;
    margin-left: 1vw;
  }
}

/*每个页面公共css */
page {
  background-color: #575757;
}

.stackBox {
  position: fixed;
}
</style>
