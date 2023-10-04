let apiBaseUrl: string;

if (typeof window === 'undefined') {
  // We are on the server
  apiBaseUrl = process.env.NODE_ENV === 'production' ? 'https://ajsibleyback-310003c917de.herokuapp.com' : 'http://localhost:3000';
} else {
  // We are on the client
  if (window.location.hostname === 'localhost') {
    apiBaseUrl = 'http://localhost:3000';
  } else {
    apiBaseUrl = 'http://192.168.50.222:3000';
  }
}

export default apiBaseUrl;
