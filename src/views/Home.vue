<template>
  <v-container class="homeContainer">
    <v-row class="appTitle" justify="center">
      <EatAtHome></EatAtHome>
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
import { db } from "@/firebase";
import Vue from "vue";
import AddItem from "@/components/AddItem.vue";
import EatAtHome from "@/components/EatAtHome.vue";
import Item from "@/components/Item.vue";

export default Vue.extend({
  name: "Home",

  components: { AddItem, EatAtHome, Item },

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
    // clearAll() {
    //   this.items.forEach((doc) => {
    //     db.collection("items").doc(doc.id).delete();
    //   });
    // },
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
