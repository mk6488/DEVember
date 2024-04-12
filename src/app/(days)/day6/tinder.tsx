import { View, StyleSheet, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import TinderCard from "@/components/day6/TinderCard";
import { Stack } from "expo-router";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import dummyUsers from "@assets/data/day6/users.json";

export default function TinderScreen() {
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const [users, setUsers] = useState(dummyUsers);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    if (index > users.length - 3) {
      setUsers((usrs) => [...usrs, ...dummyUsers.reverse()]);
    }
  }, [index]);

  const onResponse = (res: boolean) => {
    // console.log("on Response", res);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={{ position: "absolute", bottom: 20 }}>
        Current index: {index}
      </Text>

      {users.map((user, index) => (
        <TinderCard
          key={`${user.id}-${index}`}
          user={user}
          numOfCards={users.length}
          index={index}
          activeIndex={activeIndex}
          onResponse={onResponse}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
