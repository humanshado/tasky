import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
    return (
        <div className="page-not-found">
            <FontAwesomeIcon icon={faFrown} style={{ "font-size": "8rem", "color": "red" }} />
            <br /><br />
            <h4>Sorry the page you requested does not exist</h4>
        </div>
    )
}

export default NotFound;