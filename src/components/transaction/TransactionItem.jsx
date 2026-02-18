import React from 'react'
import TransactionItems from './TransactionItems';
import { Row, Col } from 'reactstrap'

import './TransactionItem.scss'

const TransactionItem = (props) => {
  let currentDate = props.trxDate
  let date = currentDate.split(" ")
  let splitDate = date[0].split('-')
  let formatedDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]
  return (
    <div>
      <Row >
        <Col sm="6" className="row-trx" onClick={() => !props.isPaid && props.cartStore.addSelectedTransaction(props.trxID, props.trxName, props.trxIndex)}>
          <a className="open-transaction" href="#" style={{ color: "black" }} >
            {props.trxName}
          </a>
        </Col>
        <Col sm="4" className="transaction-list">
          <a className="open-transaction" href="#" style={{ color: "black" }} >
            {formatedDate}</a>
        </Col>
        {!props.isPaid && <Col sm="2" className="transaction-list">
          <a href="#"  onClick={() => props.cartStore.deleteSelectedOrder(props.trxID, props.trxIndex)}><i className="fas fa-backspace btn-delete-item" style={{ color: "black" }} /></a>
        </Col>}
      </Row>
      
    <hr className="garis-pembatas" />
    </div>
  )
}

export default TransactionItem