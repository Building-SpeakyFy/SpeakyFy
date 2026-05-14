import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

/**
 * Custom hook to easily access auth state from any component.
 * Usage: const { phoneNumber, gender } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
