<script setup>
import { useRouter } from "vue-router";
import { store } from "../store/store";
import axios from "axios";

const router = useRouter();

const onClickSignInorOut = () => {
  if (store.user.isLoggedIn) {
    axios
      .get("http://localhost:1024/logout", { withCredentials: true })
      .finally(() => {
        store.setUserState({
          isLoggedIn: 0,
          username: ""
        });
        router.push("/");
      });
  } else {
    router.push("/");
  }
};

const goToCart = () => {
  router.push("/cart");
};

const goToCheckout = () => {
  router.push("/checkout");
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li @click="onClickSignInorOut">
          {{ store.user.isLoggedIn ? "Sign out" : "Sign in" }}
        </li>
        <li @click="goToCart">Cart</li>
        <li @click="goToCheckout">Checkout</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
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
  width: 150px;
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
