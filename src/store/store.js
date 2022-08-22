import { reactive } from "vue";
import Cookies from "js-cookie";

export const store = reactive({
  user: {
    username: Cookies.get("username"),
    isLoggedIn: !!+Cookies.get("isLoggedIn")
  },
  error: "",
  setUserState(userState) {
    Cookies.set("isLoggedIn", userState.isLoggedIn);
    Cookies.set("username", userState.username);
    this.user = {
      username: userState.username,
      isLoggedIn: !!+userState.isLoggedIn
    };
  },
  setError(msg) {
    this.error = msg;
  }
});
