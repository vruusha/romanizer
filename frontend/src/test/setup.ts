import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock CSS imports
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));
vi.mock('./App.css', () => ({}));
vi.mock('./index.css', () => ({}));
vi.mock('*/actiongroup.css', () => ({}));
// Mock fetch globally for API tests
global.fetch = vi.fn();

// Mock console.error to reduce noise in tests
console.error = vi.fn(); 