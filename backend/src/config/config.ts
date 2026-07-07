import "dotenv/config";

type CONFIG = {
  readonly MONGODB_URI: string;
  readonly GOOGLE_API_KEY: string;
  readonly MISTRAL_API_KEY: string;
  readonly COHERE_API_KEY: string;
};

const config: CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
};

export default config;
