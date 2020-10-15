import React from 'react';
import STORE from './store';


const HikeContext = React.createContext({

    currentHike: '',
    tracks: [],
    hikes: [],
    addHike: () => { },
    enterHike: () => { },
    updateFullHike: () => { },
    updateAttributes: () => { },
    tracksAttributes: [],
})

export default HikeContext;


export class HikeContextProvider extends React.Component {
    constructor() {
        super()
        this.state = {
            currentHike: null,
            tracks: STORE.tracks,
            hikes: STORE.hikes,
            trackAttributes: STORE.attributes,
            error: null,
        }
    }
    
    
    setError = (err) => {
        this.setState({
            error: err,
        })
    }
    
    setTracksList = (data) => {
        this.setState({
            tracks: data,
        })
    }

    
    enterHike = (hike) => {
        this.setState({
            currentHike: hike,
        })
    }

    addHike = (newHike) => {
        this.setState({
            hikes: [...this.state.hikes, newHike],
            currentHike: newHike,
        })
    }

    updateFullHike = (track, currentHike, sectionName) => {
        const hikeSection = currentHike[sectionName];
        const newHikeSection = [...hikeSection, track];
        const updatedHike = { ...currentHike, [sectionName]: newHikeSection };
        const updatedHikes = this.state.hikes.map(hike => {
            if(hike.id === currentHike.id) {
                return currentHike;
            } else {
                return hike;
            }
        })
        
        this.setState({
            currentHike: {...updatedHike},
            hikes: updatedHikes,
        });
    }

    updateAttributes = (newAttributes) => {
        this.setState({
            trackAttributes: [...this.state.trackAttributes, newAttributes],
        })
    }


    render() {
        const contextValue = {
            setError: this.setError,
            setTracksList: this.setTrackList,
            currentHike: this.state.currentHike,
            tracks: this.state.tracks,
            hikes: this.state.hikes,
            addHike: this.addHike,
            enterHike: this.enterHike,
            updateAttributes: this.updateAttributes,
            updateFullHike: this.updateFullHike,
            trackAttributes: this.state.trackAttributes,
        }

        return (
            <HikeContext.Provider value={contextValue}>
                {this.props.children}
            </HikeContext.Provider>
        )
    }
}