import React from 'react'
import { Row, Col } from 'reactstrap'

import './TransactionItem.scss'

const TransactionItem = (props) => {
  let currentDate = props.trxDate || ''
  let dateParts = currentDate.includes('T') ? currentDate.split('T') : currentDate.split(' ')
  let dateValue = dateParts[0] || ''
  let timeValue = dateParts[1] || ''
  let splitDate = dateValue.split('-')
  let splitTime = timeValue.split(':')
  let formatedDate = splitDate.length === 3 ? `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}` : dateValue
  let formatedTime = splitTime.length >= 2 ? `${splitTime[0]}:${splitTime[1]}` : timeValue
  return (
    <div>
      <Row style={{cursor: 'pointer', fontWeight: 600}}>
        <Col sm={props.isPaid ? '4' : '6'} className="row-trx"  onClick={() => props.isPaid ? props.cartStore.showSelectedTransaction(props.transactionDetail, props.modalStore.toggleModal) : props.cartStore.addSelectedTransaction(props.trxID, props.trxName, props.trxIndex)}>
          <span className="open-transaction" >
            {props.trxName}
          </span>
        </Col>
        <Col sm="4" className="transaction-list">
          <span className="open-transaction" >
            {formatedDate}</span>
        </Col>
        {props.isPaid && <Col sm="4" className="transaction-list">
          <span className="open-transaction" style={{paddingLeft: 30}}>
            {formatedTime}</span>
        </Col>}
        {!props.isPaid && <Col sm="2" className="transaction-list text-center">
          <span onClick={() => props.cartStore.deleteSelectedOrder(props.trxID, props.trxIndex)}><i className="fas fa-backspace btn-delete-item" /></span>
        </Col>}
      </Row>
      
    </div>
  )
}

export default TransactionItem