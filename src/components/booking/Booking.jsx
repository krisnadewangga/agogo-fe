    import React, { Component } from  'react'
    import { Navbar, NavbarBrand, Container, Row, Col, Nav, NavItem, NavLink, Input, Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap'
    import CalcNumericCart from '../calcs/CalcNumericCart'
    import Products from '../products/Products'
    import ProductCategories from '../products/ProductCategories'
    import FooterNavRightBooking from '../navigations/FooterNavRightBooking'
    import CartBooking from '../carts/cartsBooking/CartBooking'
    import axios from 'axios'

    import '../booking/Booking.scss'
    import '../cashier/SidebarComponentsWrapper.scss'
    import OrderBooking from '../order/OrderBooking'
    import OrderBookingDelete from '../order/OrderBookingDelete'
    import OrderBookingEdit from '../order/OrderBookingEdit'
    import OrderBookingTake from '../order/OrderBookingTake'
    import DeleteBooking from '../order/DeleteBooking'
    import EditBooking from '../order/EditBooking'
    import TakeBooking from '../order/TakeBooking'
    import PrintArea from '../cashier/PrintArea'
    import DefaultIP from '../../containers/DefaultIP'

    class Booking extends Component {
        constructor(props) {
            super(props)

            this.toggle = this.toggle.bind(this);
            this.state = {
                popoverOpen: false,
                userLoggedIn: [],
                name: '',
                currentTrx: ''
            };
            

        }

        toggle() {
            this.setState({
            popoverOpen: !this.state.popoverOpen
            });
        }

        componentDidMount(){


           
            
            // this.props.transactionStore.fetchReservation()
            const user = JSON.parse(sessionStorage.getItem('usernow'))
            this.setState({userLoggedIn: user, name: user.username.toUpperCase()});
            this.props.cartStore.setState({userPencatat: user.username.toUpperCase()})
            axios.get(DefaultIP + `/api/cekPOInvoice`).then(res => {
                const trx = res.data;
                this.setState({ currentTrx: trx.current_invoice});
            })





            

         


        }
        doUpdate(){
            axios.get(DefaultIP + `/api/cekPOInvoice`).then(res => {
                const trx = res.data;
                this.setState({ currentTrx: trx.current_invoice});
            })


            
        }

        buttonSetSearchKeyword(keyword){
            this.props.productStore.setSearchKeyword(keyword)
          }
        
          handleChange = (e) => {
            this.props.productStore.setState({
              searchKeyword: e.target.value
            }, () => {
              this.buttonSetSearchKeyword(this.props.productStore.state.searchKeyword)
            })
          }
        
          resetSearchKeyword(){
            this.props.productStore.setState({
              searchKeyword: ''
            })
          }

        render() {
            return (
                <Container fluid className="booking h-100">
                    <PrintArea cartStore={this.props.cartStore} namaKasir={this.state.name} />
                    <Row className="h-100 row-clean">

                        <Col md="6" className="booking-cart">
                            <Row className="cart-header row-clean">
                                <Col xs="12">
                                    <Navbar expand="md">
                                        <NavbarBrand href="#" className="ml-4"><i className="fas fa-user-alt mr-1"></i> {" " +this.state.name}</NavbarBrand>
                                        <Nav className="ml-auto" navbar>
                                            <NavItem>
                                                <NavLink href="#">{"Order #" + this.props.cartStore.state.currentTrx}</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={() => this.props.modalStore.toggleModal('clearCart', '')} className="navbar-close"><i className="fas fa-times"></i></NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Navbar>
                                </Col>
                            </Row>

                            <Row className="cart-list row-clean">
                                <Col xs="12">
                                    <CartBooking cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                    {this.props.cartStore.state.popStatus && 
                                    <div>
                                        <Button toggle="false" block="true" type="button" id="Popover1" onClick={() => this.toggle()}>
                                        Tambah Item
                                        </Button>
                                        <Popover container={'#A'} placement="right-start" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                            <PopoverHeader>
                                                <Input type="search" name="search" className="search" placeholder="Cari produk..." 
                                                    value={this.props.productStore.state.searchKeyword}
                                                    onChange={this.handleChange}
                                                    ref={el => this.inputTitle = el}
                                                    style={{}}
                                                />
                                            </PopoverHeader>
                                            <PopoverBody >
                                                <Products cartStore={this.props.cartStore} productStore={this.props.productStore} activePath={this.props.activePath}/>
                                            </PopoverBody>
                                        </Popover>
                                    </div>
                                    }
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

                        <Col md="6" className="booking-product">
                            <Row className="row-clean">
                                <Col xs="9">
                                    <Products activePath={this.props.activePath} cartStore={this.props.cartStore} productStore={this.props.productStore} />
                                </Col>
                                <Col xs="3">
                                    <ProductCategories productStore={this.props.productStore} />
                                </Col>
                            </Row>

                            <Row className="product-nav row-clean">
                                <Col xs="12">
                                    <FooterNavRightBooking rootStore={this.props.rootStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </Col>
                            </Row>
                            
                            {this.props.cartStore.state.isOrderBookingShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <OrderBooking rootStore={this.props.rootStore} userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isOrderBookingDeleteShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <OrderBookingDelete rootStore={this.props.rootStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isOrderBookingEditShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <OrderBookingEdit rootStore={this.props.rootStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isOrderBookingTakeShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <OrderBookingTake rootStore={this.props.rootStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isBookingDeleteShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <DeleteBooking rootStore={this.props.rootStore} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isBookingEditShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <EditBooking rootStore={this.props.rootStore} userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }
                            {this.props.cartStore.state.isBookingTakeShow &&
                                <aside className="SidebarComponentsWrapper">
                                    {/* PAYEMNT COMPONENTS */}
                                    <TakeBooking rootStore={this.props.rootStore} userNow={this.state.userLoggedIn} cartStore={this.props.cartStore} modalStore={this.props.modalStore} />
                                </aside>
                            }

                        </Col>

                    </Row>
                </Container>
            )
        }
    }

    export default Booking