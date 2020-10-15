import React from 'react';
import TrailContext from '../Context';
import cuid from 'cuid';


export default class OpeningForm extends React.Component {
    static contextType = TrailContext;
    state = {
        selection: null,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { newHikeName } = e.target
        const newHike = {
            id: cuid(),
            name: newHikeName.value,
            savedTracksIds: [],
        }
        this.setState({
            selection: newHikeName,
        })
        this.context.addHike(newHike);
        this.props.history.push(`/hike`)
    };
    
    onSelectHike = (e) => {
        e.preventDefault();
        this.setState({
            selection: e.target.value
        })
    }
    enterHike = () => {
        const hike = this.context.hikes.find(hike => hike.name === this.state.selection)
        this.context.enterHike(hike)
        this.props.history.push(`/hike`)
    }

    render() {
        const hikeListName = this.context.hikes.map((hike, key) => {
            return ( 
                <option key={key} value={hike.name}>{hike.name}</option>
            )
        })
        
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Searching for a new hike in Northeast Kingdom? Search by Zipcode</h3>
                    <label>Zipcode </label>
                    <input type='text' placeholder='ex 05841' id='newHikeName' />
                    
                    <button type='submit'>submit</button>
                    
                </form>
                
                {this.context.hikes.length > 0 ? <div>
                    <h2>OR</h2>
                    <h3>Select hike by town</h3>
                    <select onChange={this.onSelectHike}>
                        <option value=''>Select a Town</option>
                        {hikeListName}
                    </select>
                    <button onClick={this.enterHike}>enter town</button>
                
                </div> : null}
                
            </div >
        )
    }
}