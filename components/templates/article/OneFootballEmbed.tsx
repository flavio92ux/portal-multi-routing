"use client"
import Script from "next/script";

export function OneFootballEmbed({ id }: { id: string }) {
    return (
        <>
            <Script src="https://embed.dugout.com/v3.1/band.js" />
            <div className={`dugout-video dugout-embed-${id}`}></div>
        </>
    )
}