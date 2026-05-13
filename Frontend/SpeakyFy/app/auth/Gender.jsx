// app/auth/Gender.jsx
import { useRouter } from 'expo-router'
import { useAuth } from '../../src/hooks/useAuth'
import GenderScreen from '../../src/screens/auth/GenderScreen'

export default function Gender() {
  const router = useRouter()
  const {
    gender, fullName, dob,
    setGender, setFullName, setDob,
    completeAuth,
  } = useAuth()

  const handleProceed = ({ gender: g, fullName: fn, dob: d }) => {
    setGender(g)
    setFullName(fn)
    setDob(d)
    completeAuth()
    router.replace('/(tabs)')
  }

  return (
    <GenderScreen
      initialGender={gender}
      initialFullName={fullName}
      initialDob={dob}
      onProceed={handleProceed}
      onBack={() => router.back()}
    />
  )
}
