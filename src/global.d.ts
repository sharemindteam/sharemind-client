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

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }
}

export {};
