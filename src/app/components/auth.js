export function isLoggedIn() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token !== null; // Returns true if token is present, false otherwise
  }
  return false; // Fallback in case localStorage is not available
}
