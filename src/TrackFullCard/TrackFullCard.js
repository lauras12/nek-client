import React from 'react';
import HikeContext from '../Context';
import { v4 as uuidv4 } from 'uuid';

export default class HikeFullCard extends React.Component {
    static contextType = HikeContext;
    state = {
        hikeSection: '',
        notes: '',
        'grounding-track': false,
        'cooling-track': false,
        'heat-rising-track': false,
        'energizing-track': false,
        'strengthening-track': false,
        'relaxing-track': false,
        'releasing-pressure track': false,
        'stabilizing-track': false,
        'increasing-flexibility': false,
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { track_id } = this.props.match.params;
        const trackId = Number(track_id);
        const {currentHike} = this.context;
        const { savedTracksIds, peakTrack, warmUp, midHike,breakTracks, afterPeak } = currentHike
        console.log(savedTracksIds)
        const updatedHike = {
            id: currentHike.id,
            name: currentHike.name,
            savedTracksIds: [...savedTracksIds, trackId],
            peakTrack: [...peakTrack],
            warmUp: [...warmUp],
            midHike: [...midHike],
            breakTracks: [...breakTracks],
            afterPeak: [...afterPeak],  
        }
         
        const newTrackAttributes = {
            id: uuidv4(),
            trackId,
            assignedHikeId: this.context.currentHike.id,
            attributesList: this.makeAttributesList(),
            notes: this.state.notes,
        }
        
        this.context.updateFullHike(trackId,
            updatedHike, this.state.hikeSection)
        this.context.updateAttributes(newTrackAttributes)
        this.props.history.push('/hike')
    }

    handleSaveTrackAs = (e) => {
        const hikeSectionName = e.target.value;
        this.setState({
            hikeSection: hikeSectionName,
        })
    };

    handleAddAttribute = (e) => {
        const attribute = e.target.name;
        const clickedAttribute = this.state[attribute]
        this.setState({
                [attribute]: !clickedAttribute,
        });
    }

    makeAttributesList = () => {
        let attributesList = [];
        for (let [key, value] of Object.entries(this.state)) {
            if (value === true ) {
                attributesList= [...attributesList, key]
            }
        }
        return attributesList;
    }

    handleNotes = (e) => {
       this.setState({
           notes: e.target.value
       })
    }



    render() {
        
        const { track_id } = this.props.match.params;
        const track = this.context.tracks.find(track => {
            return track.id === Number(track_id)
        })
        console.log(track)
        return (
            <div>
                <h3>{track.nameEng}</h3>
                <h3>{track.nameSan}</h3>
                <p>{track.description}</p>
                <p>{track.length}</p>
                <p>{track.trackType}</p>
                <img src={track.img} alt="view of hike" />

                <form onSubmit={this.handleSubmit}>
                    <h3>Pick attributes:</h3>
                    <label>Grounding pose</label>
                    <input type='checkbox' name='grounding-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <label>Cooling pose</label>
                    <input type='checkbox' name='cooling-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <label>Heat rising pose</label>
                    <input type='checkbox' name='heat-rising-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <label>Energizing pose</label>
                    <input type='checkbox' name='energizing-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <label>Strengthening pose</label>
                    <input type='checkbox' name='strengthening-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <label>Relaxing pose</label>
                    <input type='checkbox' name='relaxing-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <label>Releasing preassure pose</label>
                    <input type='checkbox' name='releasing-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <label>Stabilizing pose</label>
                    <input type='checkbox' name='stabilizing-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <label>Flexcibility building pose</label>
                    <input type='checkbox' name='flexibility-pose' onClick={this.handleAddAttribute} />
                    <br />
                    <br />
                    <select name='flow-menu' onChange={this.handleSaveTrackAs}>
                        <option value='none'>Save to my flow as:</option>
                        <option value='warmUp'>warm up pose</option>
                        <option value='breakPoses'>break pose</option>
                        <option value='peakPose'>peak pose</option>
                        <option value='midFlow'> mid-flow pose</option>
                        <option value='afterPeak'> after-peak stabilizing pose</option>
                    </select>
                    <br />
                    <h3>Notes</h3>
                    <textarea rows="10" cols='50' onChange={this.handleNotes} value={this.state.notes}></textarea>
                    <br />

                    <button type='submit'>Submit</button>
                </form>


            </div>

        )
    }

}