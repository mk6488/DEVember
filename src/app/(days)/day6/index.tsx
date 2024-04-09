import MarkdownDisplay from "@components/day3/MarkdownDisplay";
import { Link, Stack } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
  # Tinder Swipe Animation
  Let's build the Tinder Swipe Animation in React Native using Reanimated
`;

export default function DayDetailsScreen() {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Day 6: Tinder" }} />
      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href={"/day6/tinder"} asChild>
        <Button title="Go to Tinder" />
      </Link>
    </SafeAreaView>
  );
}
