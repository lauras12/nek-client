import React from 'react';
import TrailContext from '../Context';
import TrackListItem from '../TrackListItem/TrackListItem';
import APITrackCalls from '../services/API_Track_service';
import './TrackList.css';

export default class TrackList extends React.Component {
    static contextType = TrailContext;
    state = {
        error: null,
    }

    componentDidMount = () => {
        APITrackCalls.getAllTracksData()
            .then(data => {
               // console.log(data);
                this.context.setTracksList(data);
            })
            .catch(res => {
                this.setState({
                    error: res
                });
            });
    }

    render() {

        const tracks = this.context.tracks.map(track => {
            return <TrackListItem
                key={track.id}
                id={track.id}
                name={track.alias}
                img={track.img}
            />;
            
        });
        // console.log(tracks);
        return (
            <div className='track-list'>
                <div className='error'>
                    {this.state.error ? this.state.error.message : null}
                </div>
                <h2 className='title'>TRACKS LIBRARY: </h2>
                <ul className='tracks-container'>
                    {tracks}
                </ul>
            </div>
        );
    }
}