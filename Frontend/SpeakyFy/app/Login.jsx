import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

const Login = () => {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const isValid = phoneNumber.length === 10
  const hasStarted = phoneNumber.length > 0
  const hasError = hasStarted && phoneNumber.length < 10

  // Animations
  const logoScale = useRef(new Animated.Value(0.9)).current
  const logoOpacity = useRef(new Animated.Value(0)).current
  const formSlide = useRef(new Animated.Value(40)).current
  const formOpacity = useRef(new Animated.Value(0)).current
  const footerOpacity = useRef(new Animated.Value(0)).current
  const buttonScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(formSlide, {
          toValue: 0,
          friction: 8,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleSendOtp = () => {
    if (!isValid) return
    Keyboard.dismiss()

    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/Otp') // make sure this screen exists
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
          {/* 🔥 Background Glow */}
          <View className="absolute w-[100px] h-[100px] bg-purple-500/20 rounded-full top-[600px] left-[30px]" />
            <View className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full top-[500px] right-[20px]" />
            {/*bottom circle */}
            <View className="absolute w-[300px] h-[300px] bg-purple-500/20 rounded-full bottom-[-100px] left-[30px]" />
            <View className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full bottom-[-100px] right-[20px]" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-7 pt-12 pb-8">

            {/* Logo */}
            <Animated.View
              className="items-center mb-12"
              style={{
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              }}
            >
              <View className="relative items-center justify-center mb-7">
                <View className="absolute w-44 h-44 rounded-full bg-[#9d5ce9]/10" />
                <View className="absolute w-40 h-40 rounded-full bg-[#9d5ce9]/5" />
                <View className="bg-[#9d5ce9]/15 p-3.5 rounded-full">
                  <Image
                    source={require('../assets/images/Logo.png')}
                    className="w-28 h-28 rounded-full"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <Text className="text-4xl text-white font-bold">
                Speakyfy
              </Text>

              <Text className="text-gray-500 text-xs mt-2 uppercase tracking-[4px]">
                The Future of Linguistics
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View
              style={{
                opacity: formOpacity,
                transform: [{ translateY: formSlide }],
              }}
            >
              <Text className="text-gray-400 text-xs text-center mb-5 uppercase">
                Enter your mobile number
              </Text>

              {/* Input */}
              <View
                className={`flex-row items-center bg-[#121212] rounded-2xl h-16 px-5 border ${
                  hasError
                    ? 'border-red-500/50'
                    : isFocused
                    ? 'border-[#9d5ce9]/60'
                    : 'border-gray-800/60'
                }`}
              >
                <Ionicons name="call-outline" size={18} color="#9d5ce9" />
                <Text className="text-white ml-3 mr-2">+91</Text>

                <TextInput
                  className="flex-1 text-white"
                  placeholder="0000000000"
                  placeholderTextColor="#3a3a3a"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  maxLength={10}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChangeText={(text) =>
                    setPhoneNumber(text.replace(/[^0-9]/g, ''))
                  }
                />
              </View>

              {/* Error */}
              {hasError && (
                <Text className="text-red-500 text-xs mt-2">
                  Enter valid 10-digit number
                </Text>
              )}

              {/* Button */}
              <Animated.View
                className="mt-8"
                style={{ transform: [{ scale: buttonScale }] }}
              >
                <Pressable disabled={!isValid} onPress={handleSendOtp}>
                  <LinearGradient
                    colors={
                      isValid
                        ? ['#7c4dff', '#9d5ce9']
                        : ['#2a2a3a', '#2a2a3a']
                    }
                    className="rounded-2xl h-14 items-center justify-center"
                  >
                    <Text className="text-white font-bold">
                      Send OTP
                    </Text>
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              className="mt-auto pt-8 items-center"
              style={{ opacity: footerOpacity }}
            >
              <Text className="text-gray-600 text-xs text-center">
                Terms & Privacy Policy
              </Text>
            </Animated.View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login