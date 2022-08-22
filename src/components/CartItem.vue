<script setup>
import { reactive, watch } from "vue";
import { currency } from "../store/utils";

const props = defineProps({
  item: Object,
  index: Number,
  onRemove: Function,
  onUpdate: Function
});

const state = reactive({
  qty: props.item.quantity
});

watch(props, (currentValue) => {
  state.qty = currentValue.item.quantity;
});
</script>

<template>
  <div :class="index === 0 ? 'cart-item-container-tt' : 'cart-item-container'">
    <div class="product-wrapper">
      <div class="product-image">
        <img :src="item.imageUrl" alt="product" />
      </div>
      <div class="product-info">
        <div class="product-name">
          {{ item.productName }}
        </div>
        <div class="item-number">{{ `Item ${item.itemNumber}` }}</div>
        <div class="shipping-label">Free shipping for <span>Plus</span></div>
      </div>
      <div class="product-quantity">
        <select
          name="quantity"
          class="quantity"
          v-model="state.qty"
          @change="() => onUpdate(item.itemNumber, state.qty)"
        >
          <option
            v-for="quantity in item.quantity"
            :value="quantity"
            :selected="quantity === item.quantity"
          >
            {{ quantity }}
          </option>
          <option :value="item.quantity + 1">{{ item.quantity + 1 }}</option>
          <option :value="item.quantity + 2">{{ item.quantity + 2 }}</option>
        </select>
      </div>
      <div class="product-price">
        {{ currency(item.price * item.quantity) }}
      </div>
    </div>
    <div class="action">
      <button @click="() => onRemove(item.itemNumber)">Remove</button>
    </div>
  </div>
</template>

<style scoped>
.cart-item-container {
  border-top: 0.0625rem solid rgba(66, 66, 66, 0.2);
  padding: 10px 0;
}

.cart-item-container-tt {
  padding: 10px 0;
}

.product-wrapper {
  display: flex;
  font-size: 14px;
  padding: 10px 0;
}

.product-image {
  flex-basis: 5rem;
}
.product-image img {
  width: 80px;
}
.product-info {
  flex-basis: calc(100% - 5rem);
  padding: 0 0 0 1rem;
}

.product-name,
.shipping-label {
  font-weight: 600;
}

.shipping-label {
  font-size: 12px;
}
.shipping-label span {
  color: rgb(0, 103, 160);
  font-size: 12px;
  font-style: italic;
  font-weight: 600;
}

.item-number {
  font-size: 12px;
  color: rgba(66, 66, 66, 0.8);
  font-weight: 400;
}

.product-quantity {
  width: 24%;
}

.quantity {
  width: 40%;
  height: 30%;
}

.product-price {
  width: 17.5%;
  text-align: right;
  font-weight: 700;
  font-size: 16px;
}

.action {
  display: flex;
  justify-content: flex-end;
}

.action button {
  padding: 2px 0;
  font-weight: 700;
  background: transparent;
  border: 0;
  color: #0067a0;
  cursor: pointer;
}
</style>
