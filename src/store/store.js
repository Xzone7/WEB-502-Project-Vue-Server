import { reactive } from "vue";
import Cookies from "js-cookie";

export const store = reactive({
  isLoggedIn: !!+Cookies.get("isLoggedIn"),
  error: "",
  setLoggedInState(value) {
    Cookies.set("isLoggedIn", value);
    this.isLoggedIn = !!+value;
  },
  setError(msg) {
    this.error = msg
  }
});
