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
      <Row>
        <Col sm={props.isPaid ? '4' : '6'} style={{cursor: 'pointer', fontWeight: 600}} className="row-trx" onClick={() => props.isPaid ? props.cartStore.showSelectedTransaction(props.transactionDetail, props.modalStore.toggleModal) : props.cartStore.addSelectedTransaction(props.trxID, props.trxName, props.trxIndex)}>
          <span className="open-transaction" style={{ color: "black" }} >
            {props.trxName}
          </span>
        </Col>
        <Col sm="4" className="transaction-list">
          <span className="open-transaction" style={{ color: "black" }} >
            {formatedDate}</span>
        </Col>
        {props.isPaid && <Col sm="4" className="transaction-list">
          <span className="open-transaction" style={{ color: "black" }} >
            {date[1]}</span>
        </Col>}
        {!props.isPaid && <Col sm="2" className="transaction-list">
          <span onClick={() => props.cartStore.deleteSelectedOrder(props.trxID, props.trxIndex)}><i className="fas fa-backspace btn-delete-item" style={{ color: "black" }} /></span>
        </Col>}
      </Row>
      
    <hr className="garis-pembatas" />
    </div>
  )
}

export default TransactionItem