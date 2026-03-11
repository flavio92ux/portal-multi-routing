'use client'

import Script from "next/script";

export function InstagramEmbed({ url }: { url: string }) {
    return (
        <>
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ background: "#FFF", border: 0, margin: "1px", maxWidth: "540px", width: "100%", display: "block" }}
            >
                <a href={url} target="_blank" rel="noopener noreferrer">
                    Ver no Instagram
                </a>
            </blockquote>
            <Script src="https://www.instagram.com/embed.js" async />
        </>
    )
}