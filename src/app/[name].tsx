import { Link, useLocalSearchParams, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function ImageScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ title: "Image: " + name }} />
      <Text style={{ fontSize: 24, fontWeight: "600" }}>
        Image Details for: {name}
      </Text>

      <Link href="/">Home</Link>
    </View>
  );
}
