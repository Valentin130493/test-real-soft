import React from 'react';
import {GoogleMap, Marker, useJsApiLoader, Polyline} from "@react-google-maps/api";
import {mapSettings} from "../config";
import {mapMarker} from "../assets";

const libraries: Array<"drawing" | "places" | "geometry"> = ['drawing', 'places', 'geometry'];

interface MyMapProps {
    markers?: any[]
    handleMapClick?: (event: google.maps.MapMouseEvent) => void
}

export const MyMap: React.FC<MyMapProps> = ({markers, handleMapClick}) => {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapSettings.mapsApiKey,
        libraries,
    })
    const [, setMap] = React.useState(null)

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
                {markers?.map((marker: any, index: number) => (
                    <Marker icon={mapMarker} key={index} position={{lat: marker?.lat, lng: marker?.lng}}/>
                ))}
                <Polyline
                    path={markers}
                    options={{
                        strokeColor: "rgb(217,15,15)",
                        strokeOpacity: 0.8,
                        strokeWeight: 2
                    }}/>
            </GoogleMap>
        ) : <></>
    );
};

