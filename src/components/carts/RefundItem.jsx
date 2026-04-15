import React from 'react'
import { Input } from 'reactstrap';
import { NumericFormat as NumberFormat } from 'react-number-format';

const RefundItem = (props) => {
  return (
    <tr>
      <th className="item-name" scope="row">{props.title}</th>
      <td className="item-qty text-center">
        <Input 
          className={props.cartStore.state.activeItem === props.idx ? 'btn btn-danger focus' : 'btn btn-danger'}
          id={"qty"+props.id} 
          name={"qty"+props.id} 
          type="number" 
          size="sm" 
          placeholder={props.qty} 
          onClick={() => props.cartStore.setSelectedQtyID(props.idx, props.id, props.qty)}
          readOnly
          disabled
        />
        {/* <input id="input1" onFocus={this.setActiveInput} value={this.state.input['input1'] || ""}/>
        <input id="input2" onFocus={this.setActiveInput} value={this.state.input['input2'] || ""}/> */}

        {/* <Button onClick={() => props.cartStore.onUpdateItem(props.id)}> + </Button> */}
      </td>
      <td className="text-right item-price">
        <NumberFormat value={props.cartStore.sumTotalAmountPerRefund(props.idx)} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','}  />
      </td>
    </tr>
  )
}

export default RefundItem