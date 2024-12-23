import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { db } from "../../../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
const useBuyerSignup = () => {
  const [loading, setLoading] = useState(false);

  const registerBuyer = async (
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    cardNumber: string,
    expiryDate: string,
    preferences: string
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
      const buyerProfileRef = doc(db, "buyers", user.uid);
      await setDoc(buyerProfileRef, {
        name,
        email,
        address,
        phone,
        cardNumber,
        expiryDate,
        preferences,
        createdAt: new Date().toISOString(),
      });
      return { success: true, message: "Buyer Signup Successful!" };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  return { registerBuyer, loading };
};

export default useBuyerSignup;
