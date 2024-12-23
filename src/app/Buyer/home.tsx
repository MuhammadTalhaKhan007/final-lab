import {
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const categories = [
  { id: "1", name: "Electronics", icon: "phone-portrait" },
  { id: "2", name: "Fashion", icon: "shirt" },
  { id: "3", name: "Home", icon: "home" },
  { id: "4", name: "Sports", icon: "football" },
];

const products = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    image:
      "https://morpheus360.com/cdn/shop/products/HP9750HDcopy.jpg?v=1660232271&width=1946",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    image:
      "https://zerolifestyle.co/cdn/shop/files/Luna-_5_3.webp?v=1734558268&width=1250",
  },
  {
    id: "3",
    name: "Iphone Charger",
    price: 79.99,
    image:
      "https://phonecovers.pk/cdn/shop/products/15charger.jpg?v=1705154483",
  },
  {
    id: "4",
    name: "Android Charger",
    price: 49.99,
    image:
      "https://www.maxonpakistan.com/cdn/shop/files/CP-08_Fast_Android_Charger.jpg?v=1733990084",
  },
];

export default function BuyerHomePage() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [buyerName, setBuyerName] = useState("");

  useEffect(() => {
    getBuyerName();
  }, []);

  const getBuyerName = async () => {
    try {
      const name = await AsyncStorage.getItem("buyerName");
      if (name) setBuyerName(name);
    } catch (error) {
      console.error("Error fetching buyer name:", error);
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

  const renderHeader = () => (
    <>
      <LinearGradient
        colors={["#1e3c72", "#2a5298"]} // Darker, more contrasting gradient
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.userName}>{buyerName || "Guest"}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Ionicons name={item.icon as any} size={24} color="#4e8bb3" />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={styles.productRow}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(false)}
            colors={["#4e8bb3"]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerGradient: {
    padding: 20,
    paddingTop: 40,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeContainer: {
    flex: 1,
  },

  welcomeText: {
    fontSize: 16,
    color: "#000",
    opacity: 0.8,
  },
  userName: {
    fontSize: 28, // Increased font size for better visibility
    fontWeight: "bold",
    color: "#000", // White color for better contrast on dark gradient background
    letterSpacing: 1.5, // Slight letter spacing for a more polished look
    textShadowColor: "#000", // Shadow to make the text pop
    textShadowOffset: { width: 1, height: 1 }, // Slight shadow to make it stand out
    textShadowRadius: 3, // Subtle shadow radius for a softer look
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgb(255, 15, 15)",
  },
  categoriesContainer: {
    padding: 15,
  },
  categoryCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  productRow: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  productCard: {
    flex: 0.48,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4e8bb3",
  },
});
