import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

export default class Animation21 extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 2,
        duration: 300
      }).start();
    });
  };
  render() {
    const animatedInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 300, 0]
    });

    const interpolatedInterpolated = animatedInterpolate.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.5]
    });

    const translateXInterpolate = animatedInterpolate.interpolate({
      inputRange: [0, 30, 50, 80, 100, 150, 299, 300],
      outputRange: [0, -30, -50, 80, -100, 300, 0, -100]
    });
    const animatedStyles = {
      transform: [
        {
          translateY: animatedInterpolate
        },
        {
          translateX: translateXInterpolate
        }
      ],
      opacity: interpolatedInterpolated
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]}>
            <Text style={styles.text}>Interpolate inside Interpolate</Text>
          </Animated.View>
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
