import React from 'react'
import { Row, Col } from 'reactstrap'
import './OrderItem.scss'

const OrderItem = (props) => {
  let currentDate = props.trxDate
  let date = currentDate.split(" ")
  let splitDate = date[0].split('-')
  let formatedDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]
  return (
    <div>
      <Row>
        <Col sm="6" className="row-trx" onClick={() => props.cartStore.doOrder(props.trxID)}>
          <a className="open-transaction" href="#" style={{ color: "black" }} >
            {props.trxName}</a>
        </Col>
        <Col sm="4" className="transaction-list">
          <a className="open-transaction" href="#" style={{ color: "black" }} >
            {formatedDate}</a>
        </Col>
      </Row>
    <hr className="garis-pembatas" />
</div>
  )
}

export default OrderItem