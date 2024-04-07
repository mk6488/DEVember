import { View, Text } from "react-native";
import React from "react";

export default function ProtectedScreen() {
  return (
    <View>
      <Text style={{ fontFamily: "InterBold", fontSize: 30 }}>Hello there</Text>
      <Text style={{ fontFamily: "InterSemi", fontSize: 20, color: "gray" }}>
        You should only see this page if you are Authenticated
      </Text>
    </View>
  );
}
