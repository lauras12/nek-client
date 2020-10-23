import React from 'react';
import TrailContext from '../Context';
import APITrackCalls from '../services/API_Track_service';
import APIHikeCalls from '../services/API_Hike_service';
import './TrackFullCard.css';
import { animateScroll as scroll } from 'react-scroll';

export default class TrackFullCard extends React.Component {
    static contextType = TrailContext;
    state = {
        hikeSection: '',
        notes: '',
        'warmup-track': false,
        'cooling-track': false,
    }

    componentDidMount = () => {
        const { track_id } = this.props.match.params;
        const hikeId = this.context.currentHikeId;

        APITrackCalls.getFullTrackData(hikeId, track_id)
            .then(data => {
                this.context.setOpenTrackCard(data);
            })
            .catch(err => {
                this.context.setError(err);
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { track_id } = this.props.match.params;
        const trackId = Number(track_id);
        const currentHikeId = this.context.currentHikeId;
        const hikeSection = this.state.hikeSection;

        const hikesTrack = {
            main_hike_id: currentHikeId,
            track_id: trackId,
            section_hike_id: Number(hikeSection),
        };

        APIHikeCalls.insertTrackIntoHikes(hikesTrack)
            .then(() => {
                console.log('track saved into hike');
            })
            .catch(err => {
                this.context.setError(err);
            });

        let savedTrackAttributes = {
            assigned_hike_id: currentHikeId,
            track_id: trackId,
        };

        const attributesList = this.makeAttributesList();
        
        savedTrackAttributes = {
            assigned_hike_id: currentHikeId,
            track_id: trackId,
            attribute: attributesList,
        };

        APITrackCalls.insertTrackAttributes(savedTrackAttributes)
            .then(() => {
                console.log('attributes saved');
            })
            .catch(err => {
                this.context.setError(err);
            })

        const note = {
            assigned_hike_id: currentHikeId,
            track_id: trackId,
            notes: this.state.notes,
        };

        APITrackCalls.insertTrackNotes(note)
            .then(() => {
                console.log('note saved');
            })
            .catch(err => {
                this.context.setError(err);
            });

        scroll.scrollToTop();
        this.props.history.push('/hike');
    }

    handleSaveTrackAs = (e) => {
        const hikeSectionid = e.target.value;
        this.setState({
            hikeSection: hikeSectionid,
        });
    }

    handleAddAttribute = (e) => {
        const attribute = e.target.name;
        const clickedAttribute = this.state[attribute];
        this.setState({
            [attribute]: !clickedAttribute,
        });
    }

    makeAttributesList = () => {
        let attributesList = [];
        for (let [key, value] of Object.entries(this.state)) {
            if (value === true) {
                attributesList = [...attributesList, key];
            }
        }
        return attributesList;
    }

    handleNotes = (e) => {
        this.setState({
            notes: e.target.value
        });
    }

    handleBackButton = () => {
        scroll.scrollToTop();
        this.props.history.push('/hike');
    }

    render() {
        const { name_eng, alias, track_type, track_level } = this.context.openTrackCard;

        return (
            <div className='track-info'>
                <div className='error'>
                    {this.context.error ? this.context.error.message : null}
                </div>
                <h3 className='title' >{name_eng}</h3>
                <h3 className='title' >{alias}</h3>
                <div className='text-container'>
                    <p>LEVEL : {track_level}</p>
                    <br />
                    <p>TRACK TYPE : {track_type}</p>
                    <br />
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <div className='note-container'>
                        <h3 className='title' >Notes</h3>
                        <textarea rows="10" cols='50' onChange={this.handleNotes} value={this.state.notes}></textarea>
                    </div>
                   
                        {this.state.hikeSection !== '' ? <button type='submit' >Add to hike</button> : null}
                        <button onClick={this.handleBackButton} >Back</button>

                </form>
            </div>
        );
    }
}