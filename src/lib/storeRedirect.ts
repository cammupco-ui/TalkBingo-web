// Client-side userAgent → store URL resolver.
// Replaces the old /api/download server route so we can ship as a static export.

export type StorePlatform = 'ios' | 'android' | 'macos' | 'windows' | 'web';

const STORE_URLS: Record<StorePlatform, string> = {
  ios: 'https://apps.apple.com/app/id6759347728',
  android: 'https://play.google.com/store/apps/details?id=com.talkbingo.app',
  macos: 'https://apps.apple.com/app/id6759347728',
  windows: 'https://www.microsoft.com/store/search/talkbingo',
  // Fallback when we can't detect the platform — Google Play matches the previous server default.
  web: 'https://play.google.com/store/apps/details?id=com.talkbingo.app',
};

export function detectPlatform(): StorePlatform {
  if (typeof navigator === 'undefined') return 'web';
  const ua = navigator.userAgent || '';
  const plat = navigator.platform || '';
  if (/iPad|iPhone|iPod/i.test(ua) && !/Macintosh/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Mac/i.test(plat) || /Macintosh/i.test(ua)) return 'macos';
  if (/Win/i.test(plat) || /Windows/i.test(ua)) return 'windows';
  return 'web';
}

export function getStoreUrl(platform?: StorePlatform): string {
  return STORE_URLS[platform ?? detectPlatform()];
}

export function openStore(target: '_blank' | '_self' = '_blank'): void {
  const url = getStoreUrl();
  if (target === '_blank') {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url;
  }
}
