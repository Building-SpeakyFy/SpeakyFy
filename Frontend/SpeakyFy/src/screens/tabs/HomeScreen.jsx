import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { fullName, streak, gender } = useAuth();
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]" edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" contentContainerClassName="pb-[120px]">
        {/* Top Navbar */}
        <View className="px-6 pt-6 flex-row justify-between items-center">
          {/* Logo & Brand */}
          <View className="flex-row items-center">
            <LinearGradient
              colors={['#7c4dff', '#5b58ff']}
              className="w-10 h-10 rounded-[12px] items-center justify-center mr-3 shadow-lg"
            >
              <Ionicons name="person-add" size={20} color="white" style={{ marginLeft: 2 }} />
            </LinearGradient>
            <Text className="text-[#5b58ff] text-[22px] font-bold tracking-wide">Speakyfy</Text>
          </View>
          
          {/* Right Action Buttons */}
          <View className="flex-row items-center gap-3">
            {/* Streak Pill */}
            <View className="flex-row items-center bg-[#1c1c1e] px-4 py-2.5 rounded-full border border-orange-500/20">
              <Ionicons name="flame" size={16} color="#f97316" />
              <Text className="text-orange-500 font-bold ml-1.5 text-sm">{streak || 0}</Text>
            </View>
            {/* Notifications */}
            <View className="w-11 h-11 rounded-full bg-[#1c1c1e] items-center justify-center border border-zinc-800">
              <Ionicons name="notifications" size={18} color="#a1a1aa" />
            </View>
          </View>
        </View>

        {/* Welcome Section */}
        <TouchableOpacity 
          className="px-6 mt-8 flex-row items-center"
          onPress={() => router.push('/profile')}
          activeOpacity={0.7}
        >
          {/* Avatar with Badge */}
          <View className="relative mr-4">
            <View className={`w-16 h-16 rounded-full ${gender === 'female' ? 'bg-[#fce7f3]' : 'bg-[#e0f2fe]'} items-center justify-center overflow-hidden border-[3px] border-zinc-800`}>
              <Ionicons name="person" size={36} color={gender === 'female' ? '#f9a8d4' : '#7dd3fc'} style={{ marginTop: 10 }} />
            </View>
            {/* Badge */}
            <View className="absolute top-0 -right-1 bg-[#f59e0b] w-6 h-7 rounded-md items-center justify-center border-2 border-[#0a0a0a]" style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
              <Ionicons name="ribbon" size={12} color="white" />
            </View>
          </View>

          {/* Welcome Text */}
          <View>
            <Text className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">WELCOME BACK,</Text>
            <Text className="text-white text-[22px] font-bold">{fullName || 'Alex Johnson'}</Text>
          </View>
        </TouchableOpacity>

        {/* Hero Card
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
        */}

        {/* Ready to Speak Better Section */}
        <View className="px-6 mt-10">
          <Text className="text-white text-2xl font-bold mb-1">Ready to Speak Better?</Text>
          <Text className="text-zinc-500 text-sm mb-6">Experience the future of language learning</Text>

          {/* Grid */}
          <View className="flex-row gap-4 mb-4">
            <View className="flex-1 bg-[#121214] border border-zinc-800 p-5 rounded-[24px]">
              <View className="w-12 h-12 bg-blue-500/10 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="people" size={24} color="#3b82f6" />
              </View>
              <Text className="text-white font-bold mb-1">Talk with Humans</Text>
              <Text className="text-zinc-500 text-xs">Native speakers live</Text>
            </View>

            <View className="flex-1 bg-[#121214] border border-zinc-800 p-5 rounded-[24px]">
              <View className="w-12 h-12 bg-purple-500/10 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="sparkles" size={24} color="#a855f7" />
              </View>
              <Text className="text-white font-bold mb-1">Talk with AI</Text>
              <Text className="text-zinc-500 text-xs">Practice 24/7</Text>
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-1 bg-[#121214] border border-zinc-800 p-5 rounded-[24px]">
              <View className="w-12 h-12 bg-yellow-500/10 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="trophy" size={24} color="#eab308" />
              </View>
              <Text className="text-white font-bold mb-1">English Quiz</Text>
              <Text className="text-zinc-500 text-xs">Test your level</Text>
            </View>

            <View className="flex-1 bg-[#121214] border border-zinc-800 p-5 rounded-[24px]">
              <View className="w-12 h-12 bg-pink-500/10 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="mic" size={24} color="#ec4899" />
              </View>
              <Text className="text-white font-bold mb-1">Start Debate</Text>
              <Text className="text-zinc-500 text-xs">Social discussions</Text>
            </View>
          </View>
        </View>

        {/* Join Group Practice Banner */}
        <View className="px-6 mt-8">
          <LinearGradient
            colors={['#14857b', '#0d5d56']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-[32px] p-6 relative overflow-hidden"
          >
            <Text className="text-white text-xl font-bold mb-2">Join Group Practice</Text>
            <Text className="text-teal-100/80 text-sm mb-6">Join group practice to master your fluency</Text>

            <View className="flex-row items-center justify-between">
              {/* Overlapping Avatars */}
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-[#14857b] items-center justify-center z-30">
                  <Ionicons name="person" size={14} color="white" />
                </View>
                <View className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-[#14857b] items-center justify-center -ml-3 z-20">
                  <Ionicons name="person" size={14} color="gray" />
                </View>
                <View className="w-8 h-8 rounded-full bg-zinc-600 border-2 border-[#14857b] items-center justify-center -ml-3 z-10">
                  <Ionicons name="person" size={14} color="lightgray" />
                </View>
                <View className="w-8 h-8 rounded-full bg-teal-500 border-2 border-[#14857b] items-center justify-center -ml-3 z-0">
                  <Text className="text-white text-[10px] font-bold">+12</Text>
                </View>
              </View>

              {/* Join Now Button */}
              <View className="bg-white/10 border border-white/20 px-5 py-2.5 rounded-full">
                <Text className="text-white text-xs font-bold tracking-wider">JOIN NOW</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        {/*AI Roleplay*/}
        <View className="px-6 mt-10 mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">AI Roleplay Scenarios</Text>
            <Text className="text-blue-520 text-xs font-bold tracking-wider">SEE ALL</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
            {/* Card 1: Job Interview */}
            <View className="bg-[#121214] border border-zinc-800 p-5 rounded-[28px] mr-4 w-44">
              <View className="w-14 h-14 bg-[#1e1332] rounded-[20px] items-center justify-center mb-6 shadow-lg shadow-purple-900/30">
                <Ionicons name="briefcase" size={24} color="#c084fc" />
              </View>
              <Text className="text-white font-bold text-[17px] mb-1">Job Interview</Text>
              <Text className="text-zinc-500 text-xs mb-6">Professional</Text>
              <View className="bg-[#5b58ff] rounded-[16px] py-3 items-center shadow-lg shadow-indigo-500/30">
                <Text className="text-white text-sm font-bold">Start</Text>
              </View>
            </View>

            {/* Card 2: Coffee Shop */}
            <View className="bg-[#121214] border border-zinc-800 p-5 rounded-[28px] mr-4 w-44">
              <View className="w-14 h-14 bg-[#131b32] rounded-[20px] items-center justify-center mb-6 shadow-lg shadow-blue-900/30">
                <Ionicons name="cafe" size={24} color="#60a5fa" />
              </View>
              <Text className="text-white font-bold text-[17px] mb-1">Coffee Shop</Text>
              <Text className="text-zinc-500 text-xs mb-6">Casual</Text>
              <View className="bg-[#5b58ff] rounded-[16px] py-3 items-center shadow-lg shadow-indigo-500/30">
                <Text className="text-white text-sm font-bold">Start</Text>
              </View>
            </View>

            {/* Card 3: Airport (Extra card for scrolling) */}
            <View className="bg-[#121214] border border-zinc-800 p-5 rounded-[28px] mr-4 w-44">
              <View className="w-14 h-14 bg-[#321c12] rounded-[20px] items-center justify-center mb-6 shadow-lg shadow-orange-900/30">
                <Ionicons name="airplane" size={24} color="#fb923c" />
              </View>
              <Text className="text-white font-bold text-[17px] mb-1">Airport Check-in</Text>
              <Text className="text-zinc-500 text-xs mb-6">Travel</Text>
              <View className="bg-[#5b58ff] rounded-[16px] py-3 items-center shadow-lg shadow-indigo-500/30">
                <Text className="text-white text-sm font-bold">Start</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
