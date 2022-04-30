<template>
  <view class="main_box">
    <scroll-view scroll-y class="main_box__scroll">
      <view class="tapBox">
        <view :class="selected == 7 ? 'selected' : ''" @click="get_rank_list(7)"
          >周排行</view
        >
        <view
          :class="selected == 30 ? 'selected' : ''"
          @click="get_rank_list(30)"
          >月度排行</view
        >
        <view
          :class="selected == 365 ? 'selected' : ''"
          @click="get_rank_list(365)"
          >年度排行</view
        >
      </view>
      <view class="list">
        <view
          v-for="(item, index) in list"
          :key="index"
          class="list__li"
          :class="userInfo.id == item.id ? 'selected' : ''"
        >
          <text class="list__li__no">{{ index + 1 }}、</text>
          <image class="list__li__img" :src="item.avatar"></image>
          <text class="list__li__name">{{ item.nickname || "没有昵称" }}</text
          ><text class="list__li__word">{{ item.times_word }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { ajax } from "@/utils";
export default {
  data() {
    return {
      selected: 7,
      list: null,
    };
  },
  onLoad() {
    this.get_rank_list(7);
  },
  components: {},
  computed: {},
  methods: {
    // 获取排行版
    get_rank_list(day) {
      ajax({
        url: "/rank",
        data: {
          day: day,
        },
      }).then((res) => {
        this.selected = day;
        this.list = res;
      });
    },
  },
  mounted() {},
  created() {},
};
</script>

<style lang="scss" scoped>
.tapBox {
  display: flex;
  color: #fff;
  font-size: 4vw;
  justify-content: space-between;
}
.tapBox > view {
  text-align: center;
  width: 33%;
  padding: 10px;
}
.tapBox > view.selected {
  color: #f60;
}

.list {
  margin: 10px;
}
.list__li {
  font-size: 4vw;
  line-height: 30px;
  margin-bottom: 10px;
  color: #fff;
  display: flex;
  align-items: center;
}
.list__li.selected .list__li__name {
  color: #f60;
}
.list__li__name {
  opacity: 0.7;
}
.list__li__no {
  width: 5vw;
  display: inline-block;
  vertical-align: top;
  opacity: 0.5;
  margin-right: 10px;
}
.list__li__img {
  width: 10vw;
  height: 10vw;
  margin-right: 5px;
  border-radius: 100%;
  vertical-align: top;
}
.list__li__word {
  margin-left: auto;
  opacity: 0.3;
  font-size: 4vw;
  font-style: italic;
}
</style>
