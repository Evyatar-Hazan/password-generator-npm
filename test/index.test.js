import {
    concatenateAndHash,
    extractNumbers,
    extractLetters,
    combineNumbersAndLetters,
    calculateStringHash,
    transformToUpperCase,
    transformToSign,
  } from "./index"; 
  
  describe("Unit Tests for Password Functions", () => {
    describe("concatenateAndHash", () => {
      test("should concatenate and hash strings", () => {
        const result = concatenateAndHash(["abc", "123"]);
        expect(result).toHaveLength(64); // SHA256 hash length
      });
  
      test("should throw an error for invalid input", () => {
        expect(() => concatenateAndHash("notAnArray")).toThrow();
      });
    });
  
    describe("extractNumbers", () => {
      test("should extract numbers from hash", () => {
        const result = extractNumbers("a1b2c3", 2);
        expect(result).toBe("12");
      });
  
      test("should throw an error for invalid input", () => {
        expect(() => extractNumbers(123, 2)).toThrow();
      });
    });
  
    describe("extractLetters", () => {
      test("should extract letters from hash", () => {
        const result = extractLetters("a1b2c3", 2);
        expect(result).toBe("ab");
      });
  
      test("should throw an error for invalid input", () => {
        expect(() => extractLetters(123, 2)).toThrow();
      });
    });
  
    describe("combineNumbersAndLetters", () => {
      test("should combine numbers and letters", () => {
        const result = combineNumbersAndLetters(["1", "2"], ["a", "b"], 4);
        expect(result).toBe("1a2b");
      });
  
      test("should throw an error for invalid input", () => {
        expect(() => combineNumbersAndLetters("notAnArray", ["a"], 1)).toThrow();
      });
    });
  
    describe("calculateStringHash", () => {
      test("should calculate hash for a string", () => {
        const result = calculateStringHash("abc");
        expect(result).toBeGreaterThanOrEqual(0);
      });
  
      test("should throw an error for invalid input", () => {
        expect(() => calculateStringHash(123)).toThrow();
      });
    });
  
    describe("transformToUpperCase", () => {
      test("should transform string to uppercase", () => {
        const result = transformToUpperCase("abc");
        expect(result).toBe("ABC");
      });
  
      test("should throw an error for invalid input", () => {
        expect(() => transformToUpperCase(123)).toThrow();
      });
    });
  
    describe("transformToSign", () => {
      test("should transform string with a random sign", () => {
        const result = transformToSign("abc");
        expect(result).toMatch(/[?@#$&!]/);
      });
  
      test("should throw an error for invalid input", () => {
        expect(() => transformToSign(123)).toThrow();
      });
    });
  });
  