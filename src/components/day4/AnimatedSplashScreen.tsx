import { View, StyleSheet } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import Animated, { FadeOut, ZoomOut } from "react-native-reanimated";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function AnimatedSplashScreen({
  onAnimationFinish = () => {},
}: {
  onAnimationFinish?: () => void;
}) {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        exiting={ZoomOut.duration(300)}
        ref={animation}
        onAnimationFinish={onAnimationFinish}
        loop={false}
        autoPlay
        style={styles.lottie}
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
  lottie: {
    width: "80%",
    // maxWidth: 400,
    aspectRatio: 16 / 9,
  },
});
