import { useState } from "react";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";

const useLogin = () => {
  const EXPO_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const [loading, setLoading] = useState(false);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Step 1: Login the user with Firebase Authentication
      const loginCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loginUser = loginCredential.user;

      // Get the session token
      const token = await loginUser.getIdToken();

      // Step 2: Prepare data for API call
      const data = {
        email,
        password,
      };

      // Step 3: Make the API request to login the user
      const response = await axios.post(`${EXPO_BASE_URL}auth/login`, data);

      if (response.status === 200) {
        return {
          success: true,
          user: response.data.userDetails,
          token: token,
          message: "Login Successful!",
        };
      } else {
        return { success: false, message: "API login failed." };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading };
};

export default useLogin;
