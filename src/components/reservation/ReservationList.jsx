import React, { Component } from 'react'
import { Container, Row, Col, NavLink, Button, Input, Table } from 'reactstrap';

import ShadowScrollbars from '../scrollbars/ShadowScrollbars';

import ReservationHeader from './ReservationHeader';
import ReservationItems from './ReservationItems';
import FooterNavRight from '../navigations/FooterNavRight';

class ReservationList extends Component {
  constructor(props){
    super(props)
  }
    state = {
    footerNvaBarHeight: 350,
    windowInnerHeight: 0,
    productItemsHeight: 0,
  }

  componentDidMount(){
    this.props.cartStore.fetchReservation()
  }


  componentWillMount(){
    this.setState({
      windowInnerHeight: window.innerHeight
    },
      () => {
        this.setState({
          productItemsHeight: this.state.windowInnerHeight - this.state.footerNvaBarHeight
        })
      }
    );
  }

  render(){
  return (
<Container className="reservation">
        <NavLink onClick={() => this.props.cartStore.toggleOpenReservationShow()} className="sidebar-header-nav" style={{color: "white"}}><i className="fas fa-arrow-left mr-2" style={{color: "white"}}></i>Pemesanan</NavLink>
            <Table style={{color: "white"}} borderless striped>
              <ReservationHeader />
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
                  <ReservationItems cartStore={this.props.cartStore}/>
                </Table>
              </div>
            </ShadowScrollbars>

            <Row className="product-nav no-gutters">
              <Col xs="12">
                <FooterNavRight modalStore={this.props.modalStore} cartStore={this.props.cartStore} rootStore={this.props.rootStore}/>
              </Col>
            </Row>
        </Container>
  )
}
}

export default ReservationList