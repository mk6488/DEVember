import { Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  Button,
} from "react-native";
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  PhotoFile,
  TakePhotoOptions,
  useMicrophonePermission,
  VideoFile,
  useCodeScanner,
} from "react-native-vision-camera";
import { useFocusEffect } from "expo-router";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";

export default function CameraScreen() {
  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera"],
  });

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      console.log(codes[0]);
    },
  });

  const { hasPermission, requestPermission } = useCameraPermission();
  const {
    hasPermission: micPermission,
    requestPermission: requestMicPermission,
  } = useMicrophonePermission();

  const [isActive, setIsActive] = useState(false);
  const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off");
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState("camera");

  const [photo, setPhoto] = useState<PhotoFile>();
  const [video, setVideo] = useState<VideoFile>();

  const camera = useRef<Camera>(null);

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }

    if (!micPermission) {
      requestMicPermission();
    }
  }, [hasPermission, micPermission]);

  const onTakePicturePressed = async () => {
    if (!camera.current) {
      return;
    }

    if (isRecording) {
      camera.current.stopRecording();
      return;
    }

    const photo = await camera.current.takePhoto({
      flash,
    });
    setPhoto(photo);
  };

  const onStartRecording = async () => {
    if (!camera.current) {
      return;
    }

    setIsRecording(true);
    camera.current.startRecording({
      flash: flash === "on" ? "on" : "off",
      onRecordingFinished: (video) => {
        setIsRecording(false);
        setVideo(video);
      },
      onRecordingError: (error) => {
        console.error(error);
        setIsRecording(false);
      },
    });
  };

  const uploadPhoto = async () => {
    if (!photo) {
      return;
    }

    const res = await fetch(`file://${photo.path}`);
    const data = await res.blob();

    //TODO: upload data to your network storage (ex: s3, supabase storage, etc)
  };

  if (!hasPermission || !micPermission) {
    <ActivityIndicator />;
  }

  if (!device) {
    return <Text>Camera device not found</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />

      {mode === "qr" ? (
        <Camera
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={mode === "qr" && isActive && !photo && !video}
        />
      ) : (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={mode === "camera" && isActive && !photo && !video}
          photo
          video
          audio
        />
      )}

      {video && (
        <Video
          style={StyleSheet.absoluteFill}
          source={{ uri: video.path }}
          useNativeControls
          isLooping
        />
      )}

      {photo && (
        <>
          <Image source={{ uri: photo.path }} style={StyleSheet.absoluteFill} />
          <FontAwesome5
            onPress={() => setPhoto(undefined)}
            name="arrow-left"
            size={25}
            color="white"
            style={{ position: "absolute", top: 50, left: 30 }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 50,
              backgroundColor: "rgba(0, 0, 0, 0.40)",
            }}
          >
            <Button title="Upload" onPress={uploadPhoto} />
          </View>
        </>
      )}

      {!photo && !video && (
        <>
          <View
            style={{
              position: "absolute",
              right: 10,
              top: 50,
              padding: 10,
              borderRadius: 5,
              backgroundColor: "rgba(0, 0, 0, 0.40)",
              gap: 30,
            }}
          >
            <MaterialIcons
              name={flash === "off" ? "flash-off" : "flash-on"}
              onPress={() =>
                setFlash((current) => (current === "off" ? "on" : "off"))
              }
              size={30}
              color="black"
            />

            <MaterialIcons
              name={mode === "camera" ? "qr-code-scanner" : "photo-camera"}
              onPress={() => setMode(mode === "qr" ? "camera" : "qr")}
              size={30}
              color="black"
            />
          </View>

          {mode === "camera" && (
            <Pressable
              onPress={onTakePicturePressed}
              onLongPress={onStartRecording}
              style={{
                position: "absolute",
                alignSelf: "center",
                bottom: 50,
                width: 75,
                height: 75,
                backgroundColor: isRecording ? "red" : "white",
                borderRadius: 75,
              }}
            />
          )}
        </>
      )}
    </View>
  );
}
