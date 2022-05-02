<template>
  <view class="content">
    <Nav />
    <view class="detail_out">
      <view class="detail">
        <view class="detail__bg">
          <image class="detail__img" :src="detail.src"></image>
          <text
            class="detail__left iconfont tb_jiantouzuo"
            v-if="detailIndex > 0"
            @click="on_next(detailIndex - 1)"
          ></text>
          <text
            class="detail__right iconfont tb_jiantouyou"
            @click="on_next(detailIndex + 1)"
            v-if="detailIndex < list.children.length - 1"
          ></text>
        </view>
        <view class="detail__en" v-if="!status.hide_text">
          <block>{{ detail.en }}</block>
        </view>
        <view class="detail__ens" v-if="!status.hide_text">
          <block>/{{ detail.en_s }}/</block>
        </view>
        <view class="detail__btn">
          <text class="iconfont tb_bofang" @click="on_play"></text>
          <text
            class="iconfont tb_yinle"
            :class="!status.no_music ? '' : 'disabled'"
            @click="status.no_music = !status.no_music"
          ></text>
          <text
            class="iconfont tb_ic_autorenew"
            :class="status.auto_play ? '' : 'disabled'"
            @click="on_auto_play"
          ></text>
          <text
            class="iconfont tb_ai-eye"
            :class="!status.hide_text ? '' : 'disabled'"
            @click="status.hide_text = !status.hide_text"
          ></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ajax } from "@/utils";

export default {
  data() {
    return {
      option: null,
      userInfo: null,
      detail: null,
      detailIndex: 0,
      list: null,

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
    this.option = option;
    this.getDetail();
  },
  onUnload() {
    clearTimeout(this.time);
  },
  onShow() {},
  methods: {
    getDetail() {
      this.list = this.main_list.find((item) => item.id == this.option.id);

      this.detailIndex = this.list.children.findIndex(
        (item) => item.id == this.option.cid
      );
      this.detail = this.list.children[this.detailIndex];
      console.log(
        this.list,
        this.detailIndex,
        this.list.children.length,
        this.detailIndex < this.list.length - 1
      );
    },
    on_next(num) {
      this.do_play(num);
      this.onAnalyse();
    },
    onAnalyse() {
      let data = {
        user_id: this.$store.getters.user_id,
      };
      ajax({ url: `/analyse`, data }).then();
      this.$store.state.app.userInfo.times_word++;
    },
    do_play(num) {
      this.detail = this.list.children[num];
      this.detailIndex = num;
      console.log(this.detail);
      //写入bar中间文字
      wx.setNavigationBarTitle({
        title: this.detail.cn,
      });
      this.on_play();
    },
    on_play() {
      //判断静音 和 手动播放
      if (this.status.no_music) return;
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = this.detail.music;
      innerAudioContext.onPlay(() => {
        console.log("开始播放");
      });
      innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    },
    on_auto_play() {
      let max = this.list.children.length;
      let val = this.detailIndex + 1 >= max ? 0 : this.detailIndex + 1;
      console.log(val);
      this.do_play(val);
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.on_auto_play();
      }, 2000);
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
</style>
