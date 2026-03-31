import React, { Component } from "react";
import { Button } from 'reactstrap';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./CalcNumeric.scss";

class CalcNumeric extends Component {
  constructor(props){
    super(props)
  }
  state = {
    layoutName: "default",
    inputQtyCartItem: '',
    inputName: ''
  };

  setActiveInput = (event) => {
    this.setState({
      inputName: event.target.id
    });
  }
  
  onChange = inputQtyCartItem => {
    this.setState({
      inputQtyCartItem: inputQtyCartItem
    });
  };

  onChangeInput = event => {
    let inputQtyCartItem = event.target.value;

    this.setState(
      {
        inputQtyCartItem: inputQtyCartItem
      },
      () => {
        if (this.keyboard) {
          this.keyboard.setInput(inputQtyCartItem);
        }
      }
    );
  };

  onKeyPress = (button) => {
    if(this.props.cartStore.state.onReset){
      if (button === "{bksp}") {
        this.onReset();
      }
      // if (this.keyboard) {
      //   this.keyboard.setInput('');
      // }
      this.props.cartStore.setState({
        onReset: false
      })
    }

    if (button === "{enter}") {
      this.onEnter(this.props.cartStore.state.selectedQtyID, this.props.cartStore.state.inputQtyCartItem);
    }

    if (button === "{close}") {
      this.props.cartStore.onCloseCalc()
    }
  };

  onEnter = (id, newQty) => {
    if(this.props.cartStore.state.inputQtyCartItem !== '0' || this.props.cartStore.state.inputQtyCartItem !== ''){
      this.props.cartStore.onUpdateItem(id, newQty)
    }
    this.onReset()
  };

  onReset = () => {
    this.props.cartStore.setState(
      {
        inputQtyCartItem: 1
      },
      () => {
        // if (this.keyboard) {
        //   this.keyboard.setInput('');
        // }
      }
    );
  }

  render() {
    return (
      <div className="iniClassCart">
        <input
          name="inputCalcCart"
          className="input-calc-cart"
          value={this.props.cartStore.state.inputQtyCartItem}
          placeholder={this.props.cartStore.state.inputQtyCartItem}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          ref={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"]
          }}
          display={{
            '{bksp}': '<i class="fas fa-backspace"></i>',
            '{enter}': '<i class="fas fa-level-down-alt"></i>',
            '{close}': '<i class="fas fa-times mr-1"></i> Tutup'
          }}
          buttonTheme={[
            {
              class: "bg-orange",
              buttons: "{enter}"
            },
            {
              class: "bg-black text-light-grey",
              buttons: "{bksp}"
            },
            {
              class: "bg-red text-white",
              buttons: "{close}"
            }
          ]}
          syncInstanceInputs={true}
          onChange={inputQtyCartItem => this.props.cartStore.onChange(inputQtyCartItem)}
          onKeyPress={button => this.onKeyPress(button)}
          // onChangeAll={inputs => this.props.cartStore.onChangeAll(inputs)}
        />
        <Button className="close-calc btn btn-danger" onClick={this.props.cartStore.onCloseCalc}>
          <i className="fas fa-times"></i>
        </Button>
      </div>
    );
  }
}

export default CalcNumeric