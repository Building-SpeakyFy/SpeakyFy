import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "../src/store/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="SpeakyfyHome/index" />
      </Stack>
    </AuthProvider>
  );
}