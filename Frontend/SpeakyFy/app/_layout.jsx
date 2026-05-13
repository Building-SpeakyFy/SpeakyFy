import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { AuthProvider } from "../src/store/AuthContext";

LogBox.ignoreLogs([
  "No native ExponentConstants module found",
  "No native ExpoFirebaseCore module found",
  "SafeAreaView has been deprecated",
]);

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}