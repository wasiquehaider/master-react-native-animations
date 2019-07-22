import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions,
  TextInput
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Animation57EvolvingButton extends Component {
  state = {
    animation: new Animated.Value(0),
    _open: false
  };

  toggleTransform = () => {
    const toValue = this._open ? 0 : 1;

    Animated.timing(this.state.animation, {
      toValue,
      duration: 100
    }).start(() => {
      this._open ? this._input.blur() : this._input.focus();
      this._open = !this._open;
      this.setState({ open: this._open });
    });
  };

  render() {
    const { width } = Dimensions.get("window");

    const widthInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [100, width - 40],
      extrapolate: "clamp"
    });

    const opacityToolbarInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

    const toolBarStyles = {
      opacity: opacityToolbarInterpolate
    };

    const editorHeightInterpolate = this.state.animation.interpolate({
      inputRange: [0.7, 1],
      outputRange: [0, 150],
      extrapolate: "clamp"
    });

    const editorStyle = {
      opacity: this.state.animation,
      height: editorHeightInterpolate
    };

    const opacityButtonInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const buttonStyle = {
      opacity: opacityButtonInterpolate
    };

    return (
      <View style={[styles.container]}>
        <KeyboardAvoidingView behavior="padding" style={styles.center}>
          <Animated.View style={[styles.editor, { width: widthInterpolate }]}>
            <View style={styles.bar}>
              <Animated.View style={[styles.toolbar, toolBarStyles]}>
                <Icon name="format-bold" size={20} color="#fff" />
                <Icon name="format-italic" size={20} color="#fff" />
                <Icon name="format-underline" size={20} color="#fff" />
                <Icon name="format-list-bulleted" size={20} color="#fff" />
                <Icon name="format-list-numbered" size={20} color="#fff" />

                <View style={styles.rightInnerBar}>
                  <Icon name="link" size={20} color="#fff" />
                  <Icon name="image" size={20} color="#fff" />
                  <Icon name="arrow-down-bold-box" size={20} color="#fff" />
                </View>
              </Animated.View>

              <Animated.View
                style={[StyleSheet.absoluteFill, styles.center, buttonStyle]}
              >
                <TouchableWithoutFeedback onPress={this.toggleTransform}>
                  <View>
                    <Text style={styles.buttonText}>Write</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
            <Animated.View style={[styles.lowerView, editorStyle]}>
              <TextInput
                placeholder="Start Writing..."
                multiline
                ref={input => (this._input = input)}
                style={[StyleSheet.absoluteFill, styles.input]}
              />
            </Animated.View>
          </Animated.View>

          <TouchableWithoutFeedback onPress={this.toggleTransform}>
            <Animated.View style={toolBarStyles}>
              <Text style={styles.close}>Close</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  editor: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  bar: {
    height: 50,
    backgroundColor: "#2979ff",
    justifyContent: "center"
  },
  toolbar: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  rightInnerBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  lowerView: {
    height: 150
  },
  input: {
    padding: 10,
    fontSize: 20
  },
  buttonText: {
    color: "#ffffff"
  },
  close: {
    color: "#2979ff",
    marginTop: 10,
    marginBottom: 20
  }
});
