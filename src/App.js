import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap';
import Modal from 'react-modal'
import axios from 'axios'

import decode from 'jwt-decode';

import UsersContainer from './containers/UsersContainer';
import Login from './components/logins/Login';
import InitialBalance from './components/balances/InitialBalance';
import Selection from './components/selection/Selection'
import Cashier from './components/cashier/Cashier';
import Booking from './components/booking/Booking'

import Fullscreen from "react-full-screen";
import Production from './components/production/Production';
import Invoice from './components/cashier/PrintArea';
import DefaultIP from './containers/DefaultIP'

Modal.setAppElement("#root");

const isTokenExpired = (token) => {
  try {
     
      var tgltoken = new Date(token).getHours()
      var today = new Date();
      var hour = today.getHours();

      var tokentime =  parseInt(tgltoken || 0) + 2
      if(hour > tokentime){
         sessionStorage.clear();
        return false

      }else{
        return false
      }

    
      
  }
  catch (err) {
      return false;
  }
}

const isLoggedIn = () => {
  // Checks if there is a saved token and it's still valid
  // return true
       
  const token = sessionStorage.getItem('tokenex') // GEtting token from localstorage
  return !!token && !isTokenExpired(token) // handwaiving here
}

const whatRole = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("usernow"));
    const raw = user && user.role;
    if (!raw) return false;

    const roles = Array.isArray(raw) ? raw.map(r => String(r)) : [String(raw)];
    const has = (r) => roles.includes(String(r));

    if (has(3) && has(4) && has(5)) return 'all';
    if (has(3) && has(5)) return 'kasirpemesanan';
    if (has(3) && has(4)) return 'kasirproduksi';
    if (has(5) && has(4)) return 'pemesananproduksi';
    if (has(3)) return 'kasir';
    if (has(5)) return 'pemesanan';
    if (has(4)) return 'produksi';
    return false;
  } catch (err) {
    return false;
  }
};

const root = document.getElementById("root");

class App extends Component {

  state = {
    activePath: '/',
    saldo: true
  }
  modal = React.createRef()

  logout = () => {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('idKas', '');
    sessionStorage.clear();
  }

  escFunction = (event) => {
    if(event.keyCode === 121) {
      const iframe = document.createElement('iframe')
      document.body.appendChild(iframe)
      var pri = iframe.contentWindow
      pri.focus();
      pri.print();
    }
  }

  // componentDidMount(){
  //   document.addEventListener("keydown", this.escFunction, false);
  //  const user_id = JSON.parse(sessionStorage.getItem("usernow"))

  //  alert(user_id.id)
  //   axios.get(DefaultIP + '/api/cekKass')
  //   .then(res => {
  //       if(res.data.status === 'counted'){
  //         this.setState({saldo: false})
  //       }else{
  //         this.setState({saldo: true})
  //       }
  //   })
  //   .catch(res => {
  //     // console.log('catch', res.response)
  //   })
  // }
  
  render() {

    return (

      <Fullscreen enabled={this.props.rootStore.state.isFull} onChange={isFull => this.props.rootStore.setState({isFull})}>
          
        <BrowserRouter>
          <div className="App" style={{position: "relative",}}>

            {/* <h1 className="text-primary text-center">Page = {this.props.rootStore.state.page}</h1> */}
            
            {/* GAKTAUNYA BISA KASIH FUNCTION DI ROUTE
            INI GAK BSIA KRN ROUTENYA DI PROTECT */}

            <Switch>
              <Route exact path='/'
                render={(props) => {
                  // this.activePath(props);
                  return(
                    isLoggedIn() === true && (whatRole() === 'all' || whatRole() === 'kasirpemesanan' || whatRole() === 'kasirproduksi' || whatRole() === 'kasir')
                    ? <Redirect to={{ pathname: '/selection', state: { from: props.location } }} />
                    : <UsersContainer {...props} 
                      rootStore={this.props.rootStore} 
                      activePath={props.match.path} />
                  )
                }}
              />
              
              <Route path='/login/:user_index'
                render={(props) => {
                  return(
                    isLoggedIn() === true
                    ? <Redirect to={{ pathname: '/initial-balance', state: { from: props.location } }} />
                    : <Login {...props} 
                      rootStore={this.props.rootStore} 
                      modalStore={this.props.modalStore} 
                      activePath={props.match.path} />
                  )
                }}
              />

              <Route path='/selection'
                render={(props) => {
                  return(
                    isLoggedIn() === true
                    ? <Selection {...props}
                      rootStore={this.props.rootStore}
                      modalStore={this.props.modalStore}
                      activePath={props.match.path} />
                    : <Redirect to={{ pathname: '/', state: {from: props.location} }} />
                  )
                }}
              />
              
              <Route path='/initial-balance'
                render={(props) => {
                  return(
                    isLoggedIn() === true
                    ? <InitialBalance {...props} 
                      rootStore={this.props.rootStore} 
                      modalStore={this.props.modalStore} 
                      activePath={props.match.path} /> 
                    : <Redirect to={{ pathname: '/cashier', state: { from: props.location } }} />
                  )
                }}
              />

              <Route path='/invoice'
                render={(props) => {
                  return(
                    isLoggedIn() === true
                    ? <Invoice {...props} 
                      cartStore={this.props.cartStore}
                      rootStore={this.props.rootStore} 
                      modalStore={this.props.modalStore} 
                      activePath={props.match.path} /> 
                    : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                  )
                }}
              />
              <Route path='/cashier'
                render={(props) => {
                  return(
                    isLoggedIn() === true && (whatRole() === 'all' || whatRole() === 'kasirpemesanan' || whatRole() === 'kasirproduksi' || whatRole() === 'kasir')
                    ? <Cashier {...props} 
                        rootStore={this.props.rootStore} 
                        modalStore={this.props.modalStore}
                        cartStore={this.props.cartStore} 
                        productStore={this.props.productStore} 
                        activePath={props.match.path} />
                    : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                  )
                }}
              /> 

              <Route path='/booking'
                render={(props) => {
                  return (
                    isLoggedIn() === true && (whatRole() === 'all' || whatRole() === 'kasirpemesanan' || whatRole() === 'pemesananproduksi' || whatRole() === 'pemesanan' ) && this.state.saldo
                      ? <Booking {...props}
                        rootStore={this.props.rootStore}
                        modalStore={this.props.modalStore}
                        cartStore={this.props.cartStore}
                        productStore={this.props.productStore}
                        activePath={props.match.path} />
                      : this.props.modalStore.toggleModal('alert','','','Saldo kasir belum diinput!') || this.logout() || 
                      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                  )
                }}
              />

              <Route path='/production'
                render={(props) => {
                  return (
                    isLoggedIn() === true && (whatRole() === 'all' || whatRole() === 'pemesananproduksi' || whatRole() === 'kasirproduksi' || whatRole() === 'produksi')
                      ? <Production {...props}
                        rootStore={this.props.rootStore}
                        modalStore={this.props.modalStore}
                        cartStore={this.props.cartStore}
                        productStore={this.props.productStore}
                        activePath={props.match.path} />
                      : <Redirect to={{pathname: '/', state: { from: props.location } }} />
                  )
                }}
              />

              <Route path="/logout" 
                render={() => {
                  this.logout();
                  return <Redirect to={{ pathname: '/' }} />;
                }}
              />
            </Switch>
            
          </div>
        </BrowserRouter>
        <footer className="Footer right">                    
          <a href="#" className="btn-fullscreen" onClick={this.props.rootStore.goFull} >
            <i className="fas fa-expand-arrows-alt"></i>
          </a>

          {/* {this.state.activePath === '/initial-balance' &&
          <a href="#" className="btn-logout" onClick={() => this.props.modalStore.toggleModal('saldo', '')} >
            <i className="fas fa-power-off"></i>
          </a>
          } */}
        </footer>
        <div ref={this.root} id="myModal">{this.props.myModal}</div>
      </Fullscreen>
    );
  }
}

export default App;
