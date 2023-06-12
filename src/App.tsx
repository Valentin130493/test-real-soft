import React from 'react';
import {AddForm, Card, Header, Modal, OpenCard} from "./components";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {getCards} from "./store/reducers/cardReducer";
import {search} from "./assets";
import {CardInterface} from "./types";

import "./style.scss"


export const App = () => {
    const dispatch = useAppDispatch();
    const {loading, cards, card, error} = useAppSelector((state => state.card))

    React.useEffect(() => {
        dispatch(getCards())
    }, [])

    const [open, setOpen] = React.useState<boolean>(false)
    const [inputValue, setInputValue] = React.useState<string>('')


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleClose = () => {
        setOpen(false)
    }
    React.useEffect(() => {
    }, [card])

    if (loading) {
        return <p>...Data is loading</p>
    }

    if (error) {
        return <p style={{color: 'red'}}>{error}</p>
    }


    return (
        <div className={"layout"}>
            <Header onOpen={() => setOpen(true)}/>
            <main>
                <div className={'input'}><input value={inputValue} placeholder={"Search"} onChange={handleInputChange}/>
                    <img src={search} alt="search"/>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div
                        className={"cards"}>{cards?.filter(item => item.title.includes(inputValue) || item.full_desc.includes(inputValue))?.map((item: CardInterface) => {
                        return <Card key={item.id}
                                     item={item}

                        />
                    })}
                    </div>
                    <div style={{width: '45%'}}>{card && <OpenCard card={card}/>}</div>
                </div>
            </main>
            {open && <Modal><AddForm handleClose={handleClose}/></Modal>}
        </div>
    );
}

