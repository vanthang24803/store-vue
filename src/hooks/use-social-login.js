import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";

import { useToast } from "@/components/ui/toast/use-toast";

export default function useSocialLogin() {
  const { toast } = useToast();
  const googleProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const authStore = useAuthStore();
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const token = result._tokenResponse.idToken;
      await authStore.loginWithSocial(token, router);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);

      const token = result._tokenResponse.idToken;
      await authStore.loginWithSocial(token, router);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);

      const token = result._tokenResponse.idToken;
      await authStore.loginWithSocial(token, router);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return { loginWithGoogle, loginWithFacebook, loginWithGithub };
}
