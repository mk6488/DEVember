import { Link } from "expo-router";
import { StyleSheet, Text, Pressable } from "react-native";

type DayListItemProps = {
  day: number;
};

export default function DayListItem({ day }: DayListItemProps) {
  return (
    <Link href={`/day${day}`} asChild>
      <Pressable style={styles.box}>
        <Text style={styles.text}>{day}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#f9ede3",
    flex: 1,
    aspectRatio: 1,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#9f4521",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#9f4521",
    fontSize: 70,
    fontFamily: "AmaticBold",
  },
});
