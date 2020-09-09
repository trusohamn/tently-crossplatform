import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MapLeaflet from "./components/MapLeaflet";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Tently!</Text>
      <MapLeaflet></MapLeaflet>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#52aca2",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#062542",
  },
});
