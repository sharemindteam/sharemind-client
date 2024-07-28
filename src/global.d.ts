// global.d.ts
interface PayApp {
  setDefault(key: string, value: string): void;
  setParam(key: string, value: string): void;
  payrequest(): void;
}

declare global {
  interface Window {
    PayApp: PayApp;
  }
}

export {};
