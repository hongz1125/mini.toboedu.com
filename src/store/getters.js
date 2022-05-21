const getters = {
  uid: (state) => state.app.userInfo && state.app.userInfo.id,
  is_vip: (state) => state.app.userInfo && state.app.userInfo.is_vip,
  is_ios: (state) => state.app.is_ios,
  is_ad: (state) => state.app.setting && state.app.setting.is_ad,
  is_recharge: (state) => state.app.setting.is_recharge,
  vip_price: (state) => state.app.setting && state.app.setting.vip_price,
};
export default getters;
