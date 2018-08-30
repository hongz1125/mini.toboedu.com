//logs.js
import data from '../index/data.js';
import Util from '../../utils/util';
import WxTouchEvent from "../../utils/wx-touch-event";

let infoListTouchEvent = new WxTouchEvent();

Page({
  data: {
    list: data,
    item: data[0],
    hide_en: true,
    status: {
      no_music: false,
      hide_text: false,
      auto_play: false,
    },
    children: null,
    child_index: null,
    child: null,
    time: null,
    music:null,
  },
  onLoad(options) {
    let children = this.data.list.find(item => item.id == options.id).children;
    let child_index = children.findIndex(item => item.id == options.cid);
    
    this.setData({
      id: options.id,
      cid: options.cid,
      children: children,
      child_index: child_index,
      child: children[child_index],
      // music:music,
    });
    wx.setNavigationBarTitle({
      title: children[child_index].en
    });

    this.on_play();
    this.infoListTouchEvent = infoListTouchEvent;
    this.infoListTouchEvent.bind({
      swipe: (e) => {
        this.do_swipe(e)
      }
    });

  },
  onUnload() {
    clearTimeout(this.data.time);
  },
  
  on_play(dom) {
    if (this.data.status.no_music && !dom) return;
    let item = this.data.child;
    // 第一种播放方式
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = `http://media.shanbay.com/audio/us/${word}.mp3`;
    // innerAudioContext.onPlay(() => {
    //   console.log(`播放美式英语：${word}`)
    // })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })

    wx.downloadFile({
      url: `https://www.toboedu.com/other/mini_program/wx_001/images/media/banana.mp3`,
      success: function (res) {
        var filePath = res.tempFilePath
        
        let backgroundAudioManager = wx.getBackgroundAudioManager();
        backgroundAudioManager.title = item.en;
        backgroundAudioManager.epname = item.en;
        backgroundAudioManager.singer = 'wechat';
        backgroundAudioManager.coverImgUrl = item.src;
        backgroundAudioManager.src = filePath;

        console.log(filePath);

      }
    })


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
    console.log(this.data.status.auto_play);
    if (this.data.status.auto_play) {
      this.setData({
        "status.auto_play": false,
      })
    } else {
      this.setData({
        "status.auto_play": true,
      });
      this.auto_play();
    }
  },
  auto_play() {
    let val = this.data.child_index + 1 >= this.data.children.length ? 0 : this.data.child_index + 1;
    this.do_play(val)
    this.data.time = setTimeout(() => {
      this.auto_play();
    }, 2000);
  },
  do_swipe(e){
    if(e.direction == "Right" && (this.data.child_index - 1) >= 0){
      this.do_play(this.data.child_index - 1);
    }
    if(e.direction == "Left" && (this.data.child_index + 1) < this.data.children.length){
      this.do_play(this.data.child_index + 1);
    }
  },
  on_next(dom) {
    let val = Number(Util.get_data(dom).val);
    this.do_play(val)
  },
  do_play(num){
    this.setData({
      child: this.data.children[num],
      child_index: num
    });
    this.on_play();
  },
  touchStart: infoListTouchEvent.start.bind(infoListTouchEvent),
  touchMove: infoListTouchEvent.move.bind(infoListTouchEvent),
  touchEnd: infoListTouchEvent.end.bind(infoListTouchEvent),
  touchCancel: infoListTouchEvent.cancel.bind(infoListTouchEvent),
})
