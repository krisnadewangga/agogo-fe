import React, { Component } from "react"
import ReactDOM from 'react-dom'
import UserCard from '../users/UserCard'
import CalcNumeric from '../calcs/CalcNumeric'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import LogoAgogo from "./../../img/logo-agogo.png";
import { Provider, Subscribe } from 'unstated'
import ModalsContainer from '../modals/_ModalsContainer'
import RootContainer from '../roots/RootContainer'
import DefaultIP from '../../containers/DefaultIP'

import './Login.scss';

class Login extends Component {

  constructor(props) {
    super(props);
  };

  state = {
    users: [],
    user: [],
    userAvatar: '',
    password: '',
    username: '',
    userRole: '',
    redirect: false
  };

  componentDidMount(){
    if(sessionStorage.getItem('users')){
      console.log('User logged in')
    }else{
      this.state({ redirect: true })
    }

    let user_index = this.props.match.params.user_index;
    let users = sessionStorage.getItem('users');
    this.setState({ users: JSON.parse(users)},
    () => {
      this.setState({
        user: this.state.users[user_index]
      },
      () => {
        this.setState({
          username: this.state.user.name,
          userAvatar: this.state.user.photo,
          userRole: this.state.user.role,
        },
        () => {
          sessionStorage.setItem('usernow', JSON.stringify(this.state.user));
        });
      });
    });
  }

  onChange = input => {
    this.setState({ password: input });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState({ password: input });
  };

  onEnter = () => {
    this.login()
  }

  login = () => {
    const userData = {
      name: this.state.username,
      password: this.state.password,
    };


    // console.log(userData)
    axios.post(DefaultIP + `/api/auth/login`, userData )
      .then(res => {
         console.log(res.data);
        sessionStorage.setItem('token', res.data.access_token);
        sessionStorage.setItem('tokenex', res.data.expires_at);
        this.setState({ redirect: true })
      }).catch(res => {
        console.log(res);
        this.props.modalStore.toggleModal('alert','','','PIN yang anda masukkan salah')
      })
  }

  logout = () => {
    alert('lah')
    sessionStorage.setItem('token', '');
    sessionStorage.clear();
    this.setState({ redirect: true })
  }

  doPrint() {
    var content = document.getElementById('invoice-POS');
    content.print()
}



  render() {

    if(this.state.redirect || sessionStorage.getItem('token')){
      return (<Redirect to={'/selection'} />);
    }

    return (

        <section className="centered">

        {/* <h1 className="text-danger text-center">Page = {this.props.rootStore.state.page}</h1>
        <p className="text-light text-center">{JSON.stringify(this.props.match.path)}</p>

          <Button onClick={() => this.props.rootStore.setCurrentPage('login')}>SET CURRENT PAGE</Button> */}

          <div className="login">
            <div className="container">
              <div className="row">
                <div className="col login-header">
                  <div className="row">
                    <div className="col-9">
                      <a href="/"><i className="fas fa-arrow-left mr-5"></i></a> SIGN IN
                    </div>
                    <div className="col-3 text-right">
                      <a href='/invoice'><img src={LogoAgogo} className="img-fluid" /> </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6 box-pin">
                  <div className="box-inner">

                    <UserCard 
                      user={this.state.user} 
                      userID={this.state.user.id} 
                      userName={this.state.user.username} 
                      userAvatar={this.state.userAvatar}
                      userRole={this.state.userRole} 
                      colorTitle="text-black" 
                      colorSubTitle="text-red" 
                    />

                    <FormGroup className="mt-4">
                      <Label for="PIN" className="text-center d-block">Masukan PIN Anda</Label>
                      <Input 
                        autoFocus
                        value={this.state.password} 
                        onChange={e => this.onChangeInput(e)}
                        type="password" name="password" id="pin" placeholder="PIN"  size="lg" className="text-center" 
                        autoComplete="off"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="col-6 box-calc">
                  <div className="box-inner">
                    <CalcNumeric 
                      onChange={this.onChange} 
                      onChangeInput={this.onChangeInput} 
                      onEnter={this.onEnter} 
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

    )
  }
}

export default Login