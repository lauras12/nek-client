import React from 'react';
import HikeContext from '../Context';
import TrackListItem from '../TrackListItem/TrackListItem';


export default class TrackList extends React.Component {
    static contextType = HikeContext;
    

    render() {
        console.log(this.context)
        const tracks = this.context.tracks.map(track => {
            return <TrackListItem
                key={track.id}
                id={track.id}
                name={track.nameEng}
                /*sanskrit={track.nameSan}
                img={track.img}
                */
            />

        })
        return (
            <div>
                <h2>Popular Tracks: </h2>
                {tracks}
            </div>
        )
    }
}