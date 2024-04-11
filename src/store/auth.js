import { get, post } from "@/lib/api";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: "",
    isLogin: false,
  }),
  actions: {
    async login(email, password, router) {
      try {
        const response = await post(
          `/api/auth/login`,
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

          router.push({ path: "/" });
        }
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    async verifyAccount(userId, token) {
      get(`/api/auth/verify-account?userId=${userId}&token=${token}`)
        .then((response) => {
          this.user = response.data.user;
          this.token = response.data.token;
          this.isLogin = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      this.user = null;
      this.token = "";
      this.isLogin = false;

      window.location.reload();
    },
  },
  persist: true,
});
