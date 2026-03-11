'use client';

import Script from "next/script";

export function XEmbed({ url }: { url: string }) {
    const normalizedURl = url.replace('https://x.com/', 'https://twitter.com/').replace('https://www.x.com/', 'https://twitter.com/');
    return (
        <>
            <Script src="https://platform.twitter.com/widgets.js" async />
            <blockquote className="twitter-tweet">
                <a href={normalizedURl} target="_blank" rel="noopener noreferrer">
                    Tweet
                </a>
            </blockquote >
        </>
    )
}