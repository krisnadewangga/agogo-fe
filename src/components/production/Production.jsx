import React from 'react'
import { Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import CalcNumericCart from '../calcs/CalcNumericCart'
import Products from '../products/ProductsP'
import ProductCategories from '../products/ProductCategories'
import CartProduction from '../carts/cartsProduction/CartProduction'
import FooterNavRightProduction from '../navigations/FooterNavRightProduction';
import './production.scss'

class Production extends React.Component {
      state = {
        userLoggedIn: [],
        name : ''
      }

    componentDidMount(){
        const user = JSON.parse(sessionStorage.getItem('usernow'))
        this.setState({userLoggedIn: user, name: user.username.toUpperCase()});
        this.props.productStore.setFilteredKeyword("Semua Item")
        this.props.productStore.fetchProducts()
    }
    
    render() {
        return (
            <Container fluid className="production h-100">
                <Row className="h-100 row-clean">

                    <Col md="6" className="production-cart">
                        <Row className="cart-header row-clean">
                            <Col xs="12" style={{alignContent: 'center'}}>
                                <Navbar expand="md">
                                    <NavbarBrand href="#" className="ml-4"><i className="fas fa-user-alt mr-1"></i> {" " +this.state.name}</NavbarBrand>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink onClick={() => this.props.modalStore.toggleModal('clearCart', '')} className="navbar-close"><i className="fas fa-times"></i></NavLink>
                                        </NavItem>
                                    </Nav>
                                </Navbar>
                            </Col>
                        </Row>

                        <Row className="cart-list row-clean">
                            <Col xs="12">
                                <CartProduction cartStore={this.props.cartStore} modalStore={this.props.modalStore} />

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

                    </Col>

                    <Col md="6" className="production-product">
                        <Row className="row-clean">
                            <Col xs="9">
                                <Products modalStore={this.props.modalStore} activePath={this.props.activePath} cartStore={this.props.cartStore} productStore={this.props.productStore} />
                            </Col>
                            <Col xs="3">
                                <ProductCategories productStore={this.props.productStore} />
                            </Col>
                        </Row>

                        <Row className="product-nav row-clean">
                            <Col xs="12">
                                <FooterNavRightProduction productStore={this.props.productStore} rootStore={this.props.rootStore} modalStore={this.props.modalStore}/>
                            </Col>
                        </Row>

                        
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default Production