import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./CalcNumericModal.scss";

class CalcNumericModal extends Component {
  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    this.setState({
      input: input
    },
    () => {
      this.props.onChange(input)
    });
  };

  onKeyPress = button => {
    if ( button === "{enter}" ) {
      this.onEnter(button);
    }
  };

  onEnter = (button) => {
    // JALANKAN FUNGSI DARI PARENT
    this.props.cartStore.doProduction(this.props.cartStore.state.selectedProduct.id, this.props.modalStore)
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div className="iniClassModal">
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
          inputName={this.props.cartStore.state.activeInputRefund}
          onChangeAll={inputs => this.props.cartStore.onChangeRefund(inputs)}
          onKeyPress={button => this.onKeyPress(button)}
        />
      </div>
    );
  }
}

export default CalcNumericModal