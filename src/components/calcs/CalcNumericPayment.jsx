import React, { Component } from "react";
import Keyboard, { KeyboardReactInterface }  from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./CalcNumeric.scss";

class CalcNumericPayment extends Component {
  constructor(props){
    super(props)
    this.props.cartStore.keyboardRef = React.createRef<KeyboardReactInterface | null>(null);
  }
  state = {
    layoutName: "default",
    valueInputPayment: '',
    inputName: ''
  };

  onKeyPress = (button) => {
    console.log(this.keyboard, this.props.cartStore.keyboardRef, "INI")
    if (button === "{rp}" || button === "{percentage}") {
      this.props.cartStore.keyboardRef.keyboard.clearInput("paymentDiscount");
      this.props.cartStore.onResetPayment()
    }
    this.props.cartStore.onKeyPressPayment(button)
  };
  
  render() {
    return (
      <div className="calc-to-right">
        <Keyboard
          ref={r => (this.props.cartStore.keyboardRef = r)}
          layoutName={this.state.layoutName}
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "0 00 000", "{bksp} {rp} {percentage}"]
          }}
          display={{
            '{bksp}': '<i class="fas fa-backspace"></i>',
            '{enter}': '<i class="fas fa-level-down-alt"></i>',
            '{rp}': 'Rp',
            '{percentage}': '%'
          }}
          buttonTheme={[
            {
              class: "bg-orange",
              buttons: "{enter}"
            },
            {
              class: "bg-red text-light-grey",
              buttons: "{bksp}"
            },
            {
              class: "bg-red text-white",
              buttons: "{close}"
            }
          ]}
          inputName={this.props.cartStore.state.activeInputPayment}
          onChangeAll={inputs => this.props.cartStore.onChangePayment(inputs)}
          onKeyPress={button => this.onKeyPress(button)}
        />

      </div>
    );
  }
}

export default CalcNumericPayment