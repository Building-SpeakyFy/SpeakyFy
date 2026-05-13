import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

/**
 * Global Auth Store.
 * Centralized place to store user profile and session data.
 */
export function AuthProvider({ children }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [gender, setGender] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [streak, setStreak] = useState(12);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const completeAuth = () => {
    setIsAuthenticated(true);
  };

  const resetAuth = () => {
    setPhoneNumber('');
    setOtp('');
    setGender('');
    setFullName('');
    setDob('');
    setStreak(0);
    setIsAuthenticated(false);
  };

  const value = {
    phoneNumber, setPhoneNumber,
    otp, setOtp,
    gender, setGender,
    fullName, setFullName,
    dob, setDob,
    streak, setStreak,
    confirmationResult, setConfirmationResult,
    isAuthenticated,
    completeAuth,
    resetAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
