import React from 'react';
import TrailContext from '../Context';
// import HikeTrackList from '../HikeTrackList/HikeTrackList';



export default class HikeFullTrailCard extends React.Component {
    static contextType = TrailContext;

    render() {
        const clickedTrackId = this.props.match.params.track_id;
        const { tracks, trackAttributes } = this.context;
        let {attributes , notes} = trackAttributes
        const clickedTrack = tracks.find(track => track.id === Number(clickedTrackId));
        const clickedTrackAttributes = trackAttributes.find(Object =>  Object.trackId === Number(clickedTrackId));

        if(!clickedTrackAttributes) {
           notes= '';
           attributes= ''; 
        } else {
            notes = clickedTrackAttributes.notes;
            attributes = clickedTrackAttributes.attributesList.map(a => {
                return <li>{a}</li>
            })
            
        }
        
        return (
            <div>
                <h3>{clickedTrack.nameEng}</h3>
                <p>{clickedTrack.description}</p>
                <p>{clickedTrack.length}</p>
                <p>{clickedTrack.trackType}</p>
                <img src={clickedTrack.img} alt="view of hike" />

                <h3>Saved Attributes List : </h3>
                <ul>
                    {attributes}
                </ul>
                <h3>Notes: </h3>
                <p>{notes}</p>
                <button>Edit</button>
                
            </div>
        )
    }
}