/**
 * Session management utilities
 */

export const SESSION_DURATION = {
  DEFAULT: 15, // 15 days
  REMEMBER_ME: 31, // 31 days
} as const;

/**
 * Calculate session expiration date
 */
export function calculateSessionExpiration(rememberMe: boolean): Date {
  const now = new Date();
  const daysToAdd = rememberMe ? SESSION_DURATION.REMEMBER_ME : SESSION_DURATION.DEFAULT;
  return new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
}

/**
 * Check if a session is still valid
 */
export function isSessionValid(expirationDate: string | null): boolean {
  if (!expirationDate) {
    return false;
  }
  
  const now = new Date();
  const expiration = new Date(expirationDate);
  
  return now < expiration;
}

/**
 * Get remaining session time in days
 */
export function getRemainingSessionDays(expirationDate: string | null): number {
  if (!expirationDate) {
    return 0;
  }
  
  const now = new Date();
  const expiration = new Date(expirationDate);
  const diffTime = expiration.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}

/**
 * Format session expiration for display
 */
export function formatSessionExpiration(expirationDate: string | null): string {
  if (!expirationDate) {
    return 'Sesión expirada';
  }
  
  const remainingDays = getRemainingSessionDays(expirationDate);
  
  if (remainingDays === 0) {
    return 'Sesión expira hoy';
  } else if (remainingDays === 1) {
    return 'Sesión expira mañana';
  } else {
    return `Sesión expira en ${remainingDays} días`;
  }
}