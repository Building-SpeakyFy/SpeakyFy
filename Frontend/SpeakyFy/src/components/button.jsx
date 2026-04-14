import React from 'react';
import { Pressable, Text, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/color';

/**
 * Reusable Speakyfy Button with LinearGradient and scale animation.
 */
export const SpeakyfyButton = ({ 
  onPress, 
  title, 
  disabled = false, 
  loading = false,
  children,
  className
}) => {
  const buttonScale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  };

  const activeColors = ['#7c4dff', '#9d5ce9'];
  const disabledColors = ['#3f3f46', '#3f3f46']; // zinc-800

  return (
    <Animated.View className={className} style={{ transform: [{ scale: buttonScale }] }}>
      <Pressable 
        disabled={disabled || loading} 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient
          colors={disabled ? disabledColors : activeColors}
          className="rounded-2xl h-14 items-center justify-center flex-row"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
             <Text className="text-white font-bold">Please wait...</Text>
          ) : (
            <View className="flex-row items-center justify-center">
              {children}
              <Text 
                className={`font-bold text-base ${disabled ? 'text-zinc-500' : 'text-white'}`}
              >
                {title}
              </Text>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
