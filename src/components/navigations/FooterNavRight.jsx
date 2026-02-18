
import React from 'react'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const FooterNavRight = (props) => {
  return (

    <Navbar expand="md">
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink active={props.cartStore.state.isOpenRefundShow} onClick={() => props.cartStore.openRefund()}><i className="fas fa-retweet"></i><br />Refund</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={props.cartStore.state.isOpenReservationShow} onClick={() => props.cartStore.openReservation()}><i className="fas fa-edit"></i> <br />Pemesanan</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => props.modalStore.toggleModal('logoutKasir', 'md')}><i className="fas fa-sign-out-alt"></i> <br />Logout</NavLink>
          {/* <NavLink href="/logout" onClick={() => props.modalStore.doLogout()}><i className="fas fa-sign-out-alt"></i> <br />Sign Out</NavLink> */}
        </NavItem>
        <NavItem>
        <a href="#" className="btn-fullscreen-other" onClick={props.rootStore.goFull} >
          <i className="fas fa-expand-arrows-alt"></i>
        </a>
        </NavItem>
      </Nav>
    </Navbar>

  )
}

export default FooterNavRight

