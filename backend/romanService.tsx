/**
 * Roman Numeral Converter Service
 * 
 * This module provides functionality to convert Arabic numerals (1-3999) to Roman numerals.
 * It uses lookup arrays for efficient conversion by breaking down the number into
 * thousands, hundreds, tens, and units places.
 * 
 * @author Interview Candidate
 * @version 1.0.0
 */

// Lookup arrays for Roman numeral conversion
const ROMAN_THOUSANDS = ["", "M", "MM", "MMM"];
const ROMAN_HUNDREDS = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const ROMAN_TENS = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const ROMAN_UNITS = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/**
 * Converts an Arabic numeral to its Roman numeral representation
 * 
 * This function validates the input and converts numbers from 1 to 3999 to Roman numerals.
 * The conversion algorithm breaks down the number into thousands, hundreds, tens, and units,
 * then uses lookup arrays to find the corresponding Roman numeral symbols.
 * 
 * @param {number} number - The Arabic number to convert (must be 1-3999)
 * @returns {string} The Roman numeral representation
 * @throws {Error} If the input is invalid (not an integer, < 1, or > 3999)
 * @throws {Error} If a computational error occurs during conversion
 * 
 * @example
 * getRomanNumber(42) // Returns "XLII"
 * getRomanNumber(3999) // Returns "MMMCMXCIX"
 * getRomanNumber(0) // Throws Error: Invalid Input
 */
const getRomanNumber = function (number) {
  // Input validation
  if (!Number.isInteger(number) || number < 1 || number > 3999) {
    throw new Error('Invalid Input: Number must be an integer between 1 and 3999');
  }

  try {
    // Break down the number into its constituent parts
    const thousands = ROMAN_THOUSANDS[Math.floor(number / 1000)];
    const hundreds = ROMAN_HUNDREDS[Math.floor((number % 1000) / 100)];
    const tens = ROMAN_TENS[Math.floor((number % 100) / 10)];
    const units = ROMAN_UNITS[Math.floor(number % 10)];

    // Concatenate all parts to form the complete Roman numeral
    const romanNumber = thousands + hundreds + tens + units;

    return romanNumber;
  } catch (error) {
    console.error('Computational error in Roman numeral conversion:', error);
    throw new Error('Computational error during Roman numeral conversion');
  }
};

export default getRomanNumber;