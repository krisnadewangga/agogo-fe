import React, { Component } from 'react';
import axios from 'axios'
import UserList from './UserList'
import './Users.scss';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

class LoginSplashScreen extends Component {

  state = {
    users: [],
  }

  componentDidMount() {
    axios.get(`http://dev.wakwaw.com/agogo/wp-json/wp/v2/users`)
    .then(res => {
      const users = res.data;
      this.setState({ users });
      sessionStorage.setItem('users', JSON.stringify(users));
    })
  }


  // Tell simple-keyboard which input is active
setActiveInput = (event) => {
  this.setState({
    inputName: event.target.id
  });
}

// When the inputs are changed
// (retrieves all inputs as an object instead of just the current input's string)
onChangeAll = (input) => {
  this.setState({
    input: input
  });
}

  

  render() {
    return (
      <section className="LoginSplashScreen centered">
        <div className="container">
          < UserList users={this.state.users} />
        </div>

        <input id="input1" onFocus={this.setActiveInput} value={this.state.input['input1'] || ""}/>
        <input id="input2" onFocus={this.setActiveInput} value={this.state.input['input2'] || ""}/>

      <Keyboard
        ref={r => this.keyboard = r}
        inputName={this.state.inputName}
        onChangeAll={inputs => this.onChangeAll(inputs)}
        layoutName={this.state.layoutName}
      />
      </section>
    );
  }
}

export default LoginSplashScreen;
