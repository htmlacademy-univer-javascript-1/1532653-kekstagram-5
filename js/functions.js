let lineLength = (string, length) => {
  if (string.length <= length) {
    return true
  }
  return false
};

let palindrome = (string) => {
  let convertedString = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < convertedString.length / 2; i++) {
    if (convertedString[i] != convertedString[convertedString.length - 1 - i]) {
      return false
    }
  }
  return true
};
