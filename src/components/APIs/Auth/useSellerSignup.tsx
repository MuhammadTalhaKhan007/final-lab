import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { db } from "../../../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
const useSellerSignup = () => {
  const [loading, setLoading] = useState(false);

  const registerSeller = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    bankName: string,
    bankAccount: string,
    accountHolderName: string,
    businessType: string
  ) => {
    setLoading(true);
    try {
      // Step 1: Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Step 2: Prepare data for API call
      const sellerProfileRef = doc(db, "sellers", user.uid);
      await setDoc(sellerProfileRef, {
        name,
        email,
        phone,
        bankName,
        bankAccount,
        accountHolderName,
        businessType,
        createdAt: new Date().toISOString(),
      });
      return { success: true, message: "Seller Signup Successful!" };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  return { registerSeller, loading };
};

export default useSellerSignup;
