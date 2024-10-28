import React, { useEffect, useState } from 'react';
import '../../styles/spinner.css';

export default function Spinner() {
    const timeout = 5;
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, timeout * 1000);
    }, []);

    return (
        <div id="spinner-overlay" className={`spinner-overlay ${show ? '' : 'd-none'}`}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}