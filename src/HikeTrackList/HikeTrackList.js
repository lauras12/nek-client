import React from 'react';
import TrailContext from '../Context';
import HikeItem from '../HikeItem/HikeItem';

export default class HikeTrackList extends React.Component {
    static contextType = TrailContext;

    render() {
        const currentHikeIds = this.context.currentHike.savedTracksIds;
        const { tracks } = this.context;

        let array = [];
        currentHikeIds.forEach(id => {
            tracks.find(track => {
                if (track.id === id) {
                    array.push(track)
                }
            })
        })
        
        const hikeTracks = array.map((track, key) => {
            return < HikeItem
                key={track.key}
                id={track.id}
               // img={track.img}
                description={track.description}
                hikeId={this.context.currentHike.id}
            />
        })


        return (
            <div>
                {hikeTracks}
            </div >
        )
    }
}