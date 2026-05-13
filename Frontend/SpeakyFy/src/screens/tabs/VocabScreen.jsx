import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VocabScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]" edges={['top', 'left', 'right']}>
      <View className="flex-1 items-center justify-center pb-[100px]">
        <Text className="text-white text-2xl font-bold">Vocabulary</Text>
        <Text className="text-zinc-500 mt-2">Your vocabulary sets will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}
