<template>
  <view class="wrapper">
    <view v-if="!userInfo.avatar">
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
    <view v-else>
      <view class="head_box">
        <image class="head_box__pic" :src="userInfo.avatar" />
        <image
          class="head_box__hat"
          src="https://static.toboedu.com/date/20211026/03fc8b6e30a418db45ffe2bda86b7c72.png"
          v-if="userInfo.is_vip == 1"
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

      <view
        class="weui-panel weui-panel_access"
        v-if="userInfo.is_vip != 1 && !isIos"
      >
        <view class="weui-media-box weui-media-box_text">
          <view class="weui-media-box__title weui-media-box__title_in-text"
            >购买会员</view
          >
          <view class="weui-media-box__desc"
            >成为会员即可解锁全部图集，有亮点，并可以点亮头像。</view
          >
          <view class="pay_btn"
            ><button
              class="weui-btn mini-btn"
              type="primary"
              @click="on_pay"
              size="mini"
            >
              支付9.9元
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "app.vue",
  data() {
    return {
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
      });
  },
  components: {},
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo;
    },
    ...mapState("app", ["isIos"]),
  },
  methods: {
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
}

.pay_btn button {
  vertical-align: top;
}

.head_box {
  text-align: center;
  padding: 20vw 10vw 10vw;
  height: 30vw;
}

.head_box__pic {
  width: 30vw;
  height: 30vw;
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
</style>
