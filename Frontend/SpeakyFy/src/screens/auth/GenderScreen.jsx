import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker'
import { COLORS } from '../../constants/color'

const { width } = Dimensions.get('window')

const GenderScreen = ({ initialGender, initialFullName, initialDob, onProceed, onBack }) => {
  const [gender, setGender] = useState(initialGender || '')
  const [fullName, setFullName] = useState(initialFullName || '')
  const [dob, setDob] = useState(initialDob || '')
  const [showPicker, setShowPicker] = useState(false)
  const [nameFocused, setNameFocused] = useState(false)

  // Section animations
  const anims = useRef([...Array(7)].map(() => ({
    opacity: new Animated.Value(0),
    slide: new Animated.Value(30),
  }))).current

  // Gender card scale animation
  const maleScale = useRef(new Animated.Value(1)).current
  const femaleScale = useRef(new Animated.Value(1)).current

  // Progress bar
  const progressWidth = useRef(new Animated.Value(0)).current

  // Floating orbs
  const orb1 = useRef(new Animated.Value(0)).current
  const orb2 = useRef(new Animated.Value(0)).current

  // Button
  const buttonScale = useRef(new Animated.Value(1)).current

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(2000, 0, 1);
    const [d, m, y] = dateStr.split(' / ').map(Number);
    return new Date(y, m - 1, d);
  };

  const [dateValue, setDateValue] = useState(parseDate(initialDob));

  useEffect(() => {
    // Stagger entries
    Animated.stagger(100,
      anims.map(({ opacity, slide }) =>
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.spring(slide, { toValue: 0, friction: 7, useNativeDriver: true }),
        ])
      )
    ).start()

    // Float orbs
    const float = (anim, dur) => {
      Animated.loop(Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: dur, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: dur, useNativeDriver: true }),
      ])).start()
    }
    float(orb1, 3500)
    float(orb2, 4500)
  }, [])

  // Animate progress when fields complete
  useEffect(() => {
    let completed = 0
    if (fullName.trim().length > 0) completed++
    if (gender !== '') completed++
    if (dob !== '') completed++
    Animated.spring(progressWidth, {
      toValue: completed / 3,
      friction: 8,
      useNativeDriver: false,
    }).start()
  }, [fullName, gender, dob])

  const handleGenderSelect = (g) => {
    setGender(g)
    const anim = g === 'male' ? maleScale : femaleScale
    Animated.sequence([
      Animated.timing(anim, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.spring(anim, { toValue: 1, friction: 3, tension: 200, useNativeDriver: true }),
    ]).start()
  }

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false)
    if (selectedDate) {
      setDateValue(selectedDate)
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const year = selectedDate.getFullYear()
      setDob(`${day} / ${month} / ${year}`)
    }
  }

  const canProceed = fullName.trim().length > 0 && gender !== '' && dob !== ''

  const handleProceed = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start(() => onProceed?.({ gender, fullName, dob }))
  }

  const orb1Y = orb1.interpolate({ inputRange: [0, 1], outputRange: [0, -16] })
  const orb2Y = orb2.interpolate({ inputRange: [0, 1], outputRange: [0, 12] })

  const animProgressWidth = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      {/* Orbs */}
      <Animated.View 
        className="absolute w-[230px] h-[230px] rounded-full bg-[#9d5ce9]/5 bottom-[50px] -right-[70px]" 
        style={{ transform: [{ translateY: orb1Y }] }} 
      />
      <Animated.View 
        className="absolute w-[160px] h-[160px] rounded-full bg-[#7c4dff]/5 top-[100px] -left-[50px]" 
        style={{ transform: [{ translateY: orb2Y }] }} 
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-7 pb-[30px]">

            {/* Back */}
            <Animated.View style={{ opacity: anims[0].opacity, transform: [{ translateY: anims[0].slide }] }}>
              <Pressable onPress={onBack} className="flex-row items-center mt-3 mb-1 self-start">
                <View className="w-9 h-9 rounded-full bg-[#9d5ce9]/10 items-center justify-center mr-2">
                  <Ionicons name="chevron-back" size={18} color="#9d5ce9" />
                </View>
                <Text className="text-zinc-500 text-sm font-medium">Back</Text>
              </Pressable>
            </Animated.View>

            {/* Progress Bar */}
            <Animated.View 
              className="mt-5 mb-6" 
              style={{ opacity: anims[1].opacity, transform: [{ translateY: anims[1].slide }] }}
            >
              <View className="flex-row justify-between mb-2.5">
                <Text className="text-zinc-500 text-xs font-semibold tracking-[0.5px]">Profile Setup</Text>
                <Text className="text-[#9d5ce9] text-xs font-bold">
                  {[fullName.trim().length > 0, gender !== '', dob !== ''].filter(Boolean).length}/3
                </Text>
              </View>
              <View className="h-1 bg-[#1c1c1e] rounded-full overflow-hidden">
                <Animated.View style={{ height: '100%', borderRadius: 2, overflow: 'hidden', width: animProgressWidth }}>
                  <LinearGradient
                    colors={[COLORS.secondary, COLORS.primary, COLORS.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="flex-1"
                  />
                </Animated.View>
              </View>
            </Animated.View>

            {/* Header */}
            <Animated.View 
              className="mb-7" 
              style={{ opacity: anims[2].opacity, transform: [{ translateY: anims[2].slide }] }}
            >
              <Text className="text-[30px] font-extrabold text-white tracking-tight">About You</Text>
              <Text className="text-sm text-zinc-600 mt-1.5">Help us personalize your experience</Text>
            </Animated.View>

            {/* Name Input */}
            <Animated.View style={{ opacity: anims[3].opacity, transform: [{ translateY: anims[3].slide }] }}>
              <Text className="text-[10px] color-[#71717a] tracking-[2.5px] font-bold mb-2.5 ml-1 uppercase">FULL NAME</Text>
              <View className={`flex-row items-center bg-[#111113] rounded-2xl h-[60px] px-1 border-[1.5px] mb-6 ${nameFocused ? 'border-[#9d5ce9]/40 bg-[#13101a]' : 'border-[#1c1c1e]'}`}>
                <View className="w-10 h-10 rounded-xl bg-[#9d5ce9]/10 items-center justify-center mr-1 ml-1.5">
                  <Ionicons name="person" size={18} color="#9d5ce9" />
                </View>
                <TextInput
                  className="flex-1 text-white text-base ml-2"
                  placeholder="What should we call you?"
                  placeholderTextColor="#3a3a3c"
                  value={fullName}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  onChangeText={setFullName}
                  selectionColor="#9d5ce9"
                />
                {fullName.length > 2 && (
                  <Animated.View className="mr-3">
                    <Ionicons name="checkmark-circle" size={22} color="#22c55e" />
                  </Animated.View>
                )}
              </View>
            </Animated.View>

            {/* Gender */}
            <Animated.View style={{ opacity: anims[4].opacity, transform: [{ translateY: anims[4].slide }] }}>
              <Text className="text-[10px] color-[#71717a] tracking-[2.5px] font-bold mb-2.5 ml-1 uppercase">GENDER</Text>
              <View className="flex-row gap-3.5 mb-6">
                {/* Male Card */}
                <Animated.View className="flex-1" style={{ transform: [{ scale: maleScale }] }}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleGenderSelect('male')}
                    className={`bg-[#111113] rounded-[24px] py-6 items-center border-2 overflow-hidden relative ${gender === 'male' ? 'border-[#9d5ce9]' : 'border-[#1c1c1e]'}`}
                  >
                    {gender === 'male' && (
                      <LinearGradient
                        colors={['rgba(157, 92, 233, 0.12)', 'rgba(124, 77, 255, 0.04)']}
                        className="absolute top-0 left-0 right-0 bottom-0"
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      />
                    )}
                    <View className={`w-[60px] h-[60px] rounded-2xl items-center justify-center mb-3 ${gender === 'male' ? 'bg-[#9d5ce9]/10' : 'bg-[#1c1c1e]'}`}>
                      <Ionicons name="male" size={30} color={gender === 'male' ? '#9d5ce9' : '#52525b'} />
                    </View>
                    <Text className={`text-sm font-bold ${gender === 'male' ? 'text-white' : 'text-zinc-600'}`}>Male</Text>
                    {gender === 'male' && (
                      <View className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#9d5ce9] items-center justify-center">
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                </Animated.View>

                {/* Female Card */}
                <Animated.View className="flex-1" style={{ transform: [{ scale: femaleScale }] }}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleGenderSelect('female')}
                    className={`bg-[#111113] rounded-[24px] py-6 items-center border-2 overflow-hidden relative ${gender === 'female' ? 'border-[#9d5ce9]' : 'border-[#1c1c1e]'}`}
                  >
                    {gender === 'female' && (
                      <LinearGradient
                        colors={['rgba(157, 92, 233, 0.12)', 'rgba(124, 77, 255, 0.04)']}
                        className="absolute top-0 left-0 right-0 bottom-0"
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      />
                    )}
                    <View className={`w-[60px] h-[60px] rounded-2xl items-center justify-center mb-3 ${gender === 'female' ? 'bg-[#9d5ce9]/10' : 'bg-[#1c1c1e]'}`}>
                      <Ionicons name="female" size={30} color={gender === 'female' ? '#9d5ce9' : '#52525b'} />
                    </View>
                    <Text className={`text-sm font-bold ${gender === 'female' ? 'text-white' : 'text-zinc-600'}`}>Female</Text>
                    {gender === 'female' && (
                      <View className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#9d5ce9] items-center justify-center">
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Animated.View>

            {/* DOB */}
            <Animated.View style={{ opacity: anims[5].opacity, transform: [{ translateY: anims[5].slide }] }}>
              <Text className="text-[10px] color-[#71717a] tracking-[2.5px] font-bold mb-2.5 ml-1 uppercase">DATE OF BIRTH</Text>
              
              {Platform.OS === 'web' ? (
                <View className="flex-row items-center bg-[#111113] rounded-2xl h-[60px] px-1 border-[1.5px] border-[#1c1c1e] mb-8">
                  <View className="w-10 h-10 rounded-xl bg-[#9d5ce9]/10 items-center justify-center mr-1 ml-1.5">
                    <Ionicons name="calendar" size={18} color="#9d5ce9" />
                  </View>
                  <TextInput
                    className="flex-1 text-white text-base ml-2 font-medium"
                    placeholder="DD / MM / YYYY"
                    placeholderTextColor="#52525b"
                    value={dob}
                    onChangeText={(text) => {
                      let cleaned = text.replace(/[^0-9]/g, '');
                      if (cleaned.length > 8) cleaned = cleaned.substring(0, 8);
                      let formatted = cleaned;
                      if (cleaned.length > 2) {
                        formatted = cleaned.substring(0, 2) + ' / ' + cleaned.substring(2);
                      }
                      if (cleaned.length > 4) {
                        formatted = formatted.substring(0, 7) + ' / ' + cleaned.substring(4);
                      }
                      setDob(formatted);
                    }}
                    maxLength={14}
                  />
                </View>
              ) : (
                <TouchableOpacity onPress={() => setShowPicker(true)} className="flex-row items-center bg-[#111113] rounded-2xl h-[60px] px-1 border-[1.5px] border-[#1c1c1e] mb-8" activeOpacity={0.7}>
                  <View className="w-10 h-10 rounded-xl bg-[#9d5ce9]/10 items-center justify-center mr-1 ml-1.5">
                    <Ionicons name="calendar" size={18} color="#9d5ce9" />
                  </View>
                  <Text className={`flex-1 text-base ml-2 font-medium ${!dob ? 'text-[#3a3a3c]' : 'text-white'}`}>
                    {dob || 'Select your birth date'}
                  </Text>
                  <View className="w-8 h-8 rounded-lg bg-[#1c1c1e] items-center justify-center mr-1.5">
                    <Ionicons name="chevron-down" size={16} color="#52525b" />
                  </View>
                </TouchableOpacity>
              )}
            </Animated.View>

            {showPicker && Platform.OS !== 'web' && (
              <DateTimePicker
                value={dateValue}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}

            {/* Continue Button */}
            <Animated.View 
              className="mt-auto pt-2" 
              style={[
                { opacity: anims[6].opacity, transform: [{ translateY: anims[6].slide }, { scale: buttonScale }] }
              ]}
            >
              <Pressable onPress={handleProceed} disabled={!canProceed}>
                <LinearGradient
                  colors={canProceed ? [COLORS.secondary, COLORS.primary, COLORS.secondary] : ['#1c1c1e', '#1c1c1e']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className={`h-[60px] rounded-[20px] flex-row items-center justify-center gap-3.5 ${!canProceed ? 'border-[1.5px] border-zinc-800' : ''}`}
                >
                  <Text className={`text-[17px] font-bold tracking-[0.3px] ${canProceed ? 'text-white' : 'text-zinc-600'}`}>
                    Continue
                  </Text>
                  <View className={`w-[34px] h-[34px] rounded-xl items-center justify-center ${canProceed ? 'bg-white/20' : 'bg-zinc-800'}`}>
                    <Ionicons name="arrow-forward" size={18} color={canProceed ? '#9d5ce9' : '#52525b'} />
                  </View>
                </LinearGradient>
              </Pressable>
            </Animated.View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default GenderScreen

