import { CustomTemplateBlock } from "@/types/article";
import { GalleryTemplateAttributes } from "@/types/templates";
import { galleryTemplate } from "@/utils/cms-template";
import dynamic from "next/dynamic";

const Gallery = dynamic(
    () => import("./Gallery").then((mod) => mod.Gallery),
    {
        loading: () => (
            <div className="w-full h-130 bg-gray-200 animate-pulse rounded-lg" />
        ),
    }
);

const OneFootballEmbed = dynamic(
    () => import("./OneFootballEmbed").then((mod) => mod.OneFootballEmbed),
    {
        loading: () => (
            <div className="w-full h-130 bg-gray-200 animate-pulse rounded-lg" />
        ),
    }
);

export async function CustomTemplate({ template, props }: CustomTemplateBlock) {
    switch (template) {
        case 'galery': {
            const galleryData = await galleryTemplate(props as GalleryTemplateAttributes);
            return <Gallery galleryData={galleryData} />;
        }
        case 'embed-video-player': {
            if (props.type === 'onefootball') {
                return <OneFootballEmbed id={props.id} />
            } else if (props.type === 'spalla') {
                return <></>
            }
        }
        default:
            return null;
    }
}