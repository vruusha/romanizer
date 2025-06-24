import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from '@adobe/react-spectrum';

// Custom render function that includes React Spectrum Provider
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider>
        {children}
      </Provider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Test data constants
export const TEST_DATA = {
  VALID_INPUTS: ['1', '5', '10', '50', '100', '500', '1000', '3999'],
  INVALID_INPUTS: ['0', '4000', '3.5', '-1', 'abc', ''],
  EXPECTED_ROMAN: {
    '1': 'I',
    '5': 'V',
    '10': 'X',
    '50': 'L',
    '100': 'C',
    '500': 'D',
    '1000': 'M',
    '3999': 'MMMCMXCIX'
  }
};

// Mock API responses
export const createMockApiResponse = (status: number, data?: any) => ({
  status,
  json: () => Promise.resolve(data),
  statusText: status === 200 ? 'OK' : 'Error'
});

// Helper function to wait for loading states
export const waitForLoadingToFinish = async () => {
  // Wait for any loading indicators to disappear
  await new Promise(resolve => setTimeout(resolve, 100));
}; 