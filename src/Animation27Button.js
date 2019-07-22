import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Button
} from "react-native";

const AnimatedButton = Animated.createAnimatedComponent(Button);
export default class Animation27Button extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 300
      }).start();
    });
  };
  render() {
    const animatedColor = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
    });
    return (
      <View style={styles.container}>
        <AnimatedButton
          title="press me"
          onPress={this.startAnimation}
          color={animatedColor}
        />
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
