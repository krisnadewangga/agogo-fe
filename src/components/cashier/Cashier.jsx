import React, { Component } from 'react';
import { Navbar, NavbarBrand, Container, Row, Col, Nav, NavItem, NavLink, Input } from 'reactstrap';
import Products from '../products/Products'
import ProductCategories from '../products/ProductCategories'
import Cart from '../carts/Cart'
import CalcNumericCart from '../calcs/CalcNumericCart'
import CashierOverlay from './CashierOverlay'
import FooterNavLeft from '../navigations/FooterNavLeft'
import FooterNavRight from '../navigations/FooterNavRight'
import PaymentCheckout from '../payments/PaymentCheckout'
import ReservationCheckout from '../payments/ReservationCheckout'
import axios from 'axios'
import LogoAgogo from "./../../img/logo-agogo.png";

import './Cashier.scss';
import './SidebarComponentsWrapper.scss';
import TransactionList from '../transaction/TransactionList';
import DoneTransactionList from '../transaction/DoneTransactionList';
import ReservationList from '../reservation/ReservationList';
import Refund from '../payments/Refund';
import PrintArea from './PrintArea'
import DefaultIP from '../../containers/DefaultIP'
import FooterNavRightProduction from '../navigations/FooterNavKasir';
class Kasir extends Component {

  constructor(props){
    super(props)
  }
  
  state = {
    userLoggedIn: [],
    name : ''
  }
  
  componentDidMount(){

     const user = JSON.parse(sessionStorage.getItem('usernow'))
    this.setState({userLoggedIn: user, name: user.username.toUpperCase()});
 
    axios.get(DefaultIP + '/api/cekKas/'+user.id)
    .then(res => {
        sessionStorage.setItem('idKas', JSON.stringify(res.data))
    })

    // 

  }

  render() {
    return (
      <Container fluid="true" className="kasir container-fluid h-100">
        <PrintArea cartStore={this.props.cartStore} namaKasir={this.state.name} />
        <Row className="h-100">

          <Col xs="6" className="kasir-cart">
            <Row className="cart-header no-gutters">
              <Col xs="12">
                <Navbar expand="md">
                  <NavbarBrand href="#" className="ml-4"><i className="fas fa-user-alt mr-1"></i>{" " +this.state.name}</NavbarBrand>
                  <Nav className="ml-auto" style={{justifyContent: 'space-between'}} navbar>
                    <NavItem>
                      <NavLink style={{padding: '1rem 0rem'}} href="#">Order # {this.props.cartStore.state.currentTrx}</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => this.props.modalStore.toggleModal('clearCart', '')} className="navbar-close"><i className="fas fa-times"></i></NavLink>
                    </NavItem>
                  </Nav>
                </Navbar>
              </Col>
            </Row>

            <Row className="cart-list no-gutters">
              <Col xs="12">
                <Cart cartStore={this.props.cartStore} modalStore={this.props.modalStore} />

                {this.props.cartStore.state.isCalcNumericCartOpen && (
                <div className="calc-container">
                  <CalcNumericCart
                    cartStore={this.props.cartStore}
                    onChange={this.props.cartStore.onChange} 
                    onChangeInput={this.props.cartStore.onChangeInput} 
                    onEnter={this.props.cartStore.onEnter} 
                    onChangeAll={inputs => this.props.cartStore.onChangeAll(inputs)}
                    inputName={this.props.cartStore.state.inputName}
                  />
                </div>
                )}
              </Col>
            </Row>


            <Row className="cart-nav no-gutters">
              <Col xs="12">
                <FooterNavLeft productStore={this.props.productStore} modalStore={this.props.modalStore}  userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} />
              </Col>
            </Row>
            
            {this.props.cartStore.state.isPaymentCheckoutShow &&
              <aside className="SidebarComponentsWrapper">
                {/* PAYMENT COMPONENTS */}
                <PaymentCheckout userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

            {this.props.cartStore.state.isReservationCheckoutShow &&
              <aside className="SidebarComponentsWrapper">
                {/* PAYMENT COMPONENTS */}
                <ReservationCheckout userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

            {this.props.cartStore.state.isTransactionListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* TRANSACTION COMPONENTS */}
                <TransactionList rootStore={this.props.rootStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore}/>
              </aside>
            }

            {this.props.cartStore.state.isDoneTransactionListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* TRANSACTION COMPONENTS */}
                <DoneTransactionList rootStore={this.props.rootStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore}/>
              </aside>
            }

            {this.props.cartStore.state.isReservationListShow &&
              <aside className="SidebarComponentsWrapper">
                {/* RESERVATION COMPONENTS */}
                <ReservationList rootStore={this.props.rootStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

            {this.props.cartStore.state.isRefundShow &&
              <aside className="SidebarComponentsWrapper">
                {/* REFUND COMPONENTS */}
                <Refund userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
              </aside>
            }

          </Col>

          <Col xs="6" className="kasir-product">
            <Row className="no-gutters">
              <Col xs="9">
                <Products activePath={this.props.activePath} cartStore={this.props.cartStore} productStore={this.props.productStore} />
              </Col>
              <Col xs="3">
                <ProductCategories productStore={this.props.productStore} />
              </Col>
            </Row>

            <Row className="product-nav no-gutters">

            <Col xs="5">
              <FooterNavRightProduction productStore={this.props.productStore} rootStore={this.props.rootStore} modalStore={this.props.modalStore}/>
            </Col>
            <Col xs="7">
              <FooterNavRight rootStore={this.props.rootStore} modalStore={this.props.modalStore} cartStore={this.props.cartStore} />
            </Col>
              
          </Row>

            

            <CashierOverlay isCashierOverlayShow={this.props.cartStore.state.isCashierOverlayShow} />
          </Col>

        </Row>
      </Container>
    );
  }
}

export default Kasir;