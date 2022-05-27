<template>
  <view class="content">
    <swiper
      class="swiper"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :current="current"
      vertical
      :indicator-dots="control"
      @change="onChange"
      v-if="part"
    >
      <swiper-item
        v-for="(item, index) in part"
        :key="item.id"
        :data="index"
        class="swiperItem"
      >
        <view class="detail">
          <view class="detail__bg">
            <image class="detail__img" :src="item.src"></image>
          </view>
          <view class="detail__en" :class="{ opacity: status.hide_text }">
            <block>{{ item.en }}</block>
          </view>
          <view class="detail__ens" :class="{ opacity: status.hide_text }">
            <block>/{{ item.en_s }}/</block>
          </view>
          <view class="detail__btn">
            <text
              class="iconfont tb_bofang"
              @click="on_play(item.music)"
            ></text>
            <text
              class="iconfont tb_yinle"
              :class="!status.no_music ? '' : 'disabled'"
              @click="onMusic"
            ></text>
            <text
              class="iconfont tb_ic_autorenew"
              :class="status.auto_play ? '' : 'disabled'"
              @click="onAuto(!status.auto_play)"
            ></text>
            <text
              class="iconfont tb_ai-eye"
              :class="!status.hide_text ? '' : 'disabled'"
              @click="onTxt"
            ></text>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="stackBox navBox">
      <Nav />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      old: { current: 0 },
      part: null,
      control: false,
      autoplay: false,
      interval: 2000,
      duration: 500,

      option: null,
      userInfo: null,
      detail: null,
      detailIndex: 0,
      list: null,
      audio: null,

      status: {
        no_music: false,
        hide_text: false,
        auto_play: false,
      },
      time: null,
    };
  },
  computed: {
    main_list() {
      return this.$store.state.app.main_list || [];
    },
    isLogin() {
      return this.$store.state.app.userInfo || false;
    },
  },
  onLoad(option) {
    getApp()
      .$vm.on_ready()
      .then(() => {
        console.log("ready");

        this.option = option;

        this.getList();

        wx.showToast({
          title: "上下滑动 翻页",
          icon: "none",
          duration: 5000,
        });
      });
  },
  onUnload() {
    clearTimeout(this.time);
  },
  onShow() {},
  beforeDestroy() {
    this.autoplay = false;
  },
  methods: {
    getList() {
      this.list = this.main_list.find(
        (item) => item.id == this.option.id
      ).children;
      this.getPart(this.option.cid);
    },
    getPart(cid) {
      this.detailIndex = this.list.findIndex((item) => item.id == cid);
      let part = [];

      let prev = this.list[this.detailIndex - 1];
      let current = this.list[this.detailIndex];
      let next = this.list[this.detailIndex + 1];
      if (prev) {
        part.push(prev);
      }
      part.push(current);
      if (next) {
        part.push(next);
      }
      this.current = this.old.current;
      this.$nextTick(() => {
        this.part = part;
        this.current = this.part.findIndex((item) => item.id === current.id);
        this.do_play();
      });
    },
    onChange(e) {
      if (!e.detail.source) return;
      if (e.detail.source === "touch") {
        this.onAuto(false);
      }
      this.old.current = e.detail.current;
      this.getPart(this.part[this.old.current].id);
    },
    onMusic() {
      this.status.no_music = !this.status.no_music;
    },
    onAnalyse() {
      getApp().$vm.analyse();
      this.$store.state.app.userInfo.times_word++;
    },
    do_play() {
      let detail = this.list[this.detailIndex];
      // 写入bar中间文字
      wx.setNavigationBarTitle({
        title: detail.cn,
      });
      this.on_play(detail.music);
      this.onAnalyse();
    },
    on_play(url) {
      // 判断静音 和 手动播放
      if (this.status.no_music) return;
      if (this.audio) {
        this.audio.stop();
      }
      this.audio = uni.createInnerAudioContext();
      this.audio.autoplay = true;
      this.audio.src = url;
      this.audio.onPlay(() => {
        console.log("开始播放");
      });
      this.audio.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    },
    onAuto(val) {
      clearTimeout(this.time);
      this.status.auto_play = val;
      this.on_auto_play();
    },
    on_auto_play() {
      clearTimeout(this.time);
      if (!this.status.auto_play) return;
      if (this.detailIndex >= this.list.length - 1) return;
      this.time = setTimeout(() => {
        this.onChange({
          detail: { current: this.current + 1, source: "auto" },
        });
        this.on_auto_play();
      }, 2000);
    },
    onTxt() {
      this.status.hide_text = !this.status.hide_text;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail__nav {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
}

.detail {
  position: relative;
  padding-top: 16vw;
  width: 74vw;
  margin: auto;
  text-align: center;
}
.detail_out {
  background: #575757;
  height: 100vh;
}
.detail__bg {
  height: 74vw;
  position: relative;
  background: #fff;
  margin-bottom: 4vw;
}
.detail__img {
  width: 70vw;
  height: 70vw;
  left: 2vw;
  top: 2vw;
  position: absolute;
}
.detail__left {
  position: absolute;
  left: -12.5vw;
  top: 30vw;
  width: 12.5vw;
  height: 12.5vw;
  line-height: 12.5vw;
  color: #3478f6;
  font-size: 8vw;
}
.detail__right {
  position: absolute;
  right: -12.5vw;
  top: 30vw;
  width: 12.5vw;
  height: 12.5vw;
  line-height: 12.5vw;
  color: #3478f6;
  font-size: 8vw;
}

.detail__btn {
  display: flex;
  justify-content: space-between;
  padding: 0 2vw;
}

.detail__btn text {
  border: 0.4vw solid #3478f6;
  height: 12.5vw;
  width: 12.5vw;
  line-height: 12vw;
  border-radius: 100%;
  color: #3478f6;
  font-size: 10vw;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  position: relative;
}

.detail__btn text:active {
  opacity: 0.3;
}
.detail__btn .disabled:after {
  content: "";
  width: 101%;
  height: 0.5vw;
  left: -0.2vw;
  top: 50%;
  position: absolute;
  transform: rotate(45deg);
  background: #3478f6;
}

.detail__en {
  background: #232e3f;
  border-radius: 2vw;
  line-height: 12.5vw;
  height: 12.5vw;
  color: #fff;
  margin-bottom: 4vw;
}
.detail__ens {
  background: #232e3f;
  border-radius: 2vw;
  height: 12.5vw;
  line-height: 12.5vw;
  color: #989898;
  margin-bottom: 4vw;
}
.opacity {
  opacity: 0.01;
}

.swiper {
  height: 100vh;
}
.navBox {
  z-index: 2;
  right: 0;
  top: 0;
}
</style>
