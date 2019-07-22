import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

export default class Animation24 extends Component {
  state = {
    animation: new Animated.Value(1)
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 1500
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 300
      }).start();
    });
  };
  render() {
    const scaleInterpolate = this.state.animation.interpolate({
      inputRange: [1, 2],
      outputRange: [1, 2]
    });

    const animatedStyles = {
      transform: [{ scale: scaleInterpolate }]
    };

    return (
      <Animated.View style={[styles.container]}>
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
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#ffffff"
  }
});
