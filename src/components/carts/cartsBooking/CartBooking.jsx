import React from 'react'
import { Table, Container } from 'reactstrap'
import CartHeader from '../CartHeader'

import ShadowScrollbars from '../../scrollbars/ShadowScrollbars'
import CartItems from '../CartItems'
import CartBookingTotal from '../CartBookingTotal'

import '../../booking/CartBooking.scss'


class CartBooking extends React.Component {
    state = {
        cart: [],
        footerNvaBarHeight: 350,
        windowInnerHeight: 0,
        productItemsHeight: 0,
    }

    componentWillMount() {
        this.setState({
            windowInnerheight: window.innerHeight
        },
            () => {
                this.setState({
                    productItemsHeight: this.state.windowInnerHeight - this.state.footerNvaBarHeight
                })
            }
        )
    }

    render() {
        return (
            <Container className="cart mt-4 pt-5 pr-0 pl-0">
                <Table borderless striped>
                    <CartHeader cartStore={this.props.cartStore} />
                </Table>

                <ShadowScrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={100}
                    autoHeightMax={700}
                >
                    <div className="scroll-wrapper">
                        <Table borderless striped className="mb-0">
                            <CartItems cartStore={this.props.cartStore} />
                        </Table>
                    </div>
                </ShadowScrollbars>
                
                <Table borderless striped>
                    <CartBookingTotal name="tfoot-booking" refund="Total Refund" pembayaran="Sisa Pembayaran" cartStore={this.props.cartStore} />
                </Table>  
                
            </Container>
            
        )
    }
}

export default CartBooking