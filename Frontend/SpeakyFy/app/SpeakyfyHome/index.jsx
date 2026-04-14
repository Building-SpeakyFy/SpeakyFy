import React from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const { fullName } = useAuth();
  
  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="px-6 pt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-zinc-500 text-sm font-medium">Welcome back,</Text>
            <Text className="text-white text-2xl font-bold">{fullName || 'Speakyfy User'}</Text>
          </View>
          <View className="w-12 h-12 rounded-full bg-[#1c1c1e] items-center justify-center border border-zinc-800">
            <Ionicons name="person" size={20} color="#9d5ce9" />
          </View>
        </View>

        {/* Hero Card */}
        <View className="px-6 mt-8">
          <LinearGradient
            colors={['#7c4dff', '#9d5ce9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-[32px] p-8 overflow-hidden relative"
          >
            <View className="absolute top-[-20] right-[-20] w-40 h-40 rounded-full bg-white/10" />
            <Text className="text-white/80 text-xs font-bold tracking-[2px] uppercase mb-2">Current Goal</Text>
            <Text className="text-white text-3xl font-extrabold mb-4">Mastering French</Text>
            <View className="flex-row items-center gap-2">
              <View className="h-2 flex-1 bg-white/20 rounded-full">
                <View className="h-full w-[65%] bg-white rounded-full" />
              </View>
              <Text className="text-white font-bold">65%</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-10">
          <Text className="text-white text-lg font-bold mb-4">Quick Sessions</Text>
          <View className="flex-row gap-4">
            <View className="flex-1 bg-[#121214] border border-zinc-800 p-5 rounded-3xl items-center">
              <View className="w-12 h-12 bg-[#9d5ce9]/10 rounded-2xl items-center justify-center mb-3">
                <Ionicons name="mic" size={24} color="#9d5ce9" />
              </View>
              <Text className="text-white font-bold">Speaking</Text>
              <Text className="text-zinc-500 text-xs mt-1">15 mins</Text>
            </View>
            <View className="flex-1 bg-[#121214] border border-zinc-800 p-5 rounded-3xl items-center">
              <View className="w-12 h-12 bg-[#00f2ff]/10 rounded-2xl items-center justify-center mb-3">
                <Ionicons name="book" size={24} color="#00f2ff" />
              </View>
              <Text className="text-white font-bold">Reading</Text>
              <Text className="text-zinc-500 text-xs mt-1">10 mins</Text>
            </View>
          </View>
        </View>

        {/* Daily Streak */}
        <View className="px-6 mt-10">
          <View className="bg-[#121214] border border-zinc-800 p-6 rounded-[32px] flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <View className="w-14 h-14 bg-orange-500/10 rounded-full items-center justify-center">
                <Ionicons name="flame" size={28} color="#f97316" />
              </View>
              <View>
                <Text className="text-white text-lg font-bold">12 Day Streak</Text>
                <Text className="text-zinc-500 text-sm">You're doing great!</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#3f3f46" />
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav Placeholder */}
      <View className="absolute bottom-6 left-6 right-6">
        <View className="bg-[#1c1c1e]/90 border border-zinc-800 h-20 rounded-[40px] flex-row items-center justify-around px-4 shadow-2xl">
          <Ionicons name="home" size={24} color="#9d5ce9" />
          <Ionicons name="search" size={24} color="#52525b" />
          <View className="w-14 h-14 bg-[#9d5ce9] rounded-full items-center justify-center shadow-lg shadow-purple-500/50">
             <Ionicons name="chatbubbles" size={28} color="white" />
          </View>
          <Ionicons name="trophy" size={24} color="#52525b" />
          <Ionicons name="settings" size={24} color="#52525b" />
        </View>
      </View>
    </SafeAreaView>
  );
}
