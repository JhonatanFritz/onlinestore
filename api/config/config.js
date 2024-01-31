export default {
    jwtSecret: "722CCB14CD9AD738EECCB62B6DF1C",
  };
  export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
  
  export const DB_HOST = process.env.DB_HOST || "localhost";
  export const DB_PORT = process.env.DB_PORT || 8000;
  export const DB_DATABASE = process.env.DB_DATABASE || "postgres";
  export const DB_USER = process.env.DB_USER || "postgres";
  export const DB_PASSWORD = process.env.DB_PASSWORD || "mysecretpassword";
  
  export const PORT = process.env.PORT || 3000;
  
  export const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";