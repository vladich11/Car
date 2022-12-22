import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const [numberPlate, setNumberplate] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!numberPlate) {
      setError("אנא הזן מספר רכב");
    } else {
      navigation.navigate("Info", { numberPlate });
    }
  };

  const handleError = () => {
    setError("");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f4511e" />
      {<Text>{error && <Text style={{ color: "red" }}>{error}</Text>}</Text>}
      <TextInput
        placeholder="הזן מספר רכב"
        style={styles.textInput}
        onChangeText={setNumberplate}
        onFocus={handleError}
        value={numberPlate}
        textAlign="right"
        keyboardType="numeric"
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={() => validate()}>
        <Text>חפש</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textInput: {
    width: 150,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: "right",
    opacity: 0.7,
    borderRadius: 3,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f4511e",
    padding: 10,
    width: 150,
    borderRadius: 3,
  },
});
