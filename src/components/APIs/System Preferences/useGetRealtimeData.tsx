import { useEffect, useState } from "react";
import { realDB } from "../../../Firebase/firebase";
import { ref, onValue, off } from "firebase/database";

const useGetRealtimeData = () => {
  const [darkMode, setDarkMode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const darkModeRef = ref(realDB, "darkMode");
    const listener = onValue(
      darkModeRef,
      (snapshot) => {
        const data = snapshot.val();
        setDarkMode(data);
        setLoading(false);
      },
      (error) => {
        console.error("Firebase read failed: ", error);
        setLoading(false);
      }
    );

    return () => {
      off(darkModeRef, "value", listener);
    };
  }, []);

  return { darkMode, loading };
};

export default useGetRealtimeData;
