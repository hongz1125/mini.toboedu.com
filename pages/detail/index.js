//logs.js
import Util from "../../utils/util";
import WxTouchEvent from "../../utils/wx-touch-event";

let infoListTouchEvent = new WxTouchEvent();
const app = getApp();

Page({
  data: {
    userInfo: null,

    hide_en: true,
    status: {
      no_music: false,
      hide_text: false,
      auto_play: false
    },
    id: null,
    list: null,
    list_index: null,
    child_index: null,
    child: null,
    time: null,
    music: null
  },
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
    app.get_main_list().then(res => {
      let list = app.globalData.main_list;
      let list_index = list.findIndex(item => item.id == options.id);
      let child_index = list[list_index].children.findIndex(
        item => item.id == options.cid
      );
      this.setData(
        {
          id: options.id,
          cid: options.cid,
          list: list,
          list_index: list_index,
          child_index: child_index,
          list_child: list[list_index].children,
          child: list[list_index].children[child_index]
        },
        res => {
          this.do_play(this.data.child_index);
        }
      );

      //左右滑动插件
      this.infoListTouchEvent = infoListTouchEvent;
      this.infoListTouchEvent.bind({
        swipe: e => {
          this.do_swipe(e);
        }
      });
    });
  },

  onUnload() {
    clearTimeout(this.data.time);
  },

  on_play(dom) {
    //判断静音 和 手动播放
    if (this.data.status.no_music && !dom) return;

    this.get_detail_music().then(res => {
      let item = res;
      let backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.title = item.en;
      backgroundAudioManager.epname = item.en;
      backgroundAudioManager.singer = "wechat";
      backgroundAudioManager.coverImgUrl = `${Util.base_url}/images/${item.p_id}/${item.en}.jpg`;
      backgroundAudioManager.src = item.local_music;
      console.log(`播放本地音频:${item.local_music}`);
    });
  },
  get_detail_music() {
    return new Promise((resolve, reject) => {
      let item = this.data.list[this.data.list_index].children[
        this.data.child_index
      ];
      item.local_music = item.music;
      //播放网络音乐
      resolve(item);
    });
  },

  on_hide() {
    this.setData({
      "status.hide_text": !this.data.status.hide_text
    });
  },
  on_no_music() {
    this.setData({
      "status.no_music": !this.data.status.no_music
    });
  },
  on_auto_play() {
    clearTimeout(this.data.time);
    if (this.data.status.auto_play) {
      this.setData({
        "status.auto_play": false
      });
    } else {
      this.setData({
        "status.auto_play": true
      });
      this.auto_play();
    }
  },
  auto_play() {
    let val =
      this.data.child_index + 1 >= this.data.list_child.length
        ? 0
        : this.data.child_index + 1;
    this.do_play(val);
    this.data.time = setTimeout(() => {
      this.auto_play();
    }, 2000);
  },
  do_swipe(e) {
    if (e.direction == "Right" && this.data.child_index - 1 >= 0) {
      this.do_play(this.data.child_index - 1);
    }
    if (
      e.direction == "Left" &&
      this.data.child_index + 1 < this.data.list_child.length
    ) {
      this.do_play(this.data.child_index + 1);
    }
  },
  on_next(dom) {
    let val = Number(Util.get_data(dom).val);
    this.do_play(val);
  },

  do_play(num) {
    app.analyse("times_word");
    this.setData({
      child_index: num,
      child: this.data.list_child[num]
    });
    //写入bar中间文字
    wx.setNavigationBarTitle({
      title: this.data.list_child[num].cn
    });
    this.on_play();
  },
  touchStart: infoListTouchEvent.start.bind(infoListTouchEvent),
  touchMove: infoListTouchEvent.move.bind(infoListTouchEvent),
  touchEnd: infoListTouchEvent.end.bind(infoListTouchEvent),
  touchCancel: infoListTouchEvent.cancel.bind(infoListTouchEvent),
  onHide(){
    clearTimeout(this.data.time);
  },
  onUnload() {
    clearTimeout(this.data.time);
  }
});
