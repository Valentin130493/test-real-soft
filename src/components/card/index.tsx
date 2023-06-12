import React from 'react';
import {DistanceConverter} from "../../helpers";
import {CardInterface} from "../../types";

import {arrows, rightArrow} from "../../assets";

import "./style.scss"
import {getCard} from "../../store/reducers/cardReducer";
import {useAppDispatch, useAppSelector} from "../../store/hooks";


interface CardProps {
    item: CardInterface
}

export const Card: React.FC<CardProps> = React.memo(({item}) => {

    const {is_fav, short_desc, title, distance, id} = item
    const dispatch = useAppDispatch();
    const {card} = useAppSelector((state => state.card))
    const [clicked, setClicked] = React.useState<boolean>(false)

    const handleCardClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        e.stopPropagation()
        if (clicked) {
            dispatch(getCard(null))

        } else {
            dispatch(getCard(id))
        }
        setClicked(!clicked)
    }
    React.useEffect(()=>{},[item])

    return (
        <div className={clicked && card?.id === id ? `card clicked` : 'card'} onClick={(e) => handleCardClick(e, id)}>
            <img src={arrows} alt="arrows"/>
            <div>
                <div className={"card_center"}>
                    <p>{is_fav && `*`}</p>
                    <h5>{title}</h5>
                </div>
                <p>{short_desc.substring(0, 25)}</p>
            </div>
            <p>{DistanceConverter(distance)}</p>
            <img src={rightArrow} alt="rightArrow"/>
        </div>
    );
});
