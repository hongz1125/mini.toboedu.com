<template>
  <view class="wrapper" v-if="isReady">
    <!-- <view v-if="!userInfo.avatar">
      <view class="iconfont tb_guanwangicon31334 head"></view>
      <button
        v-if="canIUseGetUserProfile"
        class="login"
        type="primary"
        lang="zh_CN"
        @click="getUserProfile"
      >
        微信授权登陆
      </button>
    </view>
    <view v-else> -->
    <view class="head_box">
      <image class="head_box__pic" :src="userInfo.avatar" />
      <image
        class="head_box__hat"
        src="https://static.toboedu.com/date/20211026/03fc8b6e30a418db45ffe2bda86b7c72.png"
        v-if="is_vip"
      />
    </view>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell">
        <view class="weui-cell__bd">昵称</view>
        <view class="weui-cell__ft">{{ userInfo.nickname }}</view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">地区</view>
        <view class="weui-cell__ft">{{
          userInfo.country + " " + userInfo.province + " " + userInfo.city
        }}</view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__bd">经验值</view>
        <view class="weui-cell__ft">{{ userInfo.times_word }}</view>
      </view>
    </view>

    <view class="weui-panel weui-panel_access">
      <view class="weui-media-box weui-media-box_text">
        <view
          v-if="!is_vip"
          class="weui-media-box__title weui-media-box__title_in-text"
          >成为会员</view
        >
        <view v-if="!is_vip" class="weui-media-box__desc"
          >会员可解锁全部图集，并可以点亮头像。</view
        >
        <view v-if="!is_vip" class="pay_btn">
          <button class="payButton" type="primary" @click="onAd">
            观看广告成为会员
          </button>
          <button
            class="payButton"
            type="primary"
            @click="on_pay"
            v-if="!is_ios"
            size="mini"
          >
            支付 {{ vip_price }} 元成为会员
          </button>
        </view>
        <button v-if="is_vip" type="primary" @click="onAd">手气一下</button>
      </view>
    </view>
    <!-- </view> -->
  </view>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "app.vue",
  data() {
    return {
      isReady: false,
      canIUseGetUserProfile: false,
    };
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.canIUseGetUserProfile = true;
    }

    getApp()
      .$vm.on_ready()
      .then(() => {
        console.log("ready");
        this.isReady = true;
      });
  },
  components: {},
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo;
    },
    vip_price() {
      return this.$store.getters.vip_price / 100;
    },
    is_ios() {
      return this.$store.getters.is_ios;
    },
    is_vip() {
      return this.$store.getters.is_vip;
    },
  },
  methods: {
    onAd() {
      let app = getApp().$vm;
      let videoAd = app.videoAd;
      if (videoAd) {
        videoAd.show().catch(() => {
          videoAd
            .load()
            .then(() => videoAd.show())
            .catch((err) => {
              console.log("激励视频 广告显示失败");
            });
        });
      }
    },
    getUserProfile(e) {
      wx.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          getApp().$vm.put_logintime(res.userInfo);
        },
      });
    },
    on_pay() {
      getApp().$vm.on_pay();
    },
  },
  mounted() {},
  created() {},
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  background: #fefefe;
}
.main_list__head {
  width: 20vw;
  height: 20vw;
  left: 13vw;
  top: 13vw;
  position: absolute;
}

.login {
  margin: 0 5vw;
}

.head {
  color: #e3e3e3;
  margin: auto;
  font-size: 30vw;
  text-align: center;
  padding: 10vw;
}

.pay_btn {
  text-align: right;
  padding-top: 5vw;
  display: flex;
}

.head_box {
  text-align: center;
  padding: 20vw 10vw 10vw;
  height: 30vw;
}

.head_box__pic {
  width: 30vw;
  height: 30vw;
  background: #fafafa;
  border-radius: 100%;
}

.head_box__hat {
  position: absolute;
  left: 50%;
  margin-left: 5vw;
  transform: rotate(30deg);
  top: 10vw;
  width: 15vw;
  height: 15vw;
}
.payButton {
  height: 70rpx;
  line-height: 72rpx;
  font-size: 32rpx;
  padding: 0 20rpx;
}
</style>
