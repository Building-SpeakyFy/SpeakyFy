import { Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../src/hooks/useAuth'
import OtpScreen from '../../src/screens/auth/OtpScreen'

export default function Otp() {
  const router = useRouter()
  const { setOtp } = useAuth()

  const handleVerify = async (otpCode) => {
    setOtp(otpCode)
    
    // Skip Firebase verification, just proceed
    router.push('/auth/Gender')
  }

  return (
    <OtpScreen
      onVerify={handleVerify}
      onBack={() => router.back()}
    />
  )
}
