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
              <h3 className='title'>Welcome to Trail Track!</h3>
              <p>An app built to hikers find their next trail! Login with 'demo' and 'password' to access information about each hike, add your own description and notes and save it to your hikes. Enjoy!
              </p>
              <h3 className='title'>Hello!</h3>
            </div>
        </div>
        
      }
    </div>
  )
}