let apiBaseUrl: string;

if (process.env.NODE_ENV === 'production') {
  // We are on the server and in production mode
  apiBaseUrl = 'https://ajsibleyback-310003c917de.herokuapp.com';
} else {
  // We are on the server or client but in development mode
  if (typeof window !== 'undefined') {
    // We are on the client
    apiBaseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://192.168.50.222:3000';
  } else {
    // We are on the server
    apiBaseUrl = 'http://localhost:3000';  // Default to localhost; change to network URL if needed
  }
}

console.log('API base URL:', apiBaseUrl);
export default apiBaseUrl;
