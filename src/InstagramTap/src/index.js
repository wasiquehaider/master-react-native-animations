import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated
} from "react-native";
import DoubleTap from "./DoubleTap";

const w = Dimensions.get("window");

export default class IGDoubleTap extends React.Component {
  state = {
    liked: false
  };

  toggleLike = () => {
    this.setState(state => {
      const newLiked = !state.liked;
      if (newLiked) {
        Animated.sequence([
          Animated.spring(this.animatedValue, {
            toValue: 1
            // useNativeDriver: true
          }),
          Animated.spring(this.animatedValue, {
            toValue: 0
            // userNativeDriver: true
          })
        ]).start();
      }
      return { liked: newLiked };
    });
  };
  lastTap = null;
  animatedValue = new Animated.Value(0);
  handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && now - this.lastTap < DOUBLE_PRESS_DELAY) {
      this.toggleLike();
    } else {
      this.lastTap = now;
    }
  };
  renderOverlay = () => {
    const imageStyles = [
      styles.overlayHeart,
      {
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1.5]
            })
          }
        ]
      }
    ];
    return (
      <View style={styles.overlay}>
        <Animated.Image
          source={require("./images/heart.png")}
          style={imageStyles}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <DoubleTap onDoubleTap={this.toggleLike}>
          <View>
            <Image
              source={{
                uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=${
                  w.width
                }`
              }}
              style={{ width: w.width, height: w.width }}
              resizeMode="cover"
            />
            {this.renderOverlay()}
          </View>
        </DoubleTap>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={this.toggleLike}>
            <Image
              source={
                this.state.liked
                  ? require("./images/heart_3x.png")
                  : require("./images/heart-outline_3x.png")
              }
              style={styles.heartIcon}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  iconRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  heartIcon: {
    width: 20,
    height: 20
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  overlayHeart: {
    tintColor: "#fff"
  }
});
