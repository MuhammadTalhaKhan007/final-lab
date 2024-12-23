import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

const CustomLoader = ({ loading }: { loading: boolean }) => {
  const [spinAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (loading) {
      // Rotation animation
      const rotate = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );

      // Pulse animation (heartbeat effect)
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );

      // Start both animations
      Animated.parallel([rotate, pulse]).start();
    }
  }, [loading, spinAnim, scaleAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      {loading && (
        <View style={styles.container}>
          <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
            <Image
              source={require("../../assets/images/COMSATS-Logo.png")}
              style={styles.loaderImage}
            />
          </Animated.View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.01))",
    zIndex: 1000,
  },
  loaderImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default CustomLoader;
