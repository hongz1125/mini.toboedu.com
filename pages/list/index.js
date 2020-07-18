//logs.js
import { to_link, get_data } from '../../utils/util';
const app = getApp()
Page({
  data: {
    userInfo: null,
    id: null,
    list: null,
    list_child: null,
  },
  onLoad(options) {
    
    this.setData({
      userInfo: app.globalData.userInfo
    });

    app.get_main_list().then(res => {
      let list = app.globalData.main_list;
      let list_child = list.find(item => item.id == options.id).children;
      this.setData({
        list: list,
        id: options.id,
        list_child: list_child
      })
    })
  },
  go_detail(dom) {
    let id = this.data.id;
    let cid = get_data(dom).id;
    to_link(null, `/pages/detail/index?id=${id}&cid=${cid}`)
  }
})
