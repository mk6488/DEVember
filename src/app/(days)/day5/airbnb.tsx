import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Stack } from "expo-router";
import apartments from "@assets/data/day5/apartments.json";
import CustomMarker from "@/components/day5/CustomMarker";
import ApartmentListItem from "@/components/day5/ApartmentListItem";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function AirbnbScreen() {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const snapPoints = useMemo(() => [80, "50%", "90%"], []);

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // initialRegion={mapRegion}
        region={mapRegion}
      >
        {apartments.map((apartment) => (
          <CustomMarker
            key={apartment.id}
            apartment={apartment}
            onPress={() => setSelectedApartment(apartment)}
          />
        ))}
      </MapView>

      {/* Display selected Apartment */}
      {selectedApartment && (
        <ApartmentListItem
          apartment={selectedApartment}
          containerStyle={{
            position: "absolute",
            bottom:
              typeof snapPoints[0] === "number" ? snapPoints[0] + 10 : 100,
            right: 10,
            left: 10,
          }}
        />
      )}

      <BottomSheet index={0} snapPoints={snapPoints}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listTitle}>Over {apartments.length} places</Text>

          <BottomSheetFlatList
            data={apartments}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => <ApartmentListItem apartment={item} />}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  listTitle: {
    textAlign: "center",
    fontFamily: "InterSemi",
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 20,
  },
});
