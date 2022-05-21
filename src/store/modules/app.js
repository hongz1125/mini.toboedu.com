import { ajax } from "@/utils";

const state = {
  code: null,
  userInfo: null,
  main_list: null,
  is_ios: false,
  setting: null,
};

const mutations = {
  SET_CODE(state, param) {
    state.code = param;
  },
  SET_MAIN_LIST(state, param) {
    state.main_list = param;
  },
  SET_USERINFO(state, param) {
    state.userInfo = param;
  },
  SET_ISIOS(state, param) {
    state.is_ios = param;
  },
  SET_SETTING(state, param) {
    state.setting = param;
  },
};
const actions = {
  GET_CODE({ commit }, data) {
    return new Promise((resolve, reject) => {
      uni.login({
        provider: "weixin",
        success: (res) => {
          commit(`SET_CODE`, res.code);
          resolve();
        },
      });
    });
  },
  GET_USERINFO({ commit }, data) {
    return ajax({ url: `/userinfo`, data }).then((res) => {
      commit("SET_USERINFO", res);
    });
  },
  GET_MAIN_LIST({ commit }, data) {
    return ajax({ url: `/all`, data }).then((res) => {
      commit("SET_MAIN_LIST", res);
    });
  },
  GET_SETTING({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      if (state.setting) {
        resolve();
        return;
      }
      ajax({ url: `/setting`, data }).then((res) => {
        commit("SET_SETTING", res);
        resolve();
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
