import React from 'react';
import TrailContext from '../Context';
import APITrackCalls from '../services/API_Track_service';
import './HikeFullTrailCard.css';
import { animateScroll as scroll } from 'react-scroll';

export default class HikeFullTrailCard extends React.Component {
    static contextType = TrailContext;
    state = {
        clickedTrack: null,
        error: null,
    }

    componentDidUpdate = () => {
        if (this.props.history.location.pathname !== this.state.clickedTrack) {
            this.getFullTrackInfo();
        }
    }

    getFullTrackInfo = () => {
        const hikeId = this.context.currentHikeId;
        const clickedTrackId = Number(this.props.match.params.track_id);
        const clickedTrackPath = this.props.location.pathname;

        this.setState({
            clickedTrack: clickedTrackPath,
        });

        APITrackCalls.getFullTrackData(hikeId, clickedTrackId)
            .then(data => {
                this.context.setOpenTrackCard(data);
            })
            .catch(res => {
                this.setState({
                    error: res,
                });
            });
    }

    componentDidMount = () => {
        this.getFullTrackInfo();
    }

    handleBackButton = () => {
        scroll.scrollToTop();
        this.props.history.push('/hike');
    }

    render() {
        const { name_eng, name_san, benefits, track_type, track_level, video, attributesList, notes } = this.context.openTrackCard;

        if (attributesList || notes) {
            const list = attributesList.map((att, index) => {
                return (
                    <li key={index}>{att}</li>
                );
            });
            const trackNotes = notes.map((n, index) => {
                return (
                    <li key={index}>{n}</li>
                );
            });

            return (
                <div className='track-info'>
                    <div className='error'>
                        {this.state.error ? this.state.error.message : null}
                    </div>
                    <h3 className='title' >{name_eng}</h3>
                    <h3 className='title'>{name_san}</h3>
                    <div className='text-container2'>
                        <p>BENEFITS : {benefits}</p>
                        <br />
                        <p>LEVEL : {track_level}</p>
                        <br />
                        <p>TRACK TYPE : {track_type}</p>
                        <br />
                    </div >
                    <div className='iframe-container'>
                    <iframe className='resp-iframe' src={video} frameBorder="0" title='trail track instructions'
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                    </div>
                    <h3 className='title' >Saved Attributes List : </h3>
                    <div className='attributes-container'>
                        <ul>
                            {list}
                        </ul>
                    </div>

                    <h3 className='title' >Notes: </h3>
                    <div className='note-container'>
                        <ul>
                            {trackNotes}
                        </ul>
                    </div>
                    <button className='bt-container' onClick={this.handleBackButton} >Back</button>
                </div >
            );
        }

        return (
            <div className='track-info'>
                <h3 className='title' >{name_eng}</h3>
                <h3 className='title'>{name_san}</h3>
                <div className='text-container'>
                    <p>BENEFITS : {benefits}</p>
                    <br />
                    <p>LEVEL : {track_level}</p>
                    <br />
                    <p>TRACK TYPE : {track_type}</p>
                    <br />
                </div>
                <div className='iframe-container'>
                <iframe src={video} className='resp-iframe' frameBorder="0" title='trail track instructions'
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
                </div>
                <div className='bt-container'>
                    <button onClick={this.handleBackButton} >Back</button>
                </div>
            </div>
        );
    }
}