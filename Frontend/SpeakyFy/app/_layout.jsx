import { Stack } from "expo-router";
import "../global.css";

// Build - 02/April/2026
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main Entry Points */}
      <Stack.Screen name="index" /> 
      <Stack.Screen name="Login" />
      <Stack.Screen name="Otp" />
      <Stack.Screen name="Gender" />
      
      {/* This points to the SpeakyfyHome folder */}
      <Stack.Screen name="SpeakyfyHome" />
    </Stack>
  );
}