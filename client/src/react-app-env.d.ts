/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string,
    REACT_APP_CLOUD_NAME: string,
    REACT_APP_UPLOAD_PRESET: string,
    REACT_APP_USER: string
  }
}