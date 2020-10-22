import React from 'react';
import RegisterForm from './RegisterForm';

export default class RegisterPage extends React.Component {

  handleRegisterSuccess = () => {
    this.props.history.push('/login');
  }

  render() {
    return ( 
      <div className = 'current-hike' >
        <h2 className = 'title' > Register </h2> 
        <RegisterForm 
          onRegisterSuccess = {this.handleRegisterSuccess}
        /> 
      </div>
    );
  }
}
