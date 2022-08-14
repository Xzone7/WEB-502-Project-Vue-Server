<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter();

// onBeforeMount(() => {
//   axios.get("http://localhost:1024/cart")
//     .then(() => console.log("111111111"))
//     .catch(err => {
//       if (err.response.status === 401) {
//         router.push('/');
//       }
//     });
// });
</script>


<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
