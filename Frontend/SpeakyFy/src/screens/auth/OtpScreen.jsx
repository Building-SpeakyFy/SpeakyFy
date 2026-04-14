import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  TextInput,
  Text,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../../../constants/color'

const { width } = Dimensions.get('window')
const OTP_LENGTH = 4

const OtpScreen = ({ onVerify, onBack }) => {
  const [timer, setTimer] = useState(30)
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [isVerifying, setIsVerifying] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)

  const inputs = useRef([])

  // Entry animations
  const headerFade = useRef(new Animated.Value(0)).current
  const headerSlide = useRef(new Animated.Value(-30)).current
  const iconScale = useRef(new Animated.Value(0)).current
  const iconRotate = useRef(new Animated.Value(0)).current
  const ringScale = useRef(new Animated.Value(0.5)).current
  const ringOpacity = useRef(new Animated.Value(0)).current
  const titleFade = useRef(new Animated.Value(0)).current
  const titleSlide = useRef(new Animated.Value(25)).current
  const boxAnims = useRef(Array(OTP_LENGTH).fill(null).map(() => ({
    translateY: new Animated.Value(50),
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.5),
  }))).current
  const bottomFade = useRef(new Animated.Value(0)).current
  const bottomSlide = useRef(new Animated.Value(40)).current

  // Pulse animation for filled boxes
  const pulseAnims = useRef(Array(OTP_LENGTH).fill(null).map(() => new Animated.Value(1))).current

  // Floating orbs
  const orb1 = useRef(new Animated.Value(0)).current
  const orb2 = useRef(new Animated.Value(0)).current
  const orb3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Floating orbs
    const floatOrb = (anim, duration) => {
      Animated.loop(Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration, useNativeDriver: true }),
      ])).start()
    }
    floatOrb(orb1, 3000)
    floatOrb(orb2, 4000)
    floatOrb(orb3, 3500)

    // Back button
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(headerSlide, { toValue: 0, friction: 8, useNativeDriver: true }),
    ]).start()

    // Ring pulse in
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(ringScale, { toValue: 1, friction: 4, useNativeDriver: true }),
        Animated.timing(ringOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start()
    }, 200)

    // Icon pop with rotation
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(iconScale, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }),
        Animated.timing(iconRotate, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]).start()
    }, 400)

    // Title slide
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(titleSlide, { toValue: 0, friction: 7, useNativeDriver: true }),
      ]).start()
    }, 600)

    // OTP boxes fly in + auto-focus first box
    setTimeout(() => {
      Animated.stagger(100, boxAnims.map(({ translateY, opacity, scale }) =>
        Animated.parallel([
          Animated.spring(translateY, { toValue: 0, friction: 5, tension: 80, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
        ])
      )).start(() => {
        // Auto-focus first input after boxes animate in
        inputs.current[0]?.focus()
      })
    }, 800)

    // Bottom section
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(bottomFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(bottomSlide, { toValue: 0, friction: 7, useNativeDriver: true }),
      ]).start()
    }, 1200)
    // Timer countdown starts automatically via useEffect
  }, [])

  // Timer countdown
  useEffect(() => {
    if (timer === 0) return
    const interval = setInterval(() => setTimer((p) => p - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  // Pulse animation when digit is entered
  const triggerPulse = (index) => {
    Animated.sequence([
      Animated.timing(pulseAnims[index], { toValue: 1.15, duration: 100, useNativeDriver: true }),
      Animated.spring(pulseAnims[index], { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start()
  }

  const handleOtpInput = (value, index) => {
    // Handle paste
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, OTP_LENGTH).split('')
      const newOtp = [...otp]
      pasted.forEach((digit, i) => { if (i < OTP_LENGTH) newOtp[i] = digit })
      setOtp(newOtp)
      
      pasted.forEach((_, i) => triggerPulse(i))
      
      const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1)
      inputs.current[nextIndex]?.focus()
      setFocusedIndex(nextIndex)
      return
    }

    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value) {
      triggerPulse(index)
      if (index < OTP_LENGTH - 1) {
        inputs.current[index + 1]?.focus()
        setFocusedIndex(index + 1)
      }
    } else {
      if (index > 0) {
        inputs.current[index - 1]?.focus()
        setFocusedIndex(index - 1)
      }
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
      setFocusedIndex(index - 1)
    }
  }

  const isComplete = otp.every((d) => d !== '')

  const handleVerify = () => {
    if (!isComplete) return
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      onVerify?.(otp.join(''))
    }, 1200)
  }

  const spin = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const orb1Y = orb1.interpolate({ inputRange: [0, 1], outputRange: [0, -18] })
  const orb2Y = orb2.interpolate({ inputRange: [0, 1], outputRange: [0, 14] })
  const orb3Y = orb3.interpolate({ inputRange: [0, 1], outputRange: [0, -10] })

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      {/* Atmospheric orbs */}
      <Animated.View 
        className="absolute w-[220px] h-[220px] rounded-full bg-[#9d5ce9]/10 -top-[30px] -right-[70px]" 
        style={{ transform: [{ translateY: orb1Y }] }} 
      />
      <Animated.View 
        className="absolute w-[180px] h-[180px] rounded-full bg-[#7c4dff]/5 bottom-[140px] -left-[60px]" 
        style={{ transform: [{ translateY: orb2Y }] }} 
      />
      <Animated.View 
        className="absolute w-[120px] h-[120px] rounded-full bg-[#b47cff]/5 top-[300px] left-10" 
        style={{ transform: [{ translateY: orb3Y }] }} 
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="flex-1 px-7">

          {/* Back */}
          <Animated.View style={{ opacity: headerFade, transform: [{ translateY: headerSlide }] }}>
            <Pressable onPress={onBack} className="flex-row items-center mt-3 mb-1 self-start">
              <View className="w-9 h-9 rounded-full bg-[#9d5ce9]/10 items-center justify-center mr-2">
                <Ionicons name="chevron-back" size={18} color="#9d5ce9" />
              </View>
              <Text className="text-zinc-500 text-sm font-medium">Back</Text>
            </Pressable>
          </Animated.View>

          {/* Shield Icon with Ring */}
          <View className="items-center mt-7 mb-6">
            <Animated.View 
              className="w-[110px] h-[110px] rounded-full bg-[#9d5ce9]/5 items-center justify-center" 
              style={{ opacity: ringOpacity, transform: [{ scale: ringScale }] }}
            >
              <Animated.View 
                className="w-20 h-20 rounded-full overflow-hidden" 
                style={{ transform: [{ scale: iconScale }, { rotate: spin }] }}
              >
                <LinearGradient
                  colors={[COLORS.secondary, COLORS.primary, COLORS.secondary]}
                  className="w-20 h-20 rounded-full items-center justify-center"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="shield-checkmark" size={36} color="#fff" />
                </LinearGradient>
              </Animated.View>
            </Animated.View>
          </View>

          {/* Title */}
          <Animated.View 
            className="items-center mb-9" 
            style={{ opacity: titleFade, transform: [{ translateY: titleSlide }] }}
          >
            <Text className="text-[28px] font-extrabold text-white tracking-tight">Verification Code</Text>
            <Text className="text-sm text-zinc-500 mt-2 text-center leading-5 px-4">
              Enter the 4-digit code sent to your phone
            </Text>
          </Animated.View>

          {/* OTP Boxes */}
          <View className="flex-row justify-center gap-4 mb-8">
            {otp.map((digit, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: boxAnims[index].opacity,
                  transform: [
                    { translateY: boxAnims[index].translateY },
                    { scale: Animated.multiply(boxAnims[index].scale, pulseAnims[index]) },
                  ],
                }}
              >
                <View className={`w-[74px] h-[88px] rounded-[24px] bg-[#161618] border-[2.5px] items-center justify-center overflow-hidden 
                  ${focusedIndex === index ? 'border-[#9d5ce9] bg-[#1a1525]' : digit !== '' ? 'border-[#9d5ce9]/50 bg-[#18132a]' : 'border-[#2a2a2e]'}`}>
                  {focusedIndex === index && (
                    <View className="absolute w-full h-full bg-[#9d5ce9]/5" />
                  )}
                  <TextInput
                    ref={(ref) => (inputs.current[index] = ref)}
                    className="w-full h-full text-center text-white text-[32px] font-extrabold"
                    value={digit}
                    onFocus={() => setFocusedIndex(index)}
                    onChangeText={(val) => handleOtpInput(val, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    maxLength={1}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    selectionColor="#9d5ce9"
                  />
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Timer with progress bar */}
          <Animated.View 
            className="items-stretch" 
            style={{ opacity: bottomFade, transform: [{ translateY: bottomSlide }] }}
          >
            <View className="bg-[#111113] rounded-2xl p-4 border border-[#1c1c1e] overflow-hidden">
              <View className="flex-row items-center gap-2">
                <Ionicons name="time-outline" size={16} color="#71717a" />
                {timer > 0 ? (
                  <Text className="text-zinc-500 text-[13px] font-medium">
                    Code expires in <Text className="text-[#9d5ce9] font-bold">{timer}s</Text>
                  </Text>
                ) : (
                  <Pressable onPress={() => { setTimer(30); }}>
                    <Text className="text-[#9d5ce9] text-[13px] font-bold">Tap to Resend Code</Text>
                  </Pressable>
                )}
              </View>
            </View>
            
            {/* Verify Button */}
            <Pressable onPress={handleVerify} disabled={!isComplete || isVerifying} className="mt-7">
              <LinearGradient
                colors={isComplete ? [COLORS.secondary, COLORS.primary, COLORS.secondary] : ['#1c1c1e', '#1c1c1e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className={`h-[60px] rounded-[20px] flex-row items-center justify-center gap-2.5 ${!isComplete ? 'border-[1.5px] border-zinc-800' : ''}`}
              >
                {isVerifying ? (
                  <>
                    <Ionicons name="sync-outline" size={20} color="#fff" />
                    <Text className="text-white text-base font-bold tracking-[0.3px]">Verifying...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="shield-checkmark-outline" size={20} color={isComplete ? '#fff' : '#52525b'} />
                    <Text className={`text-base font-bold tracking-[0.3px] ${isComplete ? 'text-white' : 'text-zinc-600'}`}>
                      Verify & Continue
                    </Text>
                  </>
                )}
              </LinearGradient>
            </Pressable>

            {/* Security note */}
            <View className="flex-row items-center justify-center gap-1.5 mt-5">
              <Ionicons name="lock-closed-outline" size={12} color="#3f3f46" />
              <Text className="text-[#3f3f46] text-[11px] font-medium">End-to-end encrypted verification</Text>
            </View>
          </Animated.View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default OtpScreen

