// Function to set a session cookie with an authentication token
function setSessionToken(token) {
    const cookieValue = `authToken=${token}; path=/;`;
    document.cookie = cookieValue;
  }
  
  // Function to delete the session cookie with the authentication token
  function deleteSessionToken() {
    const cookieValue = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = cookieValue;
  }
  
  // Function to query movement information using the authentication token
  async function getMovementInfo() {
    const authToken = getAuthToken();
    if (!authToken) {
      throw new Error('Authentication token not found');
    }
  
    const response = await fetch('http://54.156.208.82/movimientos', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch movement information');
    }
  
    const data = await response.json();
    return data;
  }
  
  // Function to check if the session cookie with the authentication token exists
  function checkSessionToken() {
    const authToken = getAuthToken();
    if (!authToken) {
      window.location.href = './ingreso.html';
    }
  }
  
  // Helper function to retrieve the authentication token from the session cookie
  function getAuthToken() {
    const authTokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('authToken='));
    if (authTokenCookie) {
      return authTokenCookie.split('=')[1];
    } else {
      return null;
    }
  }