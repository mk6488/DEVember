import { View, StyleSheet } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { Stack } from "expo-router";

export default function AnimationScreen() {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <LottieView
        ref={animation}
        autoPlay
        style={styles.animation}
        source={require("@assets/lottie/netflix.lottie")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  animation: {
    width: "80%",
    // maxWidth: 400,
    aspectRatio: 16 / 9,
  },
});
