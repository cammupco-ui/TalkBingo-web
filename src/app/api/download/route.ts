import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
    const userAgent = req.headers.get('user-agent') || '';
    
    // 기본값: Google Play Store
    let redirectUrl = 'https://play.google.com/store/apps/details?id=com.cammupco.talkbingo';
    
    if (/iPad|iPhone|iPod/i.test(userAgent) && !/Macintosh/i.test(userAgent)) {
        // iOS
        redirectUrl = 'https://apps.apple.com/app/id6740272133';
    } else if (/Android/i.test(userAgent)) {
        // Android
        redirectUrl = 'https://play.google.com/store/apps/details?id=com.cammupco.talkbingo';
    } else if (/Mac/i.test(userAgent) || /Macintosh/i.test(userAgent)) {
        // Mac App Store
        redirectUrl = 'https://apps.apple.com/app/id6740272133';
    } else if (/Win/i.test(userAgent) || /Windows/i.test(userAgent)) {
        // Windows
        redirectUrl = 'https://www.microsoft.com/store/search/talkbingo';
    }

    return NextResponse.redirect(redirectUrl);
}
