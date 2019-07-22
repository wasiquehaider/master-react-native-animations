import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const Heart = ({ filled, style, ...props }) => {
  const centerNonFilled = (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeart, styles.heartShape, styles.empty]} />
      <View style={[styles.rightHeart, styles.heartShape, styles.empty]} />
    </View>
  );

  const filledStyle = filled ? styles.filledHeart : styles.empty;
  return (
    <Animated.View {...props} style={[styles.heart, style]}>
      <View style={[styles.heartShape, styles.leftHeart, filledStyle]} />
      <View style={[styles.heartShape, styles.rightHeart, filledStyle]} />
      {!filledStyle && centerNonFilled}
    </Animated.View>
  );
};

export default Heart;

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  heartShape: {
    width: 30,
    height: 45,
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  filledHeart: {
    backgroundColor: "red"
  },
  fit: {
    transform: [{ scale: 0.9 }]
  },
  emptyFill: {
    backgroundColor: "#fff"
  },
  empty: {
    backgroundColor: "#ccc"
  },
  leftHeart: {
    transform: [{ rotate: "-45deg" }],
    left: 5
  },
  rightHeart: {
    transform: [{ rotate: "45deg" }],
    right: 5
  }
});
