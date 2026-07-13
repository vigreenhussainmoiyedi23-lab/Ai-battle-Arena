import "dotenv/config";
type CONFIG = {
  port: number;
  MISTRAL_API_KEY: string;
  COHERE_API_KEY: string;
  GOOGLE_API_KEY: string;
  GROQ_API_KEY: string;
  MONGO_URI: string;
  JWT_SECRET_KEY: string;
  NODE_ENV: string;
  FRONTEND_URL: string;
};
const config: CONFIG = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND_URL: process.env.FRONTEND_URL || "",
};

export default config;
