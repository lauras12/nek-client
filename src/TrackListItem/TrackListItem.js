import React from 'react';
import TokenService from '../services/token-service';
import config from '../config';
import { withRouter } from 'react-router-dom';
import './TrackListItem.css';
import { animateScroll as scroll } from 'react-scroll';

function TrackListItem(props) {

    const handleClick = () => {
        const token = TokenService.hasAuthToken(config.TOKEN_KEY);
        scroll.scrollToTop();
        if (!token) {
            props.history.push(`/login`);
        }
        else if (props.location.pathname === '/') {
            props.history.push('/hikeForm');
        }
        else {
            props.history.push(`/hike/${props.id}`);
        }
    }

    return (
        <div className='item' >
            <li className='li' onClick={() => handleClick()}>
                <h2>{props.name}</h2>
                <h2>{props.sanskrit}</h2>
                <img src={props.img} alt='track, asana'/>
            </li>
        </div>
    );
}

export default withRouter(TrackListItem);