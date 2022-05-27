<template>
  <view class="wrapper" v-if="isReady">
    <view>
      <view class="head_box">
        <image class="head_box__pic" :src="userInfo.avatar" />
        <image
          class="head_box__hat"
          src="https://static.toboedu.com/date/20211026/03fc8b6e30a418db45ffe2bda86b7c72.png"
          v-if="is_vip"
        />
        <i
          v-if="canIUseGetUserProfile"
          @click="getUserProfile"
          class="updateHead iconfont tb_ic_autorenew"
        ></i>
      </view>

      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell">
          <view class="weui-cell__bd">昵称</view>
          <view class="weui-cell__ft">{{ userInfo.nickname }}</view>
        </view>
        <view class="weui-cell">
          <view class="weui-cell__bd">地区</view>
          <view class="weui-cell__ft">{{ city }}</view>
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
    </view>
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
    if (wx.canIUse(`getUserProfile`)) {
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
    city() {
      if (
        this.userInfo &&
        (this.userInfo.country || this.userInfo.province || this.userInfo.city)
      ) {
        return `${this.userInfo.country} ${this.userInfo.province} ${this.userInfo.city}`;
      } else {
        return "未知";
      }
    },
  },
  methods: {
    onAd() {
      getApp().$vm.playAd();
    },
    getUserProfile(e) {
      wx.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          getApp().$vm.setUserInfo({
            ...res.userInfo,
          });
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
  background: #eee;
}
.main_list__head {
  width: 30vw;
  height: 30vw;
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
  padding: 50rpx;
  margin-bottom: 20rpx;
  height: 30vw;
  position: relative;
  background: #fff;
  border: 1px solid #c8c8cd;
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
  margin-left: 40rpx;
  transform: rotate(30deg);
  top: 30rpx;
  width: 60rpx;
  height: 60rpx;
}
.payButton {
  height: 70rpx;
  line-height: 72rpx;
  font-size: 32rpx;
  padding: 0 20rpx;
}

.updateHead {
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 30rpx;
  bottom: 30rpx;
  background: #1aad19;
  border-radius: 100%;
  color: #fff;
  font-size: 45rpx;
}
</style>
