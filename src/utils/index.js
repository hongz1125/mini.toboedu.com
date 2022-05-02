let loading = 0;

// 不支持本地调试
let api_base = "https://www.toboedu.com/api/english_mini";

const loading_show = () => {
  loading++;
  wx.showLoading({
    title: "加载中...",
  });
};

const loading_hide = () => {
  if (--loading) return;
  wx.hideLoading();
};

/**
 * @desc 封装微信request 为promise使用
 * no_loading 是否需要加载中
 **/
export const ajax = (param) => {
  return new Promise((resolve, reject) => {
    if (!param.no_loading) loading_show();
    wx.request({
      url: `${api_base}${param.url}`,
      data: param.data,
      method: param.method || "post",
      success(res) {
        if (!param.no_loading) loading_hide();
        resolve(res.data && res.data.data);
      },
      fail(err) {
        if (!param.no_loading) loading_hide();
        reject(err);
      },
    });
  });
};

export const goLink = (url) => {
  uni.navigateTo({
    url,
  });
};

export const moment = require("moment");
