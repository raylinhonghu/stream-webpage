import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div className="ui modal dimmer visible active">
            <div className="ui modal standard visible active">
                i am modal
            </div>
        </div>,
        document.querySelector('#modal')
    )
}