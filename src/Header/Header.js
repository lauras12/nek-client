import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import config from '../config';
import TokenService from '../services/token-service';

export default function Header(props) {
  return (
    <div >
      {TokenService.hasAuthToken(config.TOKEN_KEY) ?
        <header className='header' >
          <Link to={'/'}>
            <h1>Trail TRACK</h1>
          </Link>
        </header>
        :
        <div>
          <header className='header' >
            <h1>Trail TRACK</h1>
            </header>

            <div className='landing'>
              <h3 className='title'>Welcome to Trail Track!</h3> <br/>
              <p>This app was built to help hiker track their next trail! New users should register to create an account. <br/> <br/> Once logged in, new users should create a new hike and add different trails to each hike.  Users can select the attributes, add detailed and personalized notes, and then save that trail as a specific type to each hike.
              </p>
            </div>
        </div>
        
      }
    </div>
  )
}