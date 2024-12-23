import { Button, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";

export default function BuyerHomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buyer Home</Text>
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
