import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../constants/color'

const LoginScreen = ({ initialPhone = '', onSendOtp, isLoading = false }) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhone)
  const [isFocused, setIsFocused] = useState(false)
  const isValid = phoneNumber.length === 10

  // Animations
  const logoScale = useRef(new Animated.Value(0.8)).current
  const logoOpacity = useRef(new Animated.Value(0)).current
  const titleSlide = useRef(new Animated.Value(20)).current
  const titleOpacity = useRef(new Animated.Value(0)).current
  const formSlide = useRef(new Animated.Value(40)).current
  const formOpacity = useRef(new Animated.Value(0)).current
  const footerOpacity = useRef(new Animated.Value(0)).current
  const buttonScale = useRef(new Animated.Value(1)).current

  // Floating glow animations
  const glow1Y = useRef(new Animated.Value(0)).current
  const glow2Y = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Staggered entry
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 5, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(titleSlide, { toValue: 0, friction: 7, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(formSlide, { toValue: 0, friction: 7, useNativeDriver: true }),
        Animated.timing(formOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(footerOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start()

    // Floating glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow1Y, { toValue: -20, duration: 3000, useNativeDriver: true }),
        Animated.timing(glow1Y, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start()
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow2Y, { toValue: 15, duration: 4000, useNativeDriver: true }),
        Animated.timing(glow2Y, { toValue: 0, duration: 4000, useNativeDriver: true }),
      ])
    ).start()
  }, [])

  const handleSendOtp = () => {
    if (isValid && !isLoading) {
      Animated.sequence([
        Animated.timing(buttonScale, { toValue: 0.92, duration: 100, useNativeDriver: true }),
        Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }),
      ]).start(() => onSendOtp?.(phoneNumber))
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      {/* Floating Background Glows */}
      <Animated.View 
        className="absolute w-[200px] h-[200px] rounded-full bg-[#9d5ce9]/10 -top-10 -right-[60px]" 
        style={{ transform: [{ translateY: glow1Y }] }} 
      />
      <Animated.View 
        className="absolute w-[250px] h-[250px] rounded-full bg-[#7c4dff]/5 bottom-[100px] -left-[80px]" 
        style={{ transform: [{ translateY: glow2Y }] }} 
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 px-7 pt-[60px] pb-[30px]">

            {/* Logo */}
            <Animated.View 
              className="items-center mb-6" 
              style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}
            >
              <View className="p-4 rounded-[40px] bg-[#9d5ce9]/10">
                <View className="bg-[#121214] p-3 rounded-[32px] border border-[#9d5ce9]/20">
                  <Image 
                    source={require('../../../assets/images/Logo.png')} 
                    className="w-20 h-20" 
                    resizeMode="contain" 
                  />
                </View>
              </View>
            </Animated.View>

            {/* Title */}
            <Animated.View 
              className="items-center mb-12" 
              style={{ opacity: titleOpacity, transform: [{ translateY: titleSlide }] }}
            >
              <Text className="text-[38px] font-extrabold text-white tracking-tighter">Speakyfy</Text>
              <Text className="text-[10px] text-zinc-500 tracking-[5px] mt-2 font-semibold uppercase">
                THE FUTURE OF LINGUISTICS
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View 
              className="mb-10" 
              style={{ opacity: formOpacity, transform: [{ translateY: formSlide }] }}
            >
              <Text className="text-[11px] text-zinc-500 tracking-[2px] text-center mb-5 font-medium uppercase">
                ENTER YOUR MOBILE NUMBER
              </Text>

              <View className={`flex-row items-center bg-[#121214] rounded-[20px] h-[62px] px-5 border-[1.5px] mb-5 ${isFocused ? 'border-[#9d5ce9]/60 bg-[#15151a]' : 'border-zinc-800/80'}`}>
                <Ionicons name="call-outline" size={20} color="#9d5ce9" />
                <Text className="text-white text-base font-semibold ml-3">+91</Text>
                <View className="w-[1px] h-6 bg-zinc-800 mx-3.5" />
                <TextInput
                  className="flex-1 text-white text-lg font-medium tracking-[2px]"
                  placeholder="00000 00000"
                  placeholderTextColor="#3a3a3c"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
                  selectionColor="#9d5ce9"
                />
                {isValid && (
                  <View className="ml-2">
                    <Ionicons name="checkmark-circle" size={22} color="#22c55e" />
                  </View>
                )}
              </View>

              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable onPress={handleSendOtp} disabled={!isValid || isLoading}>
                  <LinearGradient
                    colors={isValid ? [COLORS.secondary, COLORS.primary] : ['#1c1c1e', '#1c1c1e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className={`h-[58px] rounded-[20px] flex-row items-center justify-center gap-2.5 ${!isValid ? 'border border-zinc-800' : ''}`}
                  >
                    <Ionicons name={isLoading ? "sync-outline" : "arrow-forward"} size={20} color={isValid ? '#fff' : '#4a4a4c'} />
                    <Text className={`text-base font-bold tracking-[0.5px] ${isValid ? 'text-white' : 'text-[#4a4a4c]'}`}>
                      {isLoading ? 'Sending...' : 'Send OTP'}
                    </Text>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            </Animated.View>

            {/* Footer */}
            <Animated.View 
              className="mt-auto items-center pt-5" 
              style={{ opacity: footerOpacity }}
            >
              <View className="w-10 h-0.5 bg-[#1c1c1e] rounded-full mb-4" />
              <Text className="text-[#3a3a3c] text-[11px]">By continuing, you agree to our</Text>
              <Text className="text-[#9d5ce9] text-[11px] font-semibold mt-1">Terms of Service & Privacy Policy</Text>
            </Animated.View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

