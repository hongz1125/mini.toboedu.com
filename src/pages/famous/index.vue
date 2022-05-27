<template>
  <swiper
    class="swiper"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
    :current="current"
    :indicator-dots="control"
    vertical
    @change="onChange"
    v-if="part"
  >
    <swiper-item
      v-for="(item, index) in part"
      :key="item.id"
      :data="index"
      class="swiperItem"
    >
      <image class="img" mode="aspectFill" :src="`${item.img}!jpg`"></image>
      <view class="content" :style="`top:${100 + (item.id % 10) * 20}px`">
        {{ item.content }}
      </view>
      <view class="detail">
        <view class="detail__translation">{{ item.translation }}</view>
        <view class="detail__date">
          <text>{{ item.showDate }}</text>
        </view>
        <view class="detail__author">
          <text>—— {{ item.author }}</text>
        </view>
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
import { ajax } from "@/utils";

export default {
  data() {
    return {
      list: {},
      current: 1,
      old: { current: 1 },
      part: null,
      control: false,
      autoplay: false,
      interval: 2000,
      duration: 500,
      audio: null,
      date: "",
      //-----
      detail: null,
    };
  },

  components: {},
  computed: {},
  onLoad() {
    getApp()
      .$vm.on_ready()
      .then(() => {
        console.log("ready");
        this.date = this.$utils.moment().format("YYYY-MM-DD");
        this.getList();
        wx.showToast({
          title: "上下滑动 翻页",
          icon: "none",
          duration: 5000,
        });
      });
  },
  beforeDestroy() {
    if (this.audio) {
      this.audio.stop();
    }
  },
  methods: {
    getTop() {
      let top = Math.floor(Math.random() * 10) * 10;
      console.log(top, 111);
      return `top:${top}px`;
    },
    // 获取日期字符
    getDate(changeDays) {
      return this.$utils
        .moment(this.date)
        .add(changeDays, "days")
        .format("YYYY-MM-DD");
    },

    // 获取三天的
    getList() {
      let prev = this.getDate(1);
      let current = this.getDate(0);
      let next = this.getDate(-1);
      prev = this.get_detail(prev);
      current = this.get_detail(current);
      next = this.get_detail(next);
      Promise.all([prev, current, next]).then((res) => {
        this.current = this.old.current;
        this.$nextTick(() => {
          this.part = [];
          if (res[0]) {
            this.part.push(res[0]);
          }
          if (res[1]) {
            this.part.push(res[1]);
          }
          if (res[2]) {
            this.part.push(res[2]);
          }
          this.current = res[0] ? 1 : 0;
          this.on_play(this.part[this.current].content);
        });
      });
    },
    // 获取part
    onChange(e) {
      if (!e.detail.source) return;
      this.old.current = e.detail.current;
      this.date = this.part[e.detail.current].showDate;
      this.getList();
    },

    // 获取每日一句
    get_detail(str) {
      return new Promise((resolve, reject) => {
        if (this.list[str]) {
          resolve(this.list[str]);
          return;
        }
        ajax({
          url: "/famous",
          data: {
            date: str,
          },
        }).then((res) => {
          if (res) {
            res.showDate = str;
            this.list[str] = res;
          }
          resolve(this.list[str]);
        });
      });
    },
    on_play(url) {
      let playUrl = `http://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(
        url
      )}`;
      //判断静音 和 手动播放
      // if (this.status.no_music) return;
      if (this.audio) {
        this.audio.stop();
      }
      this.audio = uni.createInnerAudioContext();
      this.audio.autoplay = true;
      this.audio.src = playUrl;
      this.audio.onPlay(() => {
        console.log("开始播放");
      });
      this.audio.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    },
  },
  mounted() {},
  created() {},
};
</script>

<style lang="scss" scoped>
.swiper {
  height: 100vh;
}
.famous {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-size: cover;
  background-position: center center;
  background-color: #333;
}
.img {
  width: 100%;
  height: 100%;
  position: absolute;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: rgba(0, 0, 0, 0.4);
  font-weight: 500;
  color: #fff;
  font-size: 50rpx;
  top: 50rpx;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.detail {
  position: fixed;
  bottom: 30px;
  left: 20rpx;
  right: 70rpx;
  color: #fff;
  padding: 10rpx;
  font-size: 26rpx;
}
.detail__date {
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  margin-bottom: 10px;
}
.detail__translation {
  margin-bottom: 15px;
}
.detail__author {
  display: flex;
  justify-content: space-between;
}
</style>
