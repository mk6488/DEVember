import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import ForeCastItem from "@/components/day8/ForeCastItem";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;
const UNSPLASH_ACCESS_KEY = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY;
const bgImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg";

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Weather = {
  id: string;
  main: string;
  description: string;
  icon: string;
};

type CurrentWeather = {
  name: string;
  main: MainWeather;
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
};

export type WeatherForecast = {
  main: MainWeather;
  dt: number;
  weather: Weather[];
};

export default function WeatherScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<CurrentWeather>();
  const [forecast, setForecast] = useState<WeatherForecast[]>();
  const [bgPhotoUrl, setBgPhotoUrl] = useState("");

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
      fetchPhotosFromApi();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location) {
      return;
    }
    const results = await fetch(
      `${BASE_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    const data = await results.json();
    setWeather(data);
  };

  const fetchForecast = async () => {
    if (!location) {
      return;
    }
    const results = await fetch(
      `${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    const data = await results.json();
    setForecast(data.list);
  };

  const fetchPhotosFromApi = async () => {
    try {
      const result = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${weather?.weather[0].main}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await result.json();
    } catch (error) {
      console.error(error);
    }
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground source={{ uri: bgPhotoUrl }} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      ></View>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <LottieView
          source={
            weather.weather[0].main === "Rain"
              ? require("@assets/lottie/rain.json")
              : require("@assets/lottie/sunny.json")
          }
          style={{ width: 200, aspectRatio: 1 }}
          loop
          autoPlay
        /> */}
        <Text style={styles.location}>{weather.name}</Text>

        <Text style={styles.temperature}>{Math.round(weather.main.temp)}°</Text>
        <Text style={styles.suplementary}>
          Feels like {Math.round(weather.main.feels_like)}°
        </Text>
        <Text style={styles.suplementary}>
          Wind {Math.round((weather.wind.speed * 3600) / 1000)} km/h
        </Text>
        <Text style={styles.suplementary}>
          Humidity {weather.main.humidity}%
        </Text>
      </View>

      <FlatList
        data={forecast}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
          height: 200,
          marginBottom: 15,
        }}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
        renderItem={({ item }) => <ForeCastItem forecast={item} />}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    fontFamily: "InterReg",
    fontSize: 30,
    color: "lightgray",
  },
  temperature: {
    fontFamily: "InterBlack",
    fontSize: 100,
    color: "#fefefe",
  },
  suplementary: {
    fontFamily: "InterReg",
    color: "white",
    marginBottom: 5,
  },
});
