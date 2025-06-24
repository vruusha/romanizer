import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock CSS imports before importing App
vi.mock('./App.css', () => ({}));
vi.mock('./index.css', () => ({}));


// Mock fetch globally for API tests

import App from './App';

describe('App Component', () => {
  const mockFetch = vi.fn();
  
  beforeEach(() => {
    global.fetch = mockFetch;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('renders the main heading', () => {
      render(<App />);
      expect(screen.getByText('Roman Numeral Converter')).toBeInTheDocument();
    });

    it('renders input field with correct label', () => {
      render(<App />);
      expect(screen.getByLabelText('Enter a number')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<App />);
      expect(screen.getByRole('button', { name: /convert to roman numeral/i })).toBeInTheDocument();
    });

    it('submit button is disabled initially', () => {
      render(<App />);
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Input Validation', () => {
    it('shows error for empty input', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      expect(screen.getByText('Number is required')).toBeInTheDocument();
    });

    it('shows error for number less than 1', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '0');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      expect(screen.getByText('Please provide a number between 1 and 3999')).toBeInTheDocument();
    });

    it('shows error for number greater than 3999', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '4000');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      expect(screen.getByText('Please provide a number between 1 and 3999')).toBeInTheDocument();
    });

    it('shows error for non-integer input', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '3.5');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      expect(screen.getByText('Please provide a number between 1 and 3999')).toBeInTheDocument();
    });

    it('clears error when user starts typing', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // First, trigger an error
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      expect(screen.getByText('Number is required')).toBeInTheDocument();
      
      // Then start typing to clear the error
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '5');
      
      expect(screen.queryByText('Number is required')).not.toBeInTheDocument();
    });
  });

  describe('Form Submission and API Integration', () => {
    it('enables submit button when valid input is entered', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '5');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      expect(submitButton).not.toBeDisabled();
    });

    it('shows loading state during API call', async () => {
      const user = userEvent.setup();
      mockFetch.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          status: 200,
          json: () => Promise.resolve({ input: '5', output: 'V' })
        }), 100))
      );

      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '5');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveAttribute('aria-busy', 'true');
    });

    it('displays result after successful API call', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValue({
        status: 200,
        json: () => Promise.resolve({ input: '5', output: 'V' })
      });

      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '5');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Roman Numeral: V')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('handles API error response', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValue({
        status: 500,
        statusText: 'Internal Server Error'
      });

      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '5');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('API Error: Internal Server Error')).toBeInTheDocument();
      });
    });

    it('handles network error', async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '5');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Failed to convert number. Please try again.')).toBeInTheDocument();
      });
    });

    it('calls API with correct URL and parameters', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValue({
        status: 200,
        json: () => Promise.resolve({ input: '10', output: 'X' })
      });

      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '10');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/romannumeral?query=10');
    });
  });

  describe('User Interactions', () => {
    it('updates input value when user types', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const input = screen.getByLabelText('Enter a number') as HTMLInputElement;
      await user.type(input, '123');
      
      expect(input.value).toBe('123');
    });

    it('clears previous result when user starts typing new input', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValue({
        status: 200,
        json: () => Promise.resolve({ input: '5', output: 'V' })
      });

      render(<App />);
      
      // First conversion
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '5');
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Roman Numeral: V')).toBeInTheDocument();
      });
      
      // Start typing new input
      await user.clear(input);
      await user.type(input, '10');
      
      expect(screen.queryByText('Roman Numeral: V')).not.toBeInTheDocument();
    });

    it('submits form when Enter key is pressed', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValue({
        status: 200,
        json: () => Promise.resolve({ input: '5', output: 'V' })
      });

      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      await user.type(input, '5');
      await user.keyboard('{Enter}');
      
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/romannumeral?query=5');
    });
  });

  describe('Accessibility', () => {
    it('has proper form structure', () => {
      render(<App />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    it('input field has proper accessibility attributes', () => {
      render(<App />);
      
      const input = screen.getByLabelText('Enter a number');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('autofocus');
    });

    it('submit button has proper accessibility attributes', () => {
      render(<App />);
      
      const submitButton = screen.getByRole('button', { name: /convert to roman numeral/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
}); 