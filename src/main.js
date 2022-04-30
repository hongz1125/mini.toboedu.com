import Vue from "vue";
import App from "./App";
import store from "@/store";

import Nav from "@/components/Nav";
import * as utils from "@/utils";
Vue.component("Nav", Nav);

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;

App.mpType = "app";

const app = new Vue({
  ...App,
  store,
});
app.$mount();
