import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/color';

/**
 * Reusable Speakyfy Input with focus styles and optional icon.
 */
export const SpeakyfyInput = ({ 
  iconName, 
  prefix, 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType = 'default', 
  error,
  maxLength,
  secureTextEntry
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-4">
      <View
        className={`flex-row items-center bg-[#121212] rounded-2xl h-16 px-5 border ${
          error
            ? 'border-red-500/50'
            : isFocused
            ? 'border-[#9d5ce9]/60 bg-[#1a1525]/30'
            : 'border-zinc-800/60'
        }`}
      >
        {iconName && <Ionicons name={iconName} size={18} color="#9d5ce9" />}
        {prefix && <Text className="text-white ml-3 mr-2 font-semibold">{prefix}</Text>}

        <TextInput
          className="flex-1 text-white ml-2 text-base"
          placeholder={placeholder}
          placeholderTextColor="#71717a"
          keyboardType={keyboardType}
          value={value}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          selectionColor="#9d5ce9"
        />
      </View>

      {error && (
        <Text className="text-red-500 text-xs mt-2 ml-2">
          {error}
        </Text>
      )}
    </View>
  );
};
