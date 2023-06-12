export const mapSettings = {
    mapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
    center: {
        lat: 48.45,
        lng: 35.07,
    },
    lib: ['geometry'],
    zoom: 12
};
