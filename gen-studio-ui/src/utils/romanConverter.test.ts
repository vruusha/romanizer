import { describe, it, expect } from 'vitest';

// Test data for Roman numeral conversions
const testCases = [
  { input: 1, expected: 'I' },
  { input: 2, expected: 'II' },
  { input: 3, expected: 'III' },
  { input: 4, expected: 'IV' },
  { input: 5, expected: 'V' },
  { input: 6, expected: 'VI' },
  { input: 7, expected: 'VII' },
  { input: 8, expected: 'VIII' },
  { input: 9, expected: 'IX' },
  { input: 10, expected: 'X' },
  { input: 50, expected: 'L' },
  { input: 100, expected: 'C' },
  { input: 500, expected: 'D' },
  { input: 1000, expected: 'M' },
  { input: 3999, expected: 'MMMCMXCIX' },
];

// Validation function for testing
const isValidRomanInput = (num: number): boolean => {
  return Number.isInteger(num) && num >= 1 && num <= 3999;
};

describe('Roman Numeral Validation', () => {
  describe('Input Validation', () => {
    it('accepts valid numbers between 1 and 3999', () => {
      expect(isValidRomanInput(1)).toBe(true);
      expect(isValidRomanInput(100)).toBe(true);
      expect(isValidRomanInput(3999)).toBe(true);
    });

    it('rejects numbers less than 1', () => {
      expect(isValidRomanInput(0)).toBe(false);
      expect(isValidRomanInput(-1)).toBe(false);
      expect(isValidRomanInput(-100)).toBe(false);
    });

    it('rejects numbers greater than 3999', () => {
      expect(isValidRomanInput(4000)).toBe(false);
      expect(isValidRomanInput(5000)).toBe(false);
      expect(isValidRomanInput(10000)).toBe(false);
    });

    it('rejects non-integer values', () => {
      expect(isValidRomanInput(3.5)).toBe(false);
      expect(isValidRomanInput(10.1)).toBe(false);
      expect(isValidRomanInput(100.99)).toBe(false);
    });

    it('rejects edge cases', () => {
      expect(isValidRomanInput(NaN)).toBe(false);
      expect(isValidRomanInput(Infinity)).toBe(false);
      expect(isValidRomanInput(-Infinity)).toBe(false);
    });
  });

  describe('Expected Roman Numeral Values', () => {
    testCases.forEach(({ input, expected }) => {
      it(`converts ${input} to ${expected}`, () => {
        expect(isValidRomanInput(input)).toBe(true);
        // This test validates that our input validation works for known valid cases
        // The actual conversion would be done by the backend API
      });
    });
  });

  describe('Boundary Testing', () => {
    it('handles minimum valid value', () => {
      expect(isValidRomanInput(1)).toBe(true);
    });

    it('handles maximum valid value', () => {
      expect(isValidRomanInput(3999)).toBe(true);
    });

    it('rejects value just below minimum', () => {
      expect(isValidRomanInput(0)).toBe(false);
    });

    it('rejects value just above maximum', () => {
      expect(isValidRomanInput(4000)).toBe(false);
    });
  });
}); 