import { Button, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";

export default function SellerHomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seller Home</Text>
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
