import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Profile Screen</Text>

      <Link href="/">Home</Link>
    </View>
  );
}
