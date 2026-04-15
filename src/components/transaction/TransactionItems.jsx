import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import TransactionItem from './TransactionItem';

class TransactionItems extends Component {

  render(){
    const isPaid = this.props.paid;
    return (

      <Row className="TransactionItems row m-0">

      { this.props.cartStore.state.transaction.map((transaction, i) => 
      <Col xs="12">
        <TransactionItem 
          trxIndex={i}
          trxID={transaction.id} 
          trxName={isPaid ? transaction.no_transaksi : transaction.invoice}
          userID={transaction.user_id}
          trxPrice={isPaid ? transaction.total_bayar : transaction.total} 
          trxDate={transaction.created_at} 
          cartStore={this.props.cartStore} 
          rootStore={this.props.rootStore}
          isPaid={isPaid}
          transactionDetail={transaction}
          modalStore={this.props.modalStore}
        />
      </Col>
      )}    

    </Row>

    )
  }
}

export default TransactionItems