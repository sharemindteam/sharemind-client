type InstallCase = 'webview' | 'direct' | 'guide' | 'unsupported';

export function detectEnvironment() {
  const userAgent = navigator.userAgent.toLowerCase();

  const isMobile = /iphone|ipad|android|mobile/.test(userAgent);
  const isIos = /iphone|ipad/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isWebview = /(wv|webview)/.test(userAgent) || /; wv\)/.test(userAgent);

  const isChrome = /chrome/.test(userAgent) && !/edge|edg/.test(userAgent);
  const isEdge = /edg/.test(userAgent);
  const isFirefox = /firefox/.test(userAgent);
  const isOpera = /opera|opr/.test(userAgent);
  const isSafari = /safari/.test(userAgent) && !isChrome && !isEdge && !isOpera;

  return {
    isMobile,
    isIos,
    isAndroid,
    isWebview,
    isChrome,
    isEdge,
    isFirefox,
    isOpera,
    isSafari,
  };
}

export function getPWAInstallCase(): InstallCase {
  const env = detectEnvironment();

  if (env.isWebview) return 'webview'; // Webview 환경
  if (env.isChrome || env.isEdge || env.isOpera) return 'direct'; // ✅ 설치 가능
  //  if (env.isFirefox || env.isSafari || env.isIos) return 'guide'; // 🚨 설치 안내
  //   direct하지 않은 경우, 일단 safari 모바일만 guide로 처리
  if (env.isSafari && env.isMobile) return 'guide'; // 🚨 설치 안내

  return 'unsupported'; // 기타 환경
}
