import React, { useState, useEffect, useRef, useCallback } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Asset, useAssets } from 'expo-asset';
import { readAsStringAsync } from "expo-file-system";

export default function App() {
  const [index, indexLoadingError] = useAssets(
    require("./assets/test2.html")
  );
  const [text, setText] = useState([]);

  useEffect(() => {
    if (index) {
      let localUri = index[0].localUri;
      setText([...text, JSON.stringify(index[0])]);
      readAsStringAsync(localUri).then((data) => {
        setText([...text, `Loaded HTML Local Uri: ${localUri}`]);
      }).catch((err) => {
        setText([...text, `HTML error: ${err}`]);
      });
    }
  }, [index]);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
