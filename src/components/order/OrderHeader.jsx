import React from 'react'
import { NavLink } from 'reactstrap';

const OrderHeader = (props) => {
  return (
    <thead>
      <tr>
        <th className="header order-id">Transaksi</th>
        <th className="header order-date text-left">Tanggal</th>
      </tr>
    </thead>
  )
}

export default OrderHeader