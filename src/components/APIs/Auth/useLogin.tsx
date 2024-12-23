import { useState } from "react";
import { auth } from "../../../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
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

      // Step 2: Check if the user exists in either sellers or buyers table
      const userRef = doc(db, "buyers", loginUser.uid);
      const sellerRef = doc(db, "sellers", loginUser.uid);

      const buyerSnap = await getDoc(userRef);
      const sellerSnap = await getDoc(sellerRef);

      if (buyerSnap.exists()) {
        setUserData({
          user: buyerSnap.data(),
          token: token,
          userType: "buyer",
          message: "Login Successful!",
        });
        setLoading(false);
        return {
          success: true,
          user: buyerSnap.data(),
          token: token,
          userType: "buyer",
          message: "Login Successful!",
        };
      } else if (sellerSnap.exists()) {
        setUserData({
          user: sellerSnap.data(),
          token: token,
          userType: "seller",
          message: "Login Successful!",
        });
        setLoading(false);
        return {
          success: true,
          user: sellerSnap.data(),
          token: token,
          userType: "seller",
          message: "Login Successful!",
        };
      } else {
        setLoading(false);
        return {
          success: false,
          message: "User not found in buyers or sellers.",
        };
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");
      setLoading(false);
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    }
  };

  return { loginUser, loading, error, userData };
};

export default useLogin;
