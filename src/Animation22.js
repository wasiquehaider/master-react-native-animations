import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

export default class Animation22 extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 1500
    }).start(() => {
      this.state.animation.setValue(0);
    });
  };
  render() {
    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["rgb(71,255,99)", "rgb(255,99,71)", "rgb(99,71,255)"]
    });

    const bgStyles = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 2],
        outputRange: ["rgba(255,99,71,1)", "rgba(255,99,71,0)"]
      })
    };

    const animatedStyles = {
      backgroundColor: colorInterpolate
    };
    return (
      <Animated.View style={[styles.container, bgStyles]}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]}>
            <Text style={styles.text}>Interpolate inside Interpolate</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
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
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#ffffff"
  }
});
