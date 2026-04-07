import { useEffect, useRef } from "react";
import { View, Image, Animated } from "react-native";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Logo grows big on load
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <View className="flex-1 items-center justify-center bg-white">
      <Animated.Image
        source={require("../assets/images/Logo.png")}
        style={{ width: 200, height: 200, transform: [{ scale: scaleAnim }] }}
        resizeMode="contain"
      />
    </View>
  );
}