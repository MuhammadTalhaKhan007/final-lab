import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { storage } from "../../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { Button, Image } from "react-native";
import useFirestore from "@/src/components/APIs/Firestore/useFirestore";
import CustomLoader from "@/src/components/loader";

export default function FireStoreScreen() {
  const [file, setFile] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [load, setLoad] = useState(false);
  const { saveUserURL, loading, error } = useFirestore();

  const handleFileChange = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } else {
      Alert.alert(
        "Permission required",
        "Please grant media library permissions."
      );
    }
  };
  const handleUpload = async () => {
    if (file) {
      try {
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profiles/${file.fileName}`);
        await uploadBytes(storageRef, blob);
        const fileUrl = await getDownloadURL(storageRef);
        setProfileUrl(fileUrl);
        return fileUrl;
      } catch (error) {
        console.error("File upload failed:", error);
        Alert.alert("Error", "Failed to upload image.");
      }
    }
    console.log("No File Selected");
    return "";
  };
  const handleSubmit = async () => {
    setLoad(true);
    const fileUrl = await handleUpload();
    if (fileUrl) {
      const result = await saveUserURL(fileUrl);
      if (result.success) {
        setLoad(false);
        setFile(null);
        Alert.alert("Success", "Image uploaded successfully.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileChange}>
        <Icon name="camera" size={24} color="#000" style={styles.icon} />
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>
      {file && <Image source={{ uri: file.uri }} style={styles.image} />}
      <Button title="Save" onPress={handleSubmit} />
      <CustomLoader loading={load} />
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
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  uploadText: {
    fontSize: 16,
    color: "#000",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
