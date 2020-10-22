import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Header from './Header/Header'
import TrackList from './TrackList/TrackList';
import TrackFullCard from './TrackFullCard/TrackFullCard';
import OpeningForm from './OpeningForm/OpeningForm';
import CurrentHike from './CurrentHike/CurrentHike';
import HikeTracksList from './HikeTracksList/HikeTracksList';
import HikeFullTrailCard from './HikeFullTrailCard/HikeFullTrailCard';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';


export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Route path='/' component={Nav} />
        </nav>
        <header>
          <Route path='/' component={Header} />
          
        </header>
        <main>
        <Route exact path='/' component={OpeningForm} />
          <Route exact path='/' component={TrackList} />
      
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/hikeForm' component={OpeningForm} />

          <Route exact path='/hike' component={CurrentHike} />
          <Route exact path='/hike' component={HikeTracksList} />
          <Route exact path='/hike' component={TrackList} />


          <Route exact path='/hike/:track_id' component={CurrentHike} />
          <Route exact path='/hike/:track_id' component={TrackFullCard} />
          

          <Route exact path='/hike/:hikeId/:track_id' component={CurrentHike} />
          <Route exact path='/hike/:hikeId/:track_id' component={HikeTracksList} />
          <Route exact path='/hike/:hikeId/:track_id' component={HikeFullTrailCard} />
          

          <Route exact path='/hike/:hikeId/track/:track_id' component={CurrentHike} />
          <Route exact path='/hike/:hikeId/track/:track_id' component={HikeTracksList} />
          <Route exact path='/hike/:hikeId/track/:track_id' component={HikeFullTrailCard} />
          <Route exact path='/hike/:hikeId/track/:track_id' component={TrackList} />
        </main>
      </div>
    );
  };

};


