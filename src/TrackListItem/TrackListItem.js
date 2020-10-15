import React from 'react';
import { Link } from 'react-router-dom';



export default function TrackListItem(props) {
    console.log(props)
    const track_id = props.id
    return (

        <Link to={`/hike/${track_id}` }>
            <h2>{props.name}</h2>
            <h2>{props.sanskrit}</h2>
            <img src={props.img} alt="view of hike" />
        </Link>

    )

}