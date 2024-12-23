import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function SellerHomePage() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [sellerName, setSellerName] = useState("");

  useEffect(() => {
    getSellerName();
  }, []);

  const getSellerName = async () => {
    try {
      const name = await AsyncStorage.getItem("sellerName");
      if (name) setSellerName(name);
    } catch (error) {
      console.error("Error fetching seller name:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.sellerName}>{sellerName || "Seller"}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>Total Products</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>32</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>$2.5k</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addProductButton}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addProductText}>Add New Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: "#000",
    opacity: 0.8,
  },
  sellerName: {
    fontSize: 28, // Increased font size for better visibility
    fontWeight: "bold",
    color: "#000", // White color for better contrast on dark gradient background
    letterSpacing: 1.5, // Slight letter spacing for a more polished look
    textShadowColor: "#000", // Shadow to make the text pop
    textShadowOffset: { width: 1, height: 1 }, // Slight shadow to make it stand out
    textShadowRadius: 3,
    marginBottom: 20, // Small margin to separate the text from the header
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgb(255, 15, 15)",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3c72",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  addProductButton: {
    backgroundColor: "#28a745",
    margin: 20,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addProductText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
