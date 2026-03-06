import { GalleryResponse } from "@/types/gallery";
import { GalleryTemplateAttributes } from "@/types/templates";

const galleryTemplate = async (attributes: GalleryTemplateAttributes): Promise<GalleryResponse|null> => {
    const mediaids = attributes.mediaid || '';
    const URL_FETCH = `${process.env.PROXY_VIBRA_ELASTIC}/api/v1/BandGallery/${mediaids}`;

    try {
        const response = await fetch(URL_FETCH);
        if (!response.ok) {
            console.error('[API ERROR] Fetch failed', {
                status: response.status,
                statusText: response.statusText,
                url: URL_FETCH,
                mediaids,
            });
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('[API ERROR] Fetch exception', {
            error: error instanceof Error ? error.message : String(error),
            url: URL_FETCH,
            mediaids,
        });
        return null;
    }
}

export { galleryTemplate };