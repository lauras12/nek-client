import React from 'react';
import './CurrentHike.css';
import TrailContext from '../Context';

export default class CurrentHike extends React.Component {
    static contextType = TrailContext;
    handleBack = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <div className='current-hike'>
                <h2 className='title'>Current hike: {`${this.context.currentHike.title}`.toUpperCase()}</h2>
                <button type='button' id='hike-button' onClick={this.handleBack} >Back</button>
            </div>
        );
    }

}