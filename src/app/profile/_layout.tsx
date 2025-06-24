import { Slot } from "expo-router";
import { View } from "react-native";

export default function ProfileLayout() {
  return (
    <View style={{ backgroundColor: "red", flex: 1, margin: 60 }}>
      {/* Header */}
      <Slot />
      {/* Footer */}
    </View>
  );
}
