import React from 'react';
import {DistanceConverter} from "../../helpers";
import {CardInterface} from "../../types";
import {MyMap} from "../../map";
import {useAppDispatch} from "../../store/hooks";
import {setCardFav} from "../../store/reducers/cardReducer";


import "./style.scss"


interface OpenCardProps {
    card: CardInterface | null;
}

export const OpenCard: React.FC<OpenCardProps> = ({card}) => {
    const dispatch = useAppDispatch()

    const handleRemove = () => {
        dispatch(setCardFav({is_fav: false, id: card?.id}))
    }

    const handleAdd = () => {
        dispatch(setCardFav({is_fav: true, id: card?.id}))
    }


    React.useEffect(() => {
    }, [card])

    return (
        <div className={"open_card"}>
            <div className={"open_card__header"}>
                <h3>{card?.title}</h3>
                <p>{DistanceConverter(card?.distance)}</p>
            </div>
            <p>{card?.full_desc}</p>

            <div className={"google"}>
                <MyMap/>
            </div>

            <div className={"links"}>
                {card?.is_fav ? <p className={"remove"} onClick={handleRemove}>Remove</p> :
                    <p className={"add"} onClick={handleAdd}>Add to favorite</p>}
            </div>
        </div>
    );
}
