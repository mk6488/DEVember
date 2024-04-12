import { Slot } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useBiometrics } from "@/components/day10/BiometricsProvider";

export default function BiometricProtectedLayout() {
  const { isUnlocked, authenticate } = useBiometrics();

  useEffect(() => {
    if (!isUnlocked) {
      authenticate();
    }
  }, []);

  if (!isUnlocked) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{ fontFamily: "InterReg", fontSize: 20, marginBottom: 20 }}
        >
          Use FaceID to unlock.
        </Text>
        <FontAwesome5
          onPress={authenticate}
          name="fingerprint"
          size={75}
          color="black"
        />
      </View>
    );
  }

  return <Slot />;
}
