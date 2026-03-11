import { headers } from "next/headers";

const getHostname = async () => {
    const headersList = await headers();
    return headersList.get('host') ?? undefined;
}

const isReceitas = (hostname?: string | null) => {
    return hostname === process.env.NEXT_PUBLIC_RECIPES_HOSTNAME;
};

const isBand = (hostname?: string | null) => {
    return hostname === process.env.NEXT_PUBLIC_PORTAL_HOSTNAME;
};

export { isBand, isReceitas, getHostname };