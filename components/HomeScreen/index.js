import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, RadioButton, Button } from "react-native-paper";
import axios from "axios";
import { CURRENCY_CODES, CONVERSATION_RATES } from "../../constants";
import { launchURL } from "../../utils/devices";
import { formatter, getNumberPad, setFloat } from "../../utils/number";
import CurrencyPickerScreen from "../CurrencePicker/CurrencyPickerScreen";
import { CommonStyles } from "../../styles";

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

function getTargetValueByRate({ fromValue, fromCode, toCode, rates }) {
  // debugger;
  // console.log(CONVERSATION_RATES);
  rates = rates || CONVERSATION_RATES;
  console.log("from/to", fromCode, toCode, rates[toCode] / rates[fromCode]);
  return fromValue * (rates[toCode] / rates[fromCode]);
}

const profitTypeOptions = {
  percantage: "percentage",
  dollar: "dollar",
};

const pickerForOptions = {
  fromCode: "fromCode",
  toCode: "toCode",
};

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

export default function HomeScreen() {
  let timeoutTemp;
  let timeoutFromValue;
  const [spaceGapLength, setSpaceGapLength] = useState(0);
  const [ifPicker, setIfPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerCode, setPickerCode] = useState();
  const [pickerFor, setPickerFor] = useState();

  const [fromValue, setFromValue] = useState(defaultFromValue);
  const [toValue, setToValue] = useState(defaultToValue);
  // const [toCode, setToCode] = useReducer((_prev, next) => {
  //   console.log("new toCode", next);
  //   setToValue(
  //     getTargetValueByRate({
  //       fromValue,
  //       fromCode: fromCodeRef,
  //       toCode: next,
  //     }).toFixed(2)
  //   );
  //   return next;
  // }, defaultToCode);
  const [toCode, setToCode] = useState(defaultToCode);
  const [fromCode, setFromCode] = useState(defaultFromCode);
  // const [fromCode, setFromCode] = useReducer((_prev, next) => {
  //   console.log("new fromCode", next);

  //   return next;
  // }, defaultFromCode);
  const [profitType, setProfitType] = useState(profitTypeOptions.percantage);
  const [profitPercentage, setProfitPercentage] = useState(
    defaultProfitPercentage
  );
  const [profitDollar, setProfitDollar] = useState(
    ((defaultToValue * defaultProfitPercentage) / 100).toFixed(2)
  );

  // toCodeUpdate effect
  useEffect(() => {
    console.log("useEffect toCode", toCode);
    setToValue(
      getTargetValueByRate({
        fromValue,
        fromCode,
        toCode,
      }).toFixed(2)
    );
  }, [toCode, fromCode]);

  // profit effect
  useEffect(() => {
    setProfitType(profitTypeOptions.dollar);
  }, [profitDollar]);

  useEffect(() => {
    setProfitType(profitTypeOptions.percantage);
  }, [profitPercentage]);

  useEffect(() => {
    const toStringLength = toValue.toString().length;
    const profitLength = getProfit().toString().length;
    setSpaceGapLength(
      toStringLength > profitLength ? toStringLength - profitLength : 0
    );
  }, [toValue, profitDollar, profitPercentage]);

  useEffect(() => {
    setToValue(
      getTargetValueByRate({
        fromValue,
        fromCode,
        toCode,
      }).toFixed(2)
    );
  }, [fromValue]);

  useEffect(() => {
    // const genRate = async () => {
    //   const rsp = await axios
    //     .get
    //     // "https://v6.exchangerate-api.com/v6/7a7874805381019d1cc954ae/latest/CNY"
    //     ();
    //   console.log("rsp", rsp.data);
    // };
    // genRate();
    // setToValue(
    //   getTargetValueByRate({
    //     fromValue: fromValue,
    //     fromCode,
    //     toCode,
    //     rates: CONVERSATION_RATES,
    //   }).toFixed(2)
    // );
  }, []);

  const getProfit = () => {
    return parseFloat(
      profitType === "percentage"
        ? (toValue * profitPercentage) / 100
        : profitDollar
    ).toFixed(2);
  };

  const getTotal = () => {
    return (parseFloat(toValue) + parseFloat(getProfit())).toFixed(2);
  };

  const handleFromChangeText = (v) => {
    setFloat(v, setFromValue);
    const timeoutFromValueTimer = 3000;
    const timeoutTempTimer = 800;
    // const newFromValue =
    //   parseFloat(v.replace(/!(^[+-]?\d+(\.\d+)?$)/g, "")) || 0;
    // setFromValue(v);
    // debounce(setFromValue, timeoutFromValueTimer)(parseFloat(v) || 0);

    // clearTimeout(timeoutTemp);
    // clearTimeout(timeoutFromValue);
    // timeoutTemp = null;
    // timeoutFromValue = null;
    // timeoutTemp = setTimeout(() => {
    //   setToValue(
    //     getTargetValueByRate({
    //       fromValue: newFromValue,
    //       fromCode,
    //       toCode,
    //       rates: CONVERSATION_RATES,
    //     }).toFixed(2)
    //   );
    // }, timeoutTempTimer);
    // timeoutFromValue = setTimeout(() => {
    //   console.log("newFromValue", newFromValue);
    //   setFromValue(newFromValue);
    // }, timeoutFromValueTimer);
  };

  const updateFromCodeByCode = (code) => {
    setFromCode(code);

    // const newToValue = getTargetValueByRate({
    //   fromValue,
    //   fromCode,
    //   toCode,
    // });
    // console.log("newToValue", newToValue);
    // setToValue(newToValue);
  };

  const updateToCodeByCode = (code) => {
    setToCode(code);
  };

  return ifPicker ? (
    <CurrencyPickerScreen
      pickerCode={pickerCode}
      onButtonPress={(v) => {
        setIfPicker(false);
        pickerFor === pickerForOptions.fromCode
          ? updateFromCodeByCode(v)
          : updateToCodeByCode(v);
      }}
    />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ marginLeft: "auto", marginRight: "auto" }}>
        <View style={styles.container}>
          <View style={styles.inputCurrencyGroup}>
            <View style={styles.inputValue}>
              <TextInput
                label="from value"
                value={fromValue.toString()}
                onChangeText={handleFromChangeText}
                fontFamily="Courier New"
                keyboardType={getNumberPad()}
                maxLength={14}
                onBlur={() => Keyboard.dismiss()}
              />
            </View>
            <View style={[styles.viewCenter, CommonStyles.view25p]}>
              <Button
                mode="contained"
                color="black"
                onPress={() => {
                  setPickerCode(fromCode);
                  setIfPicker(true);
                  setPickerFor("fromCode");
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
                label="to value"
                value={toValue.toString()}
                disabled
                fontFamily="Courier New"
              />
            </View>
            <View style={[styles.viewCenter, CommonStyles.view25p]}>
              <Button
                mode="contained"
                color="black"
                onPress={() => {
                  setPickerCode(toCode);
                  setIfPicker(true);
                  setPickerFor("toCode");
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
                keyboardType={getNumberPad()}
                onChangeText={(v) => {
                  setFloat(v || "0", setProfitPercentage);
                }}
                right={<TextInput.Affix text="%" />}
              />
              <View style={styles.inputProfitRadio}>
                <RadioButton value={profitTypeOptions.percantage} />
              </View>
            </View>
            <View style={{ flexDirection: "row", margin: 4 }}>
              <Button
                style={{ flex: 1 }}
                onPress={() => setProfitPercentage(5)}
              >
                5%
              </Button>
              <Button
                style={{ flex: 1 }}
                onPress={() => setProfitPercentage(10)}
              >
                10%
              </Button>
              <Button
                style={{ flex: 1 }}
                onPress={() => setProfitPercentage(20)}
              >
                20%
              </Button>
              <Button
                style={{ flex: 1 }}
                onPress={() => setProfitPercentage(30)}
              >
                30%
              </Button>
              <Button
                style={{ flex: 1 }}
                onPress={() => setProfitPercentage(50)}
              >
                50%
              </Button>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.inputProfit}
                label="Profit in dollar"
                value={profitDollar.toString()}
                onChangeText={(v) => setFloat(v, setProfitDollar)}
                keyboardType={"numeric"}
                maxLength={14}
                right={<TextInput.Affix text={toCode} />}
              />
              <View style={styles.inputProfitRadio}>
                <RadioButton value={profitTypeOptions.dollar} />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Button style={{}} onPress={() => setProfitDollar(100)}>
                  {formatter(toCode).format(100)}
                </Button>
              </View>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Button style={{}} onPress={() => setProfitDollar(300)}>
                  {formatter(toCode).format(300)}
                </Button>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Button style={{}} onPress={() => setProfitDollar(1000)}>
                  {formatter(toCode).format(1000)}
                </Button>
              </View>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Button style={{}} onPress={() => setProfitDollar(3000)}>
                  {formatter(toCode).format(3000)}
                </Button>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Button style={{}} onPress={() => setProfitDollar(10000)}>
                  {formatter(toCode).format(10000)}
                </Button>
              </View>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Button style={{}} onPress={() => setProfitDollar(30000)}>
                  {formatter(toCode).format(30000)}
                </Button>
              </View>
            </View>
          </RadioButton.Group>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.textResult}>
              {parseFloat(toValue).toFixed(2)}
            </Text>
            <Text style={styles.textResult}>
              + {Array.from({ length: spaceGapLength }).fill(" ").join("")}
              {getProfit()}
            </Text>
            <Text style={styles.textResult}>------</Text>
            <Text style={[styles.textResult, { fontWeight: "500" }]}>
              {getTotal()}
            </Text>
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
          <StatusBar style="auto" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputCurrencyGroup: { flexDirection: "row" },
  inputCurrency: { margin: 4, marginLeft: 0, width: "30%" },
  inputValue: {
    marginVertical: 4,
    width: "75%",
  },
  inputProfit: { marginVertical: 4, width: "75%" },
  inputProfitRadio: {
    alignItems: "center",
    padding: 4,
    width: "25%",
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
    fontSize: 32,
    fontWeight: "300",
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
        // maxWidth: 520,
        // minWidth: 320,
      },
    }),

    marginTop: 20,
    marginHorizontal: 10,
  },
});
