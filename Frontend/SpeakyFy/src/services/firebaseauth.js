import { auth } from './firebaseConfig';
import { 
  signInWithPhoneNumber, 
  PhoneAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';

/**
 * Firebase Authentication Service.
 * Integrated with firebaseConfig.
 */

export const signInWithPhone = async (phoneNumber, recaptchaVerifier) => {
  try {
    // In React Native, recaptchaVerifier is usually not needed for phone auth if configured correctly with Expo
    // but the SDK method expects it or uses a hidden one.
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    console.log('OTP sent successfully to:', phoneNumber);
    return { success: true, confirmationResult };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error: error.message };
  }
};

export const verifyOtpCode = async (confirmationResult, code) => {
  try {
    const result = await confirmationResult.confirm(code);
    const user = result.user;
    console.log('User signed in successfully:', user.uid);
    return { success: true, user };
  } catch (error) {
    console.error('Error verifying code:', error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await auth.signOut();
    console.log('User logged out');
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error: error.message };
  }
};
