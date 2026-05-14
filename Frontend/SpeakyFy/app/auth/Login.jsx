import { useState } from 'react'
import { Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../src/hooks/useAuth'
import LoginScreen from '../../src/screens/auth/LoginScreen'

export default function Login() {
  const router = useRouter()
  const { phoneNumber, setPhoneNumber } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async (phone) => {
    setLoading(true)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`
    
    // Simulating API call instead of Firebase
    setTimeout(() => {
      setLoading(false)
      setPhoneNumber(formattedPhone)
      router.push('/auth/Otp')
    }, 1000)
  }

  return (
    <LoginScreen
      initialPhone={phoneNumber.replace('+91', '')}
      onSendOtp={handleSendOtp}
      isLoading={loading}
    />
  )
}
