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

const get_main_list = () => {
  return new Promise((resolve, reject) => {
    let main_list = wx.getStorageSync('main_list');
    if (main_list) {
      resolve(main_list);
    } else {
      //获取数据
      let url = `https://www.toboedu.com/other/mini_program/wx_001/data/index.json`;
      console.log(`请求数据：`, url);
      wx.request({
        url: url,
        success: res => {
          wx.setStorageSync('main_list', res.data.data);
          resolve(res.data.data);
        },
        fail: res => {
          console.log(res);
          reject();
        }
      })
    }
  })
}


module.exports = {
  formatTime: formatTime,
  get_data: get_data,
  get_main_list: get_main_list,
}
