// app/auth/Login.jsx
import { useRouter } from 'expo-router'
import { useAuth } from '../../src/hooks/useAuth'
import LoginScreen from '../../src/screens/auth/LoginScreen'

export default function Login() {
  const router = useRouter()
  const { phoneNumber, setPhoneNumber } = useAuth()

  const handleSendOtp = (phone) => {
    setPhoneNumber(phone)
    router.push('/auth/Otp')
  }

  return (
    <LoginScreen
      initialPhone={phoneNumber}
      onSendOtp={handleSendOtp}
    />
  )
}
