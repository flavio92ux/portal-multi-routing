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

export { normalizeTemplates };