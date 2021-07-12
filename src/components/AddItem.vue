<template>
  <v-container>
    <v-row>
      <v-text-field
        v-model="newItem.name"
        color="black"
        placeholder="Ons benodig..."
        class="newItem"
      >
      </v-text-field>

      <v-btn
        @click="addItem()"
        elevation="0"
        fab
        small
        color="rgba(0,0,0,0)"
        class="addBtn"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { db } from "@/firebase";
export default Vue.extend({
  data() {
    return {
      newItem: {
        name: "",
        checked: false,
      },
    };
  },

  methods: {
    addItem() {
      db.collection("items").add(this.newItem);
      this.newItem.name = "";
    },
  },
});
</script>

<style scoped>
.newItem {
  margin: 1rem !important;
  margin-right: 0rem !important;
  margin-left: 2rem !important;
}

.addBtn {
  margin-top: 1.5rem;
  margin-right: 1rem;
  border: rgba(0, 0, 0, 0.2) 1px solid !important;
}
</style>
