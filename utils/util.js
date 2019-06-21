

let api_base = 'https://www.toboedu.com/api/english_mini';



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
  wx.showLoading({
    title: '加载中...',
  })
}

const loading_hide = (i) => {
  if(i) return;
  wx.hideLoading();
}

/**
  * @desc 封装微信request 为promise使用
**/
const ajax = (param) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${api_base}${param.url}`,
      data:param.data,
      method:param.method || 'post',
      success (res) {
        resolve(res.data && res.data.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}


module.exports = {
  formatTime: formatTime,
  get_data: get_data,
  loading_show,
  loading_hide,
  ajax
}
