<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-img
        contain
        lazy-src="/img/logo/Logo5.png"
        src="/img/logo/Logo5.png"
        max-height="150"
        max-width="250"
        v-bind="attrs"
        v-on="on"
        @click="dialog = true"
      ></v-img>
    </template>

    <v-card class="cardDialog">
      <v-card-title class="text-h5 cardTitle"> à la maison </v-card-title>

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
            color="secondary"
            class="personSwitch"
            @click="fbUpdate('kyle_answer', kyle_answer)"
          >
          </v-switch>
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
            color="secondary"
            class="personSwitch"
            @click="fbUpdate('ayden_answer', ayden_answer)"
          ></v-switch>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-row class="actionsRow">
          <v-btn color="black" text @click="dialog = false"> Cool </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "@/firebase";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      eatAtHome: [],
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

    kyle_answer() {
      if (this.eatAtHome.length == 0) {
        return true;
      } else {
        return this.eatAtHome[1].eatIn;
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
    },
  },

  created() {
    this.getEatAtHome();
  },

  beforeMount() {},

  mounted() {},
};
</script>

<style scoped>
.cardDialog {
  background-color: #e0b5a4 !important;
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
</style>
