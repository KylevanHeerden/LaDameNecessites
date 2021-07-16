import Vue from "vue";
import Vuex from "vuex";

import items from "@/store/modules/items";
import eatAtHome from "@/store/modules/eatAtHome";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { items, eatAtHome },
});
