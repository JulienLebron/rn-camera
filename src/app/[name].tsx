import { Link, useLocalSearchParams, Stack, router } from "expo-router";
import { View, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";

export default function ImageScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const fullUri = (FileSystem.documentDirectory || "") + (name || "");

  const onDelete = async () => {
    await FileSystem.deleteAsync(fullUri);
    router.back();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "Media",
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <MaterialIcons
                onPress={onDelete}
                name="delete"
                size={26}
                color="crimson"
              />
              <MaterialIcons
                onPress={() => {}}
                name="save"
                size={26}
                color="dimgray"
              />
            </View>
          ),
        }}
      />

      <Image
        source={{ uri: fullUri }}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
