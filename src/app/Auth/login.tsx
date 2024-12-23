import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import useGetRealtimeData from "@/src/components/APIs/System Preferences/useGetRealtimeData";
import useSetRealtimeData from "@/src/components/APIs/System Preferences/useSetRealtimeData";
import CustomLoader from "@/src/components/loader";

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
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
