import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import TrailContext from '../Context';
import './HikeItem.css';

export default class HikeItem extends React.Component {
    static contextType = TrailContext;

    linkTo = () => {
        const { hikeId, trackId } = this.props;
        this.props.history.push(`/hike/${hikeId}/track/${trackId}`);
    }

    deleteTrackFromHike = (id) => {
        console.log('deleting', id);
        this.context.deleteTrackFromHike(id);
    }
    
    render() {
        return (
            <div className='hike-item' >
                <li key={this.props.id} className='li'>
                    <div className='img-container'>
                        <img src={this.props.img} className='hike-img' onClick={this.linkTo} alt='trail'/>
                    </div>
                    <footer>
                        <button className='hike-item-button' type='button' onClick={() => this.deleteTrackFromHike(this.props.trackId)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </footer>
                </li>
            </div>
        );
    }
}