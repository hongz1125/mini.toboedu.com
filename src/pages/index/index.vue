<template>
  <view class="content">
    <Nav />
    <scroll-view scroll-y class="main_box__scroll">
      <view class="main_list" v-if="list">
        <view
          @click="goList(item)"
          class="main_list__li"
          :key="index"
          v-for="(item, index) in list"
          v-show="isItemShow(item)"
        >
          <view class="main_list__bg">
            <image class="main_list__img" :src="`${item.src}!jpg`"></image>
            <text
              class="main_list__lock iconfont tb_suo"
              v-if="!(item.is_vip ? is_vip : true)"
            ></text>
          </view>
          <view class="main_list__text">{{ item.cn }}</view>
        </view>
      </view>
      <ad v-if="is_ad" unit-id="adunit-51272ea8d1a01ce2"></ad>
    </scroll-view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "Hello",
      userInfo: {},
    };
  },
  computed: {
    is_ad() {
      return this.$store.getters.is_ad;
    },
    is_vip() {
      return this.$store.getters.is_vip;
    },
    is_ios() {
      return this.$store.getters.is_ios;
    },
    list() {
      return this.$store.state.app.main_list || [];
    },
    isLogin() {
      return this.$store.state.app.userInfo || false;
    },
  },
  onLoad() {
    getApp()
      .$vm.on_ready()
      .then(() => {
        console.log("ready");
      });
  },
  onShow() {},
  methods: {
    isItemShow(item) {
      if (item.is_vip && !this.is_vip && this.is_ios) {
        return false;
      } else {
        return true;
      }
    },
    goList(row) {
      if (!this.isLogin) {
        uni.showToast({
          title: "请先登陆 (右上角)",
          icon: "none",
        });
        return;
      }
      let is_lock = !(row.is_vip ? this.is_vip : true);
      if (is_lock) {
        this.do_lock();
        return;
      }
      uni.navigateTo({
        url: `/pages/list/index?id=${row.id}`,
      });
    },
    do_lock() {
      //直接支付 被举报了 修改成 跳转支付
      let param = {
        title: "提示",
        content: "成为会员可以解锁全部单词卡",
        cancelText: "取消",
        confirmText: "购买会员",
        success: (res) => {
          if (!res.confirm) return;
          getApp().$vm.on_pay();
        },
      };
      uni.showModal(param);
    },
  },
};
</script>
