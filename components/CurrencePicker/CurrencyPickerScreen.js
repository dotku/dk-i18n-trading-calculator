import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { CURRENCY_CODES } from "../../constants";
import { CommonStyles } from "../../styles";

export default function CurrencyPickerScreen({ onButtonPress, pickerCode }) {
  return (
    <ScrollView style={{ marginTop: 12 }}>
      <Text style={{ margin: 8, fontSize: 16 }}>Common Used Currncies: </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          borderBottomColor: "#ccc",
          borderBottomWidth: 0.5,
        }}
      >
        {[
          CURRENCY_CODES.USD,
          CURRENCY_CODES.CNY,
          CURRENCY_CODES.JPY,
          CURRENCY_CODES.EUR,
        ].map((item, key) => (
          <Button
            key={key}
            mode={pickerCode === item ? "contained" : "outlined"}
            style={{
              margin: 8,
            }}
            color={pickerCode === item ? "black" : ""}
            onPress={() => onButtonPress(item)}
          >
            {item}
          </Button>
        ))}
      </View>
      <Text style={{ margin: 8, fontSize: 16 }}>All Currncies: </Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {Object.keys(CURRENCY_CODES).map((item, key) => (
            <Button
              key={key}
              mode={pickerCode === item ? "contained" : "outlined"}
              style={{
                margin: 8,
              }}
              color={pickerCode === item ? "black" : ""}
              onPress={() => onButtonPress(item)}
            >
              {item}
            </Button>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
