import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder
} from "react-native";

export default class Animation13add extends Component {
  state = {
    animation: new Animated.ValueXY(0)
  };

  render() {
    const animatedStyle = {
      transform: this.state.animation.getTranslateTransform()
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "tomato"
  }
});
