<template>
  <view class="content">
    <Nav />
    <scroll-view scroll-y class="main_box__scroll">
      <view class="main_list" v-if="list">
        <view
          class="main_list__li"
          :key="index"
          v-for="(item, index) in list"
          @click="go_detail(item.id)"
        >
          <view class="main_list__bg">
            <image class="main_list__img" :src="`${item.src}!jpg`"></image>
            <text
              class="main_list__lock iconfont tb_suo"
              v-if="!(item.is_vip ? userInfo.is_vip : true)"
            ></text>
          </view>
          <view class="main_list__text">{{ item.cn }}</view>
        </view>
      </view>
      <ad v-if="$store.getters.is_ad" unit-id="adunit-51272ea8d1a01ce2"></ad>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      option: null,
      id: "",
      title: "Hello",
      userInfo: {},
      list: null,
    };
  },
  computed: {
    main_list() {
      return this.$store.state.app.main_list || [];
    },
    isLogin() {
      return this.$store.state.userInfo || false;
    },
  },
  onLoad(option) {
    this.option = option;
    this.getList();
  },
  onShow() {},
  methods: {
    getList() {
      this.list = this.main_list.find(
        (item) => item.id == this.option.id
      ).children;
    },
    go_detail(cid) {
      uni.navigateTo({
        url: `/pages/detail/index?id=${this.option.id}&cid=${cid}`,
      });
    },
  },
};
</script>
