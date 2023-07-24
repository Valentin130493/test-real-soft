import React from 'react';

import {GoogleMap, Marker, useJsApiLoader, Polyline} from "@react-google-maps/api";
import {firebaseUpdateMarkers, mapSettings} from "../config";
import {mapMarker} from "../assets";
import {useAppSelector} from "../store/hooks";

const libraries: Array<"drawing" | "places" | "geometry"> = ['drawing', 'places', 'geometry'];

interface MyMapProps {
    markers?: any[];
    handleMapClick?: (event: google.maps.MapMouseEvent) => void;
}

export const MyMap: React.FC<MyMapProps> = ({markers, handleMapClick}) => {
    const {card} = useAppSelector((state => state.card))
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapSettings.mapsApiKey,
        libraries,
    })
    const [, setMap] = React.useState(null)

    // @ts-ignore
    const [mapMarkers, setMapMarkers] = React.useState<any[]>(card?.markers || markers);

    const onMarkerDragEnd = (event: any, index: number) => {
        const {latLng} = event;
        const lat = latLng.lat();
        const lng = latLng.lng();

        setMapMarkers((prevMarkers) => {
            const updatedMarkers = [...prevMarkers];
            updatedMarkers[index] = {lat, lng};
            firebaseUpdateMarkers(card, updatedMarkers)
            return updatedMarkers;
        });


    };
    const onUnmount = React.useCallback(() => {
        setMap(null)
    }, [])

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={{height: '100%', width: '100%'}}
                center={mapSettings.center}
                zoom={mapSettings.zoom}
                onUnmount={onUnmount}
                onClick={handleMapClick}

            >
                {mapMarkers?.map((marker: any, index: number) => (
                    <Marker icon={mapMarker} key={index} position={{lat: marker?.lat, lng: marker?.lng}}
                            draggable={true}
                            onDragEnd={(e) => onMarkerDragEnd(e, index)}/>
                ))}
                <Polyline
                    path={mapMarkers}
                    options={{
                        strokeColor: "rgb(217,15,15)",
                        strokeOpacity: 0.8,
                        strokeWeight: 2
                    }}/>
            </GoogleMap>
        ) : <></>
    );
};

