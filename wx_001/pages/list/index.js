//logs.js
import data from '../index/data';
import Util from '../../utils/util';

Page({
  data: {
    id:null,
    list:data,
    children:null,
  },
  onLoad(options){
    let item = this.data.list.find(item => item.id == options.id);
    this.setData(
      {
        id:options.id,
        children:item.children
      }
    )
  },
  go_detail(dom){
    let id = this.data.id;
    let cid = Util.get_data(dom).id;
    wx.navigateTo({
      url:`/pages/detail/index?id=${id}&cid=${cid}`
    })
  }
})
