import React, { Component } from "react";
import { FormGroup, Input, Label } from 'reactstrap';
import LogoAgogo from "./../../img/logo-agogo.png";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../calcs/CalcNumeric.scss";
import '../logins/Login.scss';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import DefaultIP from '../../containers/DefaultIP'

import { Provider, Subscribe } from 'unstated'
import ModalsContainer from '../modals/_ModalsContainer'

var classNames = require('classnames');


class SaldoAwal extends Component {



  keyboard = {}
  state = {
    layoutName: 'default',
    username: '',
    saldo: '',
    pin: '',
    keyboardSaldo: true,
    keyboardPIN: false,
    keyboardUser: false,
    redirect: false,
    pos: {},
    data: []
  };

  componentDidMount(){
    const user = JSON.parse(sessionStorage.getItem('usernow'))
    this.setState({pos: Object.assign({}, this.state.pos, {user_id: user.id}, {saldo_akhir:0}, {transaksi:0})})
  }

  onFocus = whatInput => {
    if(whatInput === 'saldo'){
      this.setState({ 
        keyboardSaldo: true,
        keyboardPIN: false,
        keyboardUser: false,
      })
    }else if(whatInput === 'username'){
      this.setState({ 
        keyboardPIN: false,
        keyboardSaldo: false,
        keyboardUser: true,
      })
    }
    else if(whatInput === 'pin'){
      this.setState({ 
        keyboardPIN: true,
        keyboardSaldo: false,
        keyboardUser: false
      })
    }
  };

  onChangeSaldo = saldo => {
    this.state.pos['saldo_awal'] = saldo
    this.setState({
      saldo: saldo
    });
  };
  onChangeUsername = username => {
    this.state.pos['username_approval'] = username
    this.setState({
      username: username
    });
  };
  onChangePIN = pin => {
    this.state.pos['pin_approval'] = pin
    this.setState({
      pin: pin
    });
  };

  onChangeInputSaldo = event => {
    let saldo = event.target.value;
    this.state.pos['saldo_awal'] = saldo
    this.setState(
      {
        saldo: saldo
      },
      () => {
       // this.keyboard.setInput(saldo);
      }
    );
  };
  onChangeInputUsername = event => {
    let username = event.target.value;
    this.state.pos['username_approval'] = username
    this.setState(
      {
        username: username
      },
      () => {
        //this.keyboard.setInput(username);
      }
    );
  };
  onChangeInputPIN = event => {
    let pin = event.target.value;
    this.state.pos['pin_approval'] = pin
    this.setState(
      {
        pin: pin
      },
      () => {
        //this.keyboard.setInput(pin);
      }
    );
  };

  onKeyPress = button => {
    if ( button === "{enter}" ) {
      this.onEnter(button);
    }
  };

  onEnter = () => {
    this.setState({data: [this.state.pos] })
    axios.post(DefaultIP + `/api/postKas`, this.state.data)
    .then(res => {
      if(res.status === 200) {
      this.setState({redirect: true})
      } 
    })
    .catch(res => this.props.modalStore.toggleModal('alert', '', '', res.response.data.message))
  }
  

  render() {

    if(this.state.redirect){
      return (<Redirect to={'/cashier'} />);
    }

    return (
      <Subscribe to={[ModalsContainer]}>
        {modals => (

          <section className="centered">

            <div className="login">

              <div className="container">

                <div className="row">
                  <div className="col login-header">
                    <div className="row">
                      <div className="col-9">
                        <i className="fas fa-coins mr-3"></i> SALDO AWAL
                      </div>
                      <div className="col-3 text-right">
                        <img src={LogoAgogo} className="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 box-pin">
                    <div className="box-inner">

                      <FormGroup className="mt-4">
                        <Label for="saldo" className="text-center d-block"><h3>Masukan Saldo Awal</h3></Label>
                        <Input 
                          onFocus={() => this.onFocus('saldo') } 
                          value={this.state.saldo} 
                          onChange={e => this.onChangeInputSaldo(e)}
                          type="number" name="saldo" id="saldo" placeholder="0"  size="lg" className="text-center mt-3 mb-3" 
                          readonly autoComplete="off"
                        />

                        <Label for="username" className="text-center d-block"><h3>User Approval</h3></Label>
                        <Input 
                          onFocus={() => this.onFocus('username') } 
                          value={this.state.username} 
                          onChange={e => this.onChangeInputUsername(e)}
                          type="text" name="username" id="username" placeholder="USER" size="lg" className="text-center mb-3" 
                          readonly autoComplete="off"
                        />
                        
                        <Label for="pin" className="text-center d-block"><h3>Pin Approval</h3></Label>
                        <Input 
                          onFocus={() => this.onFocus('pin') } 
                          value={this.state.pin} 
                          onChange={e => this.onChangeInputPIN(e)}
                          type="password" name="pin" id="pin" placeholder="PIN"  size="lg" className="text-center mb-3" 
                          readonly autoComplete="off"
                        />

                      </FormGroup>
                    </div>
                  </div>

                  <div style={{height: "auto"}} className={ this.state.keyboardSaldo ? "col-6 box-calc saldo" : this.state.keyboardUser ?  "col-6 box-calc username" :  "col-6 box-calc pin" }>
                    <div className="box-inner">

                      <div id="keyboardSaldo" className={ this.state.keyboardSaldo ? "d-block" : "d-none" }>
                        <Keyboard
                          ref={r => (this.keyboard = r)}
                          layoutName={this.state.layoutName}
                          layout={{
                            default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"]
                          }}
                          display={{
                            '{bksp}': '<i class="fas fa-backspace"></i>',
                            '{enter}': '<i class="fas fa-level-down-alt"></i>',
                            '{shift}': 'shift'
                          }}
                          buttonTheme={[
                            {
                              class: "bg-orange",
                              buttons: "{enter}"
                            },
                            {
                              class: "bg-black text-light-grey",
                              buttons: "{bksp}"
                            }
                          ]}
                          onChange={saldo => this.onChangeSaldo(saldo)}
                          onKeyPress={button => this.onKeyPress(button)}
                        />
                      </div>

                      <div id="keyboardPIN" className={ this.state.keyboardPIN ? "d-block" : "d-none" }>
                        <Keyboard baseClass={"keyboard2"}
                          ref={s => (this.keyboard = s)}
                          layoutName={this.state.layoutName}
                          layout={{
                            default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"]
                          }}
                          display={{
                            '{bksp}': '<i class="fas fa-backspace"></i>',
                            '{enter}': '<i class="fas fa-level-down-alt"></i>',
                            '{shift}': 'shift'
                          }}
                          buttonTheme={[
                            {
                              class: "bg-orange",
                              buttons: "{enter}"
                            },
                            {
                              class: "bg-black text-light-grey",
                              buttons: "{bksp}"
                            }
                          ]}
                          onChange={pin => this.onChangePIN(pin)}
                          onKeyPress={button => this.onKeyPress(button)}
                        />
                      </div>

                      <div id="keyboardUser" className={ this.state.keyboardUser ? "d-block" : "d-none" }>
                        <Keyboard baseClass={"keyboard3"}
                          ref={s => (this.keyboard = s)}
                          layoutName={this.state.layoutName}
                          layout={{
                            default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"]
                          }}
                          display={{
                            '{bksp}': '<i class="fas fa-backspace"></i>',
                            '{enter}': '<i class="fas fa-level-down-alt"></i>',
                            '{shift}': 'shift'
                          }}
                          buttonTheme={[
                            {
                              class: "bg-orange",
                              buttons: "{enter}"
                            },
                            {
                              class: "bg-black text-light-grey",
                              buttons: "{bksp}"
                            }
                          ]}
                          onChange={user => this.onChangeUsername(user)}
                          onKeyPress={button => this.onKeyPress(button)}
                        />
                      </div>
                      
                    </div>
                  </div>
                
                </div>
                
              </div>

            </div>
            
          </section>
       )}
      </Subscribe>
    )
  }
}

export default SaldoAwal