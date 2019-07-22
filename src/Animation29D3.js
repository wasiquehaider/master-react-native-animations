import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import { interpolateNumber, interpolateRgb } from "d3-interpolate";

export default class Animation29D3 extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  componentWillMount() {
    const positionInterpolate = interpolateNumber(0, 200);
    const colorInterpolate = interpolateRgb("rgb(255,99,71)", "rgb(99,71,255)");
    this.state.animation.addListener(({ value }) => {
      const position = positionInterpolate(value);
      const color = colorInterpolate(value);

      const style = [
        styles.box,
        {
          backgroundColor: color,
          transform: [
            {
              translateY: position
            }
          ]
        }
      ];

      this._view.setNativeProps({ style });
    });
  }
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500
    }).start(() =>
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 1500
      }).start()
    );
  };
  render() {
    // const animatedStyles = {
    //   backgroundColor: this.state.animation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
    //   }),
    //   transform: [
    //     {
    //       translateY: this.state.animation.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [0, 200]
    //       })
    //     }
    //   ]
    // };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <View style={styles.box} ref={view => (this._view = view)}>
            <Text style={styles.text}>D3 interpolate</Text>
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
  box: {
    width: 50,
    height: 50,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#ffffff"
  }
});
