import React from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import TrackList from './TrackList/TrackList';
import TrackFullCard from './TrackFullCard/TrackFullCard';
import OpeningForm from './OpeningForm/OpeningForm';
import CurrentHike from './CurrentHike/CurrentHike';
import HikeTrackList from './HikeTrackList/HikeTrackList';
import HikeFullTrackCard from './HikeFullTrackCard/HikeFullTrackCard';





export default class App extends React.Component {
  
  

  render() {
    return (
      <div className="App">
          <Nav />
          <header>
            <Link to={'/'}>
              <h1>NEK Hiker</h1>
            </Link>
          </header>
          <main>
            <Route exact path='/' component={OpeningForm} />
            <Route exact path='/' component={TrackList} />
            
            <Route exact path='/hike' component={CurrentHike} /> 
            <Route exact path ='/hike' component={HikeTrackList} />
            <Route exact path='/hike' component={TrackList} />
           
            <Route exact path='/hike/:track_id' component={CurrentHike} />
            <Route exact path='/hike/:track_id' component={TrackFullCard} />

            <Route exact path='/hike/:hikeId/:track_id' component={CurrentHike} />
            <Route exact path ='/hike/:hikeId/:track_id' component={HikeTrackList} />
            <Route exact path='/hike/:hikeId/:track_id' component={HikeFullTrackCard} />
          </main>

      </div>
    );
  }

}


