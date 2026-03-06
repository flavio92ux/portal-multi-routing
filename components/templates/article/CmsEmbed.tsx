import { XEmbed } from "./XEmbed";
import { InstagramEmbed } from "./InstagramEmbed";

export function CmsEmbed({ url, provider }: { url: string; provider: string }) {
    switch (provider) {
        case 'x':
            return (
                <XEmbed url={url} />
            );
        case 'twitter':
            return (
                <XEmbed url={url} />
            );
        case 'instagram':
            return (
                <InstagramEmbed url={url} />
            );
        default:
            return ''

    }
}