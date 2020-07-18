

let api_base = 'https://www.toboedu.com/api/english_mini';

let loading = 0;

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const get_data = item => {
  return item.currentTarget.dataset;
}

const loading_show = () => {
  loading++;
  wx.showLoading({
    title: '加载中...',
  })
}

const loading_hide = () => {
  if (--loading) return;
  wx.hideLoading();
}

/**
  * @desc 封装微信request 为promise使用
  * no_loading 是否需要加载中
**/
const ajax = (param) => {
  return new Promise((resolve, reject) => {
    if(!param.no_loading) loading_show();
    wx.request({
      url: `${api_base}${param.url}`,
      data: param.data,
      method: param.method || 'post',
      success(res) {
        if(!param.no_loading) loading_hide();
        resolve(res.data && res.data.data)
      },
      fail(err) {
        if(!param.no_loading) loading_hide();
        reject(err)
      }
    })
  })
}

/**
 * @desc 链接方法  
 * @param url 为真的时候 跳转 url 否则从dom 获取data-url 值
 **/
const to_link = (e, url) => {
  let curl = url || get_data(e).url;
  wx.navigateTo({ url: curl });
};

/**
 * @desc 微信原生弹框 改成promise
 **/
const show_modal = (data) => {
  return new Promise((resolve, reject) => {
    console.log(wx);
    wx.showModal({
      title: data.title,
      content: data.content,//'弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内'
      confirmText: data.confirmText,//主操作
      cancelText: data.cancelText,//副操作
      success: function (res) {

        console.log(1);
        if (res.confirm) {
          resolve();//'用户点击主操作'
        } else {
          reject();//'用户点击辅助操作'
        }
      }
    });
  })
};



module.exports = {
  formatTime: formatTime,
  get_data: get_data,
  loading_show,
  loading_hide,
  ajax,
  loading,
  to_link,
  show_modal
}
