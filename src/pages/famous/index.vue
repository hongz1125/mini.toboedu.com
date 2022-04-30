<template>
  <view class="famous" v-if="detail" @touchstart="start" @touchend="end">
    <image class="img" mode="aspectFill" :src="`${detail.img}!jpg`"></image>
    <view class="detail">
      <view class="detail__content">{{ detail.content }}</view>
      <view class="detail__translation">{{ detail.translation }}</view>
      <view class="detail__author"
        ><text>{{ showDate }}</text> <text>—— {{ detail.author }}</text></view
      >
    </view>
  </view>
</template>

<script>
import { ajax } from "@/utils";

export default {
  data() {
    return {
      time: null,
      detail: null,
      showDate: null,
      startData: {
        clientX: 0,
        clientY: 0,
      },
    };
  },

  components: {},
  computed: {},
  onLoad() {
    this.time = this.$utils.moment().format("YYYY-MM-DD");
    this.get_detail();
  },
  methods: {
    start(e) {
      this.startData.clientX = e.changedTouches[0].clientX;
      this.startData.clientY = e.changedTouches[0].clientY;
    },

    end(e) {
      const subX = e.changedTouches[0].clientX - this.startData.clientX;
      const subY = e.changedTouches[0].clientY - this.startData.clientY;
      if (subY > 50 || subY < -50) {
      } else {
        if (subX > 50) {
          this.on_change(1);
        } else if (subX < -50) {
          this.on_change(-1);
        } else {
        }
      }
    },
    // 获取每日一句
    get_detail() {
      let date = this.$utils
        .moment(this.time)
        .subtract(1, "year")
        .format("YYYY-MM-DD");
      ajax({
        url: "/famous",
        data: {
          date,
        },
      }).then((res) => {
        this.showDate = this.$utils.moment(this.time).format("YYYY / MM / DD");
        this.detail = res;
      });
    },
    on_change(val) {
      let date = this.$utils
        .moment(this.time)
        .add(val, "days")
        .format("YYYY-MM-DD");
      if (!this.$utils.moment().isAfter(date)) return;
      this.time = date;
      this.get_detail();
    },
  },
  mounted() {},
  created() {},
};
</script>

<style lang="scss" scoped>
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
  bottom: 10px;
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
