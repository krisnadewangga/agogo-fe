import React from 'react'
import CartItem from './CartItem';
import RefundItem from './RefundItem';

const RefundItems = (props) => {
  return (
    <tbody>
      {/* {props.cartStore.state.items.map((item, i) => (
        <CartItem
          idx={i}
          id={item.id}
          title={item.name}
          qty={item.qty}
          price={item.price}
          cartStore={props.cartStore}  
        />
      ))} */}
      {props.cartStore.state.refundItems.map((item, i) => (
        <RefundItem 
          idx={i}
          id={item.id}
          title={item.name}
          qty={item.qty}
          price={item.price}
          cartStore={props.cartStore}  
        />
        ))}
    </tbody>
  )
}

export default RefundItems