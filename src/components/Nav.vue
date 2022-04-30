<template>
  <view class="headerBox">
    <text class="nav__ico nav__kefy iconfont tb_kefu"></text>
    <text
      class="nav__ico iconfont tb_meiri"
      @click="$utils.goLink(`/pages/famous/index`)"
    ></text>
    <text
      class="nav__ico iconfont tb_paihang"
      @click="$utils.goLink(`/pages/rank/index`)"
    ></text>
    <text
      class="nav__ico iconfont tb_yonghu"
      @click="$utils.goLink(`/pages/user/index`)"
    ></text>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
  mounted() {},
  created() {},
};
</script>

<style lang="scss" scoped></style>
