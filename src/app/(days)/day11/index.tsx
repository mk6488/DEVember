import MarkdownDisplay from "@components/day3/MarkdownDisplay";
import { Link, Stack } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
  # Camera app
  Take photos and record videos with React Native Vision Camera
`;

export default function DayDetailsScreen() {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Day 11: Camera" }} />
      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href={"/day11/camera"} asChild>
        <Button title="Go to Camera" />
      </Link>
    </SafeAreaView>
  );
}
