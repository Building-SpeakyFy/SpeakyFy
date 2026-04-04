import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Image,
  TextInput,
  Text,
  Pressable,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const OTP_LENGTH = 4

const Otp = () => {
  const router = useRouter()
  const [timer, setTimer] = useState(30)
  const [isResendEnabled, setIsResendEnabled] = useState(false)
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [isVerifying, setIsVerifying] = useState(false)

  const inputs = useRef([])

  // Animations
  const logoScale = useRef(new Animated.Value(0.7)).current
  const logoOpacity = useRef(new Animated.Value(0)).current
  const formSlide = useRef(new Animated.Value(50)).current
  const formOpacity = useRef(new Animated.Value(0)).current
  const shakeAnim = useRef(new Animated.Value(0)).current
  const inputAnims = useRef(
    Array(OTP_LENGTH)
      .fill(null)
      .map(() => new Animated.Value(0))
  ).current

  // Intro animation
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
          duration: 500,
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
    ]).start()

    // Staggered input box entrance
    Animated.stagger(
      100,
      inputAnims.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        })
      )
    ).start()
  }, [])

  // Timer countdown
  useEffect(() => {
    if (timer === 0) {
      setIsResendEnabled(true)
      return
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  // Handle resend
  const handleResend = () => {
    setTimer(30)
    setIsResendEnabled(false)
    setOtp(Array(OTP_LENGTH).fill(''))
    inputs.current[0]?.focus()

    // Re-trigger stagger animation
    inputAnims.forEach((anim) => anim.setValue(0))
    Animated.stagger(
      100,
      inputAnims.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        })
      )
    ).start()
  }

  // Handle OTP input
  const handleChange = (value, index) => {
    // Handle paste (full OTP)
    if (value.length > 1) {
      const pasted = value.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH).split('')
      const newOtp = [...otp]
      pasted.forEach((digit, i) => {
        if (i < OTP_LENGTH) newOtp[i] = digit
      })
      setOtp(newOtp)
      inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
      return
    }

    // Accept only digits
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Pop animation on digit entry
    if (value) {
      Animated.sequence([
        Animated.timing(inputAnims[index], {
          toValue: 1.15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(inputAnims[index], {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start()
    }

    // Auto-advance
    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  // Backspace navigation
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const isOtpComplete = otp.every((d) => d !== '')

  // Shake animation for invalid
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start()
  }

  // Verify OTP
  const handleVerify = () => {
    if (!isOtpComplete) {
      triggerShake()
      return
    }
    Keyboard.dismiss()
    setIsVerifying(true)

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
      console.log('OTP Verified:', otp.join(''))
       router.push('/Gender') // Navigate to next screen
    }, 2000)
  }

  // Format timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
       {/* 🔥 Background Glow */}
                <View className="absolute w-[100px] h-[100px] bg-purple-500/20 rounded-full top-[900px] left-[90px]" />
                  <View className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full top-[-100px] right-[-20px]" />
                  {/*bottom circle */}
                  <View className="absolute w-[300px] h-[300px] bg-purple-500/20 rounded-full bottom-[-100px] left-[30px]" />
                  <View className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full bottom-[-100px] right-[20px]" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-7">

          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center mt-4 mb-2"
            hitSlop={10}
          >
            <Ionicons name="arrow-back" size={22} color="#9d5ce9" />
            <Text className="text-[#9d5ce9] text-sm ml-1 font-medium">
              Back
            </Text>
          </Pressable>

          {/* Logo + Title */}
          <Animated.View
            className="items-center mt-8 mb-8"
            style={{
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }}
          >
            <View className="relative items-center justify-center mb-5">
              <View className="absolute w-36 h-36 rounded-full bg-[#9d5ce9]/10" />
              <View className="bg-[#9d5ce9]/15 p-3 rounded-full">
                <Image
                  source={require('../assets/images/icon.png')}
                  className="w-24 h-24 rounded-full"
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text
              numberOfLines={1}
              className="text-white text-2xl font-bold tracking-wide"
            >
              Verify Your Identity
            </Text>


            <Text className="text-gray-500 text-sm mt-2 text-center leading-5 px-4">
              We've sent a {OTP_LENGTH}-digit verification code to your registered number
            </Text>
          </Animated.View>

          {/* OTP Form */}
          <Animated.View
            style={{
              opacity: formOpacity,
              transform: [{ translateY: formSlide }],
            }}
          >
            {/* OTP Inputs */}
            <Animated.View
              className="flex-row justify-center gap-4 mb-6"
              style={{ transform: [{ translateX: shakeAnim }] }}
            >
              {otp.map((digit, index) => (
                <Animated.View
                  key={index}
                  style={{
                    opacity: inputAnims[index],
                    transform: [{ scale: inputAnims[index] }],
                  }}
                >
                  <TextInput
                    ref={(ref) => (inputs.current[index] = ref)}
                    value={digit}
                    onChangeText={(value) => handleChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    maxLength={1}
                    keyboardType="number-pad"
                    autoFocus={index === 0}
                    className={`w-16 h-16 bg-[#121212] text-white text-2xl text-center rounded-2xl border font-bold ${
                      digit
                        ? 'border-[#9d5ce9]/60'
                        : 'border-gray-800/60'
                    }`}
                    selectionColor="#9d5ce9"
                  />
                </Animated.View>
              ))}
            </Animated.View>

            {/* Timer */}
            <View className="items-center mb-6">
              {timer > 0 ? (
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={16} color="#6b7280" />
                  <Text className="text-gray-500 text-sm ml-2">
                    Resend code in{' '}
                    <Text className="text-[#9d5ce9] font-semibold">
                      {formatTime(timer)}
                    </Text>
                  </Text>
                </View>
              ) : (
                <Text className="text-gray-400 text-sm">
                  Didnt receive a code?
                </Text>
              )}
            </View>

            {/* Resend Button */}
            <Pressable
              disabled={!isResendEnabled}
              onPress={handleResend}
              className="items-center mb-8"
            >
              <View
                className={`flex-row items-center px-5 py-2.5 rounded-full border ${
                  isResendEnabled
                    ? 'border-[#9d5ce9]/40 bg-[#9d5ce9]/10'
                    : 'border-gray-800 bg-transparent opacity-40'
                }`}
              >
                <Ionicons
                  name="refresh"
                  size={16}
                  color={isResendEnabled ? '#9d5ce9' : '#6b7280'}
                />
                <Text
                  className={`text-sm font-semibold ml-2 ${
                    isResendEnabled ? 'text-[#9d5ce9]' : 'text-gray-600'
                  }`}
                >
                  Resend OTP
                </Text>
              </View>
            </Pressable>

            {/* Verify Button */}
            <Pressable
              disabled={!isOtpComplete || isVerifying}
              onPress={handleVerify}
            >
              <LinearGradient
                colors={
                  isOtpComplete && !isVerifying
                    ? ['#7c4dff', '#9d5ce9']
                    : ['#2a2a3a', '#2a2a3a']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className={`rounded-2xl h-14 flex-row items-center justify-center ${
                  !isOtpComplete ? 'opacity-50' : ''
                }`}
              >
                {isVerifying ? (
                  <View className="flex-row items-center">
                    <Ionicons name="sync" size={18} color="#ffffff" />
                    <Text className="text-white text-base font-bold ml-2">
                      Verifying...
                    </Text>
                  </View>
                ) : (
                  <>
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={18}
                      color={isOtpComplete ? '#ffffff' : '#666666'}
                    />
                    
                    <Text
                      className={`text-base font-bold ml-2 tracking-wide ${
                        isOtpComplete ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      Verify & Continue
                    </Text>
                  </>
                )}
              </LinearGradient>
            </Pressable>

            {/* Security Note */}
            <View className="flex-row items-center justify-center mt-6 px-4">
              <Ionicons name="lock-closed" size={12} color="#4b5563" />
              <Text className="text-gray-600 text-[11px] ml-1.5 text-center">
                Your verification is encrypted and secured
              </Text>
            </View>
          </Animated.View>

          {/* Footer */}
          <View className="mt-auto pb-6 items-center">
            <Text className="text-gray-700 text-[10px] tracking-widest uppercase">
              Secured by Speakyfy
            </Text>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Otp