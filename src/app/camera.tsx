import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import {
  View,
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import path from "path";
import * as FileSystem from "expo-file-system";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState<CameraType>("back");
  const camera = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture>();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const res = await camera.current?.takePictureAsync();
    setPicture(res);
  };

  const saveFile = async (uri: string) => {
    // save file
    const filename = path.parse(uri).base;

    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + filename,
    });

    setPicture(undefined);
    router.back();
  };

  if (!permission?.granted) {
    return <ActivityIndicator />;
  }

  if (picture) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: picture.uri }}
          style={{ width: "100%", flex: 1 }}
        />
        <View style={{ padding: 10 }}>
          <SafeAreaView edges={["bottom"]}>
            <Button title="Save" onPress={() => saveFile(picture.uri)} />
          </SafeAreaView>
        </View>
        <MaterialIcons
          onPress={() => {
            setPicture(undefined);
          }}
          name="close"
          size={35}
          color="white"
          style={{ position: "absolute", top: 50, left: 20 }}
        />
      </View>
    );
  }

  return (
    <View>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View style={styles.footer}>
          <View />
          <Pressable style={styles.recordButton} onPress={takePicture} />
          <MaterialIcons
            name="flip-camera-ios"
            size={24}
            color={"white"}
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>

      <MaterialIcons
        name="close"
        color={"white"}
        style={styles.close}
        size={30}
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: "100%",
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  close: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  recordButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
