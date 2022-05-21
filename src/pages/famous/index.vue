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
      <view class="detail">
        <view class="detail__content">{{ item.content }}</view>
        <view class="detail__translation">{{ item.translation }}</view>
        <view class="detail__author"
          ><text>{{ item.showDate }}</text>
          <text>—— {{ item.author }}</text></view
        >
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
          console.log(this.part, 2222);
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
.detail {
  position: fixed;
  bottom: 30px;
  left: 10px;
  right: 10px;
  font-size: 4vw;
  color: #fff;
  line-height: 6vw;
  background: rgba(0, 0, 0, 0.4);
  padding: 10px;
  text-align: justify;
}
.detail__date {
  font-size: 7vw;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  margin-bottom: 10px;
  opacity: 0.8;
  line-height: 1em;
}
.detail__content {
  margin-bottom: 15px;
  font-size: 5vw;
}
.detail__translation {
  margin-bottom: 15px;
  font-size: 4vw;
}
.detail__author {
  display: flex;
  justify-content: space-between;
}
</style>
