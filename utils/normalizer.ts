const normalizeTemplates = (html: string): string => {
    if (!html) return '';

    return html.replace(
        /\<p\>\[template="([^"]+)"([^\]]*)\]\<\/p\>/g,
        (_, templateName, rawAttrs) => {
            const attrs: Record<string, string> = {};

            const attrRegex = /(\w+)="([^"]+)"/g;
            let match;

            while ((match = attrRegex.exec(rawAttrs))) {
                attrs[match[1]] = match[2];
            }

            const attrString = Object.entries(attrs)
                .map(([key, value]) => `${key}="${value}"`)
                .join(' ');

            return `<cms-template template="${templateName}" ${attrString}></cms-template>`;
        }
    );
}

const normalizeEmbed = (html: string): string => {
    if (!html) return '';
    return html.replace(
        /\<p\>\[embed\]([^"]+)\[\/embed\]\<\/p\>/g,
        (_, embedUrl) => {
            return `<cms-embed embed-url="${embedUrl}"></cms-embed>`;
        }
    );
}

const normalizeHtml = (html: string): string => {
    const normalizedTemplates = normalizeTemplates(html);
    const normalizedEmbed = normalizeEmbed(normalizedTemplates);
    const normalized = normalizedEmbed
    return normalized;
}

export { normalizeHtml };