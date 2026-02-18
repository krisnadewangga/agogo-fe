import React from 'react'
import { NavLink } from 'reactstrap';

const TransactionHeader = (props) => {
  return (
    <thead>
      <tr>
        <th className="header transaction-id">Transaksi</th>
        <th className="header transaction-date text-left">Tanggal</th>
      </tr>
    </thead>
  )
}

export default TransactionHeader