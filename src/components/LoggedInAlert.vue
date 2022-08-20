<script setup>
import { store } from "../store/store";
</script>

<template>
  <div className="login-alert-wrap">
    <div className="login-alert-container">
      {{ `${store.user.username}, you have signed in` }}
    </div>
  </div>
</template>

<style scoped>
.login-alert-wrap {
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  font-size: 20px;
  margin: 0 auto 10px;
  padding: 15px 20px;
  background-color: #315399;
  border-color: rgba(27, 31, 35, 0.15);
  color: white;
  display: flex;
  max-width: 360px;
}
.login-alert-container {
  max-width: 980px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}
</style>
