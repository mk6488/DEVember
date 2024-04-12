import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ProtectedScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontFamily: "InterReg", fontSize: 20, marginBottom: 20 }}>
        More protected info
      </Text>
      <FontAwesome5 name="lock" size={75} color="gray" />

      <Link href={"/day10/protected"}>Back</Link>
    </View>
  );
}
