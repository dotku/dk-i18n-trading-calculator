import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
} from "react-native";
import { TextInput, RadioButton, Button, Modal } from "react-native-paper";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { CURRENCY_CODES, CONVERSATION_RATES } from "../../constants";
import { launchURL } from "../../utils/devices";
import { FontAwesome } from "@expo/vector-icons";
import { formatter } from "../../utils/number";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Store } from "../../App";

function getTargetValueByRate({ fromValue, fromCode, toCode, rates }) {
  // console.log(CONVERSATION_RATES);
  // rates = rates || conversionRates;
  return fromValue * (rates[toCode] / rates[fromCode]);
}

const profitTypeOptions = {
  percantage: "percentage",
  dollar: "dollar",
};

export default function HomeScreen({ navigation }) {
  const defaultFromValue = 10000.0;
  const defaultFromCode = "CNY";
  const defaultToCode = "USD";
  const defaultProfitPercentage = 5;
  const defaultToValue = getTargetValueByRate({
    fromValue: defaultFromValue,
    fromCode: defaultFromCode,
    toCode: defaultToCode,
    rates: CONVERSATION_RATES,
  });
  const [value, setValue] = useState("first");
  const [modalVisible, setModalVisible] = useState(false);

  const [from, setFrom] = useState(10000);
  const [to, setTo] = useState(defaultToValue);
  const [fromCode, setFromCode] = useState("CNY");
  const [toCode, setToCode] = useState("USD");
  const [profitType, setProfitType] = useState(profitTypeOptions.percantage);
  const [profitPercentage, setProfitPercentage] = useState(
    defaultProfitPercentage
  );
  const [profitDollar, setProfitDollar] = useState(
    ((defaultToValue * defaultProfitPercentage) / 100).toFixed(2)
  );

  useEffect(() => {
    console.log("useEffect");

    // const genRate = async () => {
    //   const rsp = await axios
    //     .get
    //     // "https://v6.exchangerate-api.com/v6/7a7874805381019d1cc954ae/latest/CNY"
    //     ();
    //   console.log("rsp", rsp.data);
    // };
    // genRate();
    setTo(
      getTargetValueByRate({
        fromValue: from,
        fromCode,
        toCode,
        rates: CONVERSATION_RATES,
      }).toFixed(2)
    );
  }, []);

  const getProfit = () => {
    return parseFloat(
      profitType === "percentage" ? (to * profitPercentage) / 100 : profitDollar
    ).toFixed(2);
  };

  const getTotal = () => {
    return (parseFloat(to) + parseFloat(getProfit())).toFixed(2);
  };

  const handleToCodeChangeText = (v) => {
    let code = CURRENCY_CODES[v];
  };

  const handleFromChangeText = (v) => {
    const fromValue = parseFloat(v) || 0;
    setFrom(fromValue);
    setTo(
      getTargetValueByRate({
        fromValue,
        toCode,
        fromCode,
        rates: CONVERSATION_RATES,
      }).toFixed(2)
    );
  };

  const handleFromCodeChangeText = (v) => {
    // setFromCode(v);
    setModalVisible(true);
  };

  const handleFromCodePress = () => {
    setModalVisible(true);
  };

  const handleToChangeText = (v) => {
    const toValue = parseFloat(v) || 0;
    setTo(toValue);
    setFrom(
      getTargetValueByRate({
        fromValue: toValue,
        toCode: fromCode,
        fromCode: toCode,
        rates: CONVERSATION_RATES,
      }).toFixed(2)
    );
  };

  const handleSyncValue = (from, to) => {};

  return (
    <View style={styles.container}>
      <View style={styles.inputCurrencyGroup}>
        <View style={styles.inputValue}>
          <TextInput
            label="value"
            value={from.toFixed(2).toString()}
            onChangeText={handleFromChangeText}
            fontFamily="Courier New"
          />
        </View>
        <View style={styles.viewCenter}>
          <Button
            mode="contained"
            color="black"
            onPress={() => {
              navigation.navigate("CurrencyPicker");
            }}
          >
            {fromCode}
          </Button>
        </View>
        {/* <TextInput
          label="currency"
          value={fromCode}
          style={styles.inputCurrency}
          onChangeText={handleFromCodePress}
        /> */}
      </View>
      <View style={styles.inputCurrencyGroup}>
        {/* <TextInput
          style={styles.inputCurrency}
          label="currency"
          value={toCode}
          onChangeText={(v) => setToCode(v)}
        /> */}
        <View style={styles.inputValue}>
          <TextInput
            label="value"
            value={to.toString()}
            onChangeText={handleToChangeText}
            fontFamily="Courier New"
          />
        </View>
        <View style={styles.viewCenter}>
          <Button
            mode="contained"
            color="black"
            onPress={() => {
              navigation.navigate("CurrencyPicker");
            }}
          >
            {toCode}
          </Button>
        </View>
      </View>
      <RadioButton.Group
        onValueChange={(v) => setProfitType(v)}
        value={profitType}
      >
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.inputProfit}
            label="Profit in percentage"
            value={profitPercentage.toString()}
            right={<TextInput.Affix text="%" />}
          />
          <View style={styles.inputProfitRadio}>
            <RadioButton value={profitTypeOptions.percantage} />
          </View>
        </View>
        <View style={{ flexDirection: "row", margin: 4 }}>
          <Button style={{ flex: 1 }} onPress={() => setProfitPercentage(5)}>
            5%
          </Button>
          <Button style={{ flex: 1 }} onPress={() => setProfitPercentage(10)}>
            10%
          </Button>
          <Button style={{ flex: 1 }} onPress={() => setProfitPercentage(20)}>
            20%
          </Button>
          <Button style={{ flex: 1 }} onPress={() => setProfitPercentage(30)}>
            30%
          </Button>
          <Button style={{ flex: 1 }} onPress={() => setProfitPercentage(50)}>
            50%
          </Button>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.inputProfit}
            label="Profit in dollar"
            value={profitDollar.toString()}
            right={<TextInput.Affix text={toCode} />}
          />
          <View style={styles.inputProfitRadio}>
            <RadioButton value={profitTypeOptions.dollar} />
          </View>
        </View>
      </RadioButton.Group>
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.textResult}>{parseFloat(to).toFixed(2)}</Text>
        <Text style={styles.textResult}>+ {getProfit()}</Text>
        <Text style={styles.textResult}>---</Text>
        <Text style={styles.textResult}>{getTotal()}</Text>
      </View>
      <View>
        <Button
          labelStyle={{ fontSize: 12 }}
          onPress={() => {
            launchURL("mailto:weijingjaylin@gmail.com");
          }}
        >
          Feedback
        </Button>
      </View>
      {/* <CurrencyCodePickerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputCurrencyGroup: { flexDirection: "row" },
  inputCurrency: { margin: 4, marginLeft: 0, width: "30%" },
  inputValue: {
    marginVertical: 4,
    width: "80%",
  },
  inputProfit: { marginVertical: 4, width: "80%" },
  inputProfitRadio: {
    alignItems: "center",
    padding: 4,
    width: "20%",
    justifyContent: "center",
  },
  viewCenter: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  textResult: {
    textAlign: "right",
    fontFamily: "Courier New",
    fontSize: 18,
  },
  container: {
    ...Platform.select({
      ios: {
        maxWidth: "100%",
        marginHorizontal: 20,
      },
      android: {
        maxWidth: "100%",
        marginHorizontal: 20,
      },
      default: {
        maxWidth: 520,
        marginLeft: "auto",
        marginRight: "auto",
      },
    }),

    marginTop: 20,
    flex: 1,
    marginHorizontal: 10,
  },
});
