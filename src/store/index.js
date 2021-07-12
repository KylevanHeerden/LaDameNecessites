import Vue from "vue";
import Vuex from "vuex";

import items from "@/store/items";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { items },
});
