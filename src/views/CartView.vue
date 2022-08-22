<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store/store";
import axios from "axios";
import CartItemVue from "../components/CartItem.vue";
import OrderSummary from "../components/OrderSummary.vue";

const router = useRouter();

const state = reactive({
  cartItems: [],
  orderSummary: {}
});

onMounted(() => {
  axios
    .get("http://localhost:1024/cart", { withCredentials: true })
    .then((res) => {
      state.cartItems = res.data.payload.lineItems;
      state.orderSummary = res.data.payload.orderSummary;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.setUserState({
          isLoggedIn: 0,
          username: ""
        });
        store.setError("You need to sign in first");
        router.push("/");
      }
    });
});

const addToCart = () => {
  axios
    .get("http://localhost:1024/addLineItem", { withCredentials: true })
    .then((res) => {
      state.cartItems = res.data.payload.lineItems;
      state.orderSummary = res.data.payload.orderSummary;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.setUserState({
          isLoggedIn: 0,
          username: ""
        });
        store.setError("You need to sign in first");
        router.push("/");
      }
    });
};

const deleteCartItem = (itemNumber) => {
  axios
    .post(
      "http://localhost:1024/deleteLineItem",
      { itemNumber },
      { withCredentials: true }
    )
    .then((res) => {
      state.cartItems = res.data.payload.lineItems;
      state.orderSummary = res.data.payload.orderSummary;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.setUserState({
          isLoggedIn: 0,
          username: ""
        });
        store.setError("You need to sign in first");
        router.push("/");
      }
    });
};

const updateQuantity = (itemNumber, quantity) => {
  axios
    .post(
      "http://localhost:1024/updateLineItem",
      { itemNumber, quantity },
      { withCredentials: true }
    )
    .then((res) => {
      state.cartItems = res.data.payload.lineItems;
      state.orderSummary = res.data.payload.orderSummary;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.setUserState({
          isLoggedIn: 0,
          username: ""
        });
        store.setError("You need to sign in first");
        router.push("/");
      }
    });
};
</script>

<template>
  <div class="cart">
    <div class="left-col">
      <h1 class="cart-header">Shopping Cart</h1>
      <CartItemVue
        v-for="(item, index) in state.cartItems"
        :item="item"
        :index="index"
        :key="item.id"
        :onRemove="deleteCartItem"
        :onUpdate="updateQuantity"
      />
      <button class="random" @click="addToCart">
        Add random item into cart
      </button>
    </div>
    <div class="right-col">
      <h1 class="cart-header">Summary</h1>
      <OrderSummary :orderSummary="state.orderSummary" />
    </div>
  </div>
</template>

<style scoped>
.cart {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
}
.left-col {
  width: 70%;
}
.right-col {
  width: 26%;
}
.cart-header {
  border-bottom: 2px solid rgba(66, 66, 66, 0.8);
}
.random {
  width: 30%;
  padding: 0.5rem 1.25rem;
  background-color: rgb(0, 103, 160);
  border: none;
  color: white;
  border-radius: 32px;
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  font-weight: 700;
  margin-top: 2rem;
}
.random:hover {
  background-color: rgb(0, 124, 176);
}
</style>
