import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext } from "react";
import HomeScreen from "./components/HomeScreen";
import CurrencyPickerScreen from "./components/CurrencePicker/CurrencyPickerScreen";
import { CURRENCY_CODES } from "./constants";

const Stack = createNativeStackNavigator();

export const Store = createContext();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "International Trading Calculator",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="CurrencyPicker"
          component={CurrencyPickerScreen}
          options={{
            title: "International Trading Calculator",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
