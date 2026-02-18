import React from 'react'
import { Input } from 'reactstrap';
import NumberFormat from 'react-number-format';

const CartItem = (props) => {
  return (
    <tr>
      <td className="item-name" scope="row">{props.title}</td>
      { props.cartStore.state.isRefundItem ?
        <td className="item-delete text-right">
          <i className="fas fa-undo btn-delete-item" onClick={() => props.cartStore.onRemoveToRefund(props.idx)} />
        </td> : props.cartStore.state.isInOrder ?
        <td /> :
        <td className="item-delete text-right">
          <i className="fas fa-backspace btn-delete-item" onClick={() => props.cartStore.onRemoveFromCart(props.idx)} />
        </td>
      }
      <td className="item-qty text-center">
        <Input 
          disabled={props.cartStore.state.onRefund}
          className={props.cartStore.state.activeItem === props.idx ? 'btn btn-danger focus' : 'btn btn-danger'}
          id={"qty"+props.id} 
          name={"qty"+props.id} 
          type="number" 
          size="sm" 
          placeholder={props.qty} 
          onClick={() => props.cartStore.setSelectedQtyID(props.idx, props.id, props.qty)}
          readonly
        />
        {/* <input id="input1" onFocus={this.setActiveInput} value={this.state.input['input1'] || ""}/>
        <input id="input2" onFocus={this.setActiveInput} value={this.state.input['input2'] || ""}/> */}

        {/* <Button onClick={() => props.cartStore.onUpdateItem(props.id)}> + </Button> */}
      </td>
      <td className="text-right item-price">
        <NumberFormat value={props.cartStore.sumTotalAmountPerItem(props.idx)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}  />
      </td>
    </tr>
  )
}

export default CartItem