import React from 'react';

import "./style.scss"

type ModalProps = {
    children: JSX.Element,
}

export const Modal: React.FC<ModalProps> = ({children}) => {
    return (
        <div className={"modal"}>
            {children}
        </div>
    );
};

