<template>
  <v-card elevation="1" class="itemCard">
    <v-card-text class="cardText">
      <v-icon @click="checkItem()" color="itemIcons" class="checkIcon">{{
        checkItemStatus
      }}</v-icon>
      <div class="text">{{ item.name }}</div>
      <v-icon @click="deleteItem(item.id)" color="itemIcons" class="deleteIcon"
        >delete</v-icon
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { db } from "@/firebase";
export default Vue.extend({
  props: {
    item: {
      type: Object,
      require: true,
    },
  },

  computed: {
    checkItemStatus() {
      return this.item.checked
        ? "check_circle_outline"
        : "radio_button_unchecked";
    },
  },

  methods: {
    checkItem() {
      let check = this.item.checked;
      db.collection("items").doc(this.item.id).update({ checked: !check });
    },

    deleteItem(itemId) {
      db.collection("items").doc(itemId).delete();
    },
  },

  mounted() {},
});
</script>

<style scoped>
.itemCard {
  max-height: 3rem;
  width: 100%;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 10px;
  background-color: var(--v-itemBar-base) !important;
  border-radius: 25px !important;
}

.cardText {
  display: flex;
  flex-direction: row;
}

.checkIcon {
  flex: 0;
  margin-right: 1rem;
}

.text {
  flex: 2;
  color: var(--v-itemText-base);
}

.deleteIcon {
  flex: 0;
}
</style>
