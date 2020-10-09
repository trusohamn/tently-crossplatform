import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import MapLeaflet from "./components/MapLeaflet";

const iconMapping: { [key: string]: String } = {
  camping: "/012-camp.png",
  kayak: "/033-kayak.png",
  hut: "/032-hut.png",
  default: "/012-camp.png",
};

const mapIcons = (category: string) => {
  return iconMapping[category] || iconMapping.default;
};

export default function App() {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: make a switch basing on env
        // const data = await fetch("http://localhost:4000/graphql", { // for WEB dev
        const data = await fetch("http://10.0.2.2:4000/graphql", {
          // for ANDROID dev
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `{getAllLocations {
            id, category, position {
              lat
              lng
            }
          }}`,
          }),
        }).then((data) => data.json());
        const mappedData = data.data.getAllLocations.map(
          (location: {
            id: String;
            category: string;
            position: { lat: Number; lng: Number };
          }) => ({
            ...location,
            size: [32, 32],
            icon: mapIcons(location.category),
          })
        );
        console.log(mappedData);
        setMarkers(mappedData);
      } catch (e) {
        console.log("ERRRRROR", e);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Tently!</Text>
      <MapLeaflet markers={markers}></MapLeaflet>
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
