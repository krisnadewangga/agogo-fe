
import React from 'react'
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';

const FooterNavRight = (props) => {
  return (

    <Navbar expand="md">
      <Container  container="fluid" className="d-flex justify-content-end">
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink active={props.cartStore.state.isOpenRefundShow} onClick={() => props.cartStore.openRefund()}>
              <i className="fas fa-retweet"></i>
              <span className="nav-label">Refund</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={props.cartStore.state.isOpenReservationShow} onClick={() => props.cartStore.openReservation()}>
              <i className="fas fa-edit"></i>
              <span className="nav-label">Pemesanan</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => props.modalStore.toggleModal('logoutKasir', 'md')}>
              <i className="fas fa-sign-out-alt"></i>
              <span className="nav-label">Logout</span>
            </NavLink>
            {/* <NavLink href="/logout" onClick={() => props.modalStore.doLogout()}><i className="fas fa-sign-out-alt"></i> <br />Sign Out</NavLink> */}
          </NavItem>
          <NavItem>
          <button type="button" className="btn-fullscreen-other" onClick={props.rootStore.goFull}>
            <i className="fas fa-expand-arrows-alt"></i>
            <span className="nav-label">Layar</span>
          </button>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>

  )
}

export default FooterNavRight

