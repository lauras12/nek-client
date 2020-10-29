import React from 'react';
import TrailContext from '../Context';
import HikeItem from '../HikeItem/HikeItem';
import APIHikeCalls from '../services/API_Hike_service';
import './HikeTracksList.css';


export default class HikeTracksList extends React.Component {
    static contextType = TrailContext;
    state = {
        error: null,
    }

    componentDidMount = () => {
        let hikeId = this.context.currentHikeId;
      
        if(!hikeId) {
            this.props.history.push('/')
        } else {
            APIHikeCalls.getAllTrackInHike(hikeId)
            .then(data => {
                this.context.setCurrentHike(data);
            })
            .catch(err => {
                this.setState({
                    error: err
                });
            });
        }
        
    }

    render() {
        let currentHikeTracksIds = this.context.currentHike.assignedTracks;
        const { tracks } = this.context;

        let orderedIds = currentHikeTracksIds.map(element => {
            return element.map(id => {
                return tracks.find(track => track.id === id);
            });
        });
           
        
        const hikeTracks = orderedIds.map(element => element.map((track, index) => {
            return (
                <HikeItem
                    key={index}
                    {...this.props} 
                    trackId={track.id}
                    img={track.img}
                    hikeId={this.context.currentHike.id}
                />
            );
        }));
        
        return (
            <div >
                 <div className='error'>
                    {this.state.error ? this.state.error.message : null}
                </div>
                <ul className='hike-tracks-container'>
                {hikeTracks}
                </ul>
            </div >
        );
    }
}