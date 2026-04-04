//Building -1/April/2026
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ProfileScreen() {
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const router = useRouter();

  // 🔥 Animation
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 🔥 Handle Date Change
  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);

    if (selectedDate) {
      setDate(selectedDate);

      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();

      setDob(`${day} / ${month} / ${year}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0b] px-6">

      {/* 🔥 Background Glow */}
      <View className="absolute w-[300px] h-[300px] bg-purple-500/20 rounded-full bottom-[-100px] left-[30px]" />
      <View className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full bottom-[-100px] right-[20px]" />

      {/* 🔥 Content */}
      <Animated.View
        style={{
          opacity: fade,
          transform: [{ translateY: slide }],
        }}
        className="flex-1 pt-10"
      >

        {/* 🔹 Back Button */}
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center mt-4 mb-2"
        >
          <Ionicons name="arrow-back" size={22} color="#9d5ce9" />
          <Text className="text-[#9d5ce9] text-sm ml-1">Back</Text>
        </Pressable>

        {/* 🔹 Subtitle */}
        <Text className="text-gray-500 mb-8">
          Personalize your linguistic journey
        </Text>

        {/* 🔹 Full Name */}
        <Text className="text-xs text-gray-500 mb-2 uppercase">
          Full Name
        </Text>

        <View className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-6">
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#666"
            className="text-white"
          />
        </View>

        {/* 🔹 Gender */}
        <Text className="text-xs text-gray-500 mb-2 uppercase">
          Select Gender
        </Text>

        <View className="flex-row justify-between mb-6">

          {/* Male */}
          <TouchableOpacity
            onPress={() => setGender("male")}
            className={`w-[48%] p-5 rounded-2xl items-center ${
              gender === "male"
                ? "border border-blue-500 bg-blue-500/10"
                : "bg-white/5"
            }`}
          >
            <Text className="text-2xl text-blue-400">♂</Text>
            <Text className="text-white mt-2">Male</Text>
          </TouchableOpacity>

          {/* Female */}
          <TouchableOpacity
            onPress={() => setGender("female")}
            className={`w-[48%] p-5 rounded-2xl items-center ${
              gender === "female"
                ? "border border-purple-500 bg-purple-500/10"
                : "bg-white/5"
            }`}
          >
            <Text className="text-2xl text-purple-400">♀</Text>
            <Text className="text-white mt-2">Female</Text>
          </TouchableOpacity>

        </View>

        {/* 🔹 DOB (Calendar Picker) */}
        <Text className="text-xs text-gray-500 mb-2 uppercase">
          Date of Birth
        </Text>

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 mb-6 flex-row items-center"
        >
          <Text className={`flex-1 ${dob ? "text-white" : "text-gray-500"}`}>
            {dob || "DD / MM / YYYY"}
          </Text>

          <Ionicons name="calendar-outline" size={18} color="#9d5ce9" />
        </TouchableOpacity>

        {/* 🔥 Date Picker */}
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

      {/* 🔹 Button */}
        <TouchableOpacity
          className="mt-10 py-4 rounded-2xl items-center bg-purple-600 active:scale-95"
          onPress={() => router.push('../SpeakyfyHome/Home')}
        >
          <Text className="text-white font-bold">
            Proceed →
          </Text>
        </TouchableOpacity>

        {/* 🔹 Step */}
        <Text className="text-center text-gray-600 text-xs mt-4 uppercase">
          Step 2 of 4 • Identity
        </Text>

      </Animated.View>
    </SafeAreaView>
  );
}