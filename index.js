import CryptoJS from "crypto-js";

// Define constant for signs
const SIGNS = ["?", "@", "#", "$", "&", "!"];

// Function to concatenate strings and compute SHA256 hash
const concatenateAndHash = (textArray = [""]) => {
  // Concatenate the strings in the array
  let textToHash = "";
  for (let textItem of textArray) {
    textToHash += textItem;
  }
  // Compute the SHA256 hash of the concatenated string
  return CryptoJS.SHA256(textToHash).toString();
};

// Function to get numeric password from hash
const extractNumbers = (hash, numberOfCharacters) => {
  // Extract numeric substrings from the hash
  const numbers = hash.match(/\d+/g);
  if (numbers) {
    // Concatenate numeric substrings and return the specified number of characters
    return numbers.join("").substring(0, numberOfCharacters);
  } else {
    console.log("No numbers found in the string.");
    return null;
  }
};

// Function to get alphabetical password from hash
const extractLetters = (hash, numberOfCharacters) => {
  // Extract lowercase alphabetical substrings from the hash
  const letters = hash.match(/[a-z]+/g);
  if (letters) {
    // Concatenate alphabetical substrings and return the specified number of characters
    return letters.join("").substring(0, numberOfCharacters);
  } else {
    console.log("No letters found in the string.");
    return null;
  }
};

// Function to get combined alphanumeric password from numbers and letters
const combineNumbersAndLetters = (numbers, letters, numberOfCharacters) => {
  // Determine the maximum length between numbers and letters arrays
  const maxLength = Math.max(numbers.length, letters.length);
  let numbersAndLetters = "";

  // Concatenate alternating elements from the numbers and letters arrays
  for (let index = 0; index < maxLength; index++) {
    if (index < numbers.length) {
      numbersAndLetters += numbers[index];
    }
    if (index < letters.length) {
      numbersAndLetters += letters[index];
    }
  }
  // Return the combined string with the specified number of characters
  return numbersAndLetters.substring(0, numberOfCharacters);
};

// Function to calculate a simple hash for a string
const calculateStringHash = (str) => {
  // Calculate a hash based on the character codes of the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
  }
  return hash;
};

// Function to get uppercase password with random transformations
const transformToUpperCase = (str) => {
  let changed = false;
  // Replace lowercase letters with uppercase based on a random hash calculation
  let newString = str.replace(/[a-z]/g, function (match) {
    const hash = calculateStringHash(match);
    if (hash % 2 === 0) {
      changed = true;
      return match.toUpperCase();
    } else {
      return match;
    }
  });

  // If no letters were changed, transform the first letter to uppercase
  if (!changed) {
    newString = newString.replace(/([a-zA-Z])/, function (match) {
      return match.toUpperCase();
    });
  }

  // Ensure that at least one lowercase letter is present and transform any uppercase letters to lowercase
  if (!/[a-z]/.test(newString)) {
    newString = newString.replace(/([A-Z])/, function (match) {
      return match.toLowerCase();
    });
  }
  // Return the transformed string
  return newString;
};

// Function to get transformed string with a random sign
const transformToSign = (str) => {
  // Select a random sign from the array based on a hash calculation
  const hash = calculateStringHash(str);
  const selectedSignIndex = Math.abs(hash) % SIGNS.length;
  const selectedSign = SIGNS[selectedSignIndex];
  // Replace the first alphanumeric character in the string with the selected sign
  return str.replace(/[a-zA-Z0-9]/, selectedSign);
};

// Exporting the modularized functions
export {
  concatenateAndHash,
  extractNumbers,
  extractLetters,
  combineNumbersAndLetters,
  calculateStringHash,
  transformToUpperCase,
  transformToSign,
};
