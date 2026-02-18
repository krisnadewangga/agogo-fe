import React from 'react'

const CartHeader = (props) => {
  return (
    <thead>
      <tr>
        <th className="header item-name">ITEM(s)</th>
        <th className="header item-delete">&nbsp;</th>
        <th className="header item-qty text-center">JML</th>
        <th className="header item-price text-right">HARGA</th>
      </tr>
    </thead>
  )
}

export default CartHeader