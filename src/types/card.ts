export interface Marker {
    lat: number;
    lng: number;
}

export interface CardInterface {
    id: string;
    is_fav: boolean;
    title: string;
    short_desc: string
    full_desc: string;
    distance: number;
    markers: Marker[]
}