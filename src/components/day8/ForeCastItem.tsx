import { WeatherForecast } from "@/app/(days)/day8/weather";
import dayjs from "dayjs";
import { View, Text, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";

export default function ForeCastItem({
  forecast,
}: {
  forecast: WeatherForecast;
}) {
  const icon = forecast.weather[0].icon;
  return (
    <BlurView intensity={30} style={styles.container}>
      <Image
        style={styles.icons}
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
      />
      <Text style={styles.temp}>{Math.round(forecast.main.temp)}°</Text>
      <Text style={styles.date}>
        {dayjs(forecast.dt * 1000).format("ddd h a")}
      </Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    aspectRatio: 9 / 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: "gainsboro",
    borderWidth: StyleSheet.hairlineWidth,
  },
  icons: {
    width: 100,
    aspectRatio: 1,
  },
  temp: {
    fontFamily: "InterBlack",
    fontSize: 25,
    color: "white",
    marginVertical: 10,
  },
  date: {
    fontFamily: "InterReg",
    color: "ghostwhite",
    fontSize: 16,
  },
});
