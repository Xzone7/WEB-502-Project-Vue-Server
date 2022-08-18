<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import ChromeHeaerVue from "./components/ChromeHeaer.vue";

const router = useRouter();

const redirect = () => {
  router.push("/cart");
};
</script>

<template>
  <header>
    <ChromeHeaerVue />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <div @click="redirect">Click</div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
