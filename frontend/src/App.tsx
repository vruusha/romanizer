/*
 * Roman Numeral Converter React Application
 * 
 * This React component provides a user interface for converting Arabic numerals
 * to Roman numerals. It includes form validation, error handling, loading states,
 * and integration with the backend API. Enhanced with comprehensive Sentry logging
 * and performance monitoring.
 * 
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { Button, defaultTheme, Provider, TextField, Text, View, Flex, Form } from '@adobe/react-spectrum';
import { ErrorBoundary } from "react-error-boundary";
import './App.css'

/**
 * Main App Component
 * 
 * Provides a form interface for Roman numeral conversion with:
 * - Input validation (1-3999 range)
 * - Loading states during API calls
 * - Error handling and display
 * - Success result display
 * - Comprehensive Sentry logging and metrics
 * 
 * @returns {React.JSX.Element} The rendered React component
 */
function App(): React.JSX.Element {
  // State management for form and UI
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [number, setNumber] = useState<string>('');
  const [romanNumber, setRomanNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  /**
   * Validates the input number for Roman numeral conversion
   * 
   * Checks if the input is:
   * - Not empty
   * - A valid integer
   * - Within the valid range (1-3999)
   * 
   * @returns {boolean} True if input is valid, false otherwise
   */
  const isValidInput = ():boolean => {
    if (!number) {
      setErrorMessage("Number is required");
      return false;
    }
    const num = Number(number);
    if (!Number.isInteger(num) || num < 1 || num > 3999) {
      setErrorMessage("Please provide a number between 1 and 3999");
      return false;
    }
    return true;
  };

  /**
   * Resets the form state to initial values
   * 
   * Clears error messages and conversion results
   */
  const resetForm = () => {
    setErrorMessage('');
    setRomanNumber('');
  };

  /**
   * Handles input field changes
   * 
   * Updates the number state and resets any previous errors or results
   * 
   * @param {string} value - The new input value
   */
  const handleInputChange = (value: string) => {
    resetForm();
    setNumber(value);
  };

  /**
   * Handles form submission and API call
   * 
   * Validates input, makes API request to backend, and handles response.
   * Includes error handling, loading state management, and comprehensive logging.
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidInput()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/romannumeral?query=${number}`);
      if (response.status !== 200) {
        setErrorMessage(`API Error: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      if (data && data.output) {
        setTimeout(() => {
          setRomanNumber(data.output);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setErrorMessage('Failed to convert number. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary fallback={<p>⚠️ Something went wrong. Please try again.</p>}>
      <Provider theme={defaultTheme}>
        <Flex direction="row" justifyContent="center">
          <View
            borderWidth="thin"
            borderColor="dark"
            borderRadius="medium"
            padding="size-1200"
          >
            <Flex direction="column" gap="size-300" alignItems="start">
              <Form onSubmit={handleSubmit}>
                <Text>Roman Numeral Converter</Text>
                
                <TextField
                  validationState={errorMessage ? 'invalid' : undefined}
                  errorMessage={errorMessage}
                  label="Enter a number"
                  value={number}
                  isRequired
                  autoFocus
                  onChange={handleInputChange}
                  width="auto"
                />
                
                <Button
                  width="auto"
                  variant="accent"
                  isPending={isLoading}
                  style="outline"
                  isDisabled={isLoading || !number}
                  type="submit"
                >
                  Convert To Roman Numeral
                </Button>
              </Form>
              
              {romanNumber && (
                <Text>Roman Numeral: {romanNumber}</Text>
              )}
            </Flex>
          </View>
        </Flex>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
