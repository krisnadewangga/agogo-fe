import React, { Component } from 'react';
import axios from 'axios'
import UserList from '../components/users/UserList'
import DefaultIP from './DefaultIP'
import '../components/users/Users.scss';

class LoginSplashScreen extends Component {

  state = {
    users: []
  }
  componentDidMount() {
    // console.log(DefaultIP)
    axios.get(DefaultIP + `/api/users`)
    .then(res => {
      const users = res.data.data;
      this.setState({ users });
      sessionStorage.setItem('users', JSON.stringify(users));
    })
  }

  render() {
    return (
      <section className="LoginSplashScreen centered">
        <div className="container">
          < UserList users={this.state.users} />
        </div>
      </section>
    );
  }
}

export default LoginSplashScreen;
