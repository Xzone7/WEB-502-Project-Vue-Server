import { reactive } from "vue";
import Cookies from "js-cookie";

export const store = reactive({
  user: {
    username: Cookies.get("username"),
    isLoggedIn: !!+Cookies.get("isLoggedIn")
  },
  alert: {
    error: "",
    success: ""
  },
  setUserState(userState) {
    Cookies.set("isLoggedIn", userState.isLoggedIn);
    Cookies.set("username", userState.username);
    this.user = {
      username: userState.username,
      isLoggedIn: !!+userState.isLoggedIn
    };
  },
  setAlert(alert) {
    this.alert = {
      ...this.alert,
      ...alert
    };
  }
});
