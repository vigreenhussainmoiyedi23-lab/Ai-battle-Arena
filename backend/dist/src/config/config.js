import "dotenv/config";
const config = {
    MONGODB_URI: process.env.MONGODB_URI || "",
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
};
export default config;
//# sourceMappingURL=config.js.map