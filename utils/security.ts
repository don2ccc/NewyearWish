/**
 * Basic security utilities for user input
 */

// Strip HTML tags to prevent storing markup
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  // 1. Trim whitespace
  let clean = input.trim();
  // 2. Remove HTML tags (basic XSS prevention for storage)
  clean = clean.replace(/<[^>]*>?/gm, '');
  // 3. Remove potentially dangerous common characters if needed (optional, keeping it simple for wishes)
  return clean;
};

// Check if input meets basic validity requirements
export const validateWish = (content: string, name: string): { valid: boolean; error?: string } => {
  const cleanContent = sanitizeInput(content);
  const cleanName = sanitizeInput(name);

  if (cleanContent.length === 0) {
    return { valid: false, error: 'Wish content cannot be empty.' };
  }

  if (cleanContent.length > 200) {
    return { valid: false, error: 'Wish is too long (max 200 characters).' };
  }

  if (cleanName.length > 30) {
    return { valid: false, error: 'Name is too long (max 30 characters).' };
  }

  return { valid: true };
};

// Simple client-side rate limiter using localStorage
export const checkRateLimit = (limitSeconds: number = 30): { allowed: boolean; waitTime?: number } => {
  const LAST_WISH_KEY = 'last_wish_timestamp';
  const lastWishTime = localStorage.getItem(LAST_WISH_KEY);

  if (lastWishTime) {
    const timeSince = (Date.now() - parseInt(lastWishTime, 10)) / 1000;
    if (timeSince < limitSeconds) {
      return { allowed: false, waitTime: Math.ceil(limitSeconds - timeSince) };
    }
  }

  return { allowed: true };
};

export const updateRateLimit = () => {
  localStorage.setItem('last_wish_timestamp', Date.now().toString());
};
