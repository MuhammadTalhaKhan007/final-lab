import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import useGetRealtimeData from "@/src/components/APIs/System Preferences/useGetRealtimeData";
import useSetRealtimeData from "@/src/components/APIs/System Preferences/useSetRealtimeData";
import CustomLoader from "@/src/components/loader";

export default function SellerSignupPage() {
  //   const { darkMode, loading } = useGetRealtimeData();
  //   const toggleDarkMode = useSetRealtimeData();

  //   const handleToggle = () => {
  //     if (darkMode !== null) {
  //       toggleDarkMode(darkMode.isDarkMode);
  //     }
  //   };
  //   if (darkMode === null) {
  //     return <CustomLoader loading={loading} />;
  //   }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seller Page</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
