declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BACK_END_URL: string;
      REACT_APP_MAPS_API_KEY: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
