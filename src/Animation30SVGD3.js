import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path";

const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`;
const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`;

export default class Animation30SVGD3 extends Component {
  state = {
    animation: new Animated.Value(0)
  };

  componentWillMount() {
    const pathInterpolate = interpolatePath(startPath, endPath);
    this.state.animation.addListener(({ value }) => {
      const path = pathInterpolate(value);
      this._path.setNativeProps({
        d: path
      });
    });
  }
  startAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500
      }),
      Animated.delay(1500),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500
      })
    ]).start();
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Svg width={150} height={150}>
            <Path
              d={startPath}
              stroke="black"
              ref={path => (this._path = path)}
            />
          </Svg>
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
