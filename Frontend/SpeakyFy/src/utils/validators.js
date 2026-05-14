export const validatePhone = (phone) => {
  return phone.length === 10;
};

export const formatPhoneNumber = (text) => {
  return text.replace(/[^0-9]/g, '');
};

export const validateOtp = (otpArray) => {
  return otpArray.every((digit) => digit !== '');
};
