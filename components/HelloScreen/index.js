import { View, Text } from "react-native";

export default function HelloScreen({ content }) {
  return (
    <View>
      <Text>{content || "Hello"}</Text>
    </View>
  );
}
