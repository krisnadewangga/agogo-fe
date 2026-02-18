import React from 'react'
import { Container, Row, Col, NavLink, Button, Input, Table } from 'reactstrap';
import ShadowScrollbars from '../scrollbars/ShadowScrollbars';
import FooterNavRightBooking from '../navigations/FooterNavRightBooking'

import OrderHeader from './OrderHeader';
import OrderItems from './OrderItems';

const OrderBookingDelete = (props) => {
  
  return (
<Container className="reservation mt-4 pt-5 pr-0 pl-0">
        <NavLink onClick={() => props.cartStore.toggleOrderBookingDeleteShow()} className="sidebar-header-nav"><i className="fas fa-arrow-left mr-2"></i>Delete Pemesanan</NavLink>
            <Table style={{color: "white"}} borderless striped>
              <OrderHeader cartStore={props.cartStore}/>
            </Table>
  
            <ShadowScrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMin={600}
              autoHeightMax={0}
            >
              <div className="scroll-wrapper">
                <Table style={{color: "white"}} borderless striped className="mb-0">
                  <OrderItems cartStore={props.cartStore}/>
                </Table>
              </div>
            </ShadowScrollbars>
            <Row className="product-nav no-gutters">
              <Col xs="12">
                  <FooterNavRightBooking cartStore={props.cartStore} rootStore={props.rootStore} modalStore={props.modalStore}/>
              </Col>
          </Row>
        </Container>
  )
}

export default OrderBookingDelete