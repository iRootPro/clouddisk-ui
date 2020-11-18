import React from 'react';
import styles from "./Modal.module.css"

const Modal = ({modalActive, setModalActive, children}: ModalPropsType) => {
    return (
        <div className={modalActive ? `${styles.wrapper} ${styles.active}` : styles.wrapper}
             onClick={() => setModalActive(false)}>
            <div className={modalActive ? `${styles.content} ${styles.active}` : styles.content}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;

// types

type ModalPropsType = {
    modalActive: boolean
    setModalActive: (value: boolean) => void
    children: React.ReactNode
}
