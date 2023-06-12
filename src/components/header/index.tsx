import React from 'react';

import {arrows} from "../../assets";

import "./style.scss"


type HeaderProps = {
    onOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({onOpen}) => {
    return (
        <header>
            <div className={"box"}><img src={arrows} alt="arrows"/>
                <h1>Saunter</h1></div>
            <button type={"button"} onClick={onOpen}>Add path</button>
        </header>
    );
};
