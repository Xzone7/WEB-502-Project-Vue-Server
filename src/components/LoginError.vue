<script setup>
import { store } from "../store/store";
defineProps({
  onClose: Function
});
</script>

<template>
  <div :class="store.alert.error ? 'login-err-wrap' : 'register-err-wrap'">
    <div class="login-err-container">
      {{ store.alert.error || store.alert.success }}
    </div>
    <div>
      <button class="err-button" @click="onClose">X</button>
    </div>
  </div>
</template>

<style scoped>
.login-err-wrap,
.register-err-wrap {
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  font-size: 13px;
  margin: 0 auto 10px;
  padding: 15px 20px;
  background-color: #ffdce0;
  border-color: rgba(27, 31, 35, 0.15);
  color: #86181d;
  display: flex;
  max-width: 360px;
}
.register-err-wrap {
  background-color: #4bb543 !important;
  color: white;
}
.login-err-container {
  max-width: 980px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}
.err-button {
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  opacity: 0.6;
  text-align: center;
  border-radius: 0;
  outline: none;
}
</style>
