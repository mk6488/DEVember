import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import apartments from "@assets/data/day5/apartments.json";

type ApartmentListItem = {
  apartment: (typeof apartments)[0];
  containerStyle?: ViewStyle;
};

export default function ApartmentListItem({
  apartment,
  containerStyle,
}: ApartmentListItem) {
  return (
    <View style={[styles.card, containerStyle]}>
      <Image style={styles.image} source={{ uri: apartment.image }} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{apartment.title}</Text>
        <Text style={styles.description}>
          Stay at this apartment for an affordable price.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>$ {apartment.price} night</Text>
          <Text style={styles.price}>
            ★ {apartment.rating} ({apartment.numberOfStars})
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: 150,
    aspectRatio: 1,
    backgroundColor: "lightgray",
  },
  rightContainer: {
    padding: 10,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 16,
  },
  description: {
    color: "gray",
  },
  price: {
    fontFamily: "InterBold",
  },
});
