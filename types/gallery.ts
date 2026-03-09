export interface GalleryResponse {
    "_id": string;
    "title": string;
    "url": string;
    "tags": GalleryTag;
    "gallery": GalleryItem[];
    "id": string;
    "@updated": string;
}

export interface GalleryTag {
    "id": string;
    "name": string;
    "type": string;
    "id_uolmais": string;
    "_id": string;
}

export interface GalleryItem {
    "image": GalleryImage;
}

export interface GalleryImage {
    "title": string;
    "filter": string;
    "credit": string;
    "url": string;
    "hash": string;
    "width": number;
    "height": number;
    "_id": string;
    "created_at": string;
    "updated_at": string;
    "uploadVibra": boolean;
    "urlCrop": string;
}

export interface GalleryProps {
    galleryData: GalleryResponse | null;
}