import "dotenv/config";
type CONFIG = {
    readonly MONGODB_URI: string;
    readonly GOOGLE_API_KEY: string;
    readonly MISTRAL_API_KEY: string;
    readonly COHERE_API_KEY: string;
};
declare const config: CONFIG;
export default config;
//# sourceMappingURL=config.d.ts.map