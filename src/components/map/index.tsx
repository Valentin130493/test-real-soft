import React from "react";

// import {GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api";
// import {mapSettings} from "../../config";
//
// import {mapMarker} from "../../assets";
//
//
// interface MarkerType {
//     lat: number | undefined;
//     lng: number | undefined;
// }


export const Map: React.FC = () => {
    // const libraries: Array<"drawing" | "places" | "geometry"> = ['drawing', 'places', 'geometry'];
    //
    // const {isLoaded} = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: mapSettings.mapsApiKey,
    //     libraries,
    // })
    //
    // const [map, setMap] = React.useState(null)
    // const [markers, setMarkers] = React.useState<MarkerType[]>([]);
    // const [distance, setDistance] = React.useState<number | null>(null);
    // const onLoad = React.useCallback(function callback(map: any) {
    //     const bounds = new window.google.maps.LatLngBounds(mapSettings.center);
    //     map.fitBounds(bounds);
    //
    //     setMap(map)
    // }, [])
    //
    // const onUnmount = React.useCallback(function callback(map: any) {
    //     setMap(null)
    // }, [])
    //
    // const handleMapClick = React.useCallback((event: google.maps.MapMouseEvent) => {
    //     const lat = event.latLng?.lat();
    //     const lng = event.latLng?.lng();
    //     const newMarker: MarkerType = {lat, lng};
    //     setMarkers([...markers, newMarker]);
    // }, [markers]);
    //
    // const handleCalculateDistance = () => {
    //     if (markers.length >= 2) {
    //         const firstMarker: any = markers[0];
    //         const lastMarker: any = markers[markers.length - 1];
    //
    //         const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
    //             new google.maps.LatLng(firstMarker.lat, firstMarker.lng),
    //             new google.maps.LatLng(lastMarker.lat, lastMarker.lng)
    //         );
    //
    //         setDistance(distanceInMeters);
    //     } else {
    //         setDistance(null);
    //     }
    // };

    // return isLoaded ? (
    //     <GoogleMap
    //         mapContainerStyle={{height: '100%', width: '100%'}}
    //         center={mapSettings.center}
    //         zoom={20}
    //         onLoad={onLoad}
    //         onUnmount={onUnmount}
    //         onClick={(event) => {
    //             handleMapClick(event)
    //             handleCalculateDistance()
    //         }}
    //     >
    //         {markers?.map((marker: any, index) => (
    //             <Marker icon={mapMarker} key={index} position={{lat: marker?.lat, lng: marker?.lng}}/>
    //         ))}
    //     </GoogleMap>
    // ) : <></>
    return null
};