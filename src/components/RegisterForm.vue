<script setup>
import { reactive, computed } from "vue";
import { store } from "../store/store";
import axios from "axios";

const props = defineProps({
  cancel: Function
});

const state = reactive({
  username: "",
  password: "",
  isHidden: true,
  showModal: false,
  showRegister: false,
  setIsHidden(hide) {
    this.isHidden = hide;
  },
  setShowModal(showModal) {
    this.showModal = showModal;
  },
  setShowRegister(show) {
    this.showRegister = show;
  }
});

const isDisabled = computed(() => !state.username || !state.password);

const handleSubmit = (event) => {
  event.preventDefault();
  axios
    .post(
      "http://localhost:1024/register",
      {
        username: state.username,
        password: state.password
      },
      { withCredentials: true }
    )
    .then(() => {
      store.setAlert({
        success: "Congradulation, your account has been successfully created"
      });
      props.cancel(false);
    })
    .catch((err) => {
      store.setAlert({
        error: err.response.data.payload.errorMessage
      });
      store.setUserState({
        isLoggedIn: 0,
        username: ""
      });
    });
};

const handlePasswordHidden = () => {
  state.setIsHidden(!state.isHidden);
};
</script>

<template>
  <div class="form-wrapper">
    <form class="register-form" @submit="handleSubmit">
      <div>
        <input
          type="text"
          placeholder="username"
          v-model="state.username"
          autocomplete="username"
        />
        <input
          :type="state.isHidden ? 'password' : 'text'"
          placeholder="password"
          v-model="state.password"
          autocomplete="current-password"
        />
        <i
          :class="state.isHidden ? 'fa fa-eye' : 'fa fa-eye-slash'"
          @click="handlePasswordHidden"
        />
      </div>
      <button
        :class="isDisabled && 'disabled'"
        type="submit"
        value="Submit"
        :disabled="isDisabled"
      >
        Sign Up
      </button>
      <div class="message">
        <span @click="() => cancel(false)">Back to sign in</span>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
}
.form-wrapper input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form-wrapper button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.form-wrapper button:hover,
.form-wrapper button:active,
.form-wrapper button:focus {
  background: #43a047;
}

.disabled {
  opacity: 0.2;
}
.disabled:hover {
  background: #4caf50 !important;
}
.fa {
  float: right;
  margin-left: -25px;
  margin-top: 15px;
  position: relative;
  z-index: 2;
}

.message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.message span {
  color: #4caf50;
  text-decoration: none;
  cursor: pointer;
}
</style>
