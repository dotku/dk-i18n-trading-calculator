import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";

const pickerSelectStyles = StyleSheet.create({
  inputWeb: {
    margin: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  inputIOS: {
    margin: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    margin: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export const Dropdown = ({ items, value }) => {
  return (
    <RNPickerSelect
      onValueChange={(v) => v}
      placeholder={{
        label: "Select an item...",
        value: "",
        color: "#9EA0A4",
      }}
      value={value || ""}
      items={items}
      style={pickerSelectStyles}
    />
  );
};
