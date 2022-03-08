import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import HelloScreen from "./components/HelloScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "ZY International Trading Calculator",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Hello"
          component={HelloScreen}
          options={{
            title: "Hello Screen",
          }}
        />
        {/*
        <Stack.Screen
          name="CurrencyPicker"
          component={CurrencyPickerScreen}
          options={{
            title: "International Trading Calculator",
            headerTitleAlign: "center",
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
