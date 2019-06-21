//logs.js
import Util from '../../utils/util';
const app = getApp()
Page({
  data: {
    id:null,
    list:null,
    list_child:null,
  },
  onLoad(options){
    app.get_main_list().then(res => {
      let list = app.globalData.main_list;
      let list_child = list.find(item => item.id == options.id).children;
      this.setData({
          list: list,
          id:options.id,
          list_child:list_child
      })
    })
  },
  go_detail(dom){
    let id = this.data.id;
    let cid = Util.get_data(dom).id;
    wx.navigateTo({
      url:`/pages/detail/index?id=${id}&cid=${cid}`
    })
  }
})
