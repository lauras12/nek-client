// import env from "react-dotenv";
export default {
   // API_ENDPOINT: 'http://localhost:8000/api',
    API_ENDPOINT: (window.env && window.env.API_URL) || 'https://nek-api.herokuapp.com/api',
    API_KEY: process.env.REACT_APP_API_KEY,
}