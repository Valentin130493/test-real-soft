import React from 'react';
import {firebaseAddCard,} from "../../config";
import {v4 as uuidv4} from "uuid";
import {DistanceConverter} from "../../helpers";
import {useAppDispatch} from "../../store/hooks";
import {addCard} from "../../store/reducers/cardReducer";
import {MyMap} from "../map";

import {close} from "../../assets";

import "./style.scss"



interface MarkerType {
    lat: number | undefined;
    lng: number | undefined;
}


type AddFormProps = {
    handleClose: () => void
}

interface FormState {
    title: string;
    short_desc: string;
    full_desc: string;
}

export const AddForm: React.FC<AddFormProps> = ({handleClose}) => {
    const dispatch = useAppDispatch()

    const [formState, setFormState] = React.useState<FormState>({
        title: '',
        short_desc: '',
        full_desc: '',
    });

    const handleFormsInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormState((prevState: FormState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };
    const [markers, setMarkers] = React.useState<MarkerType[]>([]);
    const [distance, setDistance] = React.useState<number | null>(null);

    const handleMapClick = React.useCallback((event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();
        const newMarker: MarkerType = {lat, lng};
        setMarkers([...markers, newMarker]);

        if (markers.length !== 0) {
            // @ts-ignore
            const markerPositions = markers.map((item) => new google.maps.LatLng(item.lat, item.lng));
            const distanceInMeters = google.maps.geometry.spherical.computeLength(markerPositions);
            setDistance(distanceInMeters);
        } else {
            setDistance(null);
        }
    }, [markers]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const formData = {...formState, markers, distance, is_fav_: false, id: uuidv4()}
        await firebaseAddCard(formData)
        dispatch(addCard(formData))
        handleClose()
    };

    React.useEffect(()=>{

    },[markers])
    return (
        <div className={"add_form"}>
            <header>
                <h3>Add new path</h3>
                <img src={close} alt="close" onClick={handleClose}/>
            </header>

            <section>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Название:</label>
                        <input
                            type="text"
                            id="title"
                            name={"title"}
                            className="form-control"
                            value={formState.title}
                            onChange={handleFormsInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="short_desc">Краткое описание:</label>
                        <textarea
                            name={"short_desc"}
                            id="short_desc"
                            className="form-control"
                            value={formState.short_desc}
                            maxLength={160}
                            onChange={handleFormsInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="full_desc">Полное описание:</label>
                        <textarea
                            id="full_desc"
                            className="form-control"
                            name={"full_desc"}
                            value={formState.full_desc}
                            onChange={handleFormsInputChange}
                        />
                    </div>


                    <p>Length: {DistanceConverter(distance)}</p>

                    <button type="submit" className="btn">
                        Add path
                    </button>
                </form>
                <div className={"right_side"}>
                    <MyMap markers={markers} handleMapClick={handleMapClick}/>
                </div>
            </section>
        </div>
    );
};

