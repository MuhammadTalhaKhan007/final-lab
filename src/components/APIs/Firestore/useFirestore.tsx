import { useState } from "react";
import { db } from "../../../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import UUID from "react-native-uuid";

const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveUserURL = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      // Generate a unique document reference in userProfiles collection
      const userProfileRef = doc(db, "userProfiles", UUID.v4());
      await setDoc(userProfileRef, {
        url,
        createdAt: new Date().toISOString(),
      });

      setLoading(false);
      return { success: true, id: userProfileRef.id };
    } catch (err) {
      setError(err.message);
      console.error(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return { saveUserURL, loading, error };
};

export default useFirestore;
