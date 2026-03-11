const xEmbed = dynamic(
    () => import("./XEmbed").then((mod) => mod.XEmbed),
    {
        loading: () => (
            <div className="w-full h-130 bg-gray-200 animate-pulse rounded-lg" />
        ),
    }
);

const InstagramEmbed = dynamic(
    () => import("./InstagramEmbed").then((mod) => mod.InstagramEmbed),
    {
        loading: () => (
            <div className="w-full h-130 bg-gray-200 animate-pulse rounded-lg" />
        ),
    }
);

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
