// src/components/ModalComponent/ModalComponent.js
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalComponent = ({ title, body, footer, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null); // Ref para o modal

    const openModal = () => {
        setIsOpen(true);
        // Coloca o foco no modal
        if (modalRef.current) {
            modalRef.current.focus();
        }
    };

    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isOpen) {
                closeModal();
            }
        };

        // Adiciona o evento de teclado
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            {/* Botão para abrir o modal */}
            <button type="button" className="btn btn-primary" onClick={openModal}>
                {title}
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="modal fade show"
                    style={{ display: 'block' }}
                    id={id}
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby={`${id}Label`}
                    aria-hidden={!isOpen}
                    ref={modalRef} // Adicionando ref para o modal
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title flex-grow-1" id={`${id}Label`}>
                                    {title}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                {body}
                            </div>
                            <div className="modal-footer">
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalComponent;
