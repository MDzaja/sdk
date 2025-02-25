import { AxiosError } from 'axios';

/**
 * Helper method to parse API errors and extract meaningful messages.
 * Checks if error is an AxiosError and has response data with a message field.
 * If it does, it will return the message from the response.
 * If it doesn't, it will return the original error message.
 * 
 * @param error - The error to parse
 * @returns A formatted error message string
 */
export function parseApiError(error: unknown): string {
  try {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      // Check if we have response data
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // If errorData is an object with a message field
        if (typeof errorData === 'object' && errorData !== null) {
          if ('message' in errorData && typeof errorData.message === 'string') {
            return errorData.message;
          }
          // If no message field, we can stringify the error data
          return JSON.stringify(errorData);
        }
      }
      
      return error.message;
    }
  } catch {}
  
  return String(error);
}
