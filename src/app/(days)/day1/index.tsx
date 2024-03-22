import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function DayDetailsScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: "Day 1" }} />
      <Text>Day Details Screen</Text>
    </View>
  );
}
