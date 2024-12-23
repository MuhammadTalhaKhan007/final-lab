import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import useLogin from "@/src/components/APIs/Auth/useLogin";
import CustomLoader from "@/src/components/loader";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginUser, loading, error } = useLogin();

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Enter Email and Password!",
      });
      return;
    }
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        clearFields();
        if (result.userType === "buyer") {
          await AsyncStorage.setItem("token", result.token);
          await AsyncStorage.setItem("buyerEmail", result.user.email);
          Toast.show({
            type: "success",
            text1: "Logged In Successfully!",
            visibilityTime: 1000,
            onHide: () => {
              navigation.navigate("Buyer/home");
            },
          });
        } else if (result.userType === "seller") {
          await AsyncStorage.setItem("token", result.token);
          await AsyncStorage.setItem("sellerEmail", result.user.email);
          Toast.show({
            type: "success",
            text1: "Logged In Successfully!",
            visibilityTime: 1000,
            onHide: () => {
              navigation.navigate("Seller/home");
            },
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid Email or Password!",
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateNew = () => {
    navigation.navigate("Auth/buyerSignup");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Your Shopping Experience</Text>
        <Text style={styles.subtitle}>Please login to your account</Text>

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email Address"
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.createAccountContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={handleCreateNew}>
            <Text style={styles.createAccountLink}>Create new</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
      <CustomLoader loading={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 5,
    top: 9,
    paddingRight: 10,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
  },
  link: {
    color: "#28a745",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  createAccountLink: {
    color: "#28a745",
    textDecorationLine: "underline",
    fontWeight: "800",
    marginLeft: 5,
  },
});

export default LoginPage;
