<script setup>
defineProps({
  orderSummary: Object,
});
</script>

<template>
  <div class="order-summary">
    <h2 class="header">Total</h2>
    <div class="subtotal">
      <div>Subtotal (2 items)</div>
      <div>$50.13</div>
    </div>
    <div class="shipping">
      <div>Est. shipping costs</div>
      <div>$4.66</div>
    </div>
    <div class="tax">
      <div>Sales tax</div>
      <div>$13</div>
    </div>
    <div class="total">
      <div>Est. total</div>
      <div>$57.9</div>
    </div>
    <div class="checkout-button">
      <button>Begin checkout</button>
    </div>
  </div>
</template>

<style scoped>
.order-summary {
  background-color: #fff;
  color: #424242;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  padding: 0 1rem 1rem;
  box-shadow: 0 0.0625rem 0.25rem 0 rgb(66 66 66 / 20%);
}

.header {
  padding: 1rem 0 1rem;
  letter-spacing: normal;
  border-bottom: 0.0625rem solid rgba(66, 66, 66, 0.2);
  font-weight: 500;
}
.subtotal,
.shipping,
.tax {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.total {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 0.0625rem solid rgba(66, 66, 66, 0.2);
}
.total div {
  font-weight: 700;
}

.checkout-button {
  margin-top: 1rem;
}
.checkout-button button {
  width: 100%;
  padding: 0.5rem 1.25rem;
  background-color: rgb(0, 103, 160);
  border: none;
  color: white;
  border-radius: 32px;
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  font-weight: 700;
}
.checkout-button button:hover {
  background-color: rgb(0, 124, 176);
}
</style>
