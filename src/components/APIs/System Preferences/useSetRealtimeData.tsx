import { realDB } from "../../../Firebase/firebase";
import { ref, set } from "firebase/database";

const useSetRealtimeData = () => {
  const toggleDarkMode = async (currentValue: boolean) => {
    try {
      const darkModeRef = ref(realDB, "darkMode");
      await set(darkModeRef, { isDarkMode: !currentValue });
    } catch (error) {
      console.error("Error updating darkMode: ", error);
    }
  };

  return toggleDarkMode;
};

export default useSetRealtimeData;
