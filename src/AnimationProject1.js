import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";

export default class AnimationProject1 extends Component {
  state = {
    animation: new Animated.ValueXY()
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (ev, gestureState) => true,
      onMoveShouldSetPanResponder: (ev, gestureState) => true,
      onPanResponderGrant: (ev, gestureState) => {
        this.state.animation.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y
        }
      ]),
      onPanResponderRelease: (ev, gestureState) => {}
    });
  }
  render() {
    const { height } = Dimensions.get("window");
    const inputRange = [0, height / 2 - 50.01, height / 2 - 50, height];
    const backgroundColorInterpolate = this.state.animation.y.interpolate({
      inputRange,
      outputRange: [
        "rgb(99,71,255)",
        "rgb(99,71,255)",
        "rgb(255,0,0)",
        "rgb(255,0,0)"
      ]
    });

    const flipInterpolate = this.state.animation.y.interpolate({
      inputRange,
      outputRange: [1, 1, -1, -1]
    });

    const animatedStyles = {
      backgroundColor: backgroundColorInterpolate,
      transform: [
        ...this.state.animation.getTranslateTransform(),
        {
          scale: flipInterpolate
        }
      ]
    };
    return (
      <View style={styles.container}>
        <View style={[styles.top, styles.center, styles.container]}>
          <Text>Good</Text>
        </View>
        <View style={[styles.center, styles.container]}>
          <Text>Bad</Text>
        </View>
        <Animated.View
          style={[styles.box, styles.center, animatedStyles]}
          {...this._panResponder.panHandlers}
        >
          <Text>Box</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    position: "absolute",
    width: 50,
    height: 50,
    top: 0,
    left: 0
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: "#AAA"
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  }
});
