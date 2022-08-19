<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store/store";
import axios from "axios";
import LoginErrorVue from "../components/LoginError.vue";
import LoginIconVue from "../components/LoginIcon.vue";

const router = useRouter();
const state = reactive({
  username: "",
  password: "",
  isHidden: true,
  showModal: false,
  setIsHidden(hide) {
    this.isHidden = hide;
  },
  setShowModal(showModal) {
    this.showModal = showModal;
  },
});

const isDisabled = computed(() => !state.username && !state.password);

const handleSubmit = (event) => {
  event.preventDefault();
  axios
    .post(
      "http://localhost:1024/login",
      {
        username: state.username,
        password: state.password,
      },
      { withCredentials: true }
    )
    .then(() => {
      store.setLoggedInState(1);
      router.push("/cart");
    })
    .catch(() => {
      store.setError("Incorrect username or password.");
      store.setLoggedInState(0);
    });
};

const handlePasswordHidden = () => {
  state.setIsHidden(!state.isHidden);
};

const handleForgetPsw = () => {
  state.setShowModal(!state.showModal);
};

const onClose = () => {
  store.setError("");
};
</script>

<template>
  <div v-if="store.isLoggedIn">You logged In</div>
  <div className="login-page-home" v-else>
    <div className="img-display">
      <LoginIconVue />
    </div>
    <h1 className="login-header">Sign in to cart and checkout</h1>
    <LoginErrorVue v-show="store.error" :onClose="onClose" />
    <div className="form">
      <form className="login-form" @submit="handleSubmit">
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
            :className="state.isHidden ? 'fa fa-eye' : 'fa fa-eye-slash'"
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
        <div className="message">
          <p @click="handleForgetPsw">Forgot password?</p>
        </div>
        <div className="message" v-show="state.showModal">
          Try username: today, password: yyyy/mm/dd
        </div>
      </form>
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
.form button,
.logout-page button {
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

.form .message p {
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

.footer {
  display: flex !important;
  list-style: none !important;
  justify-content: center !important;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
  font-size: 12px;
}

.footer li {
  margin-left: 16px;
  box-sizing: border-box;
  cursor: pointer;
}

.footer li a {
  color: #0366d6;
  text-decoration: none;
}
</style>
