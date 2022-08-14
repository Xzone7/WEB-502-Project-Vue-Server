<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter();

const redirect = () => {
  router.push('/cart');
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

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
