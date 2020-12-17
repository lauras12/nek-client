import React from 'react';
import TrailContext from '../Context';
import APIHikeCalls from '../services/API_Hike_service';
import TokenService from '../services/token-service';
import config from '../config';
import './OpeningForm.css';

export default class OpeningForm extends React.Component {
    static contextType = TrailContext;
    state = {
        selection: null,
        error: null,
    }

    componentDidMount = () => {
        APIHikeCalls.getAllUserHikes()
            .then(data => {
                this.context.setHikesList(data);
            })
            .catch(err => {
                this.context.setError(err);
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { newHikeName } = e.target;
        const newHike = {
            title: newHikeName.value,
        };

        const token = TokenService.hasAuthToken(config.TOKEN_KEY);
        if (!token) {
            this.props.history.push(`/login`);
        } else {
            APIHikeCalls.postNewHike(newHike)
                .then(data => {
                    newHikeName.value = '';
                    this.context.setCurrentHike(data);
                    this.props.history.push('/hike');
                })
                .catch(res => {
                    console.log(res);
                    this.setState({
                        error: res,
                    });
                });
        }
    }

    onSelectHike = (e) => {
        e.preventDefault();
        this.setState({
            selection: e.target.value
        });
    }

    enterHike = () => {
        
        const hike = this.context.hikes.find(hike => hike.title === this.state.selection);
        console.log('here')
        this.context.setCurrentHike(hike)
        this.context.enterHike(hike);
       
        this.props.history.push(`/hike`);
    }

    render() {
        const hikeListName = this.context.hikes.map((hike, key) => {
            return (
                <option key={key} value={hike.title}>{hike.title}</option>
            );
        });

        return (
            <div className='form-container'>
                <div className='error'>
                    {this.state.error ? this.state.error.message : null}
                </div>
                {(this.props.location.pathname === '/hikeForm') ?
                    <div>
                        <h2>Please create a new hike or select an existing one.</h2>
                    </div>
                    : null}
                <div className='opening-form'>
                    <form onSubmit={this.handleSubmit} className='hike-form'>

                        <div className='form__group1 field form-small-container'>
                            <h3 className='hike-choice'>Create a new hike: </h3>
                            <input type="input" className="form__field" placeholder="hike name" name="name" id='newHikeName'  />
                        </div>
                        <div className='button-container'>
                            <button type='submit'>enter </button>
                        </div>
                    </form>

                    {this.context.hikes.length > 0 ? <div className='hike-selection'>
                        <div className='form-small-container'>
                            <h3 className='hike-choice'>Choose exisiting hike: </h3>
                            <select className="form__field" onChange={this.onSelectHike}>
                                <option value=''>Pick a hike!</option>
                                {hikeListName}
                            </select>
                        </div>
                        <div className='button-container'>
                            {this.state.selection === null ? <button disabled={!this.state.selection} className='disabled' onClick={this.enterHike}> enter</button> : <button onClick={this.enterHike}>enter</button>}
                        </div>
                    </div>
                        : null}
                </div>   
            </div>
        );
    }
}
