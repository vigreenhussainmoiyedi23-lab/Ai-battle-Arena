import "dotenv/config";
type CONFIG = {
  port: number;
  MISTRAL_API_KEY: string;
  COHERE_API_KEY: string;
  GOOGLE_API_KEY: string;
  MONGO_URI: string;
};
const config: CONFIG = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  MONGO_URI: process.env.MONGO_URI || "",
};

export default config