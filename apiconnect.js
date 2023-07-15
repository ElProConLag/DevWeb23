
function setSessionToken(token) {
  const date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // set expiration date to one year from now
  const expires = `expires=${date.toUTCString()}`;
  const path = 'path=/';
  const sameSite = 'SameSite=None';
  const secure = 'Secure';
  const cookieValue = `authToken=${token}; ${expires}; ${path}; ${sameSite}; ${secure}`;
  document.cookie = cookieValue;
}

function deleteSessionToken() {
  const date = new Date();
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000)); // set expiration date to one day ago
  const expires = `expires=${date.toUTCString()}`;
  const path = 'path=/';
  const cookieValue = `authToken=; ${expires}; ${path}`;
  document.cookie = cookieValue;
}
  
  
  // Function to check if the session cookie with the authentication token exists
  function checkSessionToken() {
    const authToken = getAuthToken();
    // If the authentication token does not exist, return false
    if (!authToken) {
      return false;
    }
    // If the authentication token exists, return true
    return true;
  }
  
  function getAuthToken() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('authToken=')) {
      return cookie.substring('authToken='.length, cookie.length);
    }
  }
  return null;
}