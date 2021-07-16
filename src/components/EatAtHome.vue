<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-img
        contain
        :lazy-src="image"
        :src="image"
        max-height="150"
        max-width="250"
        v-bind="attrs"
        v-on="on"
        @click="dialog = true"
      ></v-img>
    </template>

    <v-card class="cardDialog">
      <v-row class="titleRow">
        <v-card-title class="text-h5 cardTitle"> à la maison </v-card-title>
        <v-switch
          v-model="$vuetify.theme.dark"
          inset
          color="switch"
          class="colorSwitch"
          @click="saveThemeChoice()"
        ></v-switch>
      </v-row>

      <v-card-text class="cardText">
        <v-row class="personRow">
          <v-avatar size="36" :color="answerColor(kyle_answer)">
            <v-icon small color="grey lighten-1"
              >{{ answerIcon(kyle_answer) }}
            </v-icon>
          </v-avatar>
          <span class="personName Kyle">Kyle</span>

          <v-switch
            v-model="kyle_answer"
            color="switch"
            class="personSwitch"
            @click="fbUpdate('kyle_answer', kyle_answer)"
          >
          </v-switch>
          <div class="editDate">{{ kyle_date }}</div>
        </v-row>

        <v-row class="personRow">
          <v-avatar size="36" :color="answerColor(ayden_answer)">
            <v-icon small color="grey lighten-1">
              {{ answerIcon(ayden_answer) }}
            </v-icon>
          </v-avatar>
          <span class="personName">Ayden</span>
          <v-switch
            v-model="ayden_answer"
            color="switch"
            class="personSwitch"
            @click="fbUpdate('ayden_answer', ayden_answer)"
          ></v-switch>
          <div class="editDate">{{ ayden_date }}</div>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-row class="actionsRow"> </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "@/firebase";
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      dialog: false,
      eatAtHome: [],
      theme: this.$vuetify.theme.isDark,
    };
  },

  firestore: {
    eatAtHome: db.collection("eatAtHome"),
  },

  watch: {},

  computed: {
    ...mapState({
      // eatAtHome: (state) => state.eatAtHome.eatAtHome,
    }),

    ayden_answer() {
      if (this.eatAtHome.length == 0) {
        return true;
      } else {
        return this.eatAtHome[0].eatIn;
      }
    },

    ayden_date() {
      if (this.eatAtHome.length == 0) {
        return "TBC";
      } else {
        return moment(this.eatAtHome[0].edit_date.toDate()).format(
          "Do MMM k:mm "
        );
      }
    },

    image() {
      if (this.$vuetify.theme.isDark) {
        return "/img/logo/Logo6.png";
      } else {
        return "/img/logo/Logo5.png";
      }
    },

    kyle_answer() {
      if (this.eatAtHome.length == 0) {
        return true;
      } else {
        return this.eatAtHome[1].eatIn;
      }
    },

    kyle_date() {
      if (this.eatAtHome.length == 0) {
        return "TBC";
      } else {
        return moment(this.eatAtHome[1].edit_date.toDate()).format(
          "Do MMM k:mm "
        );
      }
    },
  },

  methods: {
    ...mapActions(["getEatAtHome"]),

    answerColor(boolean) {
      if (boolean) {
        return "light-green darken-3";
      } else {
        return "deep-orange darken-3";
      }
    },

    answerIcon(boolean) {
      if (boolean) {
        return "ramen_dining";
      } else {
        return "delivery_dining";
      }
    },

    fbUpdate(doc_name, value) {
      db.collection("eatAtHome").doc(doc_name).update({ eatIn: !value });
      db.collection("eatAtHome")
        .doc(doc_name)
        .update({ edit_date: new Date() });
    },

    saveThemeChoice() {
      localStorage.themeChoice = this.$vuetify.theme.dark;
      console.log(`dark: ${this.$vuetify.theme.dark}`);
      console.log(`localStorage: ${localStorage.themeChoice}`);
    },

    setTheme() {
      let veutifyTheme = this.$vuetify.theme.dark;
      let lsTheme = localStorage.themeChoice;

      if (veutifyTheme === false && lsTheme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        return "";
      }
    },
  },

  created() {
    this.getEatAtHome();
  },

  beforeMount() {},

  mounted() {
    this.setTheme();
  },
};
</script>

<style scoped>
.cardDialog {
  background-color: var(--v-primary-base) !important;
}

.cardText {
  padding-bottom: 0rem !important;
}

.cardTitle {
  margin-bottom: 2rem;
}

.personRow {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.personName {
  margin-top: 7px;
  margin-left: 1rem;
  font-size: medium;
  color: var(--v-switch);
}

.personSwitch {
}

.v-input--selection-controls {
  margin-top: 0px;
}

.Kyle {
  padding-right: 10px;
}

.actionsRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
}

.editDate {
  margin-top: 5px;
  font-size: 13px;
}

.titleRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 10px;
}

.colorSwitch {
  margin-top: 20px;
  color: var(--v-switch-base);
}
</style>
