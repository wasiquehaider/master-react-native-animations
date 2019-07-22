import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

export default class Animation45ProgressBtn extends Component {
  state = {
    animation: new Animated.Value(0),
    opacity: new Animated.Value(1)
  };

  handlePress = () => {
    this.state.animation.setValue(0);
    this.state.opacity.setValue(1);

    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 200
        }).start();
      }
    });
  };
  render() {
    const progressInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    });

    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"]
    });

    const progressStyle = {
      width: progressInterpolate,
      bottom: 0,
      // top: null,
      // height: 5,
      // backgroundColor: colorInterpolate,
      backgroundColor: "rgba(255,255,255,0.5)",
      opacity: this.state.opacity
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={styles.button}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View style={[styles.progress, progressStyle]} />
            </View>
            <Text style={styles.buttonText}>Get It</Text>
          </View>
        </TouchableWithoutFeedback>
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
  button: {
    backgroundColor: "#e6537d",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: "hidden"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    backgroundColor: "transparent"
  },
  progress: {
    position: "absolute",
    left: 0,
    top: 0
  }
});
