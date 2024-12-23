import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useSellerSignup from "@/src/components/APIs/Auth/useSellerSignup";
import Toast from "react-native-toast-message";
import CustomLoader from "@/src/components/loader";

export default function SellerSignupPage() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation<NavigationProp<any>>();
  const [load, setLoad] = useState(false);
  const [bankAccount, setBankAccount] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const { registerSeller, loading } = useSellerSignup();

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setBankAccount("");
    setBankName(null);
    setAccountHolderName("");
    setBusinessType("");
  };

  const handleRegister = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim ||
      !phone.trim() ||
      !bankName.trim() ||
      !bankAccount.trim() ||
      !accountHolderName.trim() ||
      !businessType.trim()
    ) {
      Toast.show({
        type: "error",
        text1: "All Fields are required!",
        visibilityTime: 1000,
      });
      return;
    }
    try {
      setLoad(true);
      const result = await registerSeller(
        name,
        email,
        password,
        phone,
        bankName,
        accountHolderName,
        bankAccount,
        businessType
      );

      if (result.success) {
        setLoad(false);
        clearFields();
        Toast.show({
          type: "success",
          text1: "Seller Signed Up Successfully!",
          visibilityTime: 1000,
          onHide: () => {
            navigation.navigate("Auth/login");
          },
        });
      } else {
        setLoad(false);
        Toast.show({
          type: "error",
          text1: "Something Went Wrong!",
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Seller Registration</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <TextInput
        style={[styles.input, !emailValid && styles.invalidInput]}
        placeholder="Email Address"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          setEmailValid(validateEmail(value));
        }}
      />
      {!emailValid && (
        <Text style={styles.error}>Please enter a valid email address.</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      {/* Phone Input */}
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Bank Name */}
      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={bankName}
        onChangeText={setBankName}
      />
      {/* Account Holder Name */}
      <TextInput
        style={styles.input}
        placeholder="Account Holder Name"
        value={accountHolderName}
        onChangeText={setAccountHolderName}
      />
      {/* Bank Account */}
      <TextInput
        style={styles.input}
        placeholder="Bank Account"
        value={bankAccount}
        onChangeText={setBankAccount}
        keyboardType="number-pad"
        maxLength={16}
      />
      {/* Business Type Input */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={businessType}
          onValueChange={(itemValue) => setBusinessType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Business Type" value="" />
          <Picker.Item label="Individual" value="Individual" />
          <Picker.Item label="Company" value="Company" />
          <Picker.Item label="Freelancer" value="Freelancer" />
          <Picker.Item label="Startup" value="Startup" />
          <Picker.Item label="Retailer" value="Retailer" />
          <Picker.Item label="Wholesaler" value="Wholesaler" />
        </Picker>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <View style={styles.imageBackground}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate("Auth/buyerSignup")}
      >
        <Text style={styles.linkText}>Sign-up as a buyer</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text style={styles.LoginLinkText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Auth/login")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Toast />
      <CustomLoader loading={load} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  socialLoginContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  socialButton: {
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  invalidInput: {
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 5,
    top: 8,
    paddingRight: 10,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 10,
  },
  datePickerInput: {
    textAlign: "center",
    color: "#555",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: "#333",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  linkText: {
    color: "#61a1c7",
    fontSize: 16,
    textAlign: "center",
  },
  LoginLinkText: {
    fontSize: 16,
    color: "#666",
  },
  loginText: {
    fontSize: 16,
    color: "#61a1c7",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    height: 60,
    marginBottom: 15,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    color: "#61a1c7",
    backgroundColor: "#61a1c7",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
  },
});
