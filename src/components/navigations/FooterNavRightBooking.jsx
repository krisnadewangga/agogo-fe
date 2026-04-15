import React from 'react'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const FooterNavRightBooking = (props) => {
    return (

        <Navbar expand="md">
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink disabled={props.cartStore.state.disabledOther} active={props.cartStore.state.isOrderBookingDeleteShow} onClick={() => props.cartStore.orderBookingDelete()}>
                        <i className="fas fa-trash-alt"></i>
                        <span className="nav-label">Hapus</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled={props.cartStore.state.disabledOther} active={props.cartStore.state.isOrderBookingEditShow} onClick={() => props.cartStore.orderBookingEdit()}>
                        <i className="fas fa-pen"></i>
                        <span className="nav-label">Edit</span>
                    </NavLink>
                </NavItem>
                {/* <NavItem>
                    <NavLink disabled={props.cartStore.state.disabledOther} active={props.cartStore.state.isOrderBookingTakeShow} onClick={() => props.cartStore.orderBookingTake()}><i class="fas fa-check"></i><br />Ambil</NavLink>
                </NavItem> */}
                <NavItem>
                    <NavLink disabled={props.cartStore.state.disabledOrder} active={props.cartStore.state.isOrderBookingShow} onClick={() => props.cartStore.orderBooking()}>
                        <i className="fas fa-edit"></i>
                        <span className="nav-label">Order</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                <NavLink 
                    onClick={() => props.modalStore.toggleModal('logout', 'md')}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span className="nav-label">Logout</span>
                    </NavLink>
                    {/* <NavLink href="/logout"><i class="fas fa-sign-out-alt"></i><br />Logout</NavLink> */}
                </NavItem>
                <NavItem>
                    <NavLink onClick={props.rootStore.goFull}>
                        <i className="fas fa-expand-arrows-alt"></i>
                        <span className="nav-label">Layar</span>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>

    )
}

export default FooterNavRightBooking

