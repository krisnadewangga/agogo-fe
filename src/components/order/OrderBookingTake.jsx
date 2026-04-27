import React from 'react'
import { Container, Row, Col, NavLink, Table } from 'reactstrap';
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'

import OrderHeader from './OrderHeader';
import OrderItems from './OrderItems';

const OrderBookingTake = (props) => {
  
  return (
    <div>
      <Container className="reservation">
        <NavLink onClick={() => props.cartStore.toggleOrderBookingTakeShow()} className="sidebar-header-nav" style={{color: "white"}}><i className="fas fa-arrow-left mr-2" style={{color: "white"}}></i>Ambil Pemesanan</NavLink>
            <Table style={{color: "white"}} borderless striped>
              <OrderHeader cartStore={props.cartStore}/>
            </Table>
  
            <ShadowScrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMin={500}
              autoHeightMax={500}
            >
              <div className="scroll-wrapper">
                <Table style={{color: "white"}} borderless striped className="mb-0">
                  <OrderItems cartStore={props.cartStore}/>
                </Table>
              </div>
            </ShadowScrollbars>
        </Container>
        <Row className="product-nav no-gutters w-100">
          <Col xs="12">
            <FooterNavRightBooking cartStore={props.cartStore} rootStore={props.rootStore} modalStore={props.modalStore}/>
          </Col>
        </Row>
    </div>
  )
}

export default OrderBookingTake