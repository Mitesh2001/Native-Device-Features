export interface Location {
    lat: number;
    lng: number;
}

export interface Place {
    id: string;
    title: string;
    imageUrl: string;
    address: string;
    location: Location
}