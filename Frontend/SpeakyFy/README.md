# Building SpeakFy file Structure

- Create mobile application to build confidence
  edit all these files
  app/\_layout.jsx
  app/index.jsx
  babel.config.js
  global.css
  jsconfig.json
  metro.config.js
  tailwind.config.js
  ../package-lock.json
  ../package.json
  ../tailwind.config.js

          install nativewind firr usse bable metro tailwind import krii and finall tailwind setup is done

Date-12-04-2026

change the structure of app folder like this
app/
├── \_layout.jsx ← Root layout (AuthProvider wraps everything)
├── index.jsx ← Splash → navigates to /auth/Login
└── auth/
├── \_layout.jsx ← Auth stack layout
├── Login.jsx ← Logic: saves phone → navigates to /auth/Otp
├── Otp.jsx ← Logic: saves OTP → navigates to /auth/Gender
└── Gender.jsx ← Logic: saves gender/name/DOB → navigates to Home

change the src folder like this
src/
├── auth/
│ ├── AuthContext.jsx
│ ├── LoginScreen.jsx
│ ├── OtpScreen.jsx
│ └── GenderScreen.jsx
└──

#####

Use of authContext.jsx
AuthContext.jsx is like a shared storage box that all your auth screens can read from and write to.

What it does:
Without AuthContext With AuthContext
Each screen has its own data, lost when you navigate away Data persists across all screens
Login screen can't share phone number with OTP screen Phone number entered on Login is available on OTP screen
No way to know if user completed the auth flow isAuthenticated flag tracks completion
What it stores:
📦 AuthContext
├── phoneNumber ← set by Login screen
├── otp ← set by OTP screen
├── gender ← set by Gender screen
├── fullName ← set by Gender screen
├── dob ← set by Gender screen
└── isAuthenticated ← true after completing full flow
How it flows:
Login → user enters phone → setPhoneNumber("9876543210") → saved in context
OTP → user verifies → setOtp("1234") → saved in context
Gender → user fills profile → setGender("male"), setFullName(...), setDob(...) → saved in context
Home or any other screen → can call useAuth() to read all this data
Why it's in src/ and not app/:
It's not a screen/route — it's a utility/state manager. It belongs in src/ because it's shared logic, not UI. The app/\_layout.jsx wraps everything with <AuthProvider> to make it available everywhere.
