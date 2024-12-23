import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View } from "@/src/components/Themed";

export default function StartScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  // Create reference for opacity and scale animation
  const opacityAnim = new Animated.Value(0); // Start with logo invisible
  const scaleAnim = new Animated.Value(1.5); // Start with logo scaled up

  useEffect(() => {
    // Animate logo: fade in, then fade out with scaling effect
    Animated.sequence([
      // Fade in and scale down to normal size
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1500, // 1.5s for fade-in
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(2000), // Stay for 2 seconds after fade-in
      // Fade out and scale down after the delay
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 1000, // 1s fade-out
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 1000, // Shrink the logo
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // After the animation completes, navigate to the next screen
      navigation.navigate("Auth/buyerSignup");
    });
  }, [opacityAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require("@/assets/images/StartLogo.png")}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
