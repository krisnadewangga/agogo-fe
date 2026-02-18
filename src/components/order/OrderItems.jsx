import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import OrderItem from './OrderItem';


class OrderItems extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.cartStore.fetchReservation()
  }

  render(){

    return (

      <Row className="TransactionItems row m-0">

      { this.props.cartStore.state.reservation.map((transaction, i) => 
      <Col xs="12">
        <OrderItem 
          trxIndex={i}
          trxID={transaction.id} 
          trxName={transaction.no_transaksi}
          userID={transaction.user_id}
          trxPrice={transaction.total} 
          trxDate={transaction.tgl_selesai} 
          cartStore={this.props.cartStore} 
        />
      </Col>
      )}   
    </Row>
  
    )
  }
}

export default OrderItems