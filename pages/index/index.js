import { get_data, to_link, show_modal } from '../../utils/util';


const app = getApp()

Page({
  data: {
    list: null,
    userInfo: null,
    is_ready:false,
  },
  onLoad: function () {
    app.on_ready().then(res => {
      this.setData({
        userInfo: app.globalData.userInfo,
        list: app.globalData.main_list,
        is_ready:true
      });
      
    }).catch(err => {
      console.log(err);
    });
  },
  go_list: function (dom) {
    if(!this.data.userInfo){
      wx.showToast({
        title: '请先登陆 (右上角)',
        icon:"none"
      });
      return;
    }
    let is_lock = get_data(dom).item.is_vip && !this.data.userInfo.is_vip;
    if (is_lock) {
      this.do_lock();
      return;
    }
    to_link(null, `/pages/list/index?id=${get_data(dom).item.id}`)
  },
  do_lock() {  
    let param = {
      title:'提示',
      content:'成为会员可以解锁全部单词卡',
      cancelText:'取消',
      confirmText:'解锁',
    }; 
    show_modal(param).then(() => {
      app.on_pay();
    }).catch(() => { })
  }

})
