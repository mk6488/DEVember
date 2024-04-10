import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Inter_900Black,
  Inter_600SemiBold,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from "@expo-google-fonts/amatic-sc";

import AnimatedSplashScreen from "@/components/day4/AnimatedSplashScreen";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  ThemeProvider,
  Theme,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react-native";

import { Amplify } from "aws-amplify";
import amplifyconfig from "@/amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

const theme: Theme = {
  tokens: {
    borderWidths: {
      large: "1rem",
    },
  },
  overrides: [defaultDarkModeOverride],
};

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    InterReg: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppReady(true);
    }
  }, [fontsLoaded, fontError]);

  const showAnimatedSplash = !appReady || !splashAnimationFinished;
  if (showAnimatedSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationFinish={() => setSplashAnimationFinished(true)}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(500)}>
          <Stack screenOptions={{}}>
            <Stack.Screen name="index" options={{ title: "DEVember" }} />
          </Stack>
        </Animated.View>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
