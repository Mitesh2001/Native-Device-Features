import { Location } from "../types/place";

const GOOGLE_API_KEY = 'AIzaSyDWIOJsrTA_pMTmYT9U2Tg59I3L69h9ZDA';

export function getMapPreview(lat: Location['lat'], lng: Location['lng'], zoom: number = 12): string {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}