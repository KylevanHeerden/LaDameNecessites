<template>
  <v-app>
    <v-main class="app">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>

<style>
.app {
  background-color: var(--v-primary-base);
}

.row {
  margin: 0;
}
</style>
