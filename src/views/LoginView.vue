<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store/store";
import axios from "axios";
import LoginErrorVue from "../components/LoginError.vue";
import LoginIconVue from "../components/LoginIcon.vue";
import LoggedInAlertVue from "../components/LoggedInAlert.vue";
import RegisterFormVue from "../components/RegisterForm.vue";

const router = useRouter();
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
      "http://localhost:1024/login",
      {
        username: state.username,
        password: state.password
      },
      { withCredentials: true }
    )
    .then((res) => {
      store.setUserState({
        isLoggedIn: 1,
        username: res.data.payload.username
      });
      store.setAlert({
        error: "",
        success: ""
      });
      router.push("/cart");
    })
    .catch(() => {
      store.setAlert({ error: "Incorrect username or password." });
      store.setUserState({
        isLoggedIn: 0,
        username: ""
      });
    });
};

const handlePasswordHidden = () => {
  state.setIsHidden(!state.isHidden);
};

const handleForgetPsw = () => {
  state.setShowModal(!state.showModal);
};

const handleShowRegister = (show) => {
  store.setAlert({
    error: ""
  });
  state.setShowRegister(show);
};

const onClose = () => {
  store.setAlert({
    error: "",
    success: ""
  });
};
</script>

<template>
  <div class="login-page-home">
    <div class="img-display">
      <LoginIconVue />
    </div>
    <h1 class="login-header">Sign in to cart and checkout</h1>
    <LoginErrorVue
      v-show="store.alert.error || store.alert.success"
      :onClose="onClose"
    />
    <LoggedInAlertVue v-if="store.user.isLoggedIn" />
    <div class="form-container" v-else>
      <RegisterFormVue v-if="state.showRegister" :cancel="handleShowRegister" />
      <div class="form" v-else>
        <form class="login-form" @submit="handleSubmit">
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
            login
          </button>
          <div class="message">
            <span @click="handleForgetPsw">Forgot password?</span>
          </div>
          <div class="message" v-show="state.showModal">
            Try username: paul, password: paul
          </div>
          <div class="message">
            <span @click="() => handleShowRegister(true)">Sign up</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

h1 {
  line-height: 55px;
}
.login-page-home {
  padding-top: 7%;
  margin: 0 auto;
  justify-content: center;
  text-align: center;
}

.login-header {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.5px;
}

.img-display img {
  width: 80px;
  height: 80px;
}

.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
}
.form input {
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
.form button {
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

.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}

.disabled {
  opacity: 0.2;
}
.disabled:hover {
  background: #4caf50 !important;
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.form .message span {
  color: #4caf50;
  text-decoration: none;
  cursor: pointer;
}

.fa {
  float: right;
  margin-left: -25px;
  margin-top: 15px;
  position: relative;
  z-index: 2;
}
</style>
