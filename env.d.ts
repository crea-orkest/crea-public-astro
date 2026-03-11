declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATOCMS_API_TOKEN: string;
      DATOCMS_READONLY_API_TOKEN: string;
    }
  }
}

export {};
