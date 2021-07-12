<template>
  <v-container class="homeContainer">
    <v-row class="appTitle" justify="center">
      <v-img
        contain
        lazy-src="/img/logo/Logo5.png"
        src="/img/logo/Logo5.png"
        max-height="150"
        max-width="250"
        @click="clearAll()"
      ></v-img>
    </v-row>

    <v-row>
      <Item v-for="item in items" :key="item.id" :item="item"></Item>
    </v-row>

    <v-row class="addItemRow">
      <AddItem></AddItem>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AddItem from "@/components/AddItem.vue";
import Item from "@/components/Item.vue";
import { db } from "@/firebase";

export default Vue.extend({
  name: "Home",

  components: { AddItem, Item },

  data() {
    return {
      items: [],
    };
  },

  firestore: {
    items: db.collection("items"),
  },

  computed: {},

  methods: {
    clearAll() {
      this.items.forEach((doc) => {
        db.collection("items").doc(doc.id).delete();
      });
    },
  },

  mounted() {},
});
</script>

<style lang="scss" scoped>
.homeContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.appTitle {
  padding: 1rem;
  // background-color: red;
}

.itemsRow {
  // background-color: blue;
}

.addItemRow {
  justify-content: flex-end;
  align-content: flex-end;
  // background-color: green;
}
</style>
