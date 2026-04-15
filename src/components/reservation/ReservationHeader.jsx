import React from 'react'

const ReservationHeader = (props) => {
  return (
    <thead>
      <tr>
        <th className="header reservation-id">Transaksi</th>
        <th className="header reservation-date text-left">Tanggal Ambil</th>
      </tr>
    </thead>
  )
}

export default ReservationHeader