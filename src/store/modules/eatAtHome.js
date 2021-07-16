import * as fb from "@/firebase";

export default {
  state: {
    eatAtHome: [],
  },
  getters: {
    getEatAtHome(state) {
      return state.eatAtHome;
    },
  },
  mutations: {
    setEatAtHome(state, value) {
      state.eatAtHome = value;
    },
  },
  actions: {
    async getEatAtHome({ commit }) {
      await fb.eatAtHomeCollection.onSnapshot(
        (eatAtHome) => {
          let eatAtHome_array = [];
          eatAtHome.forEach((doc) => {
            let object = {
              id: doc.id,
              eatIn: doc.data().eatIn,
              edit_date: doc.data().edit_date,
            };
            eatAtHome_array.push(object);
          });
          commit("setEatAtHome", eatAtHome_array);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    },
  },
};
