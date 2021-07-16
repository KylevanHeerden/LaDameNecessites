import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#e0b5a4",
        text2: "#000000",
        switch: "#424242",
        itemBar: "#f5e4e0",
        itemIcons: "#212121",
        itemText: "#000000",
      },
      dark: {
        primary: "#263238",
        text2: "#FFFFFF",
        switch: "#E0E0E0",
        itemBar: "#BDBDBD",
        itemIcons: "#212121",
        itemText: "#3c484f",
      },
    },
  },
});
