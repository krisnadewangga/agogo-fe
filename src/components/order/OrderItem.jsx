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
          <span className="open-transaction">
            {props.trxName}</span>
        </Col>
        <Col sm="4" className="transaction-list">
          <span className="open-transaction">
            {formatedDate}</span>
        </Col>
      </Row>
</div>
  )
}

export default OrderItem