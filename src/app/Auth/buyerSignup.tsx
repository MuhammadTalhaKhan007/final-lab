import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useBuyerSignup from "@/src/components/APIs/Auth/useBuyerSignup";
import Toast from "react-native-toast-message";
import CustomLoader from "@/src/components/loader";

export default function BuyerSignupPage() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [preferences, setPreferences] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState<string>(null);
  const [cvc, setCvc] = useState("");
  const navigation = useNavigation<NavigationProp<any>>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [load, setLoad] = useState(false);
  const { registerBuyer, loading } = useBuyerSignup();

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const formatExpiryDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  };
  const handleConfirmExpiry = (date: Date) => {
    const currentDate = new Date();

    if (
      date.getFullYear() < currentDate.getFullYear() ||
      (date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() < currentDate.getMonth())
    ) {
      Alert.alert(
        "Invalid Expiry Date",
        "The expiry date cannot be in the past."
      );
      hideDatePicker();
      return;
    }

    // If valid, format and set the expiry date
    const formattedExpiry = formatExpiryDate(date);
    setExpiry(formattedExpiry);
    hideDatePicker();
  };
  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
    setCardNumber("");
    setExpiry(null);
    setCvc("");
    setPreferences("");
  };

  const handleRegister = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim ||
      !phone.trim() ||
      !address.trim() ||
      !cardNumber.trim() ||
      !expiry.trim() ||
      !cvc.trim() ||
      !preferences.trim()
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
      const result = await registerBuyer(
        name,
        email,
        password,
        address,
        phone,
        cardNumber,
        expiry,
        preferences
      );

      if (result.success) {
        setLoad(false);
        clearFields();
        Toast.show({
          type: "success",
          text1: "Signed Up Successfully!",
          visibilityTime: 1000,
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
    <View style={styles.container}>
      <Text style={styles.title}>Buyer Registration</Text>

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

      {/* Address Input */}
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Payment Details Input */}
      {/* Card Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="number-pad"
        maxLength={16} // For card numbers like Visa/Mastercard
      />

      {/* Expiry Input */}
      <Text
        style={[styles.input, styles.datePickerInput]}
        onPress={showDatePicker}
      >
        {expiry ? expiry : "Expiry (MM/YYYY)"}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmExpiry}
        onCancel={hideDatePicker}
      />

      {/* CVC Input */}
      <TextInput
        style={styles.input}
        placeholder="CVC"
        value={cvc}
        onChangeText={setCvc}
        keyboardType="number-pad"
        maxLength={3} // Standard CVC length
      />

      {/* Preferences Input */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={preferences}
          onValueChange={(itemValue) => setPreferences(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Preferences" value="" />
          <Picker.Item label="Clothes" value="Clothes" />
          <Picker.Item label="Shoes" value="Shoes" />
          <Picker.Item label="Cutlery" value="Cutlery" />
        </Picker>
      </View>

      {/* Register Button */}
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate("Auth/sellerSignup")}
      >
        <Text style={styles.linkText}>Sign-up as a seller</Text>
      </TouchableOpacity>
      <Toast />
      <CustomLoader loading={load} />
    </View>
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
});
