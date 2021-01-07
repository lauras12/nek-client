import React from 'react';
import APIHikeCalls from './services/API_Hike_service';


const TrailContext = React.createContext({
    currentHikeId: null,
    currentHike: {},
    tracks: [],
    hikes: [],
    openTrackCard: {},
    hikeSelection: '',
    setTracksList: () => { },
    setHikesList: () => { },
    setOpenTrackCard: () => { },
    setAttributesIntoOpenCard: () => {},
    setCurrentNewHike: () => { },
    setCurrentHikeId: () => { },
    setCurrentHike: () => { },
    truncateCurrentHike: () => { },
    addHike: () => { },
    enterHike: () => { },
    saveHikeSelection: () => {},
    deleteTrackFromHike: () => {},
    trackAttributes: [],
});

export default TrailContext;


export class TrailContextProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            currentHikeId: null,
            currentHike: {
                id: null,
                title: '',
                assignedTracks: [],
                warmUp: [],
                midHike: [],
                peakTrack: [],
                breakTracks: [],
                afterPeak: [],
            },
            openTrackCard: {
                id: null,
                name_eng: '',
                alias: '',
                benefits: '',
                track_type: '',
                track_level: '',
                img: '',
                attributesList: '',
                notes: '',

            },
            tracks: [],
            hikes: [],
            trackAttributes: [],
            hikeSelection: null,
            error: null,
        };
    }


    setError = (res) => {
        this.setState({
            error: res,
        });
    }

    enterHike = (hike) => {
        this.setState({
            currentHikeId: hike.id,
            currentHike: {
                id: hike.id,
                title: hike.title,
                assignedTracks: [],
                peakTrack: [],
                warmUp: [],
                midHike: [],
                breakTracks: [],
                afterPeak: [],
            }
        });
    }
    saveHikeSelection = (hike) => {
        this.setState({
            hikeSelection: hike,
        })
    }

    setCurrentHike = (hike) => {
        console.log(hike);
        this.setState({
            currentHikeId: hike.id,
            currentHike: hike,
        });
    }
    
    setTracksList = (data) => {
        console.log(data);
        this.setState({
            tracks: data,
        });
    }

    setHikesList = (data) => {
        this.setState({
            hikes: data,
        });
    }

    setOpenTrackCard = (data) => {
         this.setState({
            openTrackCard: {
                id: data.id,
                name_eng: data.name_eng,
                alias: data.alias,
                benefits: data.benefits,
                track_type: data.track_type,
                track_level: data.track_level,
                img: data.img,
                attributesList: data.attributesList,
                notes: data.notes,
            }
        });
    }


    deleteTrackFromHike = (id) => {
        const newAssignedTracks = this.state.currentHike.assignedTracks.map(tracksArr => {
            return tracksArr.filter(track => track !== id);
        });

        this.setState({
            currentHike: {
                ...this.state.currentHike,
                assignedTracks: newAssignedTracks
            }
        });

        const trackToDelete = id;
        const hikeAimed = this.state.currentHikeId;
        APIHikeCalls.deleteTrackFromHike(trackToDelete, hikeAimed)
            .then(res => {
                console.log('deleting TRACK FROM HIKE');
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err,
                });
            });
    }
  
    render() {
        
        const contextValue = {
            openTrackCard: this.state.openTrackCard,
            currentHikeId: this.state.currentHikeId,
            currentHike: this.state.currentHike,
            tracks: this.state.tracks,
            hikes: this.state.hikes,
            hikeSelection: this.state.hikeSelection,
            setError: this.setError,
            truncateCurrentHike: this.truncateCurrentHike,
            setCurrentHike: this.setCurrentHike,
            setCurrentHikeId: this.setCurrentHikeId,
            setTracksList: this.setTracksList,
            setHikesList: this.setHikesList,
            setOpenTrackCard: this.setOpenTrackCard,
            setAttributesIntoOpenCard: this.setAttributesIntoOpenCard,
            setCurrentNewHike: this.setCurrentNewHike,
            addHike: this.addHike,
            enterHike: this.enterHike,
            saveHikeSelection: this.saveHikeSelection,
            deleteTrackFromHike: this.deleteTrackFromHike,
            trackAttributes: this.state.trackAttributes,
        };

        return (
            <TrailContext.Provider value={contextValue} >
                {this.props.children}
            </TrailContext.Provider >
        );
    }
}