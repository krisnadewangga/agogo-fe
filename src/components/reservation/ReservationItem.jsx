import React from 'react'

import { Row, Col } from 'reactstrap'

const ReservationItem = (props) => {
  let currentDate = props.trxDate
  let date = currentDate.split(" ")
  let splitDate = date[0].split('-')
  let formatedDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]
  
  return (
    <div>
        <Row>
          <Col sm="6" className="row-trx" onClick={() => props.cartStore.addSelectedReservation(props.trxID, props.trxName) || props.cartStore.reservationCheckout()}>
            <a className="open-booking" href="#" >
              {props.trxName}</a>
              
          </Col>
          <Col sm="4" className="transaction-list">
            <a className="open-booking" href="#" >
              {formatedDate}</a>
          </Col>
          {/* <Col sm="2" className="transaction-list">
            <a href="#"  onClick={() => props.cartStore.deleteReservation(props.trxID, props.trxIndex)}><i className="fas fa-backspace btn-delete-item" style={{ color: "black" }} /></a>
          </Col> */}
        </Row>
        <hr className="garis-pembatas"/>
          
    </div>
  )
}

export default ReservationItem