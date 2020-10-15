import React from 'react';
import {Link} from 'react-router-dom';


export default function HikeItem(props) {
    const {hikeId, id} = props
    return (
        <div>
            <Link to={`/hike/${hikeId}/${id}`}>
            <img src={props.img} alt="view of hike" />
            </Link>
        </div>
    )
}