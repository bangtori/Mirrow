'use client'

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
    return (
        <html lang="ko">
            <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', gap: '1rem', fontFamily: 'sans-serif' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>문제가 발생했습니다.</p>
                <button
                    onClick={reset}
                    style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: '#333', color: '#fff', cursor: 'pointer', border: 'none' }}
                >
                    다시 시도
                </button>
            </body>
        </html>
    );
}
