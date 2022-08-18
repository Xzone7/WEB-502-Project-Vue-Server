<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>Sign in</li>
        <li>Cart</li>
        <li>Checkout</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header{
  height: 64px;
}

nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 200;
  background-color: #81d8d0;
}

ul {
  display: flex;
  justify-content: space-around;
  min-height: 4rem;
  list-style-type: none;
  align-items: center;
  padding-left: 0;
}

li {
  width: 100px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 20px;
}

li:hover {
  background-color: rgba(151, 255, 245, 0.507);
}
</style>
