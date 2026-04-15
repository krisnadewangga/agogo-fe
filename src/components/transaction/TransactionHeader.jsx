import React from 'react'

const TransactionHeader = (props) => {
  const { paid } = props;
  return (
    <thead>
      <tr>
        <th className="header transaction-id">Transaksi</th>
        <th className="header transaction-date text-left">Tanggal</th>
        {paid && <th className="header transaction-date text-left">Waktu</th>}
      </tr>
    </thead>
  )
}

export default TransactionHeader