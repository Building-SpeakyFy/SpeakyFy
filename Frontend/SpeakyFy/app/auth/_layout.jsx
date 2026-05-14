import { Stack } from "expo-router";

// Auth group layout - all auth screens share this stack
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" />
      <Stack.Screen name="Otp" />
      <Stack.Screen name="Gender" />
    </Stack>
  );
}
