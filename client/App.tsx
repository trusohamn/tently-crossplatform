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
        const data = await fetch("http://localhost:4000/graphql", {
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
        console.log(e);
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
