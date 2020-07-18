//logs.js
import { to_link, get_data, ajax } from '../../utils/util';
const app = getApp()
Page({
  data: {
    list: null,
    selected: 7,
    userInfo:null,
  },
  onLoad(options) {
    app.on_ready().then(res => {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
      this.get_rank_list()

    }).catch(err => {
      console.log(err);
    });

  },
  // 获取排行版
  get_rank_list(dom) {
    let val = dom ? +get_data(dom).day : 7;
    ajax({
      method: "post",
      url: '/rank',
      data: {
        day: val
      }
    }).then(res => {
      this.setData({
        selected: val,
        list: res
      })
    })
  },
})
