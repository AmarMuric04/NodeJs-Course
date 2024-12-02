export function isEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

export function isLongEnough(password) {
  return password.length > 6;
}

export function hasSpecialChar(password) {
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  return specialCharPattern.test(password);
}

export function hasUppercase(password) {
  const uppercasePattern = /[A-Z]/;
  return uppercasePattern.test(password);
}
