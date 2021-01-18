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
              <p>This app was built to help hiker track their next trail! New users should register to create an account.
              </p>
            </div>
        </div>
        
      }
    </div>
  )
}