const getters = {
  user_id: (state) => state.app.userInfo.id,
  isVip: (state) => state,
  is_ad: (state) => state.app.setting.is_ad,
  is_recharge: (state) => state.app.setting.is_recharge,
  vip_price: (state) => state.app.setting.vip_price,
};
export default getters;
