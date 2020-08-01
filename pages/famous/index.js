//logs.js
import { to_link, get_data, ajax, moment, hammer } from '../../utils/util';
const app = getApp()
Page({
  data: {
    time: '',
    showDate: '',
    touchS: [0, 0],
    touchE: [0, 0],
    detail: {
    },
    is_auto: true,
  },
  onLoad(options) {
    this.data.time = moment().format("YYYY-MM-DD");
    this.get_detail();
  },
  // 获取排行版
  get_detail() {
    wx.showLoading();
    ajax({
      method: "post",
      url: '/famous',
      data: {
        date: moment(this.data.time).subtract(1, 'year').format("YYYY-MM-DD")
      }
    }).then(res => {
      wx.hideLoading();
      this.setData({
        showDate: moment(this.data.time).format("YYYY MMMM DD dddd"),
        detail: res,
      })
      this.data.is_auto && this.on_play();
    })
  },
  touchStart(e) {
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
  },
  touchMove(e) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },
  touchEnd(e) {
    let start = this.data.touchS
    let end = this.data.touchE
    if(!end[0]) return;
    if (start[0] < end[0] - 50) {
      this.on_change(-1);
    } else if (start[0] > end[0] + 50) {
      this.on_change(1);
    } else {
    }
    this.data.touchE = [0, 0]
  },
  on_change(val) {
    let date = moment(this.data.time).add(val, "days").format("YYYY-MM-DD")
    if (!moment().isAfter(date)) return;
    this.data.time = date;
    this.get_detail();
  },
  on_play() {
    let detail = this.data.detail;
    let backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title = detail.content;
    backgroundAudioManager.epname = detail.content;
    backgroundAudioManager.singer = "wechat";
    backgroundAudioManager.coverImgUrl = detail.img;
    backgroundAudioManager.src = detail.audio;
    console.log(`播放本地音频:${detail.audio}`);
    return false;
  },
  cancel() { return false; },
})
