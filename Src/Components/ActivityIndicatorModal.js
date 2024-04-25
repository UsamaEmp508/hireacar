import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const ActivityIndicatorModal = ({ loaderIndicator }) => {
  return (
    <View style={styles.container}>
      {loaderIndicator  ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        ""
      )}
    </View>
  );
};

export default ActivityIndicatorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
});
