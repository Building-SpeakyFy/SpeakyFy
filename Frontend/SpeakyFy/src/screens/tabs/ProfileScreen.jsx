import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ProfileScreen() {
  const { fullName, setFullName, dob, setDob, gender, setGender, streak, logout } = useAuth(); // Provide safe defaults or fallback
  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(fullName || '');
  const [editGender, setEditGender] = useState(gender || '');
  const [editDob, setEditDob] = useState(dob || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(2000, 0, 1);
    const parts = dateStr.split(' / ');
    if (parts.length === 3) {
      const [d, m, y] = parts.map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date(2000, 0, 1);
  };

  const [dateValue, setDateValue] = useState(parseDate(dob));

  useEffect(() => {
    if (isEditModalVisible) {
      setEditName(fullName || '');
      setEditGender(gender || '');
      setEditDob(dob || '');
      setDateValue(parseDate(dob));
    }
  }, [isEditModalVisible, fullName, gender, dob]);

  const handleSave = () => {
    if (setFullName) setFullName(editName);
    if (setGender) setGender(editGender);
    if (setDob) setDob(editDob);
    setIsEditModalVisible(false);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateValue(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      setEditDob(`${day} / ${month} / ${year}`);
    }
  };

  // Helper component for Profile Options
  const ProfileOption = ({ icon, title, color, isLast, onPress }) => (
    <TouchableOpacity onPress={onPress} className={`flex-row items-center py-4 px-2 ${!isLast ? 'border-b border-zinc-800/60' : ''}`}>
      <View className="w-10 h-10 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: `${color}15` }}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text className="flex-1 text-white text-[16px] font-medium">{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#52525b" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]" edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" contentContainerClassName="pb-[120px]">
        {/* Header Title */}
        <View className="px-6 pt-6 pb-2">
          <Text className="text-white text-3xl font-extrabold">Profile</Text>
        </View>

        {/* User Info Card */}
        <View className="px-6 mt-4">
          <LinearGradient
            colors={['#1e1e24', '#121214']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-[32px] p-6 border border-zinc-800 items-center relative overflow-hidden"
          >
            {/* Background Decoration */}
            <View className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
            
            <View className="relative">
              <View className={`w-24 h-24 rounded-full bg-zinc-800 border-4 ${gender === 'female' ? 'border-[#f9a8d4]' : 'border-[#7dd3fc]'} items-center justify-center mb-4`}>
                <Ionicons name="person" size={40} color={gender === 'female' ? '#f9a8d4' : '#7dd3fc'} />
              </View>
              <TouchableOpacity 
                className="absolute bottom-4 right-0 w-8 h-8 bg-[#5b58ff] rounded-full items-center justify-center border-2 border-[#121214]"
                onPress={() => setIsEditModalVisible(true)}
              >
                <Ionicons name="pencil" size={14} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-white text-2xl font-bold mb-1">{fullName || 'Speakyfy User'}</Text>
            <Text className="text-zinc-500 text-sm mb-6">Premium Member</Text>

            {/* Stats */}
            <View className="flex-row w-full justify-around pt-4 border-t border-zinc-800/60">
              <View className="items-center">
                <Text className="text-white text-xl font-bold mb-1">{streak || 0}</Text>
                <Text className="text-zinc-500 text-xs font-medium">Day Streak</Text>
              </View>
              <View className="w-[1px] h-full bg-zinc-800/60" />
              <View className="items-center">
                <Text className="text-white text-xl font-bold mb-1">0</Text>
                <Text className="text-zinc-500 text-xs font-medium">Level</Text>
              </View>
              <View className="w-[1px] h-full bg-zinc-800/60" />
              <View className="items-center">
                <Text className="text-white text-xl font-bold mb-1">0</Text>
                <Text className="text-zinc-500 text-xs font-medium">Lessons</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Options List */}
        <View className="px-6 mt-8">
          <Text className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-4 px-2">Account</Text>
          <View className="bg-[#121214] rounded-[24px] px-4 py-2 border border-zinc-800">
            <ProfileOption 
              icon="person-outline" 
              title="Personal Information" 
              color="#3b82f6" 
              onPress={() => setIsEditModalVisible(true)}
            />
            <ProfileOption icon="language-outline" title="Learning Languages" color="#a855f7" />
            <ProfileOption icon="notifications-outline" title="Notifications" color="#f59e0b" isLast={true} />
          </View>
        </View>

        <View className="px-6 mt-8">
          <Text className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-4 px-2">Support & About</Text>
          <View className="bg-[#121214] rounded-[24px] px-4 py-2 border border-zinc-800">
            <ProfileOption icon="shield-checkmark-outline" title="Privacy & Security" color="#10b981" />
            <ProfileOption icon="help-buoy-outline" title="Help Center" color="#ec4899" />
            <ProfileOption icon="information-circle-outline" title="About SpeakyFy" color="#6366f1" isLast={true} />
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-6 mt-10">
          <TouchableOpacity 
            className="bg-red-500/10 border border-red-500/20 py-4 rounded-full flex-row justify-center items-center"
            onPress={() => {
              if (logout) logout();
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
            <Text className="text-red-500 font-bold text-[16px]">Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/80">
          <View className="bg-[#121214] border-t border-zinc-800 rounded-t-[32px] p-6 pb-10">
            
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-white text-2xl font-bold">Edit Profile</Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)} className="w-8 h-8 bg-zinc-800 rounded-full items-center justify-center">
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Edit Name */}
            <Text className="text-[10px] color-[#71717a] tracking-[2.5px] font-bold mb-2 ml-1 uppercase">FULL NAME</Text>
            <View className="flex-row items-center bg-[#1c1c1e] rounded-2xl h-[60px] px-4 mb-6 border border-zinc-800">
              <Ionicons name="person" size={18} color="#9d5ce9" />
              <TextInput
                className="flex-1 text-white text-base ml-3 outline-none"
                value={editName}
                onChangeText={setEditName}
                placeholder="Your Name"
                placeholderTextColor="#52525b"
              />
            </View>

            {/* Edit Gender */}
            <Text className="text-[10px] color-[#71717a] tracking-[2.5px] font-bold mb-2 ml-1 uppercase">GENDER</Text>
            <View className="flex-row gap-3 mb-6">
              <TouchableOpacity
                onPress={() => setEditGender('male')}
                className={`flex-1 flex-row items-center justify-center py-4 rounded-2xl border ${editGender === 'male' ? 'bg-[#9d5ce9]/10 border-[#9d5ce9]' : 'bg-[#1c1c1e] border-zinc-800'}`}
              >
                <Ionicons name="male" size={20} color={editGender === 'male' ? '#9d5ce9' : '#52525b'} />
                <Text className={`ml-2 font-bold ${editGender === 'male' ? 'text-[#9d5ce9]' : 'text-zinc-500'}`}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setEditGender('female')}
                className={`flex-1 flex-row items-center justify-center py-4 rounded-2xl border ${editGender === 'female' ? 'bg-[#9d5ce9]/10 border-[#9d5ce9]' : 'bg-[#1c1c1e] border-zinc-800'}`}
              >
                <Ionicons name="female" size={20} color={editGender === 'female' ? '#9d5ce9' : '#52525b'} />
                <Text className={`ml-2 font-bold ${editGender === 'female' ? 'text-[#9d5ce9]' : 'text-zinc-500'}`}>Female</Text>
              </TouchableOpacity>
            </View>

            {/* Edit DOB */}
            <Text className="text-[10px] color-[#71717a] tracking-[2.5px] font-bold mb-2 ml-1 uppercase">DATE OF BIRTH</Text>
            
            {Platform.OS === 'web' ? (
              <View className="flex-row items-center bg-[#1c1c1e] rounded-2xl h-[60px] px-4 mb-8 border border-zinc-800">
                <Ionicons name="calendar" size={18} color="#9d5ce9" />
                <TextInput
                  className="flex-1 text-white text-base ml-3 outline-none"
                  value={editDob}
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
                    setEditDob(formatted);
                  }}
                  placeholder="DD / MM / YYYY"
                  placeholderTextColor="#52525b"
                  maxLength={14}
                />
              </View>
            ) : (
              <TouchableOpacity onPress={() => setShowDatePicker(true)} className="flex-row items-center bg-[#1c1c1e] rounded-2xl h-[60px] px-4 mb-8 border border-zinc-800">
                <Ionicons name="calendar" size={18} color="#9d5ce9" />
                <Text className={`flex-1 text-base ml-3 font-medium ${!editDob ? 'text-[#52525b]' : 'text-white'}`}>
                  {editDob || 'DD / MM / YYYY'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#52525b" />
              </TouchableOpacity>
            )}

            {showDatePicker && Platform.OS !== 'web' && (
              <DateTimePicker
                value={dateValue}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}

            {/* Save Button */}
            <TouchableOpacity onPress={handleSave} className="bg-[#9d5ce9] py-4 rounded-[20px] items-center">
              <Text className="text-white font-bold text-[16px]">Save Changes</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
