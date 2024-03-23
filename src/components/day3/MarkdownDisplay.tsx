import { PropsWithChildren } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Markdown from "react-native-markdown-display";

export default function MarkdownDisplay({ children }: PropsWithChildren) {
  return (
    <ScrollView style={styles.page} contentInsetAdjustmentBehavior="automatic">
      <Markdown style={markdownStyles}>{children}</Markdown>
    </ScrollView>
  );
}

const markdownStyles = StyleSheet.create({
  heading1: {
    fontFamily: "InterBlack",
    color: "#212020",
    marginTop: 15,
    marginBottom: 10,
    lineHeight: 50,
  },
  heading2: {
    fontFamily: "InterBold",
    color: "#404040",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 40,
  },
  body: {
    fontSize: 16,
    // fontFamily: "InterReg",
    lineHeight: 22,
  },
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
});
