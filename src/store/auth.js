import axios from "axios";
import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: "",
    isLogin: false,
  }),
  actions: {
    async login(email, password, router) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          this.user = response.data.user;
          this.token = response.data.token;
          this.isLogin = true;

          Cookies.set("token", response.data.token);
          Cookies.set("roles", response.data.user.role);

          router.push({ path: "/" });
        }
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = "";
      this.isLogin = false;

      Cookies.remove("token");
      Cookies.remove("roles");

      window.location.reload();
    },
  },
  persist: true,
});
