import * as fb from "@/firebase";

export default {
  state: {
    items: [],
  },
  getters: {
    getItems(state) {
      return state.items;
    },
  },
  mutations: {
    setItems(state, value) {
      state.items = value;
    },
  },
  actions: {
    async getItems({ commit }) {
      fb.itemsCollection.onSnapshot(
        (items) => {
          let items_array = [];
          items.forEach((doc) => {
            let object = {
              name: doc.data().name,
              checked: doc.data().checked,
            };
            items_array.push(object);
          });

          commit("setItems", items_array);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    },
  },
};
