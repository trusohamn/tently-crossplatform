import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import MapLeaflet from "./components/MapLeaflet";

export default function App() {
  const [markers, setMarkers] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `{getAllLocations {
            id, icon, position {
              lat
              lng
            }
          }}`,
          }),
        }).then((data) => data.json());
        setMarkers(
          data.data.getAllLocations.map((location) => ({
            ...location,
            size: [32, 32],
          }))
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    !!markers && (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Tently!</Text>
        <MapLeaflet markers={markers}></MapLeaflet>
        <StatusBar style="auto" />
      </View>
    )
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
