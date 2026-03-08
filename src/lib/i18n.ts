'use client';

import { useEffect, useState } from 'react';

export type Locale = 'ko' | 'en';

function detectLocale(): Locale {
    if (typeof navigator === 'undefined') return 'ko';
    const lang = navigator.language || '';
    return lang.toLowerCase().startsWith('en') ? 'en' : 'ko';
}

export function useLanguage(): Locale {
    const [locale, setLocale] = useState<Locale>('ko');
    useEffect(() => {
        const detected = detectLocale();
        setLocale(detected);
        document.body.classList.remove('lang-en', 'lang-ko');
        document.body.classList.add(`lang-${detected}`);
    }, []);
    return locale;
}

// ─── Translation dictionary ───────────────────────────────────────────────────

export const translations = {
    ko: {
        // InteractiveCardHero
        hero: {
            phase1We: '우리',
            phase1Play: '한판 할까?',
            coreMessage: '밸런스, 진실게임 퀴즈로 대화하고\n빙고게임도 하고',
            scrollHint: '스크롤',
            ctaPrimary: '빙고게임 하러가기',
            msgBalanceTitle: '두 가지 선택, 하나의 진짜 대화',
            msgBalanceBody: '왜 그걸 골랐는지 설명하는 순간,\n우리는 서로를 더 잘 이해하게 됩니다.',
            msgTruthTitle: '하나의 질문, 진짜 나의 이야기',
            msgTruthBody: '솔직한 한마디를 꺼내는 순간,\n대화는 더 깊어집니다.',
        },
        cards: [
            { type: 'balance', question: '더 선호하는 취미는?', choiceA: '만들기', choiceB: '스포츠', emoji: '🎨', preview: '만들기 vs 스포츠' },
            { type: 'balance', question: '내 탕수육 취향은?', choiceA: '찍먹', choiceB: '부먹', emoji: '🍖', preview: '찍먹 vs 부먹' },
            { type: 'balance', question: '더 끌리는 쪽은?', choiceA: '분석파', choiceB: '직관파', emoji: '🤔', preview: '분석 vs 직관' },
            { type: 'balance', question: '가고 싶은 여름 여행은?', choiceA: '산', choiceB: '바다', emoji: '🏖️', preview: '산 vs 바다' },
            { type: 'truth', question: '지금 가장 보고 싶은것은?', emoji: '👀', preview: '보고 싶은 것' },
            { type: 'truth', question: '생일날, 받고 싶은 것은?', emoji: '🎁', preview: '생일 선물' },
            { type: 'truth', question: '최근 가장 즐거웠을 때는?', emoji: '😄', preview: '가장 즐거운 때' },
            { type: 'truth', question: '올해 연말 계획은?', emoji: '🗓️', preview: '연말 계획' },
        ],
        // AppDownloadButton (inside InteractiveCardHero)
        store: {
            ios: 'App Store에서 다운로드',
            android: 'Google Play에서 다운로드',
            macos: 'Mac App Store에서 다운로드',
            windows: 'Microsoft Store에서 검색',
            web: '앱 다운로드 받기',
        },
        // InteractiveBoardCarousel
        carousel: {
            hintText: '게임화면 미리보기',
            screens: [
                { label: '홈 화면', title: '메인홈', desc: '"새 게임"을 누르고, 대화하고 싶은 사람을 부르세요' },
                { label: '게임 설정', title: '빙고 보드', desc: '5x5보드. 25칸을 가진 빙고 입니다' },
                { label: '빙고 보드', title: '빙고 셀', desc: '한칸을 눌러서 빙고를 시작하세요' },
                { label: '게임 진행', title: '밸런스 퀴즈', desc: '두 선택지 중에 더 마음에 드는 것을 고른 후, 상대방에게 이유를 알려주세요' },
                { label: '밸런스 게임', title: '진실게임 퀴즈', desc: '나의 생각을 입력하고, 상대방에게 설명해 주세요' },
                { label: '실시간 채팅', title: '공감 받기', desc: '상대방에게 공감을 받으면, "빙고 셀"을 획득 할 수 있습니다' },
                { label: '결과 화면', title: '비공감', desc: '상대방에게 공감을 얻지 못하면, 3턴 뒤에 "미니게임"에서 승리하고, 빙고셀을 다시 획득하세요' },
                { label: '상대방 셀 뺏기', title: '상대방 셀 뺏기', desc: '빙고를 완성하기 위해 상대방셀에 도전하세요' },
                { label: '미니게임', title: '미니게임', desc: '당신의 도전을 위해 다양한 미니게임이 있습니다, 최대한 많은 점수를 획득하세요' },
                { label: '마이 페이지', title: '빙고라인', desc: '최대3줄 까지 빙고라인을 만드실 수 있어요' },
                { label: '초대 화면', title: '게임종료', desc: '빙고라인 한줄 마다, "게임 지속 여부"를 결정 하실 수 있어요' },
            ],
        },
        // WhenToUseSection
        whenToUse: {
            title: '이런 순간,\nTALKBINGO로 초대해보세요',
            reasons: [
                '대화가 어색해질 때',
                '기억에 남는 시간을 가지고 싶을 때',
                '서로를 더 알고 싶은데 방법을 모를 때',
                '그냥 심심해서 누군가와 이야기하고 싶을 때',
            ],
        },
        // DownloadButtons
        download: {
            playNow: 'PLAY NOW',
            bingoGame: '빙고게임 하러가기',
        },
        // Footer
        footer: {
            service: '서비스',
            webPlay: '웹 플레이',
            support: '지원',
            privacy: '개인정보처리방침',
            contact: '문의하기',
        },
        // page.tsx sections
        chat: {
            title: '빙고게임은 핑계,\n퀴즈에 응답하면서\n진짜 대화를 시작하세요!',
            desc: '전략적으로 빙고셀을 선택하고, 진솔하게 둘만의 채팅을 이어나가세요.',
        },
        features: {
            title: 'SPECIAL FEATURE',
            items: [
                { title: '관계별 맞춤 질문', desc: '연인, 가족, 친구 등 관계에 따라 최적화된 질문이 제공됩니다.' },
                { title: '음성 문자 변환', desc: '음성으로 채팅을 보낼 수 있습니다.' },
                { title: '미니게임', desc: '상대방 셀을 눌러서 도전하세요. 미니게임에서 승리하면 상대방 셀을 쟁취할 수 있습니다.' },
                { title: '다국어 지원', desc: '지금은 한국어와 영어를 지원하지만, 점차 다국어 지원을 확대할 것입니다.' },
                { title: '커뮤니티', desc: '가까운 지역에 있는 사람들과 대화로 새로운 인연을 만드세요.' },
                { title: '빙고게임 기록', desc: '사랑하는 사람들과의 의미 있었던 대화를 기록으로 남기세요.' },
            ],
        },
        downloadSection: {
            title: '지금,\nTALKBINGO로\n대화를 시작하세요.',
        },
    },
    en: {
        hero: {
            phase1We: 'Let\'s',
            phase1Play: 'play BINGO!',
            coreMessage: 'Chat and play together —\nBalance Q&A, Truth Game & Bingo',
            scrollHint: 'Scroll',
            ctaPrimary: 'Play Now',
            msgBalanceTitle: 'Two choices, one real conversation',
            msgBalanceBody: 'The moment you explain why you chose it,\nyou understand each other better.',
            msgTruthTitle: 'One question, your true story',
            msgTruthBody: 'The moment you say something honest,\nthe conversation gets deeper.',
        },
        cards: [
            { type: 'balance', question: 'Preferred hobby?', choiceA: 'Creating', choiceB: 'Sports', emoji: '🎨', preview: 'Create vs Sports' },
            { type: 'balance', question: 'How do you eat sweet & sour pork?', choiceA: 'Dip it', choiceB: 'Pour it', emoji: '🍖', preview: 'Dip vs Pour' },
            { type: 'balance', question: 'Which appeals to you more?', choiceA: 'Analytical', choiceB: 'Intuitive', emoji: '🤔', preview: 'Analytical vs Intuitive' },
            { type: 'balance', question: 'Summer trip destination?', choiceA: 'Mountains', choiceB: 'Beach', emoji: '🏖️', preview: 'Mountains vs Beach' },
            { type: 'truth', question: 'What do you miss most right now?', emoji: '👀', preview: 'Miss most' },
            { type: 'truth', question: 'What gift do you want for your birthday?', emoji: '🎁', preview: 'Birthday wish' },
            { type: 'truth', question: 'When were you happiest recently?', emoji: '😄', preview: 'Happiest moment' },
            { type: 'truth', question: 'What are your year-end plans?', emoji: '🗓️', preview: 'Year-end plans' },
        ],
        store: {
            ios: 'Download on the App Store',
            android: 'Get it on Google Play',
            macos: 'Download on Mac App Store',
            windows: 'Find on Microsoft Store',
            web: 'Download the App',
        },
        carousel: {
            hintText: 'Preview screens',
            screens: [
                { label: 'Home', title: 'Main Home', desc: 'Tap "New Game" and invite someone you want to talk with' },
                { label: 'Game Setup', title: 'Bingo Board', desc: 'A 5x5 board with 25 cells' },
                { label: 'Bingo Board', title: 'Bingo Cell', desc: 'Tap a cell to start the bingo' },
                { label: 'Gameplay', title: 'Balance Quiz', desc: 'Pick your favorite of two options, then tell the other person why' },
                { label: 'Balance Game', title: 'Truth Quiz', desc: 'Share your thoughts and explain them to the other person' },
                { label: 'Live Chat', title: 'Get Empathy', desc: 'When the other person empathizes, you earn a "Bingo Cell"' },
                { label: 'Results', title: 'No Empathy', desc: 'If you don\'t get empathy, win a mini-game after 3 turns to reclaim the cell' },
                { label: 'Steal Cell', title: 'Steal a Cell', desc: 'Challenge the opponent\'s cell to complete your bingo' },
                { label: 'Mini Game', title: 'Mini Game', desc: 'Various mini-games await your challenge — score as high as you can!' },
                { label: 'My Page', title: 'Bingo Line', desc: 'You can form up to 3 bingo lines' },
                { label: 'Invite', title: 'Game Over', desc: 'After each bingo line, decide whether to keep playing' },
            ],
        },
        whenToUse: {
            title: 'These moments call for\nTALKBINGO',
            reasons: [
                'When conversation feels awkward',
                'When you want to create a memorable moment',
                'When you want to know each other better but don\'t know how',
                'When you\'re bored and just want to talk to someone',
            ],
        },
        download: {
            playNow: 'PLAY NOW',
            bingoGame: 'Play Now',
        },
        footer: {
            service: 'Service',
            webPlay: 'Play on Web',
            support: 'Support',
            privacy: 'Privacy Policy',
            contact: 'Contact Us',
        },
        chat: {
            title: 'Bingo is just the excuse —\nreal conversations start with every answer',
            desc: 'Strategically pick your bingo cells, and keep the chat honest and heartfelt.',
        },
        features: {
            title: 'SPECIAL FEATURE',
            items: [
                { title: 'Tailored Questions', desc: 'Questions are optimized for your relationship — lovers, family, friends, and more.' },
                { title: 'Voice to Text', desc: 'Send chat messages with your voice.' },
                { title: 'Mini Games', desc: 'Tap the opponent\'s cell to challenge them. Win the mini-game to claim their cell.' },
                { title: 'Multilingual', desc: 'Currently supporting Korean and English, with more languages coming soon.' },
                { title: 'Community', desc: 'Make new connections through conversations with people nearby.' },
                { title: 'Game History', desc: 'Keep meaningful conversations with your loved ones as lasting memories.' },
            ],
        },
        downloadSection: {
            title: 'Your TALKBINGO starts here',
        },
    },
} as const;

export type Translations = typeof translations['ko'];

export function useTranslation(): Translations {
    const locale = useLanguage();
    return translations[locale] as Translations;
}
